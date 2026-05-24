# SEO Grade Card — wcsafety.com

- **Site:** https://wcsafety.com/
- **Scored:** 2026-05-24
- **Scored by:** Claude Code (automated)
- **Platform (inferred):** Shopify
- **Companion docs:** `audits/wcsafety-com-2026-05-15.md` (full audit),
  `fixes/wcsafety-com/` (ready-to-paste fix artifacts)

---

## Overall grade

```
   ┌─────────────────────────────────────────────┐
   │   OVERALL SEO SCORE:  60 / 100   →  GRADE D   │
   │   (verifiable categories only — see §0)       │
   └─────────────────────────────────────────────┘
```

A small Shopify safety/PPE store with **clearly improving content** (a new
scored product-review section, comparison pages, more buying guides) that is
still **held back by two unresolved P0 problems** carried over from the
2026-05-15 audit: duplicate/faceted URLs in the index, and the near-total
absence of trust/compliance pages (About, Contact, Affiliate Disclosure).
Content is trending up; the technical and trust foundations have not moved.

---

## 0. Methodology and scope (read this before trusting the number)

This grade card was produced from a sandboxed environment whose egress
policy blocks all direct HTTPS requests to the origin
(`x-deny-reason: host_not_allowed` on every `curl`/WebFetch to
`wcsafety.com`). The score is therefore built from **Google's public
search index only** — indexed titles, URLs, SERP snippets, and content
excerpts surfaced by `site:` and topic queries on 2026-05-24.

What this means for the grade:

- **Scored categories (observable from the index):** Crawlability &
  Indexation, On-Page SEO, Content & E-E-A-T, Trust & FTC Compliance.
- **Unscored categories (require on-site inspection):** Technical /
  Performance and Structured Data. Core Web Vitals, `robots.txt`,
  `sitemap.xml`, response headers, canonical tags, and JSON-LD **cannot
  be read from this environment**, so they are marked *Not verified* and
  are **excluded from the overall number**. Treat the 60 as a score over
  the four observable pillars, not the whole site.

Evidence tags: `[CONFIRMED]` = visible in the index; `[INFERRED]` =
deduced from URL/platform patterns; `[VERIFY]` = needs on-site checking.

---

## 1. Scorecard at a glance

| # | Category                    | Weight | Score   | Grade | Trend vs. 05-15 |
| - | --------------------------- | -----: | ------: | :---: | :-------------: |
| 1 | Crawlability & Indexation   |   25%  | 62/100  |  D    | → flat          |
| 2 | On-Page SEO                 |   30%  | 64/100  |  D    | ↗ mixed         |
| 3 | Content & E-E-A-T           |   25%  | 72/100  |  C-   | ↑ improved      |
| 4 | Trust & FTC Compliance      |   20%  | 35/100  |  F    | → flat          |
| — | **Weighted overall**        | 100%   | **60**  | **D** |                 |
|   | Technical / Performance     |  n/a   | *Not verified* | — | — |
|   | Structured Data             |  n/a   | *Not verified* | — | — |

Weighted overall = 62·0.25 + 64·0.30 + 72·0.25 + 35·0.20 ≈ **60**.

Grade bands: A 90–100 · B 80–89 · C 70–79 · D 60–69 · F < 60.

---

## 2. Category detail

### 2.1 Crawlability & Indexation — 62 / 100 (D) `→ flat`

**What's working**
- Indexed footprint has **grown** since 05-15: new product-review posts,
  more buying guides, comparison product pages, and new collections
  (Fire Extinguishers, Full Face Mask Respirators, Hearing Protection).
  Google is actively discovering and indexing new content. `[CONFIRMED]`

**What's dragging the score down**
- **Faceted/duplicate URL still indexed (P0, unresolved).** The exact URL
  flagged in the 05-15 audit is *still* in the index:
  `…/collections/all/products/3m-2091-p100-respirator-filter?_pos=4&_fid=129fedb3b&_ss=c`.
  The canonical fix and `robots.txt` rule have not taken effect (or aren't
  yet published). `[CONFIRMED]`
- **`/collections/all?page=5` indexed** — the thin all-products listing is
  still crawlable/indexable and duplicates every product. `[CONFIRMED]`
- **`/collections/master-collection` still public and indexed** — the
  default Shopify placeholder collection was never hidden or renamed.
  `[CONFIRMED]`
- **New duplicate-content regression:** two different URLs index the *same*
  3M 6002 review —
  `/blogs/product-reviews/3m-6002-review` and
  `/blogs/product-reviews/3m-6002-acid-gas-respirator-cartridge-review-niche-but-sometimes-the-right-pick`.
  This is a fresh dupe created since the last audit. `[CONFIRMED]`

