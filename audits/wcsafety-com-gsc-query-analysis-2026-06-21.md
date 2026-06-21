# GSC Query Analysis — wcsafety.com (real Search Console data)

- **Site:** https://wcsafety.com/
- **Date:** 2026-06-21
- **Source:** Google Search Console "top queries" export provided by the
  site owner (clicks / impressions / avg position). This is **real
  first-party performance data** — the strongest signal in this repo —
  and it both confirms and *corrects* findings in
  `wcsafety-com-products-2026-06-20.md`.

---

## 0. Headline takeaways

1. **Comparison pages (`/products/X-vs-Y`) are the site's #1 organic
   asset, not a liability.** They rank **position 1–3** for dozens of
   high-intent "X vs Y" queries. → **Reverses §6 of the product audit.**
2. **Product pages under-rank their own model numbers** (e.g. `3m 60921`
   = pos **39.9**) while the comparison pages rank pos 2–3 for the same
   cluster. The cannibalization risk flagged in the product audit §4 is
   **real and visible in the data** — but the "winner" is the comparison
   page, so the fix is to strengthen product pages, not kill comparisons.
3. **A title/snippet template bug** is leaking the literal string
   **`() reviews`** into dozens of indexed queries — a broken empty
   review-count placeholder. Concrete, fixable, and embarrassing in SERPs.
4. **Commercial head/category terms are stranded on page 4–8** with big
   impressions and **zero clicks** (`respirator cartridges` 146 impr @
   pos 58.6; `3m respirator` 134 @ 56; `full face respirator` 122 @ 61).
   Collection-page optimization is the opportunity.
5. **The `p95 vs p100` cluster sits on page 2** (`p95 vs p100` 229 impr @
   pos 11.7; `p100 vs p95` 118 @ 14.7) — a near-term page-1 win.
6. **Large off-topic content footprint** (smoke detectors, hard hats,
   CO detectors, fire extinguishers) pulls huge impressions at **0
   clicks** — e.g. `best smoke detector under $50` = **1,574 impressions,
   0 clicks, pos 8.1**. Relevance/CTR/brand-fit problem to triage.
7. **Latent international (Spanish/Portuguese) demand** —
   `respirador 3m 6200`, `diferencia entre filtro 2091 y 2097`,
   `mascara 3m 6200`, etc.

---

## 1. Comparison pages are winning — protect and expand them

Comparison queries map to `/products/*-vs-*` pages and rank extremely
well:

| Query | Clicks | Impr | Avg pos |
|-------|-------:|-----:|--------:|
| 3m 60921 vs 60923 | 10 | 175 | 2.8 |
| 60923 vs 60921 | 7 | 35 | 1.5 |
| 3m 2091 vs 2097 | 6 | 254 | 8.6 |
| 3m 6500 vs 7500 respirator | 6 | 30 | 1.6 |
| 3m 6500 vs 7500 | 5 | 100 | 4.6 |
| 3m 6000 vs 7500 | 5 | 35 | 3.1 |
| 60923 vs 60926 | 4 | 70 | 3.9 |
| 3m 2097 vs 2297 | 4 | 31 | 2.6 |
| 3m 6001 vs 6003 | 3 | 33 | 1.3 |
| 3m 6001 vs 60923 | 2 | 21 | 2.8 |

There is also a long tail of **0-click comparison impressions** that are
close to page 1 and worth a nudge:
`3m 60921 vs 60923 vs 60926` (pos 3.4), `3m 60921 vs 60926` (pos 2.4),
`3m 6000 vs 6500` (pos 2.8), `3m 6800 vs 6900` (pos 13.5),
`3m 6200 vs 7502` (pos 6.8), `2097 vs 2297` (pos 1.1).

**Corrected recommendation (supersedes product-audit §6):**
- **Keep the comparison content where it ranks.** Do **not** 301 it out
  of `/products/`. The earlier worry was structural; the data shows it
  converts intent at position 1–3.
- **De-risk only the feed/schema side:** if these are Shopify *product*
  records, **exclude them from the Google Merchant Center feed** (no
  price/Offer → avoid disapprovals) and ensure they don't emit `Offer`
  JSON-LD. That removes the technical risk without touching rankings.
- **Expand the pattern** to comparison gaps already showing demand:
  `3m 6800 vs 6900`, `3m 6000 vs 7000` (pos 7.7), `3m 7502 vs 6200`,
  `n95 vs p95 vs r95`, and the whole `p95 vs p100` family (§4).
