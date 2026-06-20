# Product-Level SEO Audit — wcsafety.com (Respirator catalog)

- **Site:** https://wcsafety.com/
- **Audit date:** 2026-06-20
- **Auditor:** Claude Code (automated)
- **Scope:** Per-product (catalog) SEO — complements the site-level
  audit in `audits/wcsafety-com-2026-05-15.md`.
- **Primary data source:** Google Merchant Center product feed exported
  from the owner's Google Drive ("Google Merchant Center feed - Test"),
  covering **45 SKUs** in the Respirators + Respirator-Accessories lines
  (3M and North/Honeywell brands).

---

## 0. Data-source & methodology caveats (read first)

This audit is grounded in a **real product feed**, not guesswork — but
two limitations must be stated up front:

1. **Feed is stale and points at a different domain.** The exported feed
   uses `link` URLs on `https://www.safetynw.com/product/<id>/<slug>`
   (the owner's older site), not the current Shopify store at
   `wcsafety.com`. The product *data* (titles, descriptions, prices,
   images, GTIN/MPN/brand fields, categories) is the catalog under
   review; the *URLs* are historical. Where this audit recommends a
   change, apply it to the live Shopify product records.
2. **Live catalog could not be read directly.** The Shopify Admin API
   connection's token is expired (needs re-authorization), the Ahrefs
   API plan only exposes the free Domain Rating endpoint, and the
   sandbox network policy blocks direct requests to `wcsafety.com`. So
   this audit could not diff the feed against the *current* live product
   records. Re-authorize Shopify to let a follow-up pass confirm which
   of these SKUs are still live and read their current Shopify SEO
   fields (`<title>`, meta description, handle).

Despite the caveats, every finding below is a concrete, fixable
data-quality or on-page issue visible in the actual catalog data, and
the recommended rewrites apply regardless of which domain hosts them.

**Context metric:** wcsafety.com Domain Rating = **1.4** (Ahrefs, free
endpoint, 2026-06-20) — effectively no link authority yet. The
practical implication for product SEO: you will **not** out-rank
Walmart/3M/Staples/Grainger on head terms like "3M 6200 respirator" in
the near term. The winnable strategy is (a) long-tail, intent-rich
product titles and descriptions, (b) Google Shopping / free listings
eligibility (which depends on feed quality, not Domain Rating), and
(c) bundling products into guide content that earns links. This audit
targets (a) and (b) directly.

---

## 1. Executive summary

The respirator catalog has **good NIOSH-grade source descriptions** but
five systemic SEO defects that suppress both organic and Shopping
visibility. In priority order:

| # | Finding | Severity | SKUs affected |
|---|---------|----------|---------------|
| 1 | **`gtin` is empty on every SKU** — kills Google Shopping / free-listing eligibility for products that *have* manufacturer GTINs | **P0** | 45 / 45 |
| 2 | **`brand` field holds the model number** (e.g. brand = "3M 6100"), not the manufacturer — breaks Shopping brand matching | **P0** | 45 / 45 |
| 3 | **Duplicate descriptions & images across size variants** — classic duplicate-content + thin-page trap; these should be variants of one product, not separate SKUs | **P1** | ~30 / 45 |
| 4 | **Thin, keyword-poor titles** ("3M 6200 Respirator" vs. competitors' "3M 6200 Half Facepiece Reusable Respirator, Medium, NIOSH") | **P1** | 45 / 45 |
| 5 | **Data-entry errors** — wrong sizes in titles, a typo SKU in a description, and swapped product URLs | **P2** | 5 SKUs (listed in §6) |

Fixing #1 and #2 is mostly a feed/field remap and can be done in an
afternoon; it is the single highest-ROI action because it unlocks paid
*and* free Shopping listings, which do not depend on the site's
(currently near-zero) Domain Rating.

---

## 2. The catalog under review

45 SKUs across three product families:

- **Half-mask reusable respirators (12):** 3M 6100/6200/6300,
  3M 7501/7502/7503, North 770030 S/M/L, North 550030 S/M/L.
- **Full-face reusable respirators (10):** 3M 6700/6800/6900,
  3M 7800 S/M/L, North 760008A, North 760008AS, North 54001,
  North 54001S.
- **Cartridges & filters (23):** 3M 6001–6009 series, 3M 2071/2078/
  2091/2096/2097/2291/2296/2297 particulate filters, 3M 60921–60929
  cartridge series.

Google product category is correctly set for all
(`Business & Industrial > Work Safety Protective Gear > Gas Masks &
Respirators` and `... > Gas Mask & Respirator Accessories`).

---

## 3. P0 — Google Shopping feed defects

### 3.1 Empty GTIN on every product `priority: P0`

Every row's `gtin` column is blank. For branded products that carry a
manufacturer GTIN/UPC (all 3M and Honeywell/North respirators do),
Google strongly favors — and for some categories effectively requires —
a valid `gtin` for:

- Standard Shopping ads eligibility and competitive ranking,
- **Free** "Shopping / Popular products" organic listings,
- Product-grid rich results in regular Search.

Without GTINs, these products compete with one hand tied behind their
back against every other retailer selling the identical 3M SKU.

**Fix:** populate the manufacturer UPC/EAN for each SKU. These are
printed on 3M/Honeywell packaging and available in their distributor
data sheets. In Shopify this is the variant **Barcode (ISBN, UPC, GTIN,
etc.)** field, which Shopify maps to `g:gtin` in the Google channel
feed. Examples to source and verify: 3M 6200 (07025/AAD), 3M 6001,
3M 2091, etc. If a genuine GTIN truly does not exist for an item, set
`identifier_exists = no` rather than leaving it blank.

### 3.2 `brand` field contains the model, not the manufacturer `priority: P0`

Every row sets `brand` to the model number (e.g. `brand = "3M 6100"`,
`brand = "North 770030S"`). The correct value is the manufacturer:
**`3M`** or **`Honeywell`** (North is now Honeywell). The model belongs
in `mpn` (which is currently *also* set to the model — that part is
fine).

Why it matters: Google uses `brand` + `gtin`/`mpn` to match your offer
to its product catalog. A malformed brand prevents that match, again
hurting Shopping eligibility and the "other sellers" merchant grouping.

**Fix:**
| Field | Current (wrong) | Correct |
|-------|-----------------|---------|
| `brand` | `3M 6100` | `3M` |
| `brand` | `North 770030S` | `Honeywell` |
| `mpn` | `3M 6100` | `6100` (or full `6100`) |

### 3.3 `product_type` duplicates `google_product_category` `priority: P2`

Both columns hold the same Google taxonomy string. `product_type` is
meant for **your own** merchandising taxonomy and is a ranking input
for Shopping. Use a site-specific hierarchy, e.g.
`Respirators > Half Mask > 3M 6000 Series` or
`Respirator Filters & Cartridges > Organic Vapor`. This also feeds
cleaner collection structure on-site.

---

## 4. P1 — Duplicate content across size variants

### 4.1 Identical descriptions on sibling SKUs `priority: P1`

These groups ship **verbatim-identical** descriptions (and in several
cases the identical image), differing only by size:

| Group | SKUs | Shared description | Shared image |
|-------|------|--------------------|--------------|
| 3M 6000 half-mask | 6100, 6200, 6300 | yes (word-for-word) | **yes** — all use `23.jpg` |
| 3M 7500 half-mask | 7501, 7502, 7503 | yes | **yes** — all use `119.jpg` |
| North 7700 half-mask | 770030 S/M/L | yes | yes — all use `201.jpg` |
| North 5500 half-mask | 550030 S/M/L | yes | yes — all use `206.jpg` |
| 3M 6000 full-face | 6700, 6800, 6900 | yes | **yes** — all use `83.jpg` |
| 3M 7800 full-face | 7800 S/M/L | yes | yes — all use `76.jpg` |
| North 76xxx full-face | 760008A, 760008AS | yes | yes — all use `199.jpg` |
| North 54001 full-face | 54001, 54001S | yes | yes — all use `198.jpg` |

**Two problems:**
1. **Duplicate content** — search engines see ~8 sets of near-identical
   thin pages and pick at most one to rank, wasting crawl budget and
   diluting signals (the exact "thin product page" risk flagged in
   §3.3 of the site-level audit).
2. **Wrong product model** — size is a *variant axis*, not a separate
   product. 3M 6100/6200/6300 are S/M/L of one mask.

**Recommended fix (preferred):** consolidate each group into **one
Shopify product with a Size option** (Small/Medium/Large). This:
- collapses 3 thin pages into 1 strong page that concentrates links,
  reviews, and ranking signals;
- gives a clean canonical URL (e.g.
  `/products/3m-6000-half-mask-respirator`);
- matches how 3M and major retailers structure these listings.

301-redirect the old single-size product URLs to the consolidated
product. If, for operational/feed reasons, the SKUs must stay separate,
then at minimum **rewrite each description uniquely** (size-specific
fit notes, e.g. "Size Small fits most users with a narrower face
profile") and **use a size-specific image**.

### 4.2 Cartridge/filter descriptions are strong — keep, lightly enrich `priority: P3`

The 6001–6009 and 60921–60929 cartridge descriptions are genuinely
useful (application lists, PEL multiples, NIOSH context) and largely
unique per SKU. Light enrichment only: add a one-line "Compatible with"
list (which respirators each cartridge fits — e.g. "Fits 3M 6000, 7500,
6500, FF-400 series") because *that* phrasing matches real buyer search
queries ("filters for 3M 6200").

---

## 5. P1 — Title optimization

### 5.1 Current titles are too thin to rank or convert `priority: P1`

Feed titles follow `<Brand+Model> Respirator` (e.g. "3M 6200
Respirator"). Compare the live competitor titles for the identical SKU:

> "3M 6200 Half Facepiece Reusable Respirator, Medium, Gray, NIOSH Mask"
> — Walmart
> "3M Half Facepiece Reusable Respirator 6200, Medium, Gray" — Staples

The competitor pattern packs the high-intent modifiers buyers actually
type: **half facepiece / half mask, reusable, size, NIOSH**. Yours omit
all of them.

**Recommended title formula (≤ ~65 chars where possible):**
`<Brand> <Model> <Type> Respirator – <Size> | NIOSH`

Worked rewrites (full list of all 45 in
`fixes/wcsafety-com/products/optimized-titles.csv`):

| SKU | Current title | Recommended title |
|-----|---------------|-------------------|
| 3M 6100 | 3M 6100 Respirator | 3M 6100 Half Facepiece Reusable Respirator – Small (NIOSH) |
| 3M 6200 | 3M 6200 Respirator | 3M 6200 Half Facepiece Reusable Respirator – Medium (NIOSH) |
| 3M 6300 | 3M 6300 Respirator | 3M 6300 Half Facepiece Reusable Respirator – Large (NIOSH) |
| 3M 6700 | 3M 6700 Full Face Respirator Small | 3M 6700 Full Facepiece Reusable Respirator – Small (NIOSH) |
| 3M 2091 | 3M 2091 P100 Respirator Filter | 3M 2091 P100 Particulate Filter (Pair) – Fits 6000/7500 Series |
| 3M 6001 | 3M 6001 Cartridge Organic Vapor Respirator Filter | 3M 6001 Organic Vapor Cartridge – Fits 6000/7500/FF-400 |
| North 770030M | North 770030M Respirator Medium | Honeywell North 770030 Half Mask Respirator – Medium |

If the size-consolidation in §4.1 is done, the size moves to the variant
and the product title becomes e.g. `3M 6000 Series Half Facepiece
Reusable Respirator (S/M/L) – NIOSH`.

### 5.2 Set Shopify SEO title + meta description per product `priority: P1`

In Shopify, the product **page title** and the **search-engine listing
meta description** are separate fields from the product name. Populate
both for every SKU. Meta-description template (≤ ~155 chars):

> "Buy the [Brand Model] [type] respirator ([size], NIOSH-approved).
> Protects against [hazard]. Fits [compatible cartridges/filters].
> In stock, fast shipping."

---

## 6. P2 — Data-entry errors to correct immediately

These are factual errors in the catalog data that damage trust and can
mis-sell a safety-critical product:

1. **North 550030S** and **North 550030M** are both **titled
   "...Respirator Large"** despite being the Small and Medium SKUs.
   Correct to "Small" and "Medium". (Safety sizing errors are a
   liability issue, not just SEO.)
2. **3M 6200 description** contains the typo **"3M 62300"** ("The 3M
   62300 Half Facepiece…"). Correct to "6200".
3. **3M 7800-M** product link points to a slug ending
   `...3m-7800s-l-full-facee-respirator-large` (wrong size + "facee"
   typo); **3M 7800-L** link points to `...3m-7800s-m-...-medium`.
   The Medium and Large URLs are **swapped** and misspelled. Fix the
   handles and 301-redirect.
4. **3M 7800-S description** references "3M 7800S-S" while the title is
   "7800-S" — standardize the model string.
5. Several North full-face titles use a non-breaking space / stray
   character between model and "Respirator" (e.g. "760008A␠Full Face").
   Normalize whitespace so titles render and match cleanly.

---

## 7. Prioritized remediation roadmap

### This week (P0 — unlocks Shopping, no authority needed)
1. Remap `brand` → manufacturer (`3M` / `Honeywell`) on all 45 SKUs.
2. Populate `gtin` (variant Barcode) from manufacturer UPCs; set
   `identifier_exists=no` only where none exists.
3. Fix the §6 data-entry errors (sizes, typos, swapped URLs).

### Weeks 2–3 (P1 — organic visibility)
4. Consolidate size-variant SKUs into single products with a Size
   option; 301 the old URLs (§4.1).
5. Roll out the new title formula across the catalog using
   `fixes/.../optimized-titles.csv`.
6. Write unique Shopify SEO title + meta description per product (§5.2).

### Month 2 (P2/P3 — depth & differentiation)
7. Replace `product_type` with a site-specific taxonomy (§3.3).
8. Add "Compatible with…" cross-reference lines to every cartridge/
   filter (§4.2) and cross-link cartridges ↔ the masks they fit
   (internal-linking win from the site-level audit §7).
9. Add `Product` + `Offer` + `AggregateRating` JSON-LD with `gtin`/
   `mpn`/`brand` populated, so structured data matches the feed.

---

## Appendix A — Field-level scorecard (feed as exported)

| Field | Status | Note |
|-------|--------|------|
| `id` | ✅ | model-based, unique |
| `title` | ⚠️ | thin; missing type/size/NIOSH keywords |
| `description` | ⚠️ | strong source text but duplicated across sizes |
| `link` | ❌ | points to legacy safetynw.com, not wcsafety.com |
| `condition` | ✅ | "new" |
| `price` | ✅ | present, numeric |
| `availability` | ✅ | "In stock" |
| `image_link` | ⚠️ | duplicated across size siblings |
| `gtin` | ❌ | empty on all 45 |
| `mpn` | ✅ | model number present |
| `brand` | ❌ | holds model, not manufacturer |
| `google_product_category` | ✅ | correct taxonomy |
| `product_type` | ⚠️ | duplicates google_product_category |

Legend: ✅ good · ⚠️ needs improvement · ❌ broken/blocking.
