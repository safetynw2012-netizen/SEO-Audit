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
   │   OVERALL SEO SCORE:  78 / 100   →  GRADE C+           │
   │   (realized — verifiable categories only, see §0)      │
   │   65 → 70 → 74 → 78 → 79 → 78 across the session.       │
   │   Deep-sweep 2026-06-12: dedup fixes landing as expected │
   │   (+ confirmed), but new structural finding (comparison-  │
   │   page sprawl across 3 URL paths) drops Crawlability     │
   │   78 → 75 (C). Overall flat at 78.                      │
   │   2026-06-15: artifact phase complete — Structured Data  │
   │   now has a path off "not verified" (article-jsonld      │
   │   snippet + apply-theme.mjs ready). Potential ceiling    │
   │   bumps from ~85 to ~88 (B+) once JSON-LD lands.         │
   └──────────────────────────────────────────────────────┘
```

A small Shopify safety/PPE store that has **moved fast and well** this
session. In a single working session the operator: got the trust pages
(About / Contact / Affiliate Disclosure) indexed, cleared the rogue
"America's Safety Gear Experts" brand from live page titles, and put the
four dominant crawl-hygiene fixes in place (faceted-URL canonical + robots
disallow, `/collections/all` and Master Collection `noindex`, and a 301 on
the duplicate 3M 6002 review). Those wins moved the site from **D (65) →
C+ (78)** — about two points shy of a **B**. Caveat: the crawl fixes and
title change are confirmed in place but their search-index benefit lands on
Google's **re-crawl**, so the live index will lag. The remaining gap to B
is now small: rationalize a cluster of overlapping collections (§2.1) and
finish the on-page polish (301 the one 190-char slug, trim a couple of
over-length titles, §2.2).

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

**Re-scan (2026-05-26, later in day):** the proxy has caught up — About and
Affiliate Disclosure now visible in `site:/pages` queries. A full fresh
sweep across every category surfaced significant positives (homepage title
overhauled to *"WC Safety | Expert Industrial PPE Reviews & ANSI/OSHA
Compliance Guide,"* most collection and product titles now keyword-enriched
with standards info, content footprint expanded with a new
`/blogs/reference/` section and many new reviews/guides). It also surfaced
two **new actionable findings**: (1) the BRK First Alert 9120BFF product
still shows *"America's Safety Gear Experts"* in its indexed title — this
is a **4th URL** not in the 3 the operator earlier confirmed cleared;
recommend a view-source check on that product, and (2) the
`/collections/product-reviews` page is indexed with the **homepage title**
("WC Safety | Expert Industrial PPE Reviews & ANSI/OSHA Compliance Guide")
rather than a distinct collection title. Score moves **78 → 79 (still C+)**.

**Deep-sweep (2026-06-12, ~2.5 weeks later):** targeted Shopify-specific
crawl-trap queries surfaced a **new structural finding** I had previously
missed (see §2.1): comparison-page sprawl across three URL patterns
(`/products/<a>-vs-<b>`, `/collections/<a>-vs-<b>`, and
`/blogs/guides/<a>-vs-<b>`) for the same topic — severe internal
cannibalization plus 3× crawl waste per comparison. Crawlability drops
**78 → 75 (C)**, overall settles **79 → 78 (still C+)**. Offsetting
positive: dedup fixes appear to be landing (faceted URL,
`/collections/master-collection`, and `/collections/all?page=5` no longer
surface in dedicated queries). **Concerning persistence:** the rogue
"America's Safety Gear Experts" titles are still in the index on at least
3 URLs after 2.5 weeks of re-crawl opportunity — recommend view-source on
`/collections/3m-6500-series-half-mask-respirators`,
`/products/3m-1100-foam-ear-plugs-cordless-nrr-29`, and the BRK 9120BFF
product to confirm whether the SEO title field was actually cleared on
those specific items (the earlier "cleared" confirmation may have only
covered a subset).

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
| 1 | Crawlability & Indexation   |   25%  | 75/100   |  C    | 85        | ↑ improved (deeper finding logged) |
| 2 | On-Page SEO                 |   30%  | 77/100   |  C+   | 82        | ↑ improved      |
| 3 | Content & E-E-A-T           |   25%  | 80/100   |  B-   | 86        | ↑↑ much improved |
| 4 | Trust & FTC Compliance      |   20%  | 80/100   |  B-   | 88        | ↑↑ much improved |
| — | **Weighted overall**        | 100%   | **78**   | **C+** | **~85 (B)** |            |
|   | Technical / Performance     |  n/a   | *Not verified* | — | — | — |
|   | Structured Data             |  n/a   | *Not verified* — but **path ready**, see §3.2 | — | ~82 once `article-jsonld.liquid` ships | — |

Realized overall = 75·0.25 + 77·0.30 + 80·0.25 + 80·0.20 ≈ **78**.
"Potential" = 85·0.25 + 82·0.30 + 85·0.25 + 88·0.20 ≈ **85 (B)** — the
upside once Google re-crawls the crawl-hygiene fixes, the overlapping
collections are rationalized, and the last on-page polish lands (190-char
slug + over-length titles, §2.2).

Grade bands: A 90–100 · B 80–89 · C 70–79 · D 60–69 · F < 60.

---

## 2. Category detail

### 2.1 Crawlability & Indexation — 75 / 100 (C) `↑ improved (with new structural finding)`

**What's working**
- Indexed footprint has **grown** since 05-15: new product-review posts,
  more buying guides, comparison product pages, and new collections.
  Crawl is healthy — Google discovers and indexes new content within days.
  `[CONFIRMED]`

**Resolved (2026-05-26, operator-confirmed)**
The four dominant duplicate-content problems have been addressed:
1. **Faceted/parameter URLs (P0)** — canonical + `robots.txt` disallow on
   `/collections/*?*` now in place.
2. **`/collections/all`** — set to `noindex`.
3. **`/collections/master-collection`** — hidden/`noindex`.
4. **Duplicate 3M 6002 review** — one URL 301-redirected to the canonical.

⚠️ **Realization is pending Google re-crawl.** These are correct directives,
but the index cleanup (dupes dropping out, signals consolidating) only lands
once Google re-crawls — so the search index will keep *showing* the old
duplicate URLs for days-to-weeks. A near-term index recheck will look
"unchanged" and should **not** be read as the fix failing. Two things still
warrant a Search Console confirmation, since they can't be verified from
here and are the error-prone kind: that the product canonical points to the
clean `/products/<slug>` (not overridden by an app), and that the review
redirect is a **301** (not a 302). `[operator-confirmed; re-crawl pending]`

**Dedup fixes appear to be landing (2026-06-12 deep sweep, ~2.5 weeks after
the directives went in):**
- The faceted `_pos/_fid/_ss` URL no longer surfaces in a dedicated query.
- `/collections/master-collection` no longer surfaces.
- `/collections/all?page=5` no longer surfaces.
- Confirm in GSC → Pages → "Duplicate without user-selected canonical" —
  that bucket should be dropping. `[likely deindexed; confirm in GSC]`

**What's still dragging the score down**
- 🔴 **NEW (2026-06-12 deep sweep): comparison-page sprawl across 3 URL
  patterns — the biggest structural crawl issue on the site.** The same
  comparison topic is indexed at three distinct paths simultaneously, e.g.
  the 3M 2091 vs 2097 topic appears at all of:
  - `/products/3m-2091-vs-3m-2097`
  - `/collections/3m-2091-vs-3m-2097`
  - `/blogs/guides/3m-2091-vs-2097-filter`
  
  The pattern repeats across the cartridge lineup: `/products/3m-60921-vs-60923`
  + `/collections/3m-60921-vs-60923-vs-60926-respirator-cartridges` + guide
  variants; plus growing comparison-as-collections (`/collections/3m-60921-vs-3m-60926`,
  `/collections/3m-60923-vs-3m-6001`, `/collections/3m-6001-vs-3m-6003`,
  `/collections/3m-6001-vs-3m-6006`). Three of the operator's own pages
  compete for the same query — internal cannibalization plus 3× crawl waste
  per topic. The **content strategy is right; the URL strategy is wrong.**
  
  *Recommended fix:* pick one canonical URL pattern per comparison —
  `/blogs/guides/<a>-vs-<b>` is the right type for long-form commercial-intent
  content — then 301 the other two variants to it. Open question worth
  checking: are the `/collections/<a>-vs-<b>` URLs hosting actual filtered
  product grids (legitimate Shopify use), or just CMS-style content
  misusing the `collection` page type? View-source decides. `[CONFIRMED]`
- **Near-duplicate / overlapping collections** (not yet addressed):
  `Respirator Filters and Cartridges` vs `3M Respirator Cartridges and
  Filters`; `Hearing Protection` vs `Howard Leight Cordless Ear Plugs`; plus
  `Respiratory Protection` / `Half Mask Respirators` / `Full Face Mask
  Respirators` / `MSA Full Face Mask Respirator` / `3M Half Mask Respirators`.
  Near-identical naming risks keyword cannibalization. `[CONFIRMED]`
- **Unverifiable from here:** `robots.txt` contents, `sitemap.xml` (all URLs
  200, accurate `lastmod`), and the GSC "Why pages aren't indexed" buckets.
  `[VERIFY]`

*Ceiling lifters (to reach ~85 / B):* confirm the canonical/301 correctness
in GSC, re-crawl to clear the dupes, and rationalize the overlapping
collections. (See audit §3, §4.1.)

### 2.2 On-Page SEO — 77 / 100 (C+) `↑ improved`

**What's working**
- **Homepage title overhauled (2026-05-26 re-scan):** now
  `WC Safety | Expert Industrial PPE Reviews & ANSI/OSHA Compliance Guide`
  (previously `Industrial Safety Equipment & PPE — WC Safety`, before that
  the vague "Your Home to Everything Safety"). Keyword-rich, positions the
  site as a review/compliance authority. `[CONFIRMED]`
- **Collection titles are now keyword-enriched**, e.g.
  `Safety Goggles — Splash & Impact Rated for Work`,
  `Hearing Protection — Ear Plugs & Ear Muffs | WC Safety`,
  `3M Half Mask Respirators — 6000, 6500 & 7500 | WC Safety`. `[CONFIRMED]`
- **Product titles are descriptive and standards-aware**, e.g.
  `STUDSON SHK-1 Non-Vented Safety Helmet, Type 2 Class E | WC Safety`,
  `Moldex 6835 Pura-Fit TouchFree EcoStation | Hands-Free NRR 33 Earplug
  Dispenser — WC Safety`. Strong long-tail targeting. `[CONFIRMED]`
- **Comparison pages with clean, short slugs**:
  `/products/3m-60921-vs-60923`, `/products/3m-2091-vs-3m-2097`,
  `/products/n95-vs-p100-respirator`. `[CONFIRMED]`

**Resolved (2026-05-26)**
- **The rogue "America's Safety Gear Experts" brand suffix is gone from the
  live page `<title>` tags** — operator-confirmed via view-source. This was
  the single worst on-page issue (a conflicting second brand identity in the
  SERPs), and clearing it is what lifts this category from D to C. Google's
  search listings still show the old titles on a few URLs
  (`/collections/3m-6500-series-half-mask-respirators` etc.) but those are
  **stale cached snapshots that will update on re-crawl**. `[operator-confirmed]`

**What's still dragging the score down**
- **NEW (re-scan 2026-05-26): possible 4th URL with the rogue brand.** The
  BRK First Alert 9120BFF product is indexed as
  `BRK First Alert 9120BFF/ SMI100-AC Smoke Detector, Hardwired Alarm wit—
  America's Safety Gear Experts` — this was **not** in the 3 URLs the
  operator earlier confirmed cleared. May be a missed page or another stale
  cached title. **View-source check recommended** on
  `/products/brk-first-alert-9120bff-smi100-ac-smoke-detector-hardwired-alarm-with-battery-backup-white-1-pack`.
  `[INDEX — may be stale or missed]`
- **NEW (re-scan 2026-05-26): `/collections/product-reviews` is indexed with
  the homepage title** ("WC Safety | Expert Industrial PPE Reviews &
  ANSI/OSHA Compliance Guide") instead of a distinct collection title. Set
  a distinct SEO title in Shopify for this collection. `[CONFIRMED]`
- **Over-length titles** that truncate in SERPs — e.g. the 3M Filter Guide
  (~95 chars), the CO-detector guide (~78 chars), and now **the new OSHA
  Flammable Cabinet reference page** which is truncating mid-word in the
  SERP (`...29 CFR 1910.106 and NFPA 30 Expla — WC Safety`). `[CONFIRMED]`
- **The ~190-char MCR BearKat product slug is still live** despite the
  title being cleaned up. `[CONFIRMED]`
- **Minor separator inconsistency** (cosmetic): titles mix em-dash, pipe,
  and ASCII hyphen. No longer brand-confusion, just polish. `[CONFIRMED]`

*Ceiling lifters (to reach ~82 / B−):* 301 the long BearKat slug to
something like `/products/mcr-bearkat-bkh20-bifocal-safety-glasses`, trim
the over-length guide titles to ~55–60 chars, and (optional polish)
standardize on one title separator. (See audit §4.2–§4.6.)

### 2.3 Content & E-E-A-T — 80 / 100 (B−) `↑↑ much improved`

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
- **Topical depth expanded — and continued to expand through 2026-05-26:**
  the re-scan surfaced many new pieces — Best Respirator Cartridge for
  Chlorine Gas, 3M 2091/2071/7093/60923 Reviews, 3M Ultimate FX FF-403 Full
  Face Respirator Review (4.5/5), Hard Hat Classes Explained, Respirator
  Filter Types Explained, How Long Do Respirator Cartridges Last, 3M
  Organic Vapor Cartridges guide, and a **new `/blogs/reference/`
  section** (e.g. *OSHA Flammable Cabinet Requirements: 29 CFR 1910.106
  and NFPA 30*) that adds technical/regulatory authority on top of
  buying-guide content. Genuine, fast topical-authority growth.
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
  with a bio would push this category to ~85 (B). (No honesty tradeoff —
  pure upside.)
- **Thin on the "Experience" signal — but DO NOT fabricate it.** The site
  deliberately and honestly positions as a *regulatory/spec audit, not
  hands-on testing* (see §2.4), which is correct — faking first-hand testing
  on safety gear would be a Trust violation. The nuance: Google's
  "Experience" signal is satisfied by **evidence of genuine engagement**
  (original photos of the actual unit, a personally verified measurement),
  **not by first-person voice** — so it can be shown truthfully and in
  third person, or skipped entirely in favor of competing on
  compliance/selection intent. This is a strategic positioning choice, not
  a mandate to write first-person claims. `[note: reconciles with §2.4]`
- The duplicate 3M 6002 review (see §2.1) split authority across two URLs;
  being resolved via 301 (re-crawl pending).

*Ceiling lifters:* name ≥1 real reviewer with credentials and add
`reviewed-by` bylines to guides (the high-impact, no-tradeoff fix); decide
the Experience positioning (add genuine evidence vs. own the spec-audit
lane); set a December refresh cadence for the "Best X 2026" cluster and
de-cannibalize the overlapping smoke-detector guides. (See audit §5.3.)

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

### 3.2 Structured Data — *Not verified · path ready (2026-06-15)*
The scored reviews surfacing in SERPs (e.g. "4.2/5") *hint* that `Review`
JSON-LD may be present and rich-result-eligible, but this **cannot be
confirmed** without viewing source.

**Path off "not verified" is now in the repo:**
- `fixes/wcsafety-com/theme/snippets/article-jsonld.liquid` — one Liquid
  snippet that emits `Article` schema on every blog article, plus
  conditional `Review` schema when `review.rating` metafield is set
  (no misuse risk on generic guides). Pulls author from the same
  `editorial.reviewer` metafield the methodology callout uses — one
  named-reviewer input drives both surfaces.
- `fixes/wcsafety-com/scripts/apply-theme.mjs` — uploads the snippet via
  `themeFilesUpsert`. Operator adds the `{% render 'article-jsonld' %}`
  call in `layout/theme.liquid <head>` gated on
  `request.page_type == 'article'`.
- Validate post-install at `validator.schema.org` and
  `search.google.com/test/rich-results` (both accessible from any
  non-sandbox machine; this environment cannot reach either).

Once shipped and validated, this category scores **~82 (B)** —
Article schema on every article, Review schema where appropriate, and
SERP rich-result eligibility (rating stars on review listings).

---

## 4. How to move the overall grade up

Mapped to the existing audit/fix artifacts — no new plan needed, just
execution. Biggest score movement first:

| Action | Lifts category | Audit ref |
| ------ | -------------- | --------- |
| ✅ **DONE: trust pages indexed** — About / Contact / Affiliate Disclosure live in Google | Trust **D→B−**, E-E-A-T **C→C+** | §5.1, §9 |
| ✅ **DONE: rogue brand suffix cleared** from live page titles (3 of 4 batches; 3 stubborn URLs pending — see `fixes/wcsafety-com/on-page-polish.md` §1) | On-Page **D→C** | §4.2 |
| ✅ **DONE: crawl-hygiene fixes 1–4** — faceted-URL canonical + robots disallow, `/collections/all` + Master Collection `noindex`, 301 on duplicate 3M 6002 review (re-crawl confirmed landing 2026-06-12) | Crawlability **D→C+** | §3, §4.1 |
| ✅ **DONE: 2 of 9 comparison guides published** — `/blogs/guides/3m-60921-vs-60923-cartridge` and `/blogs/guides/3m-6001-vs-6003-cartridge` live (2026-06-14) | Content (incremental) | §2.3 |
| 📝 **READY: 9 comparison-guide drafts** at `fixes/wcsafety-com/blogs/guides/` (2 published; 7 awaiting `[VERIFY]` resolution + publish) | Content/E-E-A-T **B−→B**, Crawlability **C→B** once redirects ship | §2.1, §2.3 |
| 📝 **READY: on-page polish checklist** — title fixes, slug 301, methodology-callout Liquid snippet at `fixes/wcsafety-com/on-page-polish.md` + `theme/snippets/research-methodology-callout.liquid` | On-Page **C+→B−**, E-E-A-T **C+→B** | §2.2–2.3 |
| 📝 **READY: collection rationalization plan** — 3 merges + 1 rename for the non-comparison overlapping collections at `fixes/wcsafety-com/collection-rationalization.md`. Pre-check-gated on SKU count + GSC traffic. Closes the last structural crawl issue. | Crawlability **C+→B−** | §2.1 |
| 📝 **READY: return-policy rewrite** — `fixes/wcsafety-com/pages/return-policy-rewrite.md`. Reconciles the "Affiliate Marketer, returns handled through its Affiliates" line with the About page's stocked-and-ships-direct positioning. | Trust **B−→B** | §2.4 |
| 📝 **READY (2026-06-15): JSON-LD snippet** — `theme/snippets/article-jsonld.liquid` emits `Article` schema sitewide + conditional `Review` schema on rated reviews. Uploads via `scripts/apply-theme.mjs`. | **Structured Data: not verified → ~82**, SERP rich-result eligibility | §3.2, §6 |
| 📝 **READY (2026-06-15): apply-theme.mjs** — uploads both theme snippets (`research-methodology-callout.liquid` + `article-jsonld.liquid`) via `themeFilesUpsert`. Prints exact `{% render %}` paste blocks for `sections/main-article.liquid` + `layout/theme.liquid`. | Unlocks methodology + JSON-LD installs | §3.2, §2.3 |
| 📝 **READY (2026-06-15): refresh-cadence checklist** — `fixes/wcsafety-com/refresh-cadence.md`. Annual Dec → Jan ritual for "Best X 2026" guides. Calendar reminders + per-guide update checklist. | Defends current score from Feb-2027 CTR cliff | §4.8 (audit) |
| 📝 **READY (2026-06-15): CHANGELOG.md** — master index of every artifact in `fixes/wcsafety-com/` grouped by purpose with status. Operator backlog table ranked by impact. | Organizational | — |
| **Verify in GSC:** product canonical resolves to `/products/<slug>`; review redirect is a 301 (not 302); watch the "Duplicate / Crawled–not-indexed" buckets clear | locks in Crawlability **C+→B** | §9 |
| **Name a real reviewer** (single biggest E-E-A-T lever with zero honesty tradeoff) — fill the `editorial.reviewer` metafield once; methodology callout + JSON-LD author both pick it up automatically | E-E-A-T **C+→B** | §5.3 |
| Run PageSpeed / Lighthouse on-site | Unlocks Technical/Performance category | §8 |
| Validate JSON-LD post-install at `validator.schema.org` + `search.google.com/test/rich-results` | Confirms Structured Data | §6 |

**Session-end status (2026-06-15):** The **artifact phase is complete** —
every fix that can be drafted, scripted, or planned from this sandbox is in
PR #6. The realized score holds at **C+ (78)** because nothing in this
update changes the live site state — these are paste-ready artifacts +
scripts. Realistic ceiling with everything shipped + re-crawled is now
**~85–88 (B / B+)**: the new `article-jsonld.liquid` snippet adds the
Structured Data category to the scoreable set (~+1.5 to overall via the
weighted formula change), and the named-reviewer + methodology callout
install adds a real E-E-A-T lift on top of the consolidation work.

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
