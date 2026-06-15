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
  // [from, to, destinationLive]
  //
  // destinationLive: set to true once the destination guide is published
  // on the live site. Redirects whose destination is NOT live are skipped
  // by default (they would create a 301 → 404). Pass --include-pending to
  // override (use only if you're about to publish the destination minutes
  // later).
  //
  // Phase 3 — comparison-URL consolidation (11 rows from blogs/guides/README.md)
  ['/products/3m-2091-vs-3m-2097',
   '/blogs/guides/3m-2091-vs-2097-filter',                       true],
  ['/collections/3m-2091-vs-3m-2097',
   '/blogs/guides/3m-2091-vs-2097-filter',                       true],
  ['/products/3m-60921-vs-60923',
   '/blogs/guides/3m-60921-vs-60923-cartridge',                  true],   // published 2026-06-14
  ['/collections/3m-60921-vs-60923-vs-60926-respirator-cartridges',
   '/blogs/guides/3m-60921-vs-60923-vs-60926-cartridge',         false],  // draft only
  ['/collections/3m-60921-vs-3m-60926',
   '/blogs/guides/3m-60921-vs-60926-cartridge',                  false],  // draft only
  ['/collections/3m-60923-vs-3m-6001',
   '/blogs/guides/3m-60923-vs-6001-cartridge',                   false],  // draft only
  ['/collections/3m-6001-vs-3m-6003',
   '/blogs/guides/3m-6001-vs-6003-cartridge',                    true],   // published 2026-06-14
  ['/collections/3m-6001-vs-6003',
   '/blogs/guides/3m-6001-vs-6003-cartridge',                    true],   // published 2026-06-14
  ['/collections/3m-6001-vs-3m-6006',
   '/blogs/guides/3m-6001-vs-6006-cartridge',                    false],  // draft only
  ['/products/3m-2097-vs-3m-2297',
   '/blogs/guides/3m-2097-vs-2297-filter',                       false],  // draft only
  ['/products/3m-6000-series-half-mask-respirator-vs-3m-7500',
   '/blogs/guides/3m-6000-vs-7500-half-mask',                    false],  // draft only
  ['/products/n95-vs-p100-respirator',
   '/blogs/guides/n95-vs-kn95-vs-p100-which-respirator-do-you-actually-need',
                                                                 true],

  // Phase 1D — 190-char BearKat slug (uncomment after handle rename in
  // apply-seo-titles.mjs; Shopify usually auto-creates this, so this is a
  // belt-and-braces backup).
  // ['/products/mcr-safety-glasses-bearkat-bkh20-clear-polycarbonate-lenses-uv-light-protective-eyewear-with-scratch-resistant-duramass-technology-bifocal-safety-glasses-2-0-diopter',
  //  '/products/mcr-bearkat-bkh20-bifocal-safety-glasses',         true],

  // Collection rationalization (see fixes/wcsafety-com/collection-rationalization.md).
  // ALL three require operator pre-checks BEFORE uncommenting:
  //   1. SKU count on the source collection (< 3 = strong merge case)
  //   2. GSC clicks on the source URL (> 50/month = keep, don't merge)
  //   3. Brand/series tags added to relevant products so the destination
  //      collection's filters still expose the merged scope as a facet
  // Destinations all exist, so destinationLive: true — but the script
  // won't ship them while commented out.
  //
  // ['/collections/howard-leight-cordless-ear-plugs',
  //  '/collections/hearing-protection',                            true],
  // ['/collections/3m-6500-series-half-mask-respirators',
  //  '/collections/3m-half-mask-respirators',                      true],
  // ['/collections/msa-full-face-mask-respirator',
  //  '/collections/full-face-mask-respirators',                    true],
];

const includePending = process.argv.includes('--include-pending');

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
  if (includePending) {
    console.log(
      'NOTE: --include-pending set — redirects whose destination is not\n' +
      '      yet live WILL be created. They will 301 → 404 until you\n' +
      '      publish the destination guide. Use with care.\n'
    );
  }

  let created = 0;
  let skippedExists = 0;
  let skippedConflict = 0;
  let skippedPending = 0;

  for (const [path, target, destinationLive] of REDIRECTS) {
    if (!destinationLive && !includePending) {
      log(
        `SKIP (destination not yet published): ${path}\n` +
          `       wanted target: ${target}\n` +
          `       publish that guide first, flip destinationLive=true, re-run.`
      );
      skippedPending++;
      continue;
    }

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
  console.log(`  ${skippedPending} pending (destination not yet published — use --include-pending to force)`);

  bannerEnd();
}

main().catch((err) => {
  console.error('\nFAILED:', err.message);
  process.exit(1);
});
