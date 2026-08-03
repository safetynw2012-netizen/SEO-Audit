# GSC re-indexing queue — 10 rewritten URLs (2026-08-03)

Ten wcsafety.com URLs to push through **Search Console → URL Inspection →
Request indexing**, selected because each one (a) has had its indexed
content rewritten by this project and (b) carries documented
under-performance in the last real Search Console export.

Companion to `EXECUTE.md` Phase 5 (which lists the same action but a
different, earlier URL set).

---

## 0. Read this before using the list

**This session could not submit anything to Search Console, and could not
measure traffic loss directly.** Both limits are environmental, not
judgement calls:

| Blocked capability | Why | Consequence |
| ------------------ | --- | ----------- |
| Submitting URLs to GSC | No Google Search Console connector is installed on this account (available connectors: Ahrefs, Canva, Gmail, Google Drive, Microsoft 365, Profound, Shopify). The Indexing / URL Inspection API is not reachable from any tool here. | **Submission is a manual operator step.** The list below is paste-ready. |
| Page-level clicks/impressions trend | The Ahrefs MCP returns `Insufficient plan` on every endpoint tried — `gsc-pages`, `gsc-page-history`, `site-explorer-top-pages`, even `subscription-info-limits-and-usage`. SERPWatcher's Jul-2026 report for wcsafety.com tracks 0 keywords (performance index 0/100, 0 estimated visits). | **"Lost traffic" could not be measured live.** The proxy used instead is the owner-supplied GSC export analysed in `audits/wcsafety-com-gsc-query-analysis-2026-06-21.md` (branch `claude/seo-analysis-products-am2goj`) — real first-party data, but a June snapshot, not a decline curve. |
| Live-page verification | The sandbox egress policy still blocks `wcsafety.com` (`CONNECT tunnel failed, response 403`) — same constraint as every prior audit in this repo. | Rewrites are confirmed from repo artifacts, not from the live HTML. Confirm each page shows the new title/body **before** requesting indexing. |

**Selection rule actually applied**, in the absence of a rewrite-loop log
anywhere in the repo (10 branches searched), Drive, or Gmail:

> A URL qualifies if a repo artifact documents a rewrite of its indexed
> content (SEO title, slug, or body copy) **and** the 2026-06-21 GSC
> export shows it stranded — deep position, high-impression/zero-click, or
> a duplicate-title collision.

If "the rewrite loop" refers to a specific batch tracked outside this
repo, swap the rows — the submission procedure in §2 is unchanged.

---

## 1. The 10 URLs

Submit in this order; rows 1–4 are the ones where a re-crawl changes what
Google shows soonest.

| # | URL | What was rewritten | Performance evidence | Source artifact |
|--:| --- | ------------------ | -------------------- | --------------- |
| 1 | `https://wcsafety.com/collections/product-reviews` | SEO title + meta description — was inheriting the **homepage title** verbatim (duplicate title across two high-value URLs) | Duplicate-title collision on a hub page; flagged for verify-then-act in the product-reviews analysis | `on-page-polish.md` §2 |
| 2 | `https://wcsafety.com/collections/3m-6500-series-half-mask-respirators` | SEO title — stripped the rogue *"America's Safety Gear Experts"* suffix after 2.5 weeks of it persisting in SERPs | Collection head terms stranded pos 50–70 with 100+ impressions (`half mask respirators` 65 impr @ 70.7; `3m respirator` 134 @ 56.0) | `on-page-polish.md` §1 |
| 3 | `https://wcsafety.com/products/3m-1100-foam-ear-plugs-cordless-nrr-29` | SEO title — same rogue-brand suffix removed | `corded ear plugs` 166 impr @ pos 42.2, zero clicks | `on-page-polish.md` §1 |
| 4 | `https://wcsafety.com/products/brk-first-alert-9120bff-smi100-ac-smoke-detector-hardwired-alarm-with-battery-backup-white-1-pack` | SEO title — rogue-brand suffix removed, title cut to 56 chars | Sits in the smoke-detector cluster that generates the site's largest 0-click impression block | `on-page-polish.md` §1 |
| 5 | `https://wcsafety.com/blogs/guides/3m-filter-cartridge-guide` | SEO title rewritten 95 → 56 chars (was truncating in SERPs) | Core-catalog guide; `respirator cartridges` 146 impr @ 58.6, `respirator filters` 133 @ 60.7 — all 0 clicks | `on-page-polish.md` §3 |
| 6 | `https://wcsafety.com/blogs/guides/best-carbon-monoxide-detector-2026` | SEO title rewritten 78 → 55 chars | `best co detector` cluster ranks pos ~9–11 at **0 clicks** — a CTR problem the shorter title targets directly | `on-page-polish.md` §3 |
| 7 | `https://wcsafety.com/blogs/guides/n95-vs-kn95-vs-p100-which-respirator-do-you-actually-need` | SEO title rewritten 73 → 50 chars | The P-rating cluster is page 2 with heavy demand: `p95 vs p100` 229 impr @ 11.7, `p95 vs p100 respirator` 108 @ 10.6 | `on-page-polish.md` §3; GSC analysis §4 |
| 8 | `https://wcsafety.com/blogs/reference/osha-flammable-cabinet-requirements` | SEO title rewritten 48 chars (previous title truncated **mid-word** in live results) | Mid-word truncation suppresses CTR on every impression it earns | `on-page-polish.md` §3 |
| 9 | `https://wcsafety.com/blogs/product-reviews/cobd10-kidde-10-year-battery-co-alarm-digital-display-review` | SEO title rewritten to 52 chars (was truncating) | Single-product reviews are the healthiest review surface on the site — worth protecting | `on-page-polish.md` §3 |
| 10 | `https://wcsafety.com/products/mcr-bearkat-bkh20-bifocal-safety-glasses` | **URL rewritten** — 190-char keyword-stuffed slug shortened; old handle 301s to this one | New canonical needs its own crawl; the old URL's signals only consolidate once Google fetches the target | `on-page-polish.md` §4 |