*Ceiling lifters:* resolve canonical/faceted handling, `noindex` the
all/master collections, and 301 one of the duplicate 3M 6002 review slugs
to the other. (See audit §3, §4.1.)

### 2.2 On-Page SEO — 64 / 100 (D) `↗ mixed`

**What's working**
- **Homepage title upgraded** to a keyword-rich
  `Industrial Safety Equipment & PPE — WC Safety` (was the vague
  "Your Home to Everything Safety"). `[CONFIRMED]`
- **Product titles are now descriptive and standards-aware**, e.g.
  `MCR Safety BearKat BKH20 … | ANSI Z87.1 Eye Protection` and
  `3M 6200 Half Mask Respirator (Medium) | 6000 Series | NIOSH-Approved`.
  Strong long-tail targeting. `[CONFIRMED]`
- **Comparison pages with clean, short slugs** appeared:
  `/products/3m-60921-vs-60923`, `/products/3m-2091-vs-3m-2097`,
  `/products/n95-vs-p100-respirator`. Good commercial-intent coverage and
  exactly the slug discipline the audit asked for. `[CONFIRMED]`

**What's dragging the score down**
- **Title-template drift got *worse*, not better (P1, unresolved).** The
  index now shows **five** different brand-suffix conventions in use:
  - `— WC Safety` (em-dash, the intended template)
  - `- WC Safety` (ASCII hyphen): *Master Collection*, *Tools*,
    *Fire Extinguishers*
  - `| WC Safety` (pipe): several reviews/products
  - `— America's Safety Gear Experts` (wrong brand entirely):
    `/collections/3m-6500-series-half-mask-respirators` **and** the
    product `brk-first-alert-9120bff-…`
  - no suffix at all on some product/listing snippets
  
  This is the single biggest on-page drag and signals SEO metafields still
  aren't centrally managed. `[CONFIRMED]`
- **Over-length titles** that will truncate in SERPs, e.g.
  `3M Respirator Filter & Cartridge Guide (2026): Charts, Comparisons &
  Job-Site Selection — WC Safety` (~95 chars) and the CO-detector guide
  (~78 chars). `[CONFIRMED]`
- **The ~190-char MCR BearKat product slug is still live** despite the
  title being cleaned up — the URL was never shortened/redirected.
  `[CONFIRMED]`

*Ceiling lifters:* unify the brand suffix to one separator across all
collections/products (kill "America's Safety Gear Experts"), trim
over-length titles to ~55–60 chars, and 301 the long BearKat slug.
(See audit §4.2–§4.6.)

### 2.3 Content & E-E-A-T — 72 / 100 (C-) `↑ improved`

**What's working — this is where the site has visibly leveled up**
- **A dedicated scored product-review section now exists**
  (`/blogs/product-reviews/`) with explicit ratings surfaced in SERPs —
  e.g. *3M 6002 Acid Gas Cartridge Review (4.2–4.4/5)* and
  *Kidde COBD10 … Review (4.4)*. Concrete, first-hand-style scoring is a
  real E-E-A-T signal and a step up from anonymous "Best X" listicles.
  `[CONFIRMED]`
- **Editorial-independence language is now indexed:** "Every
  recommendation is based on compliance, build quality, and field
  performance… not paid by 3M for positive coverage," and an authority
  claim ("authorized industrial safety distributor since 2012"). This is
  exactly the kind of trust signal Google's Reviews system rewards.
  `[CONFIRMED]`
- **Topical depth expanded:** new guides (Best First Alert Smoke
  Detectors, Best Smart Smoke Detectors, 3M Filter & Cartridge Guide) and
  comparison pages build genuine topical authority in respirators/CO/smoke.
  `[CONFIRMED]`

**What's keeping it from a B**
- **No author bio / named reviewer or methodology page is visible in the
  index** (`/pages/editorial-methodology` not indexed). The independence
  claims are made, but the *who tested this and how* page that backs them
  up isn't surfacing. `[VERIFY]` — confirm whether it exists but is
  unpublished/noindexed.
- The duplicate 3M 6002 review (see §2.1) splits authority for the site's
  best E-E-A-T asset across two URLs.

*Ceiling lifters:* publish/expose the editorial-methodology and named
author bios, add `reviewed-by` lines, and consolidate the duplicate review.
(See audit §5.3.)

### 2.4 Trust & FTC Compliance — 35 / 100 (F) `→ flat`

**This is the lowest grade and the biggest single opportunity.**
- **Only two `/pages/` are indexed**, unchanged since 05-15:
  `/pages/return-policy` and `/pages/data-sharing-opt-out`. `[CONFIRMED]`
