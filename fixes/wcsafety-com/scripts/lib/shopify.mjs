// fixes/wcsafety-com/scripts/lib/shopify.mjs
//
// Shared Shopify Admin GraphQL client + helpers for the apply-*.mjs scripts.
// Reads credentials from environment variables ONLY — never accepts them as
// arguments and never writes them anywhere.
//
// Required env:
//   SHOPIFY_STORE          — e.g. wcsafety.myshopify.com (NOT the custom domain)
//   SHOPIFY_ADMIN_TOKEN    — Admin API access token (shpat_…)
//
// Optional env:
//   SHOPIFY_API_VERSION    — defaults to 2025-01
//
// Default mode is DRY RUN. Pass --apply to actually mutate.

const {
  SHOPIFY_STORE,
  SHOPIFY_ADMIN_TOKEN,
  SHOPIFY_API_VERSION = '2025-01',
} = process.env;

if (!SHOPIFY_STORE || !SHOPIFY_ADMIN_TOKEN) {
  console.error(
    '\nMissing required env. Set both before running:\n' +
      '  export SHOPIFY_STORE=wcsafety.myshopify.com\n' +
      '  export SHOPIFY_ADMIN_TOKEN=shpat_…\n' +
      '\nDo NOT paste the token into any committed file or chat.\n'
  );
  process.exit(2);
}

if (!/^[a-z0-9-]+\.myshopify\.com$/i.test(SHOPIFY_STORE)) {
  console.error(
    `SHOPIFY_STORE looks wrong: "${SHOPIFY_STORE}".\n` +
      'Use the *.myshopify.com hostname, not the custom domain.\n'
  );
  process.exit(2);
}

export const dryRun = !process.argv.includes('--apply');

export function log(...args) {
  console.log(`[${dryRun ? 'DRY' : 'APPLY'}]`, ...args);
}

let calls = 0;
export async function gql(query, variables = {}) {
  calls++;
  const res = await fetch(
    `https://${SHOPIFY_STORE}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  if (res.status === 429) {
    const retry = Number(res.headers.get('Retry-After') || '2');
    log(`429 throttled, sleeping ${retry}s`);
    await sleep(retry * 1000);
    return gql(query, variables);
  }

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status}: ${body}`);
  }

  const data = await res.json();
  if (data.errors) {
    throw new Error('GraphQL errors:\n' + JSON.stringify(data.errors, null, 2));
  }

  const userErrors = Object.values(data.data || {})
    .flatMap((v) => (v && Array.isArray(v.userErrors) ? v.userErrors : []))
    .filter(Boolean);
  if (userErrors.length) {
    throw new Error(
      'Shopify userErrors:\n' + JSON.stringify(userErrors, null, 2)
    );
  }

  return data.data;
}

export function callCount() {
  return calls;
}

export function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export function bannerStart(name) {
  console.log(`\n=== ${name} ===`);
  console.log(`mode: ${dryRun ? 'DRY RUN (no changes)' : 'APPLY (will mutate)'}`);
  console.log(`store: ${SHOPIFY_STORE}`);
  console.log(`api version: ${SHOPIFY_API_VERSION}`);
  console.log('');
}

export function bannerEnd() {
  console.log(`\nGraphQL calls: ${callCount()}`);
  if (dryRun) {
    console.log(
      'No changes were made. Re-run with --apply to execute the plan.\n'
    );
  } else {
    console.log('Changes applied.\n');
  }
}