All artifact references live on branch `claude/website-seo-ranking-jOVbM`
under `fixes/wcsafety-com/`.

### Deliberately excluded

- `/products/3m-60921-vs-60923` and the other comparison pages — they rank
  **pos 1–3** and were not rewritten. Do not disturb them (GSC analysis §1
  reverses the earlier recommendation to redirect them).
- The two comparison guides published 2026-06-14 — new pages, not rewrites
  of traffic-losing ones. `EXECUTE.md` Phase 5 already queues those.
- `/pages/return-policy` and the About methodology section — rewrites are
  drafted (`pages/return-policy-rewrite.md`,
  `pages/methodology-eeat-rewrite.md`) but still marked 📝 in
  `CHANGELOG.md`, i.e. not published. Nothing to re-crawl yet.

---

## 2. Submission procedure

For each URL, in the order above:

1. **Verify the rewrite is live first.** Open the URL, View Source, confirm
   the `<title>` matches the recommended value in `on-page-polish.md`.
   Requesting indexing on an unchanged page burns quota and teaches Google
   nothing. For row 10, confirm the old 190-char slug returns `HTTP/2 301`
   to the short one.
2. Search Console → **URL Inspection** → paste the URL → Enter.
3. If it reports the indexed version is stale, click **Request indexing**.
4. Log the date submitted in the tracking table below.

**Quota:** Request Indexing is capped at roughly a dozen URLs/day per
property and the cap is shared with `EXECUTE.md` Phase 5. If you hit it,
rows 1–4 are the priority; the rest can wait a day.

**Do not** submit the same URL repeatedly — re-submission does not
accelerate anything and Google explicitly ignores duplicate requests.

### Tracking

| # | URL | Rewrite verified live | Submitted | Re-crawled (per URL Inspection) |
|--:| --- | :-------------------: | :-------: | :-----------------------------: |
| 1 | `/collections/product-reviews` | ☐ | ☐ | ☐ |
| 2 | `/collections/3m-6500-series-half-mask-respirators` | ☐ | ☐ | ☐ |
| 3 | `/products/3m-1100-foam-ear-plugs-cordless-nrr-29` | ☐ | ☐ | ☐ |
| 4 | `/products/brk-first-alert-9120bff-…-1-pack` | ☐ | ☐ | ☐ |
| 5 | `/blogs/guides/3m-filter-cartridge-guide` | ☐ | ☐ | ☐ |
| 6 | `/blogs/guides/best-carbon-monoxide-detector-2026` | ☐ | ☐ | ☐ |
| 7 | `/blogs/guides/n95-vs-kn95-vs-p100-…-need` | ☐ | ☐ | ☐ |
| 8 | `/blogs/reference/osha-flammable-cabinet-requirements` | ☐ | ☐ | ☐ |
| 9 | `/blogs/product-reviews/cobd10-kidde-…-review` | ☐ | ☐ | ☐ |
| 10 | `/products/mcr-bearkat-bkh20-bifocal-safety-glasses` | ☐ | ☐ | ☐ |

---

## 3. What to measure afterwards

Re-indexing changes the *snippet*, not the ranking — so the metric that
should move first is **CTR at unchanged position**, not position itself.

- **Days 1–7:** confirm the new titles are rendering in
  `site:wcsafety.com` results for each URL. If Google is still showing the
  old title after a re-crawl, the page-level SEO title override in Shopify
  admin wasn't actually cleared (see `on-page-polish.md` §1 step 4).
- **Weeks 2–4:** in GSC → Performance, compare clicks and CTR per page
  against the pre-submission baseline, holding average position constant.
  Rows 3, 5, 6 are the cleanest tests — all had large impression counts at
  zero clicks.
- **Row 10 specifically:** watch for the old 190-char URL dropping out of
  the index and the short one appearing. Both showing at once means the
  301 isn't being honoured.

If CTR doesn't move on a page whose position held, the title wasn't the
binding constraint there — the next lever is the `() reviews` template bug
(GSC analysis §3), which pollutes titles sitewide and is not fixed by
re-indexing.
