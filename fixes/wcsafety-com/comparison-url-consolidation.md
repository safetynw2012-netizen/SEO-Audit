# Comparison-URL Consolidation Plan

Companion to `audits/wcsafety-com-scorecard-2026-05-24.md` §2.1.
Closes out the comparison-page-sprawl finding from the 2026-06-12 deep
sweep: same comparison topic indexed at up to **three** URL paths
(`/products/<a>-vs-<b>`, `/collections/<a>-vs-<b>`, `/blogs/guides/<a>-vs-<b>`).
Pattern repeats across the cartridge lineup. Net effect: severe internal
keyword cannibalization plus 3× crawl waste per topic.

## The rule going forward

> **Every comparison topic gets exactly one canonical URL, under
> `/blogs/guides/`.** All other variants 301-redirect to it.

### Why `/blogs/guides/` and not `/products/` or `/collections/`

- **Long-form commercial-intent comparison content is structurally what a
  *guide* is for.** A comparison piece has narrative, primary sources,
  citations, methodology — that maps to a blog post, not a product or
  collection.
- **Blog posts carry native author/date/methodology UI** in Shopify themes
  (byline, "last reviewed," Article schema) — directly supports E-E-A-T.
- **Collections are for product groupings**, not content. Using a
  `/collections/` URL as a CMS page is Shopify type misuse and weakens
  topical signals.
- **Products are for sellable SKUs.** A comparison page is not a SKU.
- **The pattern is already partly established** — several comparison topics
  already live at `/blogs/guides/<a>-vs-<b>` (e.g. `/blogs/guides/3m-2091-vs-2097-filter`,
  `/blogs/guides/3m-60923-vs-60926-cartridge`, `/blogs/guides/3m-6001-vs-3m-60921`).
  This consolidation extends the working pattern, doesn't invent one.

### Naming convention to standardize on

```
/blogs/guides/<brand>-<modelA>-vs-<modelB>-<category>
```

- Drop the brand prefix on the second model when it's the same brand:
  `3m-60921-vs-60923-cartridge`, not `3m-60921-vs-3m-60923-cartridge`.
- Always include a category suffix (`-cartridge`, `-filter`, `-half-mask`,
  `-respirator`) — disambiguates and helps long-tail.
- Lowercase, kebab-case, no model-number variation (use the manufacturer's
  exact part number).

---

## The checklist (16 actions, grouped by topic)

Status legend: ✅ *keep as canonical* · 🔀 *301 to canonical* · 🆕 *create canonical guide if it doesn't exist*

### 1. 3M 2091 vs 2097 (P100 vs P100 + nuisance OV)

| URL | Action |
| --- | --- |
| `/blogs/guides/3m-2091-vs-2097-filter` | ✅ keep — already canonical |
| `/products/3m-2091-vs-3m-2097` | 🔀 301 → `/blogs/guides/3m-2091-vs-2097-filter` |
| `/collections/3m-2091-vs-3m-2097` | 🔀 301 → `/blogs/guides/3m-2091-vs-2097-filter` |

### 2. 3M 60921 vs 60923 (OV/P100 vs OV+AG/P100)

| URL | Action |
| --- | --- |
| `/blogs/guides/3m-60921-vs-60923-cartridge` | 🆕 create as canonical (fold in the content from the /products/ and /collections/ variants) |
| `/products/3m-60921-vs-60923` | 🔀 301 → `/blogs/guides/3m-60921-vs-60923-cartridge` |

### 3. 3M 60921 vs 60923 vs 60926 (3-way OV / OV+AG / Multi-Gas)

| URL | Action |
| --- | --- |
| `/blogs/guides/3m-60921-vs-60923-vs-60926-cartridge` | 🆕 create as canonical |
| `/collections/3m-60921-vs-60923-vs-60926-respirator-cartridges` | 🔀 301 → the new guide |

### 4. 3M 60923 vs 60926 (OV+AG vs Multi-Gas)

| URL | Action |
| --- | --- |
| `/blogs/guides/3m-60923-vs-60926-cartridge` | ✅ keep — already canonical |

*(No `/products/` or `/collections/` variant surfaced for this exact topic. Watch for one being created later.)*

### 5. 3M 60921 vs 60926

| URL | Action |
| --- | --- |
| `/blogs/guides/3m-60921-vs-60926-cartridge` | 🆕 create as canonical |
| `/collections/3m-60921-vs-3m-60926` | 🔀 301 → the new guide |

### 6. 3M 60923 vs 6001 (cross-series)

| URL | Action |
| --- | --- |
| `/blogs/guides/3m-60923-vs-6001-cartridge` | 🆕 create as canonical |
| `/collections/3m-60923-vs-3m-6001` | 🔀 301 → the new guide |

*Optional alternative:* if cross-series comparisons feel out of scope, 301 the `/collections/` URL to the broader `/blogs/guides/best-3m-respirator-cartridges` hub instead.

### 7. 3M 6001 vs 60921

| URL | Action |
| --- | --- |
| `/blogs/guides/3m-6001-vs-3m-60921` | ✅ keep — already canonical |

*Optional renaming for naming-convention consistency:* `/blogs/guides/3m-6001-vs-60921-cartridge` with a 301 from the old slug.

### 8. 3M 6001 vs 6003

