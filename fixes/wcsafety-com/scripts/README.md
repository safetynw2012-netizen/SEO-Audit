# scripts/ — automate the EXECUTE.md admin clicks

Run the most click-heavy parts of `EXECUTE.md` against your Shopify store's
Admin GraphQL API instead of clicking through admin. **Your Shopify token
never enters this repo, never enters this chat, and never enters any
committed file.** The scripts read it from your shell environment.

## ⚠ Security ground rules

1. **Never paste your `shpat_…` token into chat, a commit message, a file,
   or a Slack/Notion/email.** If it ends up in any of those places, treat
   it as compromised and rotate immediately.
2. **Store the token only in your password manager and your local shell
   env**, ideally via a `.env` file that's git-ignored (or `direnv`).
3. **Rotate the token after every "I think it might have leaked" event.**
   Rotating is free; recovering from misuse isn't.
4. **Audit Shopify admin → Settings → Apps → API access logs** after each
   apply run to confirm the only API calls are yours.

## What's in here

| File | What it does |
| ---- | ------------ |
| `lib/shopify.mjs` | Auth + GraphQL helper. Reads env vars, throws on missing. Includes `dryRun` flag (default true) and call counter. |
| `apply-redirects.mjs` | Creates the 12 comparison-URL redirects from EXECUTE.md Phase 3, plus the 3 commented-out collection merges from `collection-rationalization.md`. Idempotent. Gated on `destinationLive` per row. |
| `apply-seo-titles.mjs` | Updates SEO titles + meta descriptions on products, collections, and blog articles per EXECUTE.md Phase 1A/1B/1C. Includes a commented-out Phase 1D BearKat handle rename. |
| `publish-guides.mjs` | Auto-publishes comparison-guide drafts from `../blogs/guides/*.md`. **Three-level safety gating** — dry-run / create-as-draft / publish-live. Hard refuses to publish any draft with unresolved `[VERIFY]`-style placeholders. Requires `npm install` (for `marked`). |
| `package.json` | Pins the `marked` dependency used by `publish-guides.mjs`. Zero other deps. |

## What's NOT here (yet)

- `apply-theme.mjs` — uploading the methodology callout snippet via the
  Asset API. Doable but theme edits are higher-risk; recommended to do in
  admin so you can preview before saving.

## Prereqs

- **Node.js 20 or newer** (uses built-in `fetch`).
- A **Shopify custom app** with Admin API access.
- The custom app needs these scopes:
  - `read_content`, `write_content` (URL redirects, blog articles)
  - `read_products`, `write_products` (product SEO + handle)
  - `read_publications`, `read_online_store_pages` (helpful for diagnostics)

If your custom app doesn't have those scopes, the script will fail with a
clear GraphQL error — add the scope in the app's API access settings and
reinstall.

## Setup

```sh
# 1. Clone or pull this repo to your local machine
git pull

# 2. Add the token to your shell env. Do NOT commit this.
export SHOPIFY_STORE=wcsafety.myshopify.com         # the *.myshopify.com hostname
export SHOPIFY_ADMIN_TOKEN=shpat_…                   # from Shopify admin → Apps → custom app

# Tip: put both into a local `.env` file and source it. Add `.env` to
# .gitignore so it can never be committed:
#
#   echo '.env' >> ~/.gitignore_global
#   echo 'export SHOPIFY_STORE=…'         >  ~/.shopify.env
#   echo 'export SHOPIFY_ADMIN_TOKEN=…'   >> ~/.shopify.env
#   chmod 600 ~/.shopify.env
#   source ~/.shopify.env
```

## Run

Always run **dry run first**. It makes zero changes — just lists what it
would do.

```sh
cd fixes/wcsafety-com/scripts/

# (one-time, for publish-guides.mjs only)
npm install

# 1. Dry-run the redirects
node apply-redirects.mjs

# 2. If the output looks right, apply
node apply-redirects.mjs --apply

# 3. Dry-run the SEO title updates
node apply-seo-titles.mjs

# 4. Apply
node apply-seo-titles.mjs --apply

# 5. Dry-run the guide-publish pass
node publish-guides.mjs

# 6. Create the eligible guides as DRAFTS (operator reviews + publishes
#    each manually in Shopify admin)
node publish-guides.mjs --apply

# 7. After review: publish-live in one pass (skip the manual click-through)
node publish-guides.mjs --apply --publish-live
```

Each script prints `[DRY] …` or `[APPLY] …` on every action, then a
summary, then the total GraphQL call count.

### publish-guides.mjs — safety gates explained

`publish-guides.mjs` reads every `.md` file in `../blogs/guides/`, parses
the front-matter, validates the body, and either creates the article via
the Shopify Admin GraphQL API or refuses with a reason.

| Outcome | Means |
| ------- | ----- |
| `CREATE (draft)` | Eligible to publish. Will be created as an unpublished draft on `--apply`. |
| `CREATE (live)` | Eligible. Will be created and published live on `--apply --publish-live`. |
| `REFUSE` | Has unresolved placeholders. Fill the `[VERIFY ...]`, `[REVIEWER NAME ...]`, `[DATE]`, `[AMAZON LINK ...]`, `[PRODUCT URL ...]` etc. in the `.md` file. |
| `INVALID` | Missing required front-matter (`Page handle`, `SEO title`, `Meta description`, `Author byline`) or body content. |
| `SKIP (already exists)` | Article already published at that handle — idempotent, no action. |

**The hard refusal on placeholders is intentional and not configurable** —
for safety content, automating the publication of unverified NIOSH TC
numbers would be worse than not automating at all.

Before running, add the two article metafield definitions in Shopify
admin (Settings → Custom data → Articles → Add definition):

| Namespace | Key | Type |
| --------- | --- | ---- |
| `editorial` | `reviewer` | Single line text |
| `editorial` | `last_reviewed` | Date |

If those don't exist the article still creates, but the metafield writes
will fail and the methodology-callout Liquid snippet will fall back to
its defaults ("WC Safety Editorial Team" + `article.published_at`).

## After running

1. **Verify in Shopify admin:**
   - Online Store → Navigation → URL Redirects → confirm 12 new rows.
   - Open one of the items from `apply-seo-titles.mjs` and check Search
     engine listing preview shows the new title.
2. **`curl -I` each redirect** to confirm `HTTP/2 301` (not 302) and the
   `location:` header points at the expected target.
3. **Request indexing** in Search Console for each changed URL — speeds
   up SERP refresh from weeks to hours.

## Rolling back

- Redirects: Shopify admin → Navigation → URL Redirects → delete the row.
- SEO titles: re-run `apply-seo-titles.mjs` with the old title strings, or
  clear the field in admin so the theme default takes over.
- Product handle (Phase 1D, if uncommented): change the handle back in
  admin → Shopify will auto-create another 301.

## If something fails

- `Missing required env` → set `SHOPIFY_STORE` and `SHOPIFY_ADMIN_TOKEN`.
- `HTTP 401` → token is invalid or expired; rotate and retry.
- `HTTP 403` → app doesn't have the right scope; add it and reinstall.
- `Shopify userErrors: handle has already been taken` → on the BearKat
  rename: another product already uses the new handle. Choose a different
  one.
- `429 throttled` → script auto-retries after the `Retry-After` header.
  If it loops, you've hit the per-app bucket; wait a minute and rerun.
