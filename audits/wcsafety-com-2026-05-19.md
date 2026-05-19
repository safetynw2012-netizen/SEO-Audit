# SEO Audit (Re-run) — wcsafety.com

- **Site:** https://wcsafety.com/
- **Audit date:** 2026-05-19
- **Previous audit:** `audits/wcsafety-com-2026-05-15.md` (4 days prior)
- **Auditor:** Claude Code (automated)
- **Platform (inferred):** Shopify
- **Business model (self-disclosed):** Affiliate marketer (per `/pages/return-policy`)
- **Brand tagline (indexed):** "Your Home to Everything Safety"

---

## 0. Methodology and scope caveats (unchanged)

Same constraint as the 2026-05-15 audit: the execution environment's
egress policy plus the origin's WAF return **HTTP 403** on every direct
request to `wcsafety.com`. Re-tested this run against:

- `https://wcsafety.com/` — 403
- `https://wcsafety.com/robots.txt` — 403
- `https://wcsafety.com/sitemap.xml` — 403

So `robots.txt`, `sitemap.xml`, on-page DOM, headers, and Core Web
Vitals **still could not be inspected directly**. Findings are
reconstructed from Google's live index (`site:` and content queries)
re-pulled on 2026-05-19. Tags: `[CONFIRMED]` (visible in index),
`[INFERRED]`, `[VERIFY]` (needs origin access).

---

## 1. Executive summary — what changed since 2026-05-15

**Nothing material has changed in the live search footprint.** The
fix artifacts committed to `fixes/wcsafety-com/` (commit `636f2f4`)
are staged in this repo but have **not been deployed to the Shopify
store**. Every P0/P1 from the prior audit is still live:

| Prior finding | Status on 2026-05-19 | Evidence |
| --- | --- | --- |
| §4.1 Faceted/duplicate product URLs indexed | **Still live** | `…/collections/all/products/3m-2091-p100-respirator-filter?_pos=4&_fid=129fedb3b&_ss=c` still indexed; `Products — Page 5` still indexed |
| §4.2 Title-tag template drift | **Still live** | `Tools - WC Safety`, `Product Reviews - WC Safety` still show ASCII hyphen; one product title still has no brand suffix |
| §5.1 Missing trust/info pages | **Still live** | Only `/pages/return-policy` and `/pages/data-sharing-opt-out` indexed; no About / Contact / Affiliate Disclosure / Editorial Methodology |
| §5.2 FTC affiliate disclosure gap | **Still live** | Affiliate status still only disclosed inside the Return Policy page |
| §3.2 WAF blocks non-browser agents | **Still live** | 403 on every direct fetch incl. `robots.txt`, `sitemap.xml` |

**Overall SEO rating: 3 / 10** — unchanged from the 2026-05-19
assessment. No regression, no improvement. The site is technically
functional and indexed but blocked by P0 indexation duplication,
absent E-E-A-T/trust pages, FTC exposure, thin-affiliate quality
risk, and no demonstrated authority.

The single highest-leverage action remains: **deploy the already-
written fixes in `fixes/wcsafety-com/` to the live Shopify store.**
The work is drafted; it just isn't shipped.

---

## 2. Re-verified findings (live as of 2026-05-19)

### 2.1 Faceted / duplicate product URLs `[CONFIRMED]` `priority: P0`

Still indexed in parallel with the canonical:

```
https://wcsafety.com/products/3m-2091-p100-respirator-filter
https://wcsafety.com/collections/all/products/3m-2091-p100-respirator-filter?_pos=4&_fid=129fedb3b&_ss=c
```

`Products — Page 5` (`/collections/all?page=5`) is also still
indexed, confirming the `/collections/all` listing is still
indexable and still duplicating every product.

Remediation (unchanged from prior §4.1): verify `{{ canonical_url }}`
in `layout/theme.liquid`; deploy `theme/robots.txt.liquid` (already
written in this repo) which adds `Disallow: /collections/*?*`; submit
a temporary Search Console removal for `/collections/all/products/*`;
decide `noindex, follow` on `/collections/all`.

### 2.2 Title-tag template drift `[CONFIRMED]` `priority: P1`

Re-pulled SERP titles still show:

