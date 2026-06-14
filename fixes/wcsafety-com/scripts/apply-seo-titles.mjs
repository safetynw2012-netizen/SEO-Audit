#!/usr/bin/env node
// fixes/wcsafety-com/scripts/apply-seo-titles.mjs
//
// Updates SEO titles (and optionally meta descriptions) on the items called
// out in EXECUTE.md Phase 1A, 1B, 1C, and 1D.
//
// Phase 1A: 3 stubborn rogue-brand titles (products + collection)
// Phase 1B: distinct title for /collections/product-reviews
// Phase 1C: 5 over-length blog article titles
// Phase 1D: rename the 190-char BearKat product handle (commented out by
//           default — uncomment after a final sanity check)
//
// Usage:
//   node apply-seo-titles.mjs            # dry run
//   node apply-seo-titles.mjs --apply    # mutate

import { gql, dryRun, log, bannerStart, bannerEnd } from './lib/shopify.mjs';

// ─────────────────────────────────────────────────────────────────────────────
// The plan
// ─────────────────────────────────────────────────────────────────────────────

const ACTIONS = [
  // ── Phase 1A — rogue-brand SEO titles
  {
    kind: 'collection',
    handle: '3m-6500-series-half-mask-respirators',
    title: '3M 6500 Series Half Mask Respirators | WC Safety',
  },
  {
    kind: 'product',
    handle: '3m-1100-foam-ear-plugs-cordless-nrr-29',
    title: '3M 1100 Foam Ear Plugs (NRR 29, Cordless) | WC Safety',
  },
  {
    kind: 'product',
    handle:
      'brk-first-alert-9120bff-smi100-ac-smoke-detector-hardwired-alarm-with-battery-backup-white-1-pack',
    title: 'BRK First Alert 9120BFF Hardwired Smoke Alarm | WC Safety',
  },

  // ── Phase 1B — product-reviews collection
  {
    kind: 'collection',
    handle: 'product-reviews',
    title: 'Product Reviews — Independent PPE & Safety Tests | WC Safety',
    description:
      'Hands-on, NIOSH/UL/ANSI-grounded product reviews for respirators, cartridges, CO and smoke alarms, and the rest of the PPE category. Zero sponsored listings.',
  },

  // ── Phase 1C — shorten over-length blog article titles
  {
    kind: 'article',
    blog: 'guides',
    handle: '3m-filter-cartridge-guide',
    title: '3M Filter & Cartridge Guide (2026): Charts & Comparisons',
  },
  {
    kind: 'article',
    blog: 'guides',
    handle: 'best-carbon-monoxide-detector-2026',
    title: 'Best Carbon Monoxide Detector 2026: 10 CO Alarms Ranked',
  },
  {
    kind: 'article',
    blog: 'guides',
    handle: 'n95-vs-kn95-vs-p100-which-respirator-do-you-actually-need',
    title: 'N95 vs KN95 vs P100: Which Respirator Do You Need?',
  },
  {
    kind: 'article',
    blog: 'reference',
    handle: 'osha-flammable-cabinet-requirements',
    title: 'OSHA Flammable Cabinet Rules: 1910.106 & NFPA 30',
  },
  {
    kind: 'article',
    blog: 'product-reviews',
    handle: 'cobd10-kidde-10-year-battery-co-alarm-digital-display-review',
    title: 'Kidde COBD10 10-Year Battery CO Alarm Review (4.4/5)',
  },

  // ── Phase 1D — rename the 190-char BearKat handle
  // Uncomment after you've verified the new handle is free and you're OK with
  // Shopify auto-creating a 301 from the old handle.
  // {
  //   kind: 'product-handle',
  //   currentHandle:
  //     'mcr-safety-glasses-bearkat-bkh20-clear-polycarbonate-lenses-uv-light-protective-eyewear-with-scratch-resistant-duramass-technology-bifocal-safety-glasses-2-0-diopter',
  //   newHandle: 'mcr-bearkat-bkh20-bifocal-safety-glasses',
  // },
];

// ─────────────────────────────────────────────────────────────────────────────
// GraphQL
// ─────────────────────────────────────────────────────────────────────────────

const FIND_PRODUCT = /* GraphQL */ `
  query findProduct($h: String!) {
    productByHandle(handle: $h) {
      id
      title
      handle
      seo { title description }
    }
  }
`;

const UPDATE_PRODUCT = /* GraphQL */ `
  mutation updateProduct($input: ProductInput!) {
    productUpdate(input: $input) {
      product { id handle seo { title description } }
      userErrors { field message }
    }
  }
`;

const FIND_COLLECTION = /* GraphQL */ `
  query findCollection($h: String!) {
    collectionByHandle(handle: $h) {
      id
      title
      handle
      seo { title description }
    }
  }
`;