- **Internally link** each comparison page to the two product pages it
  compares (and vice-versa) to pass authority down to the under-ranking
  product pages (§2).

---

## 2. Product pages under-rank their own model numbers (cannibalization confirmed)

Branded model queries — the easiest things this site should own — are
ranking poorly, while the comparison pages rank for the adjacent cluster:

| Query | Impr | Avg pos | Note |
|-------|-----:|--------:|------|
| 3m 60921 | 52 | **39.9** | dedicated product page exists; pos 39 is far too low |
| 60921 | 53 | 12.6 | bare model better than "3m 60921" → inconsistent targeting |
| 3m 60923 | 91 | 18.7 | |
| 60923 | 55 | 9.4 | |
| 3m 6001 | 47 | 16.0 | |
| 6001 | 42 | 1.1 | bare model ranks #1 but "3m 6001" pos 16 |
| 3m 2097 | 103 | 23.3 | 103 impressions stuck on page 3 |
| 3m 60926 | 18 | 32.8 | |
| 770030l | 81 | 30.9 | Honeywell North product |

The split between "6001" (pos 1.1) and "3m 6001" (pos 16) signals the
product page isn't clearly optimized for the **"3M + model"** phrasing
buyers actually use. Combined with the comparison pages ranking pos 2–3
for the same models, signals are scattered across multiple URLs.

**Recommendation:**
- On each product page, make the **`<title>` and H1 lead with `3M <model>
  <type>`** (e.g. `3M 60921 Organic Vapor/P100 Cartridge`) so the
  "3m + model" phrase is unambiguous. (Ties into product-audit §5.)
- Resolve the consolidated-vs-single-size and product-vs-comparison
  signal split with canonicals + internal links (product-audit §4).
- Point the well-ranking comparison pages' internal links at the product
  pages to lift them off page 3–4.

---

## 3. Technical bug — `() reviews` leaking into titles/snippets

Dozens of indexed queries contain the literal **`() reviews`**, e.g.:

- `3m 2091 p100 particulate filter () reviews` (clicks=1, pos 7.3)
- `3m 6200 () reviews` (pos 7.7), `3m 7502 () reviews` (pos 6.9)
- `3m 6001 organic vapor cartridge () reviews` (pos 7.9)
- `respirador 3m 6200 () reviews`, `mascara 3m 6200 () reviews`
- `moldex pura-fit () reviews`, `3m secure click hf-802sd () reviews`

The empty parentheses are an **unpopulated review-count placeholder** —
a template rendering `{{ product.title }} ({{ review_count }}) reviews`
where `review_count` is blank. It's appearing in indexed
title/meta/structured-data text. Note these still rank **pos 5–10**, so
fixing the string should *improve* CTR on already-visible pages.

**Recommendation:**
- Find the theme/snippet (likely a reviews app block or a meta-title
  template) emitting `() reviews` and **suppress the parentheses when the
  count is 0/empty** (`{% if review_count > 0 %}({{review_count}}) reviews{% endif %}`).
- Audit `Product` JSON-LD `aggregateRating` — do **not** emit
  `reviewCount: 0` or empty ratings (Google flags invalid AggregateRating).
- Re-request indexing on a few affected URLs after the fix.

---

## 4. Quick win — the `p95 vs p100` cluster is one push from page 1

High-impression, page-2 cluster the site already has content for:

| Query | Impr | Avg pos |
|-------|-----:|--------:|
| p95 vs p100 | 229 | 11.7 |
| p100 vs p95 | 118 | 14.7 |
| p95 vs p100 respirator | 108 | 10.6 |
| 2091 vs 2097 filter | 101 | 12.9 |
| p100 vs p95 respirator | 64 | 19.2 |
| difference between p95 and p100 | 27 | 8.0 |
| p95 vs p100 filter | 35 | 9.9 |
| n95 vs p95 | 16 | 13.7 |

Pages exist (`/products/difference-between-p95-and-p100-respirator`,
`/products/n95-vs-p100-respirator`). They're on page 2 with strong
impressions → highest-ROI ranking work after the `() reviews` fix.

**Recommendation:** consolidate the P-rating explainer into one
authoritative page (avoid the same multi-URL split as §2), expand it to
cover n95/p95/r95/p100 + the 2091-vs-2097 angle, add a comparison table
and FAQ schema, and internally link from every filter product page
("Not sure P95 vs P100? Read our guide").

---

## 5. Commercial head terms stranded on page 4–8 (collection-page work)

Big impressions, **zero clicks**, deep positions — these are category/
collection intents the store should own:

