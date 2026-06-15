#!/usr/bin/env node
// fixes/wcsafety-com/scripts/apply-theme.mjs
//
// Uploads theme snippets to the live ("main" role) Shopify theme via the
// themeFilesUpsert GraphQL mutation. Currently uploads:
//
//   snippets/research-methodology-callout.liquid   (the E-E-A-T callout)
//   snippets/article-jsonld.liquid                  (Article + Review JSON-LD)
//
// This script does NOT edit other theme files (sections/main-article.liquid,
// layout/theme.liquid). You still have to add the {% render %} calls there
// manually — the script prints exact paste instructions when it's done.
//
// Default: DRY RUN.
//   --apply         actually upload the snippets
//   --force         overwrite a snippet that exists in the theme with
//                   different content (default: refuse and warn)
//
// Usage:
//   node apply-theme.mjs
//   node apply-theme.mjs --apply
//   node apply-theme.mjs --apply --force

import { gql, dryRun, log, bannerStart, bannerEnd } from './lib/shopify.mjs';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const THEME_DIR = resolve(__dirname, '..', 'theme');
const force = process.argv.includes('--force');

const UPLOADS = [
  // [local relative path within theme/, asset key in Shopify theme]
  ['snippets/research-methodology-callout.liquid',
   'snippets/research-methodology-callout.liquid'],
  ['snippets/article-jsonld.liquid',
   'snippets/article-jsonld.liquid'],
];

const FIND_MAIN_THEME = /* GraphQL */ `
  query findMainTheme {
    themes(first: 5, roles: [MAIN]) {
      nodes { id name role }
    }
  }
`;

const READ_ASSETS = /* GraphQL */ `
  query readAssets($id: ID!, $filenames: [String!]!) {
    theme(id: $id) {
      files(filenames: $filenames) {
        nodes {
          filename
          body { ... on OnlineStoreThemeFileBodyText { content } }
        }
      }
    }
  }
`;

const UPSERT_FILES = /* GraphQL */ `
  mutation upsertFiles(
    $themeId: ID!,
    $files: [OnlineStoreThemeFilesUpsertFileInput!]!
  ) {
    themeFilesUpsert(themeId: $themeId, files: $files) {
      upsertedThemeFiles { filename }
      userErrors { field message }
    }
  }
`;

async function main() {
  bannerStart('apply-theme');
  if (force) {
    console.log('NOTE: --force set — existing snippets will be OVERWRITTEN.\n');
  }

  // 1. Find the live theme
  const themeData = await gql(FIND_MAIN_THEME);
  const mainTheme = themeData.themes.nodes[0];
  if (!mainTheme) {
    console.error('No MAIN-role theme found. Confirm a published theme exists.');
    process.exit(1);
  }
  console.log(`main theme: ${mainTheme.name} (${mainTheme.id})\n`);

  // 2. Read local files; skip rows whose local file is missing
  const planned = [];
  for (const [localPath, assetKey] of UPLOADS) {
    const full = join(THEME_DIR, localPath);
    if (!existsSync(full)) {
      log(`SKIP (local file missing): ${localPath}`);
      continue;
    }
    const content = readFileSync(full, 'utf8');
    if (!content.trim()) {
      log(`SKIP (local file empty): ${localPath}`);
      continue;
    }
    planned.push({ localPath, assetKey, content });
  }
  if (planned.length === 0) {
    console.log('Nothing to upload.');
    bannerEnd();
    return;
  }

  // 3. Read current asset state in one query
  const filenames = planned.map((p) => p.assetKey);
  const remote = await gql(READ_ASSETS, { id: mainTheme.id, filenames });
  const remoteByName = new Map(
    remote.theme.files.nodes.map((n) => [n.filename, n.body?.content ?? null])
  );

  // 4. Classify each upload
  let uploaded = 0;
  let inSync = 0;
  let conflicts = 0;
  const toUpload = [];

  for (const p of planned) {
    const existing = remoteByName.get(p.assetKey);
    if (existing === undefined || existing === null) {
      log(`UPLOAD (new):    ${p.assetKey}`);
      toUpload.push(p);
      uploaded++;
    } else if (existing === p.content) {
      log(`SKIP (in sync):  ${p.assetKey}`);
      inSync++;
    } else if (force) {
      log(`OVERWRITE:       ${p.assetKey}`);
      toUpload.push(p);
      uploaded++;
    } else {
      log(`CONFLICT:        ${p.assetKey}`);
      log(`  exists in theme with different content — pass --force to overwrite.`);
      conflicts++;
    }
  }

  // 5. Apply if not dry
  if (!dryRun && toUpload.length > 0) {
    await gql(UPSERT_FILES, {
      themeId: mainTheme.id,
      files: toUpload.map((p) => ({
        filename: p.assetKey,
        body: { type: 'TEXT', value: p.content },
      })),
    });
  }

  // 6. Summary
  console.log('');
  console.log(`Summary:`);
  console.log(`  ${uploaded} ${dryRun ? 'would upload' : 'uploaded'}`);
  console.log(`  ${inSync} already in sync (no action)`);
  console.log(`  ${conflicts} conflicts (use --force to overwrite)`);

  // 7. Manual next steps
  if (uploaded > 0 && !dryRun) {
    console.log('\nNEXT STEPS (manual, in Shopify admin):');
    console.log('  1. Online Store → Themes → Edit code → confirm both snippets appear');
    console.log('     under Snippets in the file tree.');
    console.log('');
    console.log('  2. Open sections/main-article.liquid (the section that renders');
    console.log('     {{ article.content }}). Below the article.content line, add:');
    console.log('');
    console.log("       {% render 'research-methodology-callout',");
    console.log('                 reviewer: article.metafields.editorial.reviewer,');
    console.log('                 last_reviewed: article.metafields.editorial.last_reviewed %}');
    console.log('');
    console.log('  3. Open layout/theme.liquid. Inside <head>, before </head>, add:');
    console.log('');
    console.log('       {% if request.page_type == "article" %}');
    console.log("         {% render 'article-jsonld' %}");
    console.log('       {% endif %}');
    console.log('');
    console.log('  4. Add article metafield definitions in Settings → Custom data');
    console.log('     → Articles → Add definition (skip any that already exist):');
    console.log('       editorial.reviewer       — single_line_text_field');
    console.log('       editorial.last_reviewed  — date');
    console.log('       review.rating            — number_decimal     (e.g. 4.2)');
    console.log('       review.product_name      — single_line_text_field');
    console.log('');
    console.log('  5. Preview one published article. Confirm the callout renders');
    console.log('     and View Source shows a valid <script type="application/ld+json">.');
    console.log('     Validate at https://validator.schema.org/ and');
    console.log('     https://search.google.com/test/rich-results.');
  }

  bannerEnd();
}

main().catch((err) => {
  console.error('\nFAILED:', err.message);
  process.exit(1);
});
