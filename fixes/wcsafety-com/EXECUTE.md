# EXECUTE — wcsafety.com fix checklist

> **Master execution doc.** Sequences every paste-ready artifact in this
> repo into one start-to-finish run. Tick the boxes; verify after each phase;
> stop and ask before skipping a verification step.
>
> **Time budget:**
> - Admin & theme clicks: ~2.5 hours
> - Guide content review (8 drafts × ~30 min each, mostly verifying NIOSH TC numbers): ~4 hours
> - Total realistic: **~6–7 hours over 1–2 sittings**

---

## Phase 0 — Pre-flight (20 min) · do these BEFORE touching anything

Establishes baseline state and catches problems early.

- [ ] **Take a Shopify theme backup.** Online Store → Themes → ⋯ → Duplicate. Name it `pre-seo-execution-YYYY-MM-DD`. This is the rollback point if anything breaks.
- [ ] **Open Search Console and bookmark these reports** so you can watch them shift over the next 1–4 weeks:
  - Pages → Indexed (count trend)
  - Pages → Not indexed → *Duplicate without user-selected canonical* (should drop)
  - Pages → Not indexed → *Crawled — currently not indexed* (should drop)
  - Performance → Search results (rank/CTR baseline)
- [ ] **View-source verify the 3 stubborn rogue-brand URLs.** Confirm the `<title>` actually still contains "America's Safety Gear Experts" (vs. SERP being stale):
  - `https://wcsafety.com/collections/3m-6500-series-half-mask-respirators`
  - `https://wcsafety.com/products/3m-1100-foam-ear-plugs-cordless-nrr-29`
  - `https://wcsafety.com/products/brk-first-alert-9120bff-smi100-ac-smoke-detector-hardwired-alarm-with-battery-backup-white-1-pack`
- [ ] **View-source two comparison `/collections/<a>-vs-<b>` URLs** to decide: real product grids or text-only? This determines whether to fold products into the destination guide before redirecting.
  - `https://wcsafety.com/collections/3m-2091-vs-3m-2097`
  - `https://wcsafety.com/collections/3m-6001-vs-3m-6003`
- [ ] **GSC URL Inspection on one faceted URL** to confirm canonical fix landed:
  - `https://wcsafety.com/collections/all/products/3m-2091-p100-respirator-filter?_pos=4&_fid=129fedb3b&_ss=c`
  - Expected: Google reports user-declared canonical = `/products/3m-2091-p100-respirator-filter`. If not, **stop and fix canonical-tag implementation before continuing** — nothing else works if this is broken.
- [ ] **`curl -I` the duplicate review URL** to confirm 301 (not 302):
  ```
  curl -I https://wcsafety.com/blogs/product-reviews/3m-6002-acid-gas-respirator-cartridge-review-niche-but-sometimes-the-right-pick
  ```
  Expected: `HTTP/2 301` with `location:` pointing at `/blogs/product-reviews/3m-6002-review`. If 302, fix in Shopify URL Redirects before continuing.

**Stop-and-fix gate:** if either of the last two checks shows a broken fix, address it before moving on.

---

## Phase 1 — On-page polish (40 min) · all in Shopify admin

Source: `fixes/wcsafety-com/on-page-polish.md`

### 1A. Clear the 3 stubborn rogue-brand SEO titles (10 min)

For each URL below: Shopify admin → open the item → scroll to **Search engine listing preview** → **Edit website SEO** → set **Page title** to the recommended value → Save.

- [ ] `/collections/3m-6500-series-half-mask-respirators` → `3M 6500 Series Half Mask Respirators | WC Safety`
- [ ] `/products/3m-1100-foam-ear-plugs-cordless-nrr-29` → `3M 1100 Foam Ear Plugs (NRR 29, Cordless) | WC Safety`
- [ ] `/products/brk-first-alert-9120bff-smi100-ac-smoke-detector-hardwired-alarm-with-battery-backup-white-1-pack` → `BRK First Alert 9120BFF Hardwired Smoke Alarm | WC Safety`

### 1B. Distinct title for `/collections/product-reviews` (5 min)

- [ ] Set **Page title:** `Product Reviews — Independent PPE & Safety Tests | WC Safety`
- [ ] Set **Meta description:** `Hands-on, NIOSH/UL/ANSI-grounded product reviews for respirators, cartridges, CO and smoke alarms, and the rest of the PPE category. Zero sponsored listings.`

### 1C. Shorten 5 over-length SERP titles (10 min)