| Query | Impr | Avg pos |
|-------|-----:|--------:|
| respirator cartridges | 146 | 58.6 |
| 3m respirator | 134 | 56.0 |
| respirator filters | 133 | 60.7 |
| full face respirator | 122 | 61.1 |
| honeywell full face respirator 5400 series | 121 | 51.8 |
| disposable respirators | 116 | 65.9 |
| 3m 2097 | 103 | 23.3 |
| 3m full face respirator | 75 | 64.8 |
| half mask respirators | 65 | 70.7 |
| north respirator cartridges | 86 | 52.1 |
| 3m respirator cartridges | 30 | 49.1 |

These should map to **collection** pages (which already have good titles
per the product audit §7). Position 50–70 with 100+ impressions means
Google sees relevance but not authority/depth.

**Recommendation:** add real merchandising copy + internal links + FAQ to
the matching collections (`/collections/respirator-filters-and-cartridges`,
`/collections/full-face-mask-respirators`, etc.), and link to them from
the guide content and comparison pages. This is a Domain-Rating-limited,
long-game item (DR ≈ 1.4 per the product audit) but the impressions prove
the demand is already being shown.

---

## 6. Off-topic footprint — triage for relevance/CTR/brand fit

A large share of impressions comes from categories far from the core
respirator catalog, almost all at **0 clicks**:

| Query | Impr | Avg pos |
|-------|-----:|--------:|
| best smoke detector under $50 | **1,574** | 8.1 |
| fire extinguishers | 295 | 67.4 |
| best smoke detector under $1000 | 201 | 10.8 |
| corded ear plugs | 166 | 42.2 |
| best smoke detector under $150 | 141 | 11.4 |
| best smoke detector 2026 | 109 | 9.4 |
| class g hard hat | 111 | 48.3 |
| best safety goggles 2026 | 81 | 9.4 |

`best smoke detector under $50` alone is the **single biggest impression
generator in the entire dataset (1,574)** yet earns **0 clicks** at
position 8. Either the content doesn't match buyer intent, the SERP is
dominated by review giants, or these are pages for products the store
doesn't really sell.

**Recommendation (decision needed from owner):**
- If these are intentional buyer-guide plays to earn traffic/links:
  fix CTR — titles/meta are likely generic or hit by the `() reviews`
  bug; and ensure each guide links to products you actually sell.
- If they're low-value programmatic/AI-generated sprawl: consider
  **pruning or noindexing** to concentrate crawl budget and topical
  authority on the respirator/PPE core (especially important at DR 1.4).
- Either way, **measure**: 1,574 impressions at 0 clicks is either the
  biggest CTR opportunity on the site or a relevance mirage. Pull the
  landing page and decide.

---

## 7. Latent international demand (Spanish / Portuguese)

Recurring non-English queries with impressions:
`respirador 3m 6200 () reviews`, `diferencia entre filtro 2091 y 2097`
(pos 4.3), `mascara 3m 6200 () reviews`, `respirador semifacial 3m 7502`,
`3m 2097 filtro para partículas p100`, `3m respirador semifacial 6200`.

**Recommendation:** low priority but real — if the store can ship to LATAM
markets, Spanish product/comparison content (or Shopify Markets +
translations + `hreflang`) would capture demand that's already appearing.
Fix the `() reviews` bug here too (it's polluting the Spanish queries).

---

## 8. Prioritized actions (from this data)

| # | Action | Effort | Why (data) |
|---|--------|--------|-----------|
| 1 | Fix the `() reviews` template + AggregateRating (§3) | Low | Pollutes dozens of indexed pages ranking pos 5–10 |
| 2 | **Don't** redirect comparison pages; exclude them from Merchant feed only (§1) | Low | They rank pos 1–3 — top organic asset |
| 3 | Push `p95 vs p100` cluster to page 1 (§4) | Low–Med | 229+118 impr on page 2 |
| 4 | Strengthen product pages for "3M <model>" + internal links from comparison pages (§2) | Med | Product pages stuck pos 16–40 for own SKUs |
| 5 | Triage the smoke-detector / off-topic footprint (§6) | Med (decision) | 1,574-impr / 0-click outlier |
| 6 | Collection-page depth for head terms (§5) | Med (long game) | 100+ impr at pos 50–70 |
| 7 | Spanish/`hreflang` if shipping LATAM (§7) | Med | recurring ES/PT queries |

Note: items 1–4 are largely **on-page/template** fixes independent of the
site's low Domain Rating (≈1.4); items 5–6 are the slower
authority-dependent plays.
</content>