const UPDATE_COLLECTION = /* GraphQL */ `
  mutation updateCollection($input: CollectionInput!) {
    collectionUpdate(input: $input) {
      collection { id handle seo { title description } }
      userErrors { field message }
    }
  }
`;

const FIND_BLOG = /* GraphQL */ `
  query findBlog($q: String!) {
    blogs(first: 5, query: $q) {
      edges { node { id handle title } }
    }
  }
`;

const FIND_ARTICLE_IN_BLOG = /* GraphQL */ `
  query findArticleInBlog($blogId: ID!, $q: String!) {
    blog(id: $blogId) {
      articles(first: 10, query: $q) {
        edges { node { id handle title summary } }
      }
    }
  }
`;

// Articles use article SEO via metafields (namespace:"global", key:"title_tag" /
// "description_tag") on most Shopify themes. We update via articleUpdate.
const UPDATE_ARTICLE = /* GraphQL */ `
  mutation updateArticle($input: ArticleInput!) {
    articleUpdate(article: $input) {
      article { id handle title }
      userErrors { field message }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Workers
// ─────────────────────────────────────────────────────────────────────────────

async function updateProductSeo({ handle, title, description }) {
  const data = await gql(FIND_PRODUCT, { h: handle });
  const p = data.productByHandle;
  if (!p) return log(`MISS (product not found): ${handle}`);

  const current = p.seo?.title || '(empty)';
  log(`UPDATE product /${handle}: "${current}" -> "${title}"`);

  if (!dryRun) {
    await gql(UPDATE_PRODUCT, {
      input: {
        id: p.id,
        seo: {
          title,
          description: description ?? p.seo?.description ?? null,
        },
      },
    });
  }
}

async function updateCollectionSeo({ handle, title, description }) {
  const data = await gql(FIND_COLLECTION, { h: handle });
  const c = data.collectionByHandle;
  if (!c) return log(`MISS (collection not found): ${handle}`);

  const current = c.seo?.title || '(empty)';
  log(`UPDATE collection /${handle}: "${current}" -> "${title}"`);

  if (!dryRun) {
    await gql(UPDATE_COLLECTION, {
      input: {
        id: c.id,
        seo: {
          title,
          description: description ?? c.seo?.description ?? null,
        },
      },
    });
  }
}

async function updateArticleSeo({ blog, handle, title }) {
  // Find the blog by handle
  const blogData = await gql(FIND_BLOG, { q: `handle:${blog}` });
  const blogNode = blogData.blogs.edges.find((e) => e.node.handle === blog)?.node;
  if (!blogNode) return log(`MISS (blog not found): /blogs/${blog}`);

  // Find the article within that blog
  const artData = await gql(FIND_ARTICLE_IN_BLOG, {
    blogId: blogNode.id,
    q: `handle:${handle}`,
  });
  const articleNode = artData.blog.articles.edges
    .map((e) => e.node)
    .find((n) => n.handle === handle);
  if (!articleNode) {
    return log(`MISS (article not found): /blogs/${blog}/${handle}`);
  }

  log(
    `UPDATE article /blogs/${blog}/${handle}: title -> "${title}"\n` +
      `       (SEO title is set via the article's "title" field on default themes;\n` +
      `        if you use a separate seo_title metafield, edit metafields instead.)`
  );

  if (!dryRun) {
    await gql(UPDATE_ARTICLE, {
      input: { id: articleNode.id, title },
    });
  }
}

async function renameProductHandle({ currentHandle, newHandle }) {
  const data = await gql(FIND_PRODUCT, { h: currentHandle });
  const p = data.productByHandle;
  if (!p) return log(`MISS (product not found): ${currentHandle}`);

  log(`RENAME product handle: ${currentHandle} -> ${newHandle}`);
  log('   Shopify auto-creates a 301 from the old handle to the new one.');

  if (!dryRun) {
    await gql(UPDATE_PRODUCT, {
      input: { id: p.id, handle: newHandle },
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  bannerStart('apply-seo-titles');

  for (const action of ACTIONS) {
    try {
      switch (action.kind) {
        case 'product':
          await updateProductSeo(action);
          break;
        case 'collection':
          await updateCollectionSeo(action);
          break;
        case 'article':
          await updateArticleSeo(action);
          break;
        case 'product-handle':
          await renameProductHandle(action);
          break;
        default:
          log(`UNKNOWN action kind: ${action.kind}`);
      }
    } catch (err) {
      console.error(`\nFAILED on ${JSON.stringify(action)}:`);
      console.error(err.message);
      console.error('\nContinuing with the next action…\n');
    }
  }

  bannerEnd();
}

main().catch((err) => {
  console.error('\nFAILED:', err.message);
  process.exit(1);
});
