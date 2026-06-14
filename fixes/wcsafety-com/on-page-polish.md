# On-page polish — paste-ready fixes

Companion to `audits/wcsafety-com-scorecard-2026-05-24.md` §2.2. Three
concrete items that move On-Page SEO from **77 (C+)** to **~82 (B−)** and
support the overall climb to **~85 (B)**. None requires new content; all
are admin or theme-edit work.

---

## 1. The persistent rogue-brand titles (3 URLs)

After 2.5 weeks of re-crawl opportunity, three pages still show
*"America's Safety Gear Experts"* in the SERP title. This is almost
certainly because **the SEO title field is set per-item in Shopify admin
and overrides the theme template** on these specific items — and they were
not in the operator's earlier "cleared" batch.

### How to fix each one in Shopify

For each of the 3 URLs below:

1. Open the item in Shopify admin (Online Store → Products/Collections).
2. Scroll to the **Search engine listing preview** card at the bottom.
3. Click **Edit website SEO**.
4. **Either** (a) clear the **Page title** field entirely — the theme
   will fall back to `{{ page_title }} — {{ shop.name }}`; **or** (b) paste
   the clean title from the table below.
5. Save.
6. Confirm with **View source** that the live `<title>` no longer contains
   "America's Safety Gear Experts."
7. Request re-indexing in Search Console → URL Inspection → **Request
   indexing** (forces a fast re-crawl rather than waiting weeks).

### The 3 URLs and recommended titles

| URL | Recommended SEO title | Chars |
| --- | --------------------- | ----: |
| `/collections/3m-6500-series-half-mask-respirators` | `3M 6500 Series Half Mask Respirators \| WC Safety` | 49 |
| `/products/3m-1100-foam-ear-plugs-cordless-nrr-29` | `3M 1100 Foam Ear Plugs (NRR 29, Cordless) \| WC Safety` | 53 |
| `/products/brk-first-alert-9120bff-smi100-ac-smoke-detector-hardwired-alarm-with-battery-backup-white-1-pack` | `BRK First Alert 9120BFF Hardwired Smoke Alarm \| WC Safety` | 56 |

---

## 2. The `/collections/product-reviews` collection — wrong title

The Product Reviews collection is indexed with the **homepage title**
(*"WC Safety | Expert Industrial PPE Reviews & ANSI/OSHA Compliance Guide"*)
instead of a distinct collection title — duplicate-title across two
high-value URLs.

**Fix:** Same path as §1, but set a distinct title:

| URL | Recommended SEO title | Chars |
| --- | --------------------- | ----: |
| `/collections/product-reviews` | `Product Reviews — Independent PPE & Safety Tests \| WC Safety` | 60 |

Also worth setting a distinct **meta description** for this collection so
it doesn't inherit the homepage description:

> *Hands-on, NIOSH/UL/ANSI-grounded product reviews for respirators,
> cartridges, CO and smoke alarms, and the rest of the PPE category. Zero
> sponsored listings.*

---

## 3. Over-length titles that truncate in SERPs

Google renders ~55–60 characters (~580 px) of title on desktop. Anything
above that gets cut mid-phrase — sometimes mid-word — and your keyword
disappears from the visible SERP listing. These are the ones I've seen
truncate in live results:

