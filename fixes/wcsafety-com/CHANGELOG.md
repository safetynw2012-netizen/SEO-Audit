# `fixes/wcsafety-com/` — index & status

Single navigation aid for every artifact in this directory. If you're new
to this folder, **start with `EXECUTE.md`** — it sequences the rest into a
work plan you can run start-to-finish.

Last updated: 2026-06-15.

## Status legend

- ✅ **Published / done** — operator has executed and Google has crawled.
- 🟡 **In flight** — published or shipped, awaiting re-crawl or partial execution.
- 📝 **Ready** — paste-ready artifact in the repo, no operator action yet.
- 🚫 **Blocked / deferred** — needs operator input or out-of-sandbox capability.

---

## 1. Where to start

| File | What it is |
| ---- | ---------- |
| **`EXECUTE.md`** | **Master 7-phase checklist** sequencing every artifact in this folder. Pre-flight, on-page polish, theme deploy, redirects, guide publishing, indexing requests, monitoring. Read this first. |
| `README.md` | Original repo overview (covers the 2026-05 fix artifacts: about/contact/affiliate-disclosure/editorial-methodology + robots + affiliate-disclosure snippet). Pre-dates EXECUTE.md. |
| `CHANGELOG.md` | This file. |

---

## 2. Plans (read-only — no admin clicks)

These are diagnostic/strategy docs. They drive the action items in
EXECUTE.md and the scripts, but on their own they don't change anything.

| File | What it covers | Status |
| ---- | -------------- | :----: |
| `comparison-url-consolidation.md` | The 3-URL comparison sprawl (/products/, /collections/, /blogs/guides/). 13 topics, 12 redirects, naming convention. | 📝 |
| `collection-rationalization.md` | Non-comparison overlapping collections. 3 merges + 1 rename. SKU + GSC pre-check gates. | 📝 |
| `on-page-polish.md` | Per-item title/slug fixes: 3 rogue-brand titles, product-reviews collection title, 5 over-length titles, 190-char BearKat slug, methodology-callout install. | 📝 (scripted in `scripts/`) |
| `refresh-cadence.md` | Annual December → January refresh ritual for "Best X 2026" guides. Calendar reminders, year-stamped guide inventory, the two update strategies. | 📝 (calendar, not code) |

---

## 3. Page / copy artifacts

Drop-in replacement bodies for Shopify pages. Each marks operator-fillable
values as `[VERIFY]` or `[CHOOSE]`. None automated — pasted in Shopify
admin.

| File | Target page | Status |
| ---- | ----------- | :----: |
| `pages/about.md` | `/pages/about` | ✅ (published) |
| `pages/contact.md` | `/pages/contact` | ✅ (published) |
| `pages/affiliate-disclosure.md` | `/pages/affiliate-disclosure` | ✅ (published) |
| `pages/editorial-methodology.md` | `/pages/editorial-methodology` (full-page template) | 📝 (operator may have merged elements into About) |
| `pages/methodology-eeat-rewrite.md` | Replacement for the live About page's "How we research products" section. Reframes from "we don't" disclaimers to evidence-forward methodology while preserving the no-fabricated-testing stance. | 📝 |
| `pages/return-policy-rewrite.md` | `/pages/return-policy`. Reconciles the "Affiliate Marketer / returns handled by Affiliates" line with the About page's "stocks and ships direct + Amazon Associates secondary" framing. Adds PPE-specific non-returnable list. | 📝 |

---

## 4. Comparison-guide drafts (`blogs/guides/`)

Paste-ready blog post drafts for the 9 missing comparison guides. Every
NIOSH TC number, weight, and chemical-protection claim is marked
`[VERIFY]` — operator fills these against the NIOSH CEL before publishing.

| File | URL | Status |
| ---- | --- | :----: |
| `blogs/guides/3m-60921-vs-60923-cartridge.md` | `/blogs/guides/3m-60921-vs-60923-cartridge` | ✅ (published 2026-06-14) |
| `blogs/guides/3m-60921-vs-60923-vs-60926-cartridge.md` | `/blogs/guides/3m-60921-vs-60923-vs-60926-cartridge` | 📝 |
| `blogs/guides/3m-60921-vs-60926-cartridge.md` | `/blogs/guides/3m-60921-vs-60926-cartridge` | 📝 |
| `blogs/guides/3m-60923-vs-6001-cartridge.md` | `/blogs/guides/3m-60923-vs-6001-cartridge` | 📝 |
| `blogs/guides/3m-6001-vs-6003-cartridge.md` | `/blogs/guides/3m-6001-vs-6003-cartridge` | ✅ (published 2026-06-14) |
| `blogs/guides/3m-6001-vs-6006-cartridge.md` | `/blogs/guides/3m-6001-vs-6006-cartridge` | 📝 |
| `blogs/guides/3m-2097-vs-2297-filter.md` | `/blogs/guides/3m-2097-vs-2297-filter` | 📝 (marked `[VERIFY]` heavily — 3M revises this lineup) |
| `blogs/guides/3m-6000-vs-7500-half-mask.md` | `/blogs/guides/3m-6000-vs-7500-half-mask` | 📝 |
| `blogs/guides/3m-6000-vs-6500-half-mask.md` | `/blogs/guides/3m-6000-vs-6500-half-mask` | 📝 |
| `blogs/guides/README.md` | (overview + paste-ready redirect table) | 📝 |

