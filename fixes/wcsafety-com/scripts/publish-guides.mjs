#!/usr/bin/env node
// fixes/wcsafety-com/scripts/publish-guides.mjs
//
// Auto-publishes comparison-guide drafts from ../blogs/guides/*.md to
// Shopify as blog articles. Three-level safety gating:
//
//   (default)   DRY RUN     no changes, just prints what would happen
//   --apply     CREATE DRAFT articles created but NOT visible to readers;
//                            operator reviews each in Shopify admin and
//                            clicks Publish per article
//   --apply --publish-live   ARTICLES PUBLISHED LIVE on creation. Use only
//                            after a dry-run + a draft-mode review pass.
//
// Hard refuses to publish any draft that still contains unresolved
// placeholders ([VERIFY ...], [REVIEWER NAME ...], [DATE], [AMAZON LINK],
// [PRODUCT URL], [CHOOSE ...], etc.). For safety content this is the
// difference between a useful automation and shipping fabricated NIOSH
// approval numbers — keep this gate.
//
// Prereqs:
//   npm install                    # one time; installs marked for md → html
//   export SHOPIFY_STORE=...       # (see lib/shopify.mjs)
//   export SHOPIFY_ADMIN_TOKEN=... # never paste this anywhere else
//
// You also need two article metafield definitions in Shopify admin
// (Settings → Custom data → Articles → Add definition):
//   namespace: editorial · key: reviewer       · type: single_line_text
//   namespace: editorial · key: last_reviewed  · type: date
// If those don't exist the script will still create the article — only the
// metafield writes will fail. See README for setup.

import { gql, dryRun, log, bannerStart, bannerEnd } from './lib/shopify.mjs';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { marked } from 'marked';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GUIDES_DIR = resolve(__dirname, '..', 'blogs', 'guides');
const BLOG_HANDLE = 'guides';   // all current drafts live at /blogs/guides/

const publishLive = process.argv.includes('--publish-live');

// ─── Safety gate
// Any of these prefixes inside [square brackets] = unresolved placeholder.
const PLACEHOLDER_RE =
  /\[(VERIFY|REVIEWER|DATE|AMAZON|PRODUCT|CHOOSE|YOUR|ORDER|ACTUAL)[^\]]*\]/g;

// ─── GraphQL

const FIND_BLOG = /* GraphQL */ `
  query findBlog($q: String!) {
    blogs(first: 5, query: $q) {
      edges { node { id handle title } }
    }
  }
`;

const FIND_ARTICLE = /* GraphQL */ `
  query findArticle($blogId: ID!, $q: String!) {
    blog(id: $blogId) {
      articles(first: 5, query: $q) {
        edges { node { id handle title } }
      }
    }
  }
`;

const ARTICLE_CREATE = /* GraphQL */ `
  mutation articleCreate($article: ArticleCreateInput!) {
    articleCreate(article: $article) {
      article { id handle title }
      userErrors { field message }
    }
  }
`;

// ─── Parse our front-matter format
//
// The .md files start with an H1, then a block of **Key:** `value` lines,
// then a `---`, then the body. Example:
//
//   # 3M 60921 vs 60923: Which Combination Cartridge Do You Need?
//
//   **Page handle:** `3m-60921-vs-60923-cartridge`
//   **SEO title:** `3M 60921 vs 60923 Cartridge: Which to Pick | WC Safety`
//   **Meta description:** `…`
//   **Author byline:** `[REVIEWER NAME, credential]`
//   **Published:** `[DATE]`
//   **Last reviewed:** `[DATE]`
//
//   ---
//
//   ## TL;DR
//   …
function parseGuide(text) {
  const lines = text.split('\n');
  let i = 0;

  // skip leading blanks
  while (i < lines.length && lines[i].trim() === '') i++;

  // H1
  let h1 = null;
  if (lines[i] && lines[i].startsWith('# ')) {
    h1 = lines[i].slice(2).trim();
    i++;
  }

  // **Key:** `value` lines until the first `---`
  const meta = {};
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '---') {
      i++;
      break;
    }
    const m = line.match(/^\*\*([^*]+):\*\*\s*(.+)$/);
    if (m) {
      const key = m[1].trim();
      // strip wrapping backticks
      const value = m[2].trim().replace(/^`(.*)`$/, '$1');
      meta[key] = value;
    }
    i++;
  }

  // body = everything after the first ---
  const body = lines.slice(i).join('\n').trim();
  return { h1, meta, body };
}

function findPlaceholders(text) {
  const m = text.match(PLACEHOLDER_RE) || [];
  return [...new Set(m)];
}

async function findBlogId(handle) {
  const data = await gql(FIND_BLOG, { q: `handle:${handle}` });
  const node = data.blogs.edges.find((e) => e.node.handle === handle)?.node;
  if (!node) {
    throw new Error(
      `Blog not found with handle "${handle}". Confirm it exists in ` +
        'Shopify admin → Online Store → Blog posts → Manage blogs.'
    );
  }
  return node.id;
}