| URL | Current title (chars) | Recommended shorter title | Chars |
| --- | --------------------- | ------------------------- | ----: |
| `/blogs/guides/3m-filter-cartridge-guide` | *3M Respirator Filter & Cartridge Guide (2026): Charts, Comparisons & Job-Site Selection — WC Safety* (95) | `3M Filter & Cartridge Guide (2026): Charts & Comparisons` | 56 |
| `/blogs/guides/best-carbon-monoxide-detector-2026` | *Best Carbon Monoxide Detector (2026): 10 Top-Rated CO Alarms Ranked — WC Safety* (78) | `Best Carbon Monoxide Detector 2026: 10 CO Alarms Ranked` | 55 |
| `/blogs/guides/n95-vs-kn95-vs-p100-which-respirator-do-you-actually-need` | *N95 vs. KN95 vs. P100: Which Respirator Do You Actually Need? — WC Safety* (73) | `N95 vs KN95 vs P100: Which Respirator Do You Need?` | 50 |
| `/blogs/reference/osha-flammable-cabinet-requirements` | *OSHA Flammable Cabinet Requirements: 29 CFR 1910.106 and NFPA 30 Expla...* (truncated mid-word) | `OSHA Flammable Cabinet Rules: 1910.106 & NFPA 30` | 48 |
| `/blogs/product-reviews/cobd10-kidde-10-year-battery-co-alarm-digital-display-review` | *Kidde COBD10 10-Year Battery CO Alarm with Digital Display Review (4.4...* (truncated) | `Kidde COBD10 10-Year Battery CO Alarm Review (4.4/5)` | 52 |

**Fix:** for each, open the item in Shopify admin → Search engine listing
preview → set the **Page title** to the value in the right column. Keep
the on-page H1 long if you want — it's only the SEO/SERP title that needs
to fit. Suffix `— WC Safety` or `| WC Safety` is optional on long
guide titles; Google often drops the brand on long titles anyway.

---

## 4. The 190-character MCR BearKat slug

The slug:

```
/products/mcr-safety-glasses-bearkat-bkh20-clear-polycarbonate-lenses-uv-light-protective-eyewear-with-scratch-resistant-duramass-technology-bifocal-safety-glasses-2-0-diopter
```

is ~190 chars of keyword-stuffed URL — far above Google's recommended URL
length and a pattern-match for spammy thin-affiliate sites. The product's
**title** has been cleaned up; the **URL** was never shortened.

### Step-by-step fix

1. **Rename the product handle** in Shopify admin: Products → open this
   product → scroll to **Search engine listing preview** → **Edit website
   SEO** → change **URL handle** to:
   `mcr-bearkat-bkh20-bifocal-safety-glasses`
2. Save. The new canonical URL becomes
   `/products/mcr-bearkat-bkh20-bifocal-safety-glasses`.
3. Shopify will auto-create a 301 from the old handle to the new one —
   confirm under **Online Store → Navigation → URL Redirects**, you should
   see a new row whose source is the old slug. If not, **add it manually**:

   | Redirect from | Redirect to |
   | ------------- | ----------- |
   | `/products/mcr-safety-glasses-bearkat-bkh20-clear-polycarbonate-lenses-uv-light-protective-eyewear-with-scratch-resistant-duramass-technology-bifocal-safety-glasses-2-0-diopter` | `/products/mcr-bearkat-bkh20-bifocal-safety-glasses` |
4. Confirm with `curl -I` on the old URL — must return `HTTP/2 301` with
   the `location:` header pointing at the new short slug.

---

## 5. Land the methodology on every review/guide (the E-E-A-T multiplier)

The repo now ships `theme/snippets/research-methodology-callout.liquid` —
a single Liquid snippet that places the editorial methodology, named
reviewer, last-reviewed date, scope honesty statement, and links to the
methodology + affiliate-disclosure pages **at the bottom of every blog
article**. Same call site, same wording, sitewide. Closes a substantial
chunk of the Content & E-E-A-T category.

### Install in three steps

1. **Add the snippet** to the theme: Online Store → Themes → Edit code →
   Snippets → **Add a new snippet** → name it `research-methodology-callout`
   → paste the contents of
   `fixes/wcsafety-com/theme/snippets/research-methodology-callout.liquid`.
2. **Render it in the article template**: open `sections/main-article.liquid`
   (or whichever your theme uses to render `article.content`). Just below
   the `{{ article.content }}` output, add:

   ```liquid
   {% render 'research-methodology-callout',
             reviewer: article.metafields.editorial.reviewer,
             last_reviewed: article.metafields.editorial.last_reviewed %}
   ```
3. **Add two article metafields** (Settings → Custom data → Articles →
   Add definition) under namespace `editorial`:
   - `reviewer` — Single line text (e.g. `Jane Doe, CIH`).
   - `last_reviewed` — Date.

   Then for each article, fill in the two fields under the article's
   "Metafields" panel. If left blank, the callout falls back to "WC Safety
   Editorial Team" and the article's `published_at` date — not ideal for
   E-E-A-T (still pseudonymous) but never broken.

### Drop-in Markdown alternative

If editing theme files isn't an option right now, paste this block at the
bottom of every guide/review body (Shopify Online Store → Blog posts →
edit each article). Replace `[REVIEWER NAME, credential]` and `[DATE]`
each time:

```markdown
---

### How this review was researched

This article was built against primary sources: the [NIOSH Certified
Equipment List](https://www.cdc.gov/niosh/npptl/topics/respirators/cel/default.html)
for any respirator and cartridge TC-approval cross-reference,
[OSHA 29 CFR 1910.134](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.134)
for workplace respiratory-protection program requirements, and the
relevant ANSI/ASSE standards, UL listings, and manufacturer technical
data sheets.

**What we did:** hands-on inspection of the unit we stock, on-unit
verification of certification markings against the source database,
specification cross-reference against the governing standard.
Photographs on this page are our own.

**What we did not do:** destructive testing, laboratory
filtration-efficiency testing, or quantitative fit-factor measurement.
Where a conclusion depends on data only a lab or field test can produce,
we cite NIOSH or the manufacturer rather than imply we measured it
ourselves.

This article is not a substitute for a workplace respiratory-protection
program or a Certified Industrial Hygienist's assessment. For
program-level decisions, engage a qualified safety professional. For
suspected acute exposure, contact a physician, urgent care, or U.S.
Poison Control at **1-800-222-1222**.

**Reviewed by:** [REVIEWER NAME, credential] · **Last reviewed:** [DATE] ·
[Full editorial methodology](/pages/editorial-methodology) ·
[Affiliate disclosure](/pages/affiliate-disclosure)
```

---

## Expected score impact (after Google re-crawls the changes)

| Fix | Category | Lift |
| --- | -------- | ---- |
| §1 — Clear rogue-brand SEO titles (3 URLs) | On-Page | +1–2 pts |
| §2 — Set distinct title for `/collections/product-reviews` | On-Page | +1 pt |
| §3 — Shorten the over-length SERP titles | On-Page | +1–2 pts |
| §4 — 301 the 190-char BearKat slug | On-Page + Crawlability | +1 pt each |
| §5 — Install methodology callout sitewide + named reviewer | E-E-A-T | +3–5 pts |

**Realized projection:** On-Page **77 → ~82 (B−)**; E-E-A-T **80 → ~84 (B)**;
overall **78 (C+) → ~82–83 (B−/B)** once Google re-crawls (1–3 weeks).
