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
   ┌──────────────────────────────────────────────────────┐
   │   OVERALL SEO SCORE:  70 / 100   →  GRADE C-           │
   │   (realized — verifiable categories only, see §0)      │
   │   Full regrade 2026-05-26: trust pages indexed (+5);    │
   │   on-page + crawl issues unchanged → score holds at 70  │
   │   Potential with on-page + crawl fixes:  ~83  →  B     │
   └──────────────────────────────────────────────────────┘
```

A small Shopify safety/PPE store with **clearly improving content** (a scored
product-review section, comparison pages, more buying guides) and a
**newly published, genuinely strong set of trust pages** (About / Contact /
Affiliate Disclosure). As of **2026-05-26 the trust pages have begun
appearing in Google** (About + Contact confirmed in live SERPs), so their
substantial E-E-A-T value is now starting to be credited — that single
indexation event lifted the site from **D (65) to C- (70)**. The remaining
ceiling is now mechanical: (1) duplicate/faceted URLs from the 2026-05-15
audit are still indexed, and (2) on-page title-template drift across the
catalog. Clearing those moves the site toward a low **B (~83)**.

---

## 0. Methodology and scope (read this before trusting the number)

This grade card was produced from a sandboxed environment whose egress
policy blocks all direct HTTPS requests to the origin
(`x-deny-reason: host_not_allowed` on every `curl`/WebFetch to
`wcsafety.com`). The score is therefore built from **Google's public
search index only** — indexed titles, URLs, SERP snippets, and content
excerpts surfaced by `site:` and topic queries on 2026-05-24.

**Operator-supplied evidence (2026-05-24):** the operator confirmed that
`/pages/about`, `/pages/contact`, and the affiliate-disclosure page are
all **live**, and pasted the full About-page body. That content is graded
in §2.4.

**Indexation update (2026-05-26):** all three trust pages are now indexed
in live Google. The operator confirmed seeing `/pages/about` in Google
results, and shared the `/pages/contact` and `/pages/affiliate-disclosure`
URLs both carrying a `srsltid=` Google-Search click parameter — which Google
only appends when a page is clicked from a SERP, confirming all three are
now indexed. (The sandbox WebSearch proxy used here still lags and hadn't
surfaced them, so this update relies on the operator's direct view of live
Google — a documented limitation of this environment, not a contradiction.)
Trust and E-E-A-T scores are raised accordingly.

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

| # | Category                    | Weight | Realized | Grade | Potential | Trend vs. 05-15 |
| - | --------------------------- | -----: | -------: | :---: | :-------: | :-------------: |
| 1 | Crawlability & Indexation   |   25%  | 62/100   |  D    | 80        | → flat          |
| 2 | On-Page SEO                 |   30%  | 64/100   |  D    | 82        | ↗ mixed         |
| 3 | Content & E-E-A-T           |   25%  | 78/100   |  C+   | 85        | ↑ improved      |
| 4 | Trust & FTC Compliance      |   20%  | 80/100   |  B-   | 88        | ↑↑ much improved |
| — | **Weighted overall**        | 100%   | **70**   | **C-** | **~83 (B)** |             |
|   | Technical / Performance     |  n/a   | *Not verified* | — | — | — |
|   | Structured Data             |  n/a   | *Not verified* | — | — | — |

Realized overall = 62·0.25 + 64·0.30 + 78·0.25 + 80·0.20 ≈ **70**.
"Potential" = 80·0.25 + 82·0.30 + 85·0.25 + 88·0.20 ≈ **83 (B)** — the
upside available from clearing the faceted-URL duplicates (§2.1) and
unifying the title template (§2.2), no new content required.

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
  - `— America's Safety Gear Experts` (wrong brand entirely — in Google's
    SERP **`<title>` tags**, not visible body text — on these 3 listings as
    of the 2026-05-26 sweep):
    `/collections/3m-6500-series-half-mask-respirators`,
    `/collections/3m-respirator-cartridges-and-filters`, and the product
    `/products/3m-1100-foam-ear-plugs-cordless-nrr-29` (plus the earlier
    `brk-first-alert-9120bff-…`). **Operator disputes this is on the live
    site (2026-05-26).** Plausible: the evidence is from the search index,
    which is known to lag live Google here — if the SEO title field was
    already cleared, these are stale cached titles pending re-crawl. Needs
    a view-source / Shopify "Search engine listing preview" check on the 3
    URLs to settle definitively. `[INDEX — may be stale]`
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

### 2.3 Content & E-E-A-T — 78 / 100 (C+) `↑ improved`

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

**What's improved (2026-05-26)**
- The documented methodology (the About page's "how we research products"
  section) **is now indexed**, so the "who/how" credibility is starting to
  be credited. `[CONFIRMED — operator]`