async function findExistingArticle(blogId, handle) {
  const data = await gql(FIND_ARTICLE, { blogId, q: `handle:${handle}` });
  return (
    data.blog.articles.edges.find((e) => e.node.handle === handle)?.node ??
    null
  );
}

function buildArticleInput({ h1, meta, body, blogId }) {
  const html = marked.parse(body);

  const input = {
    blogId,
    title: h1,
    body: html,
    handle: meta['Page handle'],
    summary: meta['Meta description'],
    author: { name: meta['Author byline'] },
    seo: {
      title: meta['SEO title'],
      description: meta['Meta description'],
    },
    isPublished: publishLive,
    metafields: [
      {
        namespace: 'editorial',
        key: 'reviewer',
        type: 'single_line_text_field',
        value: meta['Author byline'],
      },
    ],
  };

  // date metafield only if Last reviewed parses as ISO YYYY-MM-DD
  const lr = meta['Last reviewed'];
  if (lr && /^\d{4}-\d{2}-\d{2}$/.test(lr)) {
    input.metafields.push({
      namespace: 'editorial',
      key: 'last_reviewed',
      type: 'date',
      value: lr,
    });
  }

  return input;
}

async function main() {
  bannerStart('publish-guides');

  if (publishLive) {
    console.log(
      'NOTE: --publish-live set — articles will be PUBLISHED LIVE on\n' +
        '      creation. Make sure you have done a dry-run + a draft-mode\n' +
        '      review pass before running this.\n'
    );
  } else if (!dryRun) {
    console.log(
      'NOTE: --apply without --publish-live — articles will be created\n' +
        '      as DRAFTS (not visible to readers). Review each in Shopify\n' +
        '      admin and publish manually. Pass --publish-live to skip.\n'
    );
  }

  const files = readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .sort();

  let blogId;
  try {
    blogId = await findBlogId(BLOG_HANDLE);
  } catch (err) {
    console.error('\nFAILED to find blog:', err.message);
    process.exit(1);
  }

  let refused = 0;
  let skipped = 0;
  let created = 0;
  let invalid = 0;

  for (const filename of files) {
    const text = readFileSync(join(GUIDES_DIR, filename), 'utf8');

    // safety gate — refuse on ANY unresolved placeholder
    const placeholders = findPlaceholders(text);
    if (placeholders.length > 0) {
      log(`REFUSE: ${filename}`);
      log(
        `  ${placeholders.length} unresolved placeholder${
          placeholders.length > 1 ? 's' : ''
        }:`
      );
      placeholders.slice(0, 6).forEach((p) => log(`    - ${p}`));
      if (placeholders.length > 6) {
        log(`    - … and ${placeholders.length - 6} more`);
      }
      log(`  Fill these in the .md file before publishing.`);
      refused++;
      continue;
    }

    const { h1, meta, body } = parseGuide(text);

    // structural validation
    const missing = [];
    if (!h1) missing.push('H1 (first line starting with "# ")');
    if (!meta['Page handle']) missing.push('Page handle');
    if (!meta['SEO title']) missing.push('SEO title');
    if (!meta['Meta description']) missing.push('Meta description');
    if (!meta['Author byline']) missing.push('Author byline');
    if (!body) missing.push('body content');
    if (missing.length) {
      log(`INVALID: ${filename} — missing: ${missing.join(', ')}`);
      invalid++;
      continue;
    }

    // skip if article already exists
    const existing = await findExistingArticle(blogId, meta['Page handle']);
    if (existing) {
      log(`SKIP (already exists): /blogs/${BLOG_HANDLE}/${existing.handle}`);
      skipped++;
      continue;
    }

    // build + create
    const input = buildArticleInput({ h1, meta, body, blogId });
    log(
      `${publishLive ? 'CREATE (live)' : 'CREATE (draft)'}: /blogs/${BLOG_HANDLE}/${input.handle}`
    );
    log(`  title: ${input.title.slice(0, 80)}${input.title.length > 80 ? '…' : ''}`);
    log(`  seo:   ${input.seo.title}`);
    log(`  body:  ${input.body.length} chars HTML, ${input.metafields.length} metafields`);

    created++;
    if (!dryRun) {
      await gql(ARTICLE_CREATE, { article: input });
    }
  }

  console.log('');
  console.log(`Summary:`);
  console.log(
    `  ${created} ${
      dryRun
        ? 'would be created'
        : publishLive
        ? 'created live'
        : 'created as drafts'
    }`
  );
  console.log(`  ${skipped} already exist (skipped)`);
  console.log(
    `  ${refused} refused (unresolved placeholders — fill the .md file)`
  );
  console.log(
    `  ${invalid} invalid (missing required front-matter fields)`
  );

  bannerEnd();
}

main().catch((err) => {
  console.error('\nFAILED:', err.message);
  process.exit(1);
});