- **Still no indexed About, Contact, Affiliate Disclosure, Terms of
  Service, or Privacy Policy page.** For a site that earns commissions on
  product recommendations, a missing conspicuous **affiliate disclosure**
  is both an FTC 16 CFR Part 255 exposure and an E-E-A-T drag.
  `[CONFIRMED]`
- Notably, **ready-to-publish fixes for exactly these pages already exist
  in this repo** (`fixes/wcsafety-com/pages/about.md`, `contact.md`,
  `affiliate-disclosure.md`, `editorial-methodology.md`) — they appear not
  to have been published, or not yet crawled. `[CONFIRMED in repo]`
- There is now a slight **model ambiguity** worth resolving: older pages
  call the business an "Affiliate Marketer" (return-policy) while newer
  indexed copy calls it an "authorized industrial safety distributor since
  2012." Whichever is accurate, the disclosure and About pages need to
  state it consistently. `[VERIFY]`

*Ceiling lifters (highest ROI on the whole card):* publish the four pages
already drafted in `fixes/`, add them to the footer, add a top-of-page
affiliate disclosure to each guide, and reconcile the affiliate-vs-
distributor wording. This single category is dragging the overall grade
down by ~5 points on its own. (See audit §5.1–§5.2.)

---

## 3. Not-verified categories (excluded from the score)

These need someone on a non-sandboxed network (or a Screaming Frog /
PageSpeed run) to grade. They are **not** in the 60.

### 3.1 Technical / Performance — *Not verified*
Cannot read `robots.txt`, `sitemap.xml`, response headers, or run
Lighthouse/CWV from this environment. Shopify gives a reasonable baseline
(HTTPS, HTTP/2, image CDN), but LCP/INP/CLS, HSTS, soft-404 behavior, and
the faceted-URL `Disallow` rule all remain unconfirmed. See audit §8 and
§9 for the exact checklist.

### 3.2 Structured Data — *Not verified*
The scored reviews surfacing in SERPs (e.g. "4.2/5") *hint* that `Review`
JSON-LD may be present and rich-result-eligible, but this **cannot be
confirmed** without viewing source. Validate every page type at
`validator.schema.org` and Google's Rich Results Test. See audit §6.

---

## 4. How to move the overall grade up

Mapped to the existing audit/fix artifacts — no new plan needed, just
execution. Biggest score movement first:

| Action | Lifts category | Audit ref |
| ------ | -------------- | --------- |
| Publish About / Contact / Affiliate Disclosure / Editorial Methodology (already drafted in `fixes/`) + footer links + per-guide disclosure | Trust **F→C**, E-E-A-T **C-→B** | §5.1–5.3 |
| Fix canonical/faceted handling; `noindex` `/collections/all` & master collection; 301 one duplicate 3M 6002 review slug | Crawlability **D→C/B** | §3, §4.1 |
| Unify brand suffix sitewide (kill "America's Safety Gear Experts"); trim over-length titles; 301 the 190-char BearKat slug | On-Page **D→C/B** | §4.2–4.6 |
| Run PageSpeed + read robots/sitemap/JSON-LD on-site | Unlocks the 2 unscored categories | §6, §8, §9 |

Re-scoring after the Trust pages publish and the faceted dupes clear would
plausibly move the overall from **D (60)** into the **C+ / low-B** range.

---

## Appendix — evidence URLs (indexed as of 2026-05-24)

Improvements since 05-15:
- https://wcsafety.com/ (new title "Industrial Safety Equipment & PPE")
- https://wcsafety.com/blogs/product-reviews/3m-6002-acid-gas-respirator-cartridge-review-niche-but-sometimes-the-right-pick
- https://wcsafety.com/blogs/product-reviews/cobd10-kidde-10-year-battery-co-alarm-digital-display-review
- https://wcsafety.com/products/3m-60921-vs-60923
- https://wcsafety.com/products/n95-vs-p100-respirator
- https://wcsafety.com/collections/hearing-protection
- https://wcsafety.com/collections/fire-extinguishers
- https://wcsafety.com/collections/full-face-mask-respirators
- https://wcsafety.com/blogs/guides/best-first-alert-smoke-detector-2026
- https://wcsafety.com/blogs/guides/best-smart-smoke-detector-2026

Unresolved issues:
- https://wcsafety.com/collections/all/products/3m-2091-p100-respirator-filter?_pos=4&_fid=129fedb3b&_ss=c (faceted dupe, P0)
- https://wcsafety.com/collections/all?page=5 (thin listing indexed)
- https://wcsafety.com/collections/master-collection (placeholder still public)
- https://wcsafety.com/collections/3m-6500-series-half-mask-respirators (wrong brand suffix)
- https://wcsafety.com/blogs/product-reviews/3m-6002-review (duplicate of the long-slug review)
- https://wcsafety.com/pages/return-policy + /pages/data-sharing-opt-out (only trust pages indexed)