| URL | New SEO title |
| --- | --- |
| `/blogs/guides/3m-filter-cartridge-guide` | `3M Filter & Cartridge Guide (2026): Charts & Comparisons` |
| `/blogs/guides/best-carbon-monoxide-detector-2026` | `Best Carbon Monoxide Detector 2026: 10 CO Alarms Ranked` |
| `/blogs/guides/n95-vs-kn95-vs-p100-which-respirator-do-you-actually-need` | `N95 vs KN95 vs P100: Which Respirator Do You Need?` |
| `/blogs/reference/osha-flammable-cabinet-requirements` | `OSHA Flammable Cabinet Rules: 1910.106 & NFPA 30` |
| `/blogs/product-reviews/cobd10-kidde-10-year-battery-co-alarm-digital-display-review` | `Kidde COBD10 10-Year Battery CO Alarm Review (4.4/5)` |

- [ ] All 5 set.

### 1D. Rename the 190-character MCR BearKat slug (15 min)

- [ ] Products → open MCR Safety BearKat BKH20 → **Search engine listing preview** → **Edit website SEO** → change **URL handle** to: `mcr-bearkat-bkh20-bifocal-safety-glasses`. Save.
- [ ] Online Store → Navigation → URL Redirects → confirm Shopify auto-created a 301 from the old slug. If not, add manually:
  - From: `/products/mcr-safety-glasses-bearkat-bkh20-clear-polycarbonate-lenses-uv-light-protective-eyewear-with-scratch-resistant-duramass-technology-bifocal-safety-glasses-2-0-diopter`
  - To: `/products/mcr-bearkat-bkh20-bifocal-safety-glasses`
- [ ] `curl -I` the old URL — confirm `HTTP/2 301` with `location:` pointing at the new short slug.

---

## Phase 2 — Install methodology callout in theme (30 min)

Source: `fixes/wcsafety-com/theme/snippets/research-methodology-callout.liquid` and `on-page-polish.md` §5.

- [ ] Online Store → Themes → Edit code → Snippets → **Add a new snippet** → name `research-methodology-callout` → paste the full contents of `research-methodology-callout.liquid` from the repo.
- [ ] Open `sections/main-article.liquid` (or whichever section renders `{{ article.content }}` in your theme). Just below `{{ article.content }}`, add:
  ```liquid
  {% render 'research-methodology-callout',
            reviewer: article.metafields.editorial.reviewer,
            last_reviewed: article.metafields.editorial.last_reviewed %}
  ```
- [ ] Settings → Custom data → Articles → Add definition twice:
  - Namespace `editorial` · key `reviewer` · type Single line text
  - Namespace `editorial` · key `last_reviewed` · type Date
- [ ] Preview one blog article. Confirm the callout renders at the bottom with a sensible date (will say "WC Safety Editorial Team" until you fill the reviewer metafield).
- [ ] **Decision point — author identity:** name at least one real reviewer with a credential. This is the single biggest E-E-A-T lever in the entire backlog and the only one with zero honesty tradeoff. Fill the `editorial.reviewer` metafield on each article with `Jane Doe, CIH` (or similar) once you have a name.

**If theme edits aren't an option right now:** use the Markdown fallback in `on-page-polish.md` §5 and paste at the bottom of every guide instead. Less DRY but reaches the same E-E-A-T outcome.

---

## Phase 3 — Comparison-URL redirects (20 min)

Source: `fixes/wcsafety-com/blogs/guides/README.md` and `comparison-url-consolidation.md`.

Online Store → Navigation → URL Redirects → Add URL redirect. Paste each row:

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

- [ ] All 12 redirects added.
- [ ] **Important order:** publish the destination guides in Phase 4 **before** the redirects go live, so users don't land on a 404. If the destination doesn't exist yet, Shopify will still 301 — but to a 404 page.

**Pre-redirect content merge:** if the Phase 0 view-source showed any unique paragraphs/tables on the `/products/` or `/collections/` source URLs, fold them into the destination guide before publishing. Don't lose prose.

---

## Phase 4 — Publish the 8 comparison-guide drafts (~30 min admin + ~30 min/guide content review)

Source: `fixes/wcsafety-com/blogs/guides/*.md`

For each of the 8 drafts:

