# Incident — robots.txt block caused indexing loss (July 2026)

**Status:** root cause identified, fix drafted, not yet deployed
**Detected:** 2026-08-09, while investigating why `Product` structured
data disappeared from collection-prefixed URLs
**Impact:** organic traffic loss beginning ~2026-07-01; ~459 URLs
dropped out of Google's structured-data reporting

---

## Summary

Two `Disallow` rules added to `robots.txt.liquid` around 2026-07-01
blocked Googlebot from `/collections/<x>/products/<slug>` URLs:

```
Disallow: /collections/*/products/
Disallow: /collections/all/products/
```

The intent was to stop those duplicates competing with the canonical
`/products/<slug>`, per audit §4.1. The mechanism doesn't work that
way. **robots.txt does not deduplicate — it stops crawling.** A URL
Google cannot crawl is a URL whose `<link rel="canonical">` Google
cannot read, so ranking signals were stranded on the blocked
duplicates rather than consolidated onto the canonical product URLs.

Audit §4.1 listed the fixes **"(in this order)"**, with canonical
verification as step 1 and the robots.txt rule as step 2. Step 1 was
never performed — it remained open item #1 in
`fixes/wcsafety-com/README.md` throughout.

## Evidence

All from Search Console notifications to `SafetyNW2012@gmail.com`.

| Date (UTC) | Signal |
| --- | --- |
| 2026-07-01 | Product snippets: `Either "offers", "review", or "aggregateRating" should be specified` — **+1,000%** |
| **2026-07-03 16:36** | New indexing reasons: **"Indexed, though blocked by robots.txt"** and **"Duplicate without user-selected canonical"** — *same notice* |
| 2026-07-18 | Page indexing validation: some passed, some failed |
| 2026-07-20 | New Product snippets issue detected |
| 2026-07-25 17:14 | Validation requested — **494 pages** affected |
| 2026-07-26 06:27 | **459 pages** reported "no longer affected" |
| **2026-07-28 00:39** | New reason: **"Blocked by robots.txt"** |
| 2026-08-08 | New reason: **"Duplicate, Google chose different canonical than user"** (×2) |

The 2026-07-03 notice is the diagnostic one: blocking and canonical
failure surface together, which is the specific signature of blocking
duplicates before their canonicals are verified.

The 7/03 → 7/28 progression is ordinary decay. "Indexed, though
blocked" means the URL stays in the index on stale signals; once
Google gives up on recrawling it becomes "Blocked by robots.txt" and
falls out. The 8/08 reason means Google is now overriding the
site's declared canonicals.

## The 459 "fixed" pages were not fixed

The 2026-07-26 message reads as a win. It isn't. Search Console
drops a page from structured-data reporting when it can no longer
fetch it, and reports it as "no longer affected". Those 459 URLs
became **uncrawlable**, not compliant. The validation pass recorded
the damage.

This also answers the question that started the investigation —
"when did we pull Product schema off collection pages?" Nobody did.
The markup is presumably still in the templates. Google simply
stopped being able to see it.

## What did not cause the traffic loss

Removing or losing `Product` structured data. Structured data is not
a ranking factor, and the error in question is **critical**, meaning
those items were already ineligible for rich results. There were no
rich results to lose. The schema disappearance and the traffic loss
are two symptoms of the single robots.txt change, not cause and
effect.

## Remediation

1. Deploy the revised `fixes/wcsafety-com/theme/robots.txt.liquid`
   (both `/collections/*/products/` rules removed; the broad
   `/collections/*?*` rule narrowed to filter/sort parameters so
   `?page=` pagination is no longer blocked).
2. Work `fixes/wcsafety-com/canonical-verification.md` end to end —
   audit §4.1 step 1, still outstanding.
3. Only then request validation in Search Console. Validating while
   pages are blocked produces a false pass, exactly as on 2026-07-26.
4. Monitor per §4 of the canonical checklist. Recovery tracks recrawl
   rate; expect weeks.

## Open items

- The live `robots.txt` has not been read directly from this
  environment (wcsafety.com is blocked by network policy; the
  Shopify connector token is expired). Confirm by loading
  `https://wcsafety.com/robots.txt` and checking for the
  `/collections/*/products/` rules.
- Exact deploy date is inferred from Search Console's first
  "Indexed, though blocked by robots.txt" notice (2026-07-03).
  The theme file's `updatedAt`, or GSC's robots.txt fetch history,
  would pin it precisely.
- Whether the theme still emits `Product` JSON-LD on those URLs is
  unverified for the same access reasons.

## Lesson

Duplicate content is a canonical-tag problem. Blocking a duplicate
is strictly worse than leaving it crawlable: a crawlable duplicate
passes its signals to the canonical, a blocked one strands them.
Where audit steps are ordered, the order is load-bearing.
