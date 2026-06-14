# Collection Rationalization Plan (non-comparison)

Companion to `audits/wcsafety-com-scorecard-2026-05-24.md` §2.1 and
`fixes/wcsafety-com/comparison-url-consolidation.md`. Closes out the
remaining structural crawl issue: **overlapping non-comparison collections
that cannibalize each other and waste crawl budget.**

The comparison-URL sprawl (`/products/<a>-vs-<b>` / `/collections/<a>-vs-<b>` /
`/blogs/guides/<a>-vs-<b>`) is handled in `comparison-url-consolidation.md`.
This plan is about the **other** collection-sprawl pattern: near-duplicate
category collections.

---

## The rule going forward

> **A collection should exist if and only if it has a distinct intent AND
> enough SKUs to fill the page (≥ ~3) AND a unique target query.** If two
> collections compete for the same query, merge to the better-positioned
> one and 301 the loser. If a collection has < 3 SKUs and isn't winning a
> specific brand/series query, it's a filter on a parent collection — not
> a collection of its own.

### The IA hierarchy that's emerged

Looking across the indexed footprint, the collections sit at four levels:

| Level | Example | Verdict |
| ----- | ------- | ------- |
| 1. Umbrella (PPE class) | `/collections/respiratory-protection` | Keep |
| 2. Product type | `/collections/half-mask-respirators`, `/collections/full-face-mask-respirators` | Keep |
| 3. Brand × type | `/collections/3m-half-mask-respirators`, `/collections/honeywell-north-respirator-cartridges` | Keep if ≥ 3 SKUs |
| 4. Series × brand × type | `/collections/3m-6500-series-half-mask-respirators` | **Usually merge to level 3** |

Single-product-line collections at level 4 are almost always
over-segmented — they should be filters or tags on the level-3 collection,
not separate URLs.

---

## Per-family decisions

Status legend: ✅ *keep as canonical* · 📝 *keep URL, rename title* · 🔀 *merge & 301 to parent* · 🚫 *noindex (already in EXECUTE.md)*

### Family 1 — Hearing protection

| URL | Action | Reason |
| --- | ------ | ------ |
| `/collections/hearing-protection` | ✅ keep | Broad canonical, captures "hearing protection" head term. |
| `/collections/corded-ear-plugs` | ✅ keep | Distinct product type (corded vs. cordless vs. muffs), useful long-tail. |
| `/collections/3m-ear-muffs` | ✅ keep | Legitimate brand × type if ≥ 3 SKUs. |
| `/collections/howard-leight-cordless-ear-plugs` | 🔀 merge → `/collections/hearing-protection` | Single product line, over-segmented. The product URLs (`/products/howard-leight-…`) stay; just kill the collection. |

### Family 2 — Respirator filters & cartridges