1. Open the draft in the repo.
2. **Fill every `[VERIFY]` placeholder.** This is the part that takes real time — every NIOSH TC- approval number must be cross-referenced against the NIOSH Certified Equipment List on the actual unit you stock. Do NOT guess.
3. Fill `[REVIEWER NAME, credential]` with a real reviewer (same as Phase 2).
4. Fill `[DATE]` for Published and Last reviewed.
5. Fill `[AMAZON LINK]` with Amazon Associates links carrying tag `wcsafety04-20` and `rel="sponsored nofollow noopener"`.
6. Fill `[PRODUCT URL]` with the matching `/products/<slug>` internal link.
7. Online Store → Blog posts → Add blog post → use the file's SEO title, meta description, and URL handle exactly as the front matter specifies → paste the body.
8. Set the `editorial.reviewer` and `editorial.last_reviewed` metafields (from Phase 2).
9. Publish.

Guides to publish:
- [ ] `3m-60921-vs-60923-cartridge`
- [ ] `3m-60921-vs-60923-vs-60926-cartridge`
- [ ] `3m-60921-vs-60926-cartridge`
- [ ] `3m-60923-vs-6001-cartridge`
- [ ] `3m-6001-vs-6003-cartridge`
- [ ] `3m-6001-vs-6006-cartridge`
- [ ] `3m-2097-vs-2297-filter`  ← extra-careful here; 3M has revised the 2000-series lineup
- [ ] `3m-6000-vs-7500-half-mask`

---

## Phase 5 — Request indexing in Search Console (15 min)

Skips ahead of normal re-crawl lag (days → hours for the changed pages).

GSC → URL Inspection → paste URL → **Request indexing**.

Submit one each for:
- [ ] The 3 stubborn rogue-brand URLs (Phase 1A)
- [ ] `/collections/product-reviews` (Phase 1B)
- [ ] The 5 shortened-title URLs (Phase 1C)
- [ ] The new short BearKat slug (Phase 1D)
- [ ] Each of the 8 new comparison guides (Phase 4)
- [ ] A sample of 3 affected blog articles to seed the methodology callout (Phase 2)

GSC limits Request Indexing submissions per day; if you hit the cap, prioritize the 8 new guides and the rogue-title URLs.

---

## Phase 6 — Monitor (1–4 weeks, ~10 min/week)

Source: this checklist + the scorecard.

Weekly check:
- [ ] **Week 1:** GSC → Pages → *Duplicate without user-selected canonical* count. Should start dropping. SERP titles on the 3 rogue URLs should be updating.
- [ ] **Week 2:** Spot-check the 12 redirects with `curl -I` — all should still return `HTTP/2 301`. New guides should be appearing in `site:wcsafety.com/blogs/guides/` queries.
- [ ] **Week 3:** Compare GSC Pages → Indexed count against the Phase 0 baseline. Comparison-page sprawl URLs (`/products/<a>-vs-<b>`, `/collections/<a>-vs-<b>`) should be falling out of the index.
- [ ] **Week 4:** Ping me back for a re-grade. Expected: Crawlability 75 → ~83, Content & E-E-A-T 80 → ~84, On-Page 77 → ~82, Overall 78 → ~83–85 (B).

---

## What this checklist does NOT do (and why)

Out of scope for this run — left for a follow-up session:

| Item | Why deferred |
| ---- | ------------ |
| Reconcile the Return Policy page's "Affiliate Marketer" framing with the distributor positioning on About | Copy-decision the operator should make first |
| Rationalize the overlapping non-comparison collections (Hearing Protection vs. Howard Leight Cordless Ear Plugs, etc.) | Needs operator input on which are distinct vs. redundant |
| Set a December refresh cadence for the "Best X 2026" guide cluster | Calendar reminder, not an admin task |
| Add original product photography (the genuine first-hand Experience signal from §2.3) | Physical equipment + camera work; multi-day effort |
| Technical / Performance (CWV, Lighthouse) and Structured Data (JSON-LD validation) | Need on-site inspection from a non-sandboxed environment |

---

## Rollback (if anything breaks)

- **A wrong redirect:** Online Store → Navigation → URL Redirects → delete the row.
- **A bad title:** SEO listing preview → clear the **Page title** field → theme default returns.
- **The methodology callout breaks the article layout:** Edit code → Snippets → temporarily wrap the contents in `{% comment %}` … `{% endcomment %}` to disable while you debug.
- **Worst case:** Online Store → Themes → restore the `pre-seo-execution-YYYY-MM-DD` duplicate created in Phase 0.

---

## After everything ships, re-grade

Ping me back with:
1. Confirmation that all phases are complete
2. A screenshot of GSC → Pages → Indexed (count + trend)
3. The Phase 0 GSC numbers for comparison

I'll re-scan the live index, write a fresh deep sweep, and update
`audits/wcsafety-com-scorecard-2026-05-24.md` with the new score.
