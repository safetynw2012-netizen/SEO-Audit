#!/usr/bin/env node
// fixes/wcsafety-com/scripts/apply-redirects.mjs
//
// Adds the 12 URL redirects from EXECUTE.md Phase 3 to Shopify URL Redirects.
// Idempotent: skips any redirect whose source path already exists.
//
// Usage:
//   node apply-redirects.mjs            # dry run (lists what would change)
//   node apply-redirects.mjs --apply    # actually create the redirects

import { gql, dryRun, log, bannerStart, bannerEnd } from './lib/shopify.mjs';

const REDIRECTS = [
  // Phase 3 — comparison-URL consolidation (11 rows from blogs/guides/README.md)
  ['/products/3m-2091-vs-3m-2097',
   '/blogs/guides/3m-2091-vs-2097-filter'],
  ['/collections/3m-2091-vs-3m-2097',
   '/blogs/guides/3m-2091-vs-2097-filter'],
  ['/products/3m-60921-vs-60923',
   '/blogs/guides/3m-60921-vs-60923-cartridge'],
  ['/collections/3m-60921-vs-60923-vs-60926-respirator-cartridges',
   '/blogs/guides/3m-60921-vs-60923-vs-60926-cartridge'],
  ['/collections/3m-60921-vs-3m-60926',
   '/blogs/guides/3m-60921-vs-60926-cartridge'],
  ['/collections/3m-60923-vs-3m-6001',
   '/blogs/guides/3m-60923-vs-6001-cartridge'],
  ['/collections/3m-6001-vs-3m-6003',
   '/blogs/guides/3m-6001-vs-6003-cartridge'],
  ['/collections/3m-6001-vs-6003',
   '/blogs/guides/3m-6001-vs-6003-cartridge'],
  ['/collections/3m-6001-vs-3m-6006',
   '/blogs/guides/3m-6001-vs-6006-cartridge'],
  ['/products/3m-2097-vs-3m-2297',
   '/blogs/guides/3m-2097-vs-2297-filter'],
  ['/products/3m-6000-series-half-mask-respirator-vs-3m-7500',
   '/blogs/guides/3m-6000-vs-7500-half-mask'],
  ['/products/n95-vs-p100-respirator',
   '/blogs/guides/n95-vs-kn95-vs-p100-which-respirator-do-you-actually-need'],

  // Phase 1D — 190-char BearKat slug (uncomment after handle rename in
  // apply-seo-titles.mjs; Shopify usually auto-creates this, so this is a
  // belt-and-braces backup).
  // ['/products/mcr-safety-glasses-bearkat-bkh20-clear-polycarbonate-lenses-uv-light-protective-eyewear-with-scratch-resistant-duramass-technology-bifocal-safety-glasses-2-0-diopter',
  //  '/products/mcr-bearkat-bkh20-bifocal-safety-glasses'],
];

const FIND_BY_PATH = /* GraphQL */ `
  query findUrlRedirectByPath($q: String!) {
    urlRedirects(first: 5, query: $q) {
      edges { node { id path target } }
    }
  }
`;

const CREATE_REDIRECT = /* GraphQL */ `
  mutation createUrlRedirect($urlRedirect: UrlRedirectInput!) {
    urlRedirectCreate(urlRedirect: $urlRedirect) {
      urlRedirect { id path target }
      userErrors { field message }
    }
  }
`;

async function findExisting(path) {
  const data = await gql(FIND_BY_PATH, { q: `path:${path}` });
  return data.urlRedirects.edges.find((e) => e.node.path === path)?.node ?? null;
}

async function main() {
  bannerStart('apply-redirects');

  let created = 0;
  let skippedExists = 0;
  let skippedConflict = 0;

  for (const [path, target] of REDIRECTS) {
    const existing = await findExisting(path);

    if (existing) {
      if (existing.target === target) {
        log(`SKIP (already exists, target matches): ${path}`);
        skippedExists++;
      } else {
        log(
          `SKIP (already exists, target DIFFERS):  ${path}\n` +
            `       existing target: ${existing.target}\n` +
            `       wanted target:   ${target}\n` +
            `       not changing — delete manually in Shopify admin if you want to overwrite.`
        );
        skippedConflict++;
      }
      continue;
    }

    log(`CREATE: ${path} -> ${target}`);
    created++;
    if (!dryRun) {
      await gql(CREATE_REDIRECT, { urlRedirect: { path, target } });
    }
  }

  console.log('');
  console.log(`Summary:`);
  console.log(`  ${created} ${dryRun ? 'would be created' : 'created'}`);
  console.log(`  ${skippedExists} already exist (target matches, no action)`);
  console.log(`  ${skippedConflict} already exist with DIFFERENT target (skipped — review manually)`);

  bannerEnd();
}

main().catch((err) => {
  console.error('\nFAILED:', err.message);
  process.exit(1);
});