The naming is near-duplicate across levels (parent says "Filters and
Cartridges," child says "Cartridges and Filters"). Tighten this.

| URL | Action | Reason |
| --- | ------ | ------ |
| `/collections/respirator-filters-and-cartridges` | ✅ keep | Broad canonical. |
| `/collections/3m-respirator-cartridges-and-filters` | 📝 keep URL, **rename title** to `3M Bayonet Cartridges & Filters \| WC Safety` (and also fix the persistent rogue-brand SEO title per `on-page-polish.md` §1) | Distinct intent (3M bayonet ecosystem) but the current title near-duplicates the parent. |
| `/collections/honeywell-north-respirator-cartridges` | ✅ keep | Legitimate brand × type if ≥ 3 SKUs. |

### Family 3 — Masks & respirators

The biggest tangle. There's a 4-level deep hierarchy here and at least one URL is over-segmented.

| URL | Action | Reason |
| --- | ------ | ------ |
| `/collections/respiratory-protection` | ✅ keep | Umbrella. |
| `/collections/half-mask-respirators` | ✅ keep | Type. |
| `/collections/full-face-mask-respirators` | ✅ keep | Type. |
| `/collections/3m-disposable-respirators` | ✅ keep | Different product *type* (disposable vs. reusable), not just brand. Legitimate. |
| `/collections/3m-half-mask-respirators` | ✅ keep | Brand × type, well-positioned ("3M Half Mask Respirators — 6000, 6500 & 7500 \| WC Safety"). |
| `/collections/3m-6500-series-half-mask-respirators` | 🔀 merge → `/collections/3m-half-mask-respirators` | Series-level is over-segmented. Make "6500 series" a filter/tag on the parent. *Pre-check:* if this URL has > 5 distinct SKUs, keep it (5+ SKUs justifies a sub-collection); if ≤ 3, definitely merge. |
| `/collections/msa-full-face-mask-respirator` | 🔀 merge → `/collections/full-face-mask-respirators` | Singular noun in URL = single SKU collection. Almost certainly < 3 SKUs. *Pre-check:* if it really only has 1–2 MSA full-face SKUs, redirect to the parent and let the brand show up there. |

### Family 4 — Master / All (already in EXECUTE.md)

| URL | Action |
| --- | ------ |
| `/collections/master-collection` | 🚫 `noindex` (already in EXECUTE.md Phase 0 verification — confirm it's deindexed in GSC) |
| `/collections/all` | 🚫 `noindex` (same) |

### Family 5 — Tools / Wrenches (no action)

| URL | Verdict |
| --- | ------- |
| `/collections/tools` | ✅ keep |
| `/collections/wrenches` | ✅ keep — legitimate sub-type if the catalog has non-wrench tools (sockets, drivers, etc.). If it's all wrenches today, merge into `/collections/tools` and consider whether tools should even be a category for a PPE-focused site. |

### Family 6 — Standalone categories (no action)

These have no near-duplicates and are well-positioned. Keep as is:
`/collections/safety-goggles`, `/collections/head-protection`,
`/collections/face-shields`, `/collections/fire-extinguishers`,
`/collections/emergency-shelters`, `/collections/generators`,
`/collections/latex-gloves`, `/collections/product-reviews` (set distinct
title per `on-page-polish.md` §2).

---

## View-source pre-checks (5 min before any merge)

For each 🔀 merge candidate, open the collection in a browser and count the
products. Use this rule:

| SKU count | Verdict |
| --------: | ------- |
| 0–2 | Merge — definitely over-segmented. |
| 3–5 | Borderline. Keep only if the collection is targeting a specific search query no other collection covers (use Google Search Console → Performance → filter by page). |
| 6+ | Keep — enough inventory and likely earning traffic on its own. |

**Specifically check before merging:**
- `/collections/howard-leight-cordless-ear-plugs` — SKU count?
- `/collections/3m-6500-series-half-mask-respirators` — SKU count? (If you stock 5+ SKUs of the 6500 series specifically, keep.)
- `/collections/msa-full-face-mask-respirator` — SKU count?

If a merge candidate is earning > 50 clicks/month per GSC, **keep it
regardless of SKU count** — the URL has earned its keep through real search
traffic and 301-ing it loses that.

---

## Paste-ready Shopify URL Redirects (3 rows, all gated on pre-checks)

Add in Shopify admin → Online Store → Navigation → URL Redirects, **only
after** the pre-checks above confirm SKU counts and GSC traffic don't
disqualify the merge:

| Redirect from | Redirect to |
| --- | --- |
| `/collections/howard-leight-cordless-ear-plugs` | `/collections/hearing-protection` |
| `/collections/3m-6500-series-half-mask-respirators` | `/collections/3m-half-mask-respirators` |
| `/collections/msa-full-face-mask-respirator` | `/collections/full-face-mask-respirators` |

**Important:** unlike the comparison-URL consolidation, *every destination
here already exists* — these are immediately safe to ship if the pre-checks
pass. No `destinationLive: false` gating needed.

Before deleting/redirecting any of these collections, also **add the
relevant brand or series filter** on the destination collection so users
still have a way to drill into the merged scope (e.g. on `/collections/hearing-protection`,
add a "Howard Leight" brand filter).

---

## Tagging strategy to replace deleted sub-collections

After merging, the way users (and Google) drill into the merged scope is via
**product tags + collection filters**. Add these tags to the relevant
products *before* deleting the source collections:

| Product line | Tag to add |
| ------------ | ---------- |
| Howard Leight products | `brand:howard-leight` |
| 3M 6500 Series masks | `series:3m-6500` and `brand:3m` |
| MSA full-face respirators | `brand:msa` |

Then the parent collection's storefront filter UI exposes these as facets —
users can still navigate to "Howard Leight" without there being a dedicated
collection URL. This is the same pattern Amazon and major retailers use.

---

## What this plan does NOT touch (intentionally)

- **The comparison-URL sprawl** — handled in `comparison-url-consolidation.md`.
- **The persistent rogue-brand SEO titles** — handled in `on-page-polish.md` §1.
- **`/collections/all` and `/collections/master-collection`** — already noindexed per EXECUTE.md Phase 0.
- **`/collections/product-reviews`** — keep, but set a distinct title per `on-page-polish.md` §2.

---

## Expected score impact

Modest but meaningful — this is the *last* of the structural crawl issues:

| Lever | Effect |
| ----- | ------ |
| 3 collection merges (Howard Leight, 3M 6500 series, MSA full-face) | -3 thin/duplicate collections from the index |
| 1 collection rename (3M cartridges) | Eliminates a near-duplicate parent/child title pair |
| Tagging/filter strategy | Preserves user navigation without separate URLs |

**Realized projection (after re-crawl, 1–4 weeks):**
- Crawlability: **75 (C) → ~80 (B−)** — combined with the comparison-URL consolidation and dedup fixes already landing
- Overall: **78 (C+) → ~80 (B−)** at realized; **~85 (B)** with the rest of the EXECUTE.md polish

---

## Order of operations

1. **Pre-check SKU counts** on the 3 merge candidates (5 min).
2. **Pre-check GSC traffic** on the same 3 URLs — Search Console → Performance → filter by page (5 min). Anything earning > 50 clicks/month gets kept.
3. **Tag relevant products** with the brand/series tags (varies by SKU count, ~15 min).
4. **Verify destination collection filters** expose the new tags as facets (5 min — depends on theme).
5. **Add the 3 URL redirects** in Shopify admin (5 min).
6. **Delete the merged collections** (after the redirects are live).
7. **Rename the 3M cartridges collection title** (per Family 2 above, 2 min).
8. **Request indexing** in GSC for the destination collections so they're recrawled with the new tag-filter UI (5 min).

**Total: ~45 minutes of admin + pre-checks** if all three merges go ahead.
Fewer if any fail the pre-check.