---

## 5. Theme artifacts (`theme/`)

Files that go in the Shopify theme editor.

| File | Where it goes | Status |
| ---- | ------------- | :----: |
| `theme/robots.txt.liquid` | Theme → Templates → robots/liquid | ✅ (deployed; Disallow rules landing) |
| `theme/snippets/affiliate-disclosure.liquid` | Theme → Snippets. Per-guide affiliate disclosure block, included near affiliate links. | 📝 (operator manual install) |
| `theme/snippets/research-methodology-callout.liquid` | Theme → Snippets. Methodology + named reviewer + last-reviewed block, included at the bottom of every article. | 📝 (`apply-theme.mjs` uploads this) |
| `theme/snippets/article-jsonld.liquid` | Theme → Snippets. Article + (optional) Review JSON-LD, included in `<head>` of `layout/theme.liquid` gated on `request.page_type == 'article'`. | 📝 (`apply-theme.mjs` uploads this) |

---

## 6. Scripts (`scripts/`)

Local Node.js scripts that authenticate via env (`SHOPIFY_STORE`,
`SHOPIFY_ADMIN_TOKEN`) and mutate Shopify via the Admin GraphQL API. Token
never enters this repo or any committed file. Default is **DRY RUN**.

| File | What it does | Status |
| ---- | ------------ | :----: |
| `scripts/README.md` | Setup, security rules, run order, error map. | 📝 |
| `scripts/package.json` | Single dep: `marked` (only for `publish-guides.mjs`). | 📝 |
| `scripts/lib/shopify.mjs` | GraphQL helper, env validation, dry-run flag, 429 auto-retry. | 📝 |
| `scripts/apply-redirects.mjs` | Creates the 12 comparison-URL redirects + 3 commented collection-merge redirects. Per-row `destinationLive` gate so a redirect to an unpublished guide can't ship. | 📝 (6 of 12 safe today; flip per-publish) |
| `scripts/apply-seo-titles.mjs` | Updates SEO titles + descriptions on the 3 rogue-brand URLs + product-reviews collection + 5 over-length article titles. Commented Phase 1D BearKat handle rename. | 📝 |
| `scripts/publish-guides.mjs` | Auto-publishes the 9 comparison-guide drafts. 3-level safety gating (dry / draft / live) + hard refusal on any `[VERIFY]` placeholder. | 📝 (refuses all 9 today until placeholders are filled) |
| `scripts/apply-theme.mjs` | Uploads `research-methodology-callout.liquid` + `article-jsonld.liquid` via `themeFilesUpsert`. Prints the manual `{% render %}` insertion blocks for `sections/main-article.liquid` and `layout/theme.liquid`. | 📝 |
| `scripts/.gitignore` | Belt-and-braces against committing `.env`. | n/a |

---

## 7. Operator backlog at a glance

Pulled from EXECUTE.md, ranked by impact-per-effort:

1. 🟡 **Run `apply-redirects.mjs --apply`** → ships 6 of 12 redirects today. The 6 destinations are live.
2. 🟡 **Run `apply-seo-titles.mjs --apply`** → fixes 3 rogue-brand titles, product-reviews title, 5 over-length titles.
3. 🟡 **Fill `[VERIFY]` markers on 1–2 of the unpublished guides** and run `publish-guides.mjs --apply`. Repeat per guide as you have time.
4. 🟡 **Run `apply-theme.mjs --apply`** → uploads both snippets. Then add the two `{% render %}` calls in admin.
5. 🟡 **Paste `pages/return-policy-rewrite.md` body** into the Return Policy page.
6. 🟡 **Name a real reviewer** in the `editorial.reviewer` article metafield. Single biggest E-E-A-T lever.
7. 🚫 **Validate JSON-LD** at validator.schema.org + search.google.com/test/rich-results (operator only — egress-blocked from this sandbox).
8. 🚫 **Run PageSpeed / Lighthouse** on homepage + top collection + top guide. Unlocks the Technical/Performance unscored category.
9. 📝 **Calendar reminders from `refresh-cadence.md`** for the December year-flip ritual.

---

## 8. What's NOT in this folder (and why)

- **Original product photography.** Needs a camera + the physical unit. Highest E-E-A-T Experience signal for review content but multi-day physical work, not scriptable.
- **Lighthouse / CWV / PageSpeed reports.** Need a non-sandbox browser, accessible from any operator machine.
- **JSON-LD validation reports.** Same — validator.schema.org egress-blocked from here.
- **Anything operating directly via Shopify admin clicks.** Use the scripts.
- **Backlink monitoring & competitor analysis.** Out of scope of this folder; Ahrefs / Semrush land.
