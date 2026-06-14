# Comparison guide drafts

Paste-ready drafts for the **8 new comparison guides** required by
`fixes/wcsafety-com/comparison-url-consolidation.md`. Together with the
**redirect list** below they close out the comparison-page-sprawl finding
from the 2026-06-12 deep sweep.

## Safety-content discipline (read this first)

These are life-safety products. Every spec, NIOSH TC approval number, and
chemical-protection claim is **flagged `[VERIFY]`** — the operator MUST
confirm each against the NIOSH Certified Equipment List, OSHA 29 CFR
1910.134, or the current 3M technical data sheet before publishing.
The drafts are conservative (broader use → broader cartridge) and never
invent test data or fit-factor numbers.

## Placeholders you must fill in

| Token | Means |
| --- | --- |
| `[REVIEWER NAME, credential]` | Real named reviewer per the E-E-A-T fix |
| `[DATE]` | Publish date / Last-reviewed date |
| `[VERIFY against NIOSH CEL]` | Cross-check the TC- approval number on the actual unit and the NIOSH CEL database |
| `[AMAZON LINK]` | Amazon Associates link with `rel="sponsored nofollow noopener"` and tag `wcsafety04-20` |
| `[PRODUCT URL]` | Internal link to the product page on `/products/<slug>` |

## Order of operations

1. **View-source the existing `/products/<a>-vs-<b>` and `/collections/<a>-vs-<b>` URLs.** Fold any unique paragraphs/tables into the destination guide draft before shipping. Don't lose prose.
2. **Verify each cartridge's NIOSH TC approval number** against the NIOSH CEL — every `[VERIFY against NIOSH CEL]` token.
3. **Publish each guide** at the canonical URL listed in the table below.
4. **Add the 11 URL redirects** in Shopify (Online Store → Navigation → URL Redirects). Paste-ready table at the bottom.
5. **Confirm `curl -I` on each old URL shows `HTTP/2 301`** — a `302` won't consolidate signals.
6. **Watch GSC → Pages → "Duplicate without user-selected canonical"** drop over 2–4 weeks.

## The 9 guides — at a glance

| # | File | Canonical URL after publish | Status |
| - | ---- | --------------------------- | ------ |
| 1 | `3m-60921-vs-60923-cartridge.md` | `/blogs/guides/3m-60921-vs-60923-cartridge` | ✅ published 2026-06-14 |
| 2 | `3m-60921-vs-60923-vs-60926-cartridge.md` | `/blogs/guides/3m-60921-vs-60923-vs-60926-cartridge` | draft |
| 3 | `3m-60921-vs-60926-cartridge.md` | `/blogs/guides/3m-60921-vs-60926-cartridge` | draft |
| 4 | `3m-60923-vs-6001-cartridge.md` | `/blogs/guides/3m-60923-vs-6001-cartridge` | draft |
| 5 | `3m-6001-vs-6003-cartridge.md` | `/blogs/guides/3m-6001-vs-6003-cartridge` | ✅ published 2026-06-14 |
| 6 | `3m-6001-vs-6006-cartridge.md` | `/blogs/guides/3m-6001-vs-6006-cartridge` | draft |
| 7 | `3m-2097-vs-2297-filter.md` | `/blogs/guides/3m-2097-vs-2297-filter` | draft |
| 8 | `3m-6000-vs-7500-half-mask.md` | `/blogs/guides/3m-6000-vs-7500-half-mask` | draft |
| 9 | `3m-6000-vs-6500-half-mask.md` | `/blogs/guides/3m-6000-vs-6500-half-mask` | draft (added 2026-06-14) |

*(The earlier count of 7 was a miscount; corrected to 8 with the
publication of the 6000 vs 7500 family, and now extended to 9 to round out
the half-mask family with 6000 vs 6500. Together with the operator's
already-live `/blogs/guides/3m-6500-vs-7500-respirator`, the three pairs in
the 6000/6500/7500 half-mask family are now all covered.)*

## Paste-ready URL redirect list (11 redirects)

In Shopify admin → **Online Store → Navigation → URL Redirects → Add URL
redirect**. Paste these one row at a time:

| Redirect from | Redirect to |
| --- | --- |
| `/products/3m-2091-vs-3m-2097` | `/blogs/guides/3m-2091-vs-2097-filter` |
| `/collections/3m-2091-vs-3m-2097` | `/blogs/guides/3m-2091-vs-2097-filter` |
| `/products/3m-60921-vs-60923` | `/blogs/guides/3m-60921-vs-60923-cartridge` |
| `/collections/3m-60921-vs-60923-vs-60926-respirator-cartridges` | `/blogs/guides/3m-60921-vs-60923-vs-60926-cartridge` |
| `/collections/3m-60921-vs-3m-60926` | `/blogs/guides/3m-60921-vs-60926-cartridge` |
| `/collections/3m-60923-vs-3m-6001` | `/blogs/guides/3m-60923-vs-6001-cartridge` |
| `/collections/3m-6001-vs-3m-6003` | `/blogs/guides/3m-6001-vs-6003-cartridge` |
| `/collections/3m-6001-vs-6003` | `/blogs/guides/3m-6001-vs-6003-cartridge` |
| `/collections/3m-6001-vs-3m-6006` | `/blogs/guides/3m-6001-vs-6006-cartridge` |
| `/products/3m-2097-vs-3m-2297` | `/blogs/guides/3m-2097-vs-2297-filter` |
| `/products/3m-6000-series-half-mask-respirator-vs-3m-7500` | `/blogs/guides/3m-6000-vs-7500-half-mask` |
| `/products/n95-vs-p100-respirator` | `/blogs/guides/n95-vs-kn95-vs-p100-which-respirator-do-you-actually-need` |

*(12 rows — one for the existing N95 vs P100 hub that already exists.)*

## What this delivers

| Lever | Effect |
| --- | --- |
| Each comparison topic at one URL | Internal cannibalization eliminated |
| 8 substantial guides with primary-source citations | Content depth + E-E-A-T uplift |
| Named-reviewer placeholder on every guide | Closes the pseudonymous-author gap if reviewer is real |
| Methodology callout on every guide | Mirrors the E-E-A-T methodology rewrite |
| Affiliate-link slot per product (rel sponsored nofollow noopener) | FTC-aligned per-page placement |

**Expected score impact** (post-publish + re-crawl, 2–4 weeks):
- Crawlability **75 (C) → ~83 (B)**
- Content & E-E-A-T **80 → ~83**
- Overall **78 (C+) → ~82 (B−)**, potential **~85 (B)** with on-page polish