| URL | Indexed title | Problem |
| --- | --- | --- |
| `/collections/tools` | `Tools - WC Safety` | ASCII hyphen, not em-dash |
| `/collections/product-reviews` | `Product Reviews - WC Safety` | ASCII hyphen, not em-dash |
| `/collections/all/products/3m-2091-p100-respirator-filter` | `3M 2091 P100 Respirator Filter` | No brand suffix |

Root cause and fix unchanged (per-page SEO metafield overrides;
clear them in the Shopify admin).

### 2.3 Missing trust / info pages `[CONFIRMED]` `priority: P0`

`site:wcsafety.com/pages` still returns only:

- `/pages/return-policy`
- `/pages/data-sharing-opt-out`

About, Contact, Affiliate Disclosure, and Editorial Methodology
drafts exist in `fixes/wcsafety-com/pages/` but are **not published**
(not in Google's index, and the `[BRACKETED]` operator placeholders
in those drafts still need to be filled before publishing).

### 2.4 FTC affiliate-disclosure gap `[CONFIRMED]` `priority: P0`

Affiliate status is still disclosed only inside the Return Policy
body ("WC Safety is an Affiliate Marketer…"). No conspicuous
top-of-guide disclosure; no dedicated `/pages/affiliate-disclosure`
linked from the footer. `theme/snippets/affiliate-disclosure.liquid`
is written in this repo but not applied to any `/blogs/guides/*`
post.

### 2.5 WAF / bot mitigation `[CONFIRMED]` `priority: P1`

Origin still returns 403 to non-browser user-agents, including for
`robots.txt` and `sitemap.xml`. Confirm in the Shopify/CDN/WAF
settings that Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot,
AhrefsBot, and SemrushBot are allowed. (This also explains the
observed Bing-vs-Google asymmetry only partially — the larger driver
is Google's Helpful Content / Reviews quality systems against a
thin-affiliate profile.)

### 2.6 Items still requiring origin access `[VERIFY]`

Unchanged from prior §9 — none could be checked this run because the
403 persists: `robots.txt` contents, `sitemap.xml` URL count and
status codes, on-page canonical/H1/meta/JSON-LD, Core Web Vitals,
Search Console index-exclusion buckets, internal-link graph,
backlink profile.

---

## 3. Prioritised remediation roadmap (re-stated, deploy-focused)

The prior roadmap stands. Re-framed by deployment state:

### Already drafted in `fixes/` — just deploy (P0, this week)
1. Paste `theme/robots.txt.liquid` into the theme (`Disallow:
   /collections/*?*` + Shopify defaults + `Sitemap:`).
2. Fill `[BRACKETED]` placeholders, then publish `about`, `contact`,
   `affiliate-disclosure`, `editorial-methodology` pages.
3. Add the affiliate-disclosure snippet to the top of every
   `/blogs/guides/*` post.
4. Add footer menu links for all of the above + Privacy + Terms.

### Needs admin work, not files (P0–P1)
5. Verify `{{ canonical_url }}` in `layout/theme.liquid`; spot-check
   a faceted URL in Search Console URL Inspection.
6. Clear per-page title overrides on `/collections/tools`,
   `/collections/product-reviews`, and the affected product so the
   default `— WC Safety` template wins.
7. Whitelist legitimate crawler user-agents in the WAF.
8. Generate Privacy Policy + Terms via Shopify Settings → Policies.

### Quality / maintenance (P2)
9. Rewrite the ~190-char MCR Safety glasses slug; 301 the old one.
10. Hide/rename `/collections/master-collection`.
11. Establish the December annual refresh ritual for "Best X 2026"
    guides; plan the 2027 migration.

### Re-audit trigger
Re-run once the `fixes/` artifacts are deployed (or after the WAF is
opened so a real crawl is possible). Until then, every subsequent
re-run will report the same five live findings.

---

## Appendix A — queries used this run (2026-05-19)

- `site:wcsafety.com`
- `site:wcsafety.com/pages …`
- `wcsafety.com return policy affiliate marketer safety equipment`
- Direct fetch attempts (all HTTP 403): `/`, `/robots.txt`,
  `/sitemap.xml`
