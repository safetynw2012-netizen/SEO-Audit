# SEO-Audit

SEO audit reports live in `audits/`; ready-to-apply fixes live in `fixes/`.

## Reports

- `audits/wcsafety-com-2026-05-15.md` — site-level audit (crawlability,
  titles, E-E-A-T, FTC compliance, technical).
- `audits/wcsafety-com-gsc-query-analysis-2026-06-21.md` — analysis of
  **real Google Search Console** top-query data. Confirms the comparison
  (`/products/X-vs-Y`) pages are the site's top organic asset (pos 1–3),
  finds a `() reviews` title-template bug across dozens of indexed pages,
  identifies the page-2 `p95 vs p100` quick win, product pages
  under-ranking their own model numbers, and a large 0-click off-topic
  footprint to triage. Supersedes the product audit's §6 comparison-page
  recommendation.
- `audits/wcsafety-com-products-2026-06-20.md` — product-level audit of
  the 45-SKU respirator catalog. **Revision 2 is live-validated**: every
  finding is cross-checked against the current wcsafety.com pages (as
  indexed by Google, June 2026), correcting Rev-1 conclusions that were
  based on a stale feed. Headline confirmed issues are now overlong/
  truncating titles and canonical cannibalization between consolidated
  and single-size product pages; GTIN/brand feed items are flagged
  "verify in Shopify." Companion file:
  `fixes/wcsafety-com/products/optimized-titles.csv` (see the audit's
  Appendix A for how its columns should be used after Rev 2).
