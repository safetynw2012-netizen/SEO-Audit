# Canonical verification — wcsafety.com

This is audit §4.1 **step 1**, the step that was skipped when the
robots.txt block shipped in early July 2026. See
`audits/incident-2026-07-robots-block.md` for what that cost.

**Do this before re-touching robots.txt, and before requesting any
validation in Search Console.** Canonical tags are the mechanism that
consolidates the `/collections/<x>/products/<slug>` duplicates onto
`/products/<slug>`. robots.txt cannot do it, and blocking actively
prevents it.

Order matters:

1. Unblock (deploy the revised `theme/robots.txt.liquid`).
2. Verify canonicals — this document.
3. Only then request validation in Search Console.

Requesting validation while pages are still blocked produces a
false pass: Search Console reports blocked pages as "no longer
affected" because it can no longer crawl them.

---

## 1. Theme-level check

Open **Online Store → Themes → Edit code → `layout/theme.liquid`**
and confirm this is present inside `<head>`:

```liquid
<link rel="canonical" href="{{ canonical_url }}">
```

Checklist:

- [ ] The tag exists in `<head>` (not `<body>`).
- [ ] It is not commented out (`{% comment %}` / `<!-- -->`).
- [ ] It uses `{{ canonical_url }}`, not a hardcoded or
      `{{ request.path }}`-derived value.
- [ ] There is exactly **one** `rel="canonical"` in the rendered
      `<head>`. Two canonical tags make Google ignore both.
- [ ] No installed app injects a second one. Check any SEO app
      (schema, meta, or "SEO booster" type) for a canonical setting.

`{{ canonical_url }}` on a `/collections/<x>/products/<slug>` URL
should output `https://wcsafety.com/products/<slug>` — Shopify strips
the collection prefix automatically. If it doesn't, the theme is
overriding it.

## 2. Rendered-output check

For each URL below, view source and record the canonical:

| URL to inspect | Expected canonical |
| --- | --- |
| `/products/3m-2091-p100-respirator-filter` | `https://wcsafety.com/products/3m-2091-p100-respirator-filter` |
| `/collections/all/products/3m-2091-p100-respirator-filter` | `https://wcsafety.com/products/3m-2091-p100-respirator-filter` |
| `/collections/all/products/3m-2091-p100-respirator-filter?_pos=4&_fid=129fedb3b&_ss=c` | `https://wcsafety.com/products/3m-2091-p100-respirator-filter` |
| `/collections/safety-goggles/products/<any-slug>` | `https://wcsafety.com/products/<any-slug>` |
| `/collections/safety-goggles` | `https://wcsafety.com/collections/safety-goggles` |
| `/collections/all?page=5` | `https://wcsafety.com/collections/all?page=5` |

Pass criterion: every product-bearing URL, regardless of collection
prefix or query string, self-reports the bare `/products/<slug>`
canonical. Collection URLs canonicalize to themselves — a paginated
collection must **not** canonicalize to page 1.

- [ ] All six rows verified.

## 3. Search Console confirmation

Per URL, **URL Inspection → "View crawled page"**, and compare:

- **User-declared canonical** — what your tag says.
- **Google-selected canonical** — what Google actually chose.

- [ ] For each `/collections/*/products/*` sample, Google-selected
      canonical is `/products/<slug>`.
- [ ] No sample returns "Blocked by robots.txt". If any does, the
      revised robots.txt hasn't propagated yet — wait and re-check.

Google-selected disagreeing with user-declared is the "Duplicate,
Google chose different canonical than user" state seen on
2026-08-08. Expect it to persist for a while after unblocking:
Google must recrawl before it will revise its choice.

## 4. Recovery monitoring

Track weekly in **Page indexing**:

- [ ] "Blocked by robots.txt" count trending to zero.
- [ ] "Indexed, though blocked by robots.txt" trending to zero.
- [ ] "Duplicate without user-selected canonical" falling.
- [ ] "Duplicate, Google chose different canonical than user" falling.

And in **Performance**, compare impressions for pages containing
`/collections/` against `/products/` versus the pre-2026-07-01
baseline. The healthy end state is `/products/` absorbing the
traffic — consolidation, not just recovery of the duplicates.

Recovery tracks recrawl rate. Expect weeks, not days. Do not add
new blocking rules while waiting; you will lose the ability to tell
which change moved which number.

## 5. If canonicals turn out to be broken

If §1 or §2 fails, that is the actual root cause of the duplicate
indexing the audit flagged, and it was never robots.txt's job to fix.
Repair the tag first, let Google recrawl, and only then evaluate
whether any crawl-budget rule is still needed. Most likely it won't be.