- A dedicated **`/pages/wc-safety-editorial-team`** page is now live and
  indexed. However, the 2026-05-26 re-sweep shows it presents the team
  **collectively** ("independent safety specialists / WC Safety Editorial
  Team") with **no named individuals or personal credentials surfacing** —
  so it partly addresses the "no named reviewer" gap (a staffed team page
  beats a lone byline) but does not yet close it. `[CONFIRMED indexed]`

**What's still keeping it from a B**
- **Author identity is still collective/pseudonymous.** No real, verifiable
  person with credentials is attached to the reviews — the single biggest
  remaining E-E-A-T limiter for a YMYL safety site. Naming ≥1 real reviewer
  with a bio would push this category to ~85 (B).
- The duplicate 3M 6002 review (see §2.1) splits authority for the site's
  best E-E-A-T asset across two URLs.

*Ceiling lifters:* confirm the editorial-team page names real people with
credentials, add `reviewed-by` lines to guides, and consolidate the
duplicate review. (See audit §5.3.)

### 2.4 Trust & FTC Compliance — 80 / 100 (B−, realized) · content quality A− `↑↑ much improved`

**Biggest jump on the card. The trust pages now exist, are excellent, AND
are indexed (confirmed 2026-05-26).** `/pages/about`, `/pages/contact`,
and `/pages/affiliate-disclosure` are all live in Google (the latter two
shared with `srsltid=` SERP-click parameters), so the substantial trust
value is now being credited rather than sitting dormant. Graded on content
alone the About/editorial page is an **A− (88/100)** — among the strongest
assets on the site:

- **Editorial independence is stated and specific:** "zero sponsored
  listings, no manufacturer input, we recommend competitor products and
  the cheaper option when it's right." Exactly the signal Google's Reviews
  system and Quality Rater Guidelines reward. `[OPERATOR-SUPPLIED]`
- **FTC monetization disclosure is well-built:** names the Amazon
  Associates program, "small commission at no additional cost," declares
  `rel="sponsored nofollow noopener"`, and discloses the affiliate tag.
  More complete than most affiliate sites. `[OPERATOR-SUPPLIED]`
- **YMYL boundary-setting is a genuine strength:** explicitly states the
  editor holds no CIH/CSP/medical license, gives the poison-control number,
  and says "our method is a regulatory/spec audit, not destructive testing."
  Transparent limitation-setting is precisely what raters look for on
  safety/health content. `[OPERATOR-SUPPLIED]`
- **Methodology cites primary sources** (NIOSH CEL, OSHA 29 CFR 1910,
  ANSI Z87/Z89/Z88, UL 2034/217/2075, manufacturer TDS), with a stated
  update cadence and a "Last reviewed" convention. `[OPERATOR-SUPPLIED]`

**Why the realized score is 80 (B−), not ~88:** the indexation blocker is
resolved; what remains are three smaller, well-defined items:
- **Disclosure is centralized, not proximate.** FTC wants a clear,
  conspicuous disclosure *near the affiliate link on each guide/review*,
  not only on the dedicated disclosure page. The repo's
  `fixes/wcsafety-com/theme/snippets/affiliate-disclosure.liquid` handles
  per-guide placement and still needs to be applied. `[CONFIRMED in repo]`
- **Author identity.** The About copy publishes under "WC Safety editorial
  byline / Editor & Founder." A new `/pages/wc-safety-editorial-team` page
  is now indexed and may resolve this — but only if it names real,
  verifiable people with credentials. Confirm. `[VERIFY]`
- **Cross-page claim drift:** "13 years reviewing" (About) vs. "distributor
  since 2012" (homepage) vs. "Affiliate Marketer, returns handled through
  its Affiliates" (`return-policy`, now contradicting the "we stock and
  sell direct" framing). Reconcile so claims match sitewide. `[CONFIRMED]`

*Ceiling lifters (to reach ~88 / B+):* (1) apply the per-guide
affiliate-disclosure snippet; (2) confirm the editorial-team page names
real people; (3) reconcile the affiliate-vs-distributor wording on the
return-policy page. (See audit §5.1–§5.3.)

---

## 3. Not-verified categories (excluded from the score)

These need someone on a non-sandboxed network (or a Screaming Frog /
PageSpeed run) to grade. They are **not** in the realized 70.

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
| ✅ **DONE (2026-05-26): trust pages indexed** — About / Contact / Affiliate Disclosure now live in Google | Trust **D→B−**, E-E-A-T **C→C+** | §5.1, §9 |
| **Now the top lever:** unify brand suffix sitewide (kill "America's Safety Gear Experts"); trim over-length titles; 301 the 190-char BearKat slug | On-Page **D→B** | §4.2–4.6 |
| Fix canonical/faceted handling; `noindex` `/collections/all` & master collection; 301 one duplicate 3M 6002 review slug | Crawlability **D→B** | §3, §4.1 |
| Apply the per-guide affiliate-disclosure snippet; confirm editorial-team page names real people; reconcile affiliate-vs-distributor wording | Trust + FTC compliance | §5.2–5.3 |
| Run PageSpeed + read robots/sitemap/JSON-LD on-site | Unlocks the 2 unscored categories | §6, §8, §9 |

The trust-page indexation that was capping the score is **resolved**. The
two biggest remaining levers are now purely technical: **on-page title
unification** (§2.2) and **clearing the faceted-URL duplicates** (§2.1).
Together they plausibly move the overall from **C− (70)** to a low
**B (~83)** with no new content required.

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
- https://wcsafety.com/pages/return-policy + /pages/data-sharing-opt-out
- https://wcsafety.com/pages/about + /pages/contact + /pages/affiliate-disclosure (now INDEXED, confirmed 2026-05-26 — see §2.4)
- https://wcsafety.com/pages/wc-safety-editorial-team (new, indexed 2026-05-26; content not yet graded — see §2.3)
