# Product-Level SEO Audit — wcsafety.com (Respirator catalog)

- **Site:** https://wcsafety.com/
- **Audit date:** 2026-06-20
- **Revision:** **2 (live-validated)** — supersedes Rev 1. See §0.
- **Auditor:** Claude Code (automated)
- **Scope:** Per-product (catalog) SEO — complements the site-level
  audit in `audits/wcsafety-com-2026-05-15.md`.
- **Data sources:**
  1. Google Merchant Center product feed exported from the owner's
     Google Drive ("Google Merchant Center feed - Test"), 45 SKUs.
  2. **Live wcsafety.com pages as indexed by Google (June 2026)** —
     real current product `<title>` tags, URL handles, and SERP
     snippets, gathered via search-index lookups.

---

## 0. What changed in Revision 2 (read first)

Revision 1 of this audit was built **only** on the exported Merchant
Center feed, which turned out to be **stale** — it described an older
version of the catalog (and pointed at the legacy `safetynw.com`
domain). Several Rev-1 findings recommended fixes that **the live
`wcsafety.com` store has already implemented.** Revision 2 cross-checks
every Rev-1 claim against the live, indexed site and corrects the record.

**Net effect of the correction:**

| Rev-1 finding | Rev-1 severity | Live reality (Rev 2) |
|---------------|----------------|----------------------|
| "Thin titles" (`3M 6200 Respirator`) | P1 | **Obsolete.** Live titles are keyword-rich; the *new* problem is the opposite — several are **too long and truncate** in Google. (§5) |
| "Consolidate size variants into one product" | P1 | **Largely done** for the 3M 6000 series. But it created a **new canonical/cannibalization risk** with leftover single-size pages. (§4) |
| "Empty GTIN on every SKU" | P0 | **Cannot confirm from live HTML; needs Shopify/feed access.** Still the highest-value item *if* still true. (§3) |
| "`brand` = model, not manufacturer" | P0 | **Feed-only; cannot confirm against live store.** Verify in Shopify. (§3) |
| Guide/link-earning content "future work" | — | **Already exists** — multiple published buyer guides. Reframed as an asset to leverage, not a gap. (§7) |

**Honest limits of Rev 2.** The live store sits behind bot protection
(direct page fetches return HTTP 403) and the Shopify Admin API token is
expired, so this revision reads the live site **through Google's index**
(titles, handles, snippets) rather than raw HTML. That is enough to
verify titles, URL structure, page existence, and cannibalization, but
**not** enough to read `gtin`, the `brand` feed field, meta-description
tags, or JSON-LD. Those items (§3, §5.2) are flagged "verify in Shopify"
rather than asserted. The Ahrefs plan on this account exposes only the
free Domain Rating endpoint, so search-volume figures are not included.

---

## 1. Executive summary (Rev 2)

The live catalog is **materially healthier** than the stale feed implied.
Titles, variant consolidation, collection structure, and supporting guide
content are already strong. The remaining, genuinely-open issues are:

| # | Finding | Severity | Confidence |
|---|---------|----------|------------|
| 1 | **Overlong product titles truncating in SERPs** (e.g. 3M 60927, 3M 6200-Medium) — high-intent words pushed past the ~60-char cutoff | **P1** | **High** (seen live in index) |
| 2 | **Canonical / keyword cannibalization** — a consolidated `3m-6000-series-...-6100-6200-6300` page **and** a standalone `3m-6200-half-mask-respirator-medium` page both exist and target overlapping queries | **P1** | **High** (both URLs indexed) |
| 3 | **Comparison content published under `/products/`** (`3m-60921-vs-60923`, `3m-6000-series-...-vs-3m-7500`) — risks thin/duplicate *product* entries and Shopping-feed pollution if they are real product records | **P2** | **Medium** (URL path seen; record type unverified) |
| 4 | **Empty `gtin`** on branded SKUs — kills Shopping / free-listing eligibility | **P0 *if still true*** | **Unverified** — check Shopify Barcode field |
| 5 | **`brand` field holds the model** instead of `3M`/`Honeywell` | **P0 *if still true*** | **Unverified** — check Shopify/feed |
| 6 | **Feed data-entry errors** (sizes, typos, swapped URLs) from Rev 1 §6 | **P2 *if still true*** | **Partly stale** — spot-verify against live |

The single highest-ROI *confirmed* action is **#1 (title length)** — a
fast, on-page win that improves CTR on pages that already rank. **#4/#5**
remain potentially higher-impact but **must be verified in Shopify
first** before spending effort, because the feed that flagged them is
stale.

---

## 2. The catalog under review

45 SKUs across three families (from the feed; live store may carry more):