| URL | Action |
| --- | --- |
| `/blogs/guides/3m-6001-vs-6003-cartridge` | 🆕 create as canonical |
| `/collections/3m-6001-vs-3m-6003` | 🔀 301 → the new guide |
| `/collections/3m-6001-vs-6003` *(duplicate slug seen)* | 🔀 301 → the new guide |

### 9. 3M 6001 vs 6006

| URL | Action |
| --- | --- |
| `/blogs/guides/3m-6001-vs-6006-cartridge` | 🆕 create as canonical |
| `/collections/3m-6001-vs-3m-6006` | 🔀 301 → the new guide |

### 10. 3M 2097 vs 2297

| URL | Action |
| --- | --- |
| `/blogs/guides/3m-2097-vs-2297-filter` | 🆕 create as canonical |
| `/products/3m-2097-vs-3m-2297` | 🔀 301 → the new guide |

### 11. 3M 6000-series vs 7500 (half-mask families)

| URL | Action |
| --- | --- |
| `/blogs/guides/3m-6000-vs-7500-half-mask` | 🆕 create as canonical |
| `/products/3m-6000-series-half-mask-respirator-vs-3m-7500` | 🔀 301 → the new guide |

### 12. N95 vs P100 (respirator class — conceptual comparison)

| URL | Action |
| --- | --- |
| `/blogs/guides/n95-vs-kn95-vs-p100-which-respirator-do-you-actually-need` | ✅ keep — already canonical (broader 3-way hub) |
| `/products/n95-vs-p100-respirator` | 🔀 301 → the canonical hub |

### 13. Organic Vapor vs P100 (cartridge class — conceptual comparison)

| URL | Action |
| --- | --- |
| `/blogs/guides/organic-vapor-vs-p100` | ✅ keep — already canonical |

*(No `/products/` or `/collections/` variant surfaced. Clean.)*

---

## How to implement each 301 in Shopify

**Shopify admin → Online Store → Navigation → URL Redirects → Add URL
redirect.** Enter:

- **Redirect from:** the path *only* (e.g. `/products/3m-2091-vs-3m-2097`), not the full URL.
- **Redirect to:** the canonical path (e.g. `/blogs/guides/3m-2091-vs-2097-filter`).

Shopify serves these as `301 Moved Permanently` — which consolidates link
equity and SERP signals to the destination. Confirm with `curl -I` on the
old URL — the response should be `HTTP/2 301` with the `location:` header
pointing at the new path. (A `302` would not consolidate signals and would
indicate something is wrong; if you see 302, contact Shopify support.)

## Before implementing — two view-source checks

1. **Are the `/collections/<a>-vs-<b>` URLs hosting actual filtered product
   grids?** Open `/collections/3m-2091-vs-3m-2097` in a browser. If you see
   a product grid with the relevant cartridges and an actual collection
   page (legitimate Shopify use), 301-ing it loses the product-listing
   value — instead, fold those products into a "Compared products" section
   inside the destination guide before redirecting. If you only see text
   content with no product grid (Shopify type misuse), straight 301 is
   correct.

2. **Are the `/products/<a>-vs-<b>` URLs actual sellable SKUs?** If they
   have a price, inventory, "Add to cart" — they're products and need
   different handling (consider whether they should exist at all; if not,
   archive the product before 301-ing the URL). If they're CMS-style
   pages misusing the `product` type, straight 301 is correct.

## Content merge — don't lose the prose

For every URL marked 🔀, **read the body content first** and fold any
unique paragraphs, specs, or comparison tables into the destination guide
before publishing the redirect. The point of consolidation is to compound
the best content into one strong page, not to throw work away.

## Expected score impact

Closing out this sprawl is the single biggest remaining crawl lever:

- **Crawlability:** **75 (C) → ~83 (B)** once Google re-crawls and drops
  the redirected URLs from the index (~2–4 weeks after the redirects
  ship). Confirm by watching the "Duplicate without user-selected
  canonical" count in GSC.
- **Overall:** **78 (C+) → ~81 (B−)** at realized; potential **~85 (B)**
  with the remaining on-page polish (190-char BearKat slug, over-length
  titles, the persistent rogue-brand titles on the 3 specific URLs).

## Tracking checklist

| # | Topic | Canonical exists? | Variants to 301 | Done |
| - | ----- | :---------------: | :-------------: | :--: |
| 1 | 3M 2091 vs 2097 | ✓ | 2 | ☐ |
| 2 | 3M 60921 vs 60923 | needs create | 1 | ☐ |
| 3 | 3M 60921 vs 60923 vs 60926 | needs create | 1 | ☐ |
| 4 | 3M 60923 vs 60926 | ✓ | 0 | ☐ |
| 5 | 3M 60921 vs 60926 | needs create | 1 | ☐ |
| 6 | 3M 60923 vs 6001 | needs create | 1 | ☐ |
| 7 | 3M 6001 vs 60921 | ✓ | 0 (optional rename) | ☐ |
| 8 | 3M 6001 vs 6003 | needs create | 2 | ☐ |
| 9 | 3M 6001 vs 6006 | needs create | 1 | ☐ |
| 10 | 3M 2097 vs 2297 | needs create | 1 | ☐ |
| 11 | 3M 6000 vs 7500 | needs create | 1 | ☐ |
| 12 | N95 vs P100 | ✓ (broader hub) | 1 | ☐ |
| 13 | Organic Vapor vs P100 | ✓ | 0 | ☐ |

**Totals:** 7 new guides to create · 11 redirects to ship · 0 net content
loss (everything folds into the canonical version).