- **Half-mask reusable respirators:** 3M 6100/6200/6300,
  3M 7501/7502/7503, North 770030 S/M/L, North 550030 S/M/L.
- **Full-face reusable respirators:** 3M 6700/6800/6900,
  3M 7800 S/M/L, North 760008A, North 760008AS, North 54001/54001S.
- **Cartridges & filters:** 3M 6001–6009, 3M 2071/2078/2091/2096/2097/
  2291/2296/2297 particulate filters, 3M 60921–60929 cartridges.

Google product category is correctly set across the feed
(`Business & Industrial > Work Safety Protective Gear > Gas Masks &
Respirators` and the matching accessories taxonomy).

**Live-verified product URLs** (sample confirmed in Google's index):

- `…/products/3m-6000-series-half-mask-respirator-6100-6200-6300`
- `…/products/3m-6200-half-mask-respirator-medium`
- `…/products/3m-7502-half-mask-respirator-medium`
- `…/products/3m-6001-organic-vapor-respirator-cartridge`
- `…/products/3m-6002-acid-gas-respirator-cartridge`
- `…/products/3m-60921-p100-organic-vapor-respirator-cartridge`
- `…/products/3m-60923-p100-acid-gas-organic-vapor-respirator-cartridge`
- `…/products/3m-60926-p100-multi-gas-and-vapor-respirator-cartridge`
- `…/products/3m-60927-p100-mercury-vapor-organic-vapor-acid-gas-respirator-cartridge`
- `…/products/3m-2096-p100-respirator-filter-nuisance-acid-gas`
- `…/products/3m-5n11-n95-pre-filter`
- `…/products/3m-60921-vs-60923` *(comparison — see §6)*
- `…/products/3m-6000-series-half-mask-respirator-vs-3m-7500` *(comparison)*

---

## 3. P0 (UNVERIFIED) — Google Shopping feed fields

> **Status change in Rev 2:** these were asserted as confirmed P0s in
> Rev 1 based on the feed. The feed is stale, and feed fields (`gtin`,
> `brand`) are **not visible in live page HTML**, so they are now
> **"verify before acting."** Do this first; it is a 10-minute check in
> Shopify and decides whether this whole section is still relevant.

### 3.1 Confirm `gtin` (variant Barcode) is populated `priority: verify → P0`

For branded products that carry a manufacturer GTIN/UPC (all 3M and
Honeywell/North respirators do), a valid `gtin` drives Standard Shopping
eligibility, **free** "Shopping/Popular products" organic listings, and
product-grid rich results. **Check:** Shopify → a respirator variant →
**Barcode (ISBN, UPC, GTIN…)** field. If blank, populate from
manufacturer UPCs (printed on 3M/Honeywell packaging); set
`identifier_exists = no` only where a GTIN genuinely doesn't exist.

### 3.2 Confirm `brand` = manufacturer, not model `priority: verify → P0`

Google matches offers using `brand` + `gtin`/`mpn`. **Check** the Google
channel/feed `brand` value: it must be **`3M`** or **`Honeywell`** (North
is now Honeywell), with the model in `mpn`. If the feed already maps
Shopify Vendor → `brand` and Vendor is set correctly, this is a non-issue.

### 3.3 `product_type` should be your own taxonomy `priority: P2`

If `product_type` still mirrors `google_product_category`, replace it
with a site-specific hierarchy (e.g. `Respirators > Half Mask > 3M 6000
Series`). The `recommended_product_type` column in
`fixes/wcsafety-com/products/optimized-titles.csv` provides one per SKU.

---

## 4. P1 (CONFIRMED) — Canonical & cannibalization after variant consolidation

**Rev-1 recommendation (consolidate size variants) is already done for
the flagship line** — `…/products/3m-6000-series-half-mask-respirator-
6100-6200-6300` exists with the title *"3M 6000 Series Respirator | 6100
6200 6300 Half Mask."* Good.

**The new problem:** a **standalone** single-size page also still exists
and is indexed —
`…/products/3m-6200-half-mask-respirator-medium`
(*"3M 6200 Half Mask Respirator (Medium) – Reusable Facepiece for Dust,
Paint & Chemical Protection"*) — alongside `…/3m-7502-half-mask-
respirator-medium`. So for the 6200/Medium query, **two pages on the same
site compete**: the consolidated series page and the standalone page.
That splits link/ranking signals and lets Google pick the "wrong" one.

**Fix — pick one canonical model per query cluster:**

- **If the series page is the canonical product** (recommended; matches
  3M's own structure): 301-redirect the standalone single-size pages
  (`3m-6200-half-mask-respirator-medium`, etc.) into the series page with
  the size as a variant/anchor, **or** add `rel=canonical` from the
  single-size pages to the series page if they must stay live for ad
  landing.
- **If single-size pages are canonical** (e.g. each size is a distinct
  purchasable SKU with its own price/inventory): then the "series" URL
  should be a **collection**, not a `/products/` page, and should
  `rel=canonical` to itself while linking out to each size.
- **Either way:** decide deliberately and make the canonical tags agree
  with the internal links and the sitemap. Right now the duplication is
  implicit, not chosen.

Apply the same check to every family that was consolidated (7500 series,
North 7700/5500, full-face 6000/7800) — verify no orphan single-size
pages remain indexed.

---

## 5. P1 (CONFIRMED) — Title length, not title thinness

Rev 1 said titles were too thin. **Live titles are the opposite —
keyword-rich, and several now exceed Google's ~60-character display
limit and truncate.** Confirmed live examples:

| Live `<title>` (as indexed) | Issue |
|------------------------------|-------|
| `3M 60927 P100 Mercury Vapor Organic Vapor Acid Gas Respirator Cartridg — WC Safety` | **Truncated mid-word** ("Cartridg") — the brand suffix is cut and the page looks broken in SERPs |
| `3M 6200 Half Mask Respirator (Medium) – Reusable Facepiece for Dust, Paint & Chemical Protection` | ~95 chars — everything after "Facepiece" is dropped on desktop; the high-value modifiers never display |
| `3M 6000 Series Respirator \| 6100 6200 6300 Half Mask — WC Safety` | Good length **and** good pattern — use as the template |

### 5.1 Title formula (front-load, ≤ ~60 chars before the brand suffix) `priority: P1`

`<Brand> <Model> <Type/Hazard> <key modifier> | WC Safety`

Put the words buyers type **first**; let the long descriptive tail live in
the **meta description** and on-page H1/body, not the `<title>`. Worked
rewrites for the confirmed offenders:

| Page | Current (truncating) | Recommended `<title>` |
|------|----------------------|------------------------|
| 60927 | `3M 60927 P100 Mercury Vapor Organic Vapor Acid Gas Respirator Cartridg…` | `3M 60927 Mercury/OV/Acid Gas P100 Cartridge \| WC Safety` |
| 6200-Med | `3M 6200 Half Mask Respirator (Medium) – Reusable Facepiece for Dust, Paint & Chemical…` | `3M 6200 Half Mask Respirator, Medium (NIOSH) \| WC Safety` |
| 60923 | `3M 60923 P100 Acid Gas Organic Vapor Respirator Cartridge — WC Safety` | `3M 60923 OV/Acid Gas P100 Cartridge \| WC Safety` |

Audit the full catalog for any `<title>` whose text before " — WC Safety"
exceeds ~60 characters and trim using OV/acid-gas/multi-gas abbreviations
buyers already use.

### 5.2 Meta descriptions `priority: verify → P1`

The descriptive copy that's currently overflowing the `<title>` is
exactly what belongs in the **meta description** (≤ ~155 chars).
Cannot confirm current meta tags from the index; **verify in Shopify**
(product → Search engine listing). The `recommended_meta_description`
column in the CSV gives a per-SKU draft; treat it as a starting point and
reconcile with whatever live copy already exists.

---

## 6. P2 — comparison pages under `/products/`

> **⚠️ UPDATED 2026-06-21 by real GSC data — see
> `wcsafety-com-gsc-query-analysis-2026-06-21.md` §1.** The original
> recommendation below ("move comparison content out of `/products/`")
> is **withdrawn.** Search Console shows these comparison pages rank
> **position 1–3** for high-intent "X vs Y" queries and are the site's
> single best organic asset. **Do NOT 301 them.** Keep them where they
> rank; the *only* action is to **exclude them from the Google Merchant
> Center feed** (no price/`Offer`) and ensure they don't emit `Offer`
> JSON-LD, so they can't cause feed disapprovals. The structural concern
> below stands only as the rationale for that feed-exclusion, not for
> moving the pages. Expand the pattern instead (GSC analysis §1).

Two comparison pages are published on the **product** path:

- `…/products/3m-60921-vs-60923` — *"3M 60921 vs 60923: OV vs OV/Acid
  Gas Compared"*
- `…/products/3m-6000-series-half-mask-respirator-vs-3m-7500` — *"3M 6000
  Series Half Mask Respirator vs 3M 7500"*

This is a legitimate, smart content play (comparison intent is
high-converting). The **risk** is only if these are real Shopify
*product records*:

1. They may be **submitted to the Google Merchant feed** as products with
   no real GTIN/price/inventory → feed disapprovals or thin-offer flags.
2. They may carry `Product` JSON-LD without a valid `Offer` → structured-
   data warnings.
3. They duplicate intent with the actual product and guide pages.

**Action:** confirm whether these are products or pages/blog posts.
- If they must stay as products, ensure they're **excluded from the
  Google channel** (sales-channel/feed exclusion) and don't emit
  `Offer`/price schema.
- Cleaner: move comparison content to `/blogs/guides/` (where the site
  already publishes — see §7) and 301 the `/products/` URLs there, or
  keep them as **Shopify Pages**, not products.

---

## 7. Existing content assets to leverage (not a gap)

Rev 1 listed "build guide content to earn links" as future work. **It
already exists** and is indexed:

- `/blogs/guides/3m-filter-cartridge-guide` — 3M Filter & Cartridge Guide
- `/blogs/guides/best-3m-respirator-cartridges` — Best 3M Cartridges
- `/blogs/guides/3m-organic-vapor-cartridges-which-one-do-you-need`
- `/blogs/guides/best-respirator-cartridge-for-solvents`
- `/blogs/guides/best-respirator-for-manufacturing-workers`

Plus well-titled collections: `…/collections/3m-half-mask-respirators`
(*"3M Half Mask Respirators — 6000, 6500 & 7500 | WC Safety"*),
`…/collections/respirator-filters-and-cartridges`,
`…/collections/3m-respirator-filters-and-cartridges`.

**Leverage it:** make sure every guide **internally links down to the
exact product/collection pages** it discusses (e.g. the cartridge guide →
each 600xx product), and each product links **up** to the relevant guide
("Not sure which cartridge? See our 3M cartridge guide"). This is the
internal-linking win from the site-level audit (§7), and it's nearly free
because the content is already written.

---

## 8. Prioritized remediation roadmap (Rev 2)

### First: a 10-minute verification pass (decides scope)
1. In Shopify, open 3 respirator products and check **Barcode/GTIN**
   (§3.1) and the Google channel **brand** value (§3.2). This confirms or
   kills the two P0s before any work.
2. Confirm whether the `…-vs-…` URLs are products, pages, or posts (§6).
3. Spot-check the Rev-1 §-Appendix data-entry errors against live titles
   (several already appear fixed — e.g. 6200 is correctly "Medium" live).

### This week (confirmed, fast, on-page)
4. Trim overlong `<title>` tags to ≤ ~60 chars, front-loading buyer terms
   (§5.1) — start with 60927 (truncated mid-word) and the 6200-Medium page.
5. Resolve the consolidated-vs-standalone duplication with canonicals /
   301s (§4).
6. Handle the `/products/` comparison pages per §6.

### Weeks 2–3 (conditional on the verification pass)
7. If GTIN/brand are actually broken, remap them (§3) — highest ROI of all
   *if* still true.
8. Write/verify unique meta descriptions per product (§5.2) using the CSV.
9. Wire up guide ↔ product internal links (§7).

### Month 2 (depth)
10. Replace `product_type` with site taxonomy (§3.3, CSV column).
11. Add `Product` + `Offer` + `AggregateRating` JSON-LD with valid
    `gtin`/`mpn`/`brand`; ensure comparison pages don't emit `Offer`.

---

## Appendix A — Status of `fixes/.../optimized-titles.csv` after Rev 2

The CSV was written against the **stale feed titles**. Several live titles
have since moved **past** the CSV's recommendations (the live store is
already richer), so the CSV is now best used selectively:

- **Still useful:** `correct_brand`, `correct_mpn`,
  `recommended_product_type`, and `recommended_meta_description` columns
  (these don't conflict with live titles).
- **Use with care:** `recommended_title` — for pages whose live title is
  already strong, **don't regress them**; apply only where the live title
  is missing modifiers OR is overlong (then prefer the shorter §5.1
  pattern over the CSV's longer one).
- **Reconcile before bulk import:** do not bulk-overwrite live titles with
  the CSV. Diff first.

## Appendix B — Field-level scorecard (feed as exported; ⚠ = stale)

| Field | Feed status | Live note |
|-------|-------------|-----------|
| `title` | thin in feed | **rich live; some overlong (§5)** |
| `description` | duplicated across sizes in feed | consolidation done for 6000 series (§4) |
| `link` | legacy safetynw.com | **live store is wcsafety.com (confirmed)** |
| `gtin` | empty in feed | **unverified live — check Shopify (§3.1)** |
| `brand` | held model in feed | **unverified live — check Shopify (§3.2)** |
| `mpn` | model present | likely fine |
| `google_product_category` | correct | fine |
| `product_type` | duplicated taxonomy | replace per §3.3 |

Legend: status reflects the **exported feed**; "live note" reflects what
the June-2026 search index actually shows.
</content>
</invoke>
