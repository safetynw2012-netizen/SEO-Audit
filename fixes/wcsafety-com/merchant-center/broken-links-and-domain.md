# Broken links + domain-match remediation

Addresses Merchant Center requirements **"domain must match the uploaded
domain"** and **"no broken links."** Report sections §2 and §3.

---

## Part A — Domain match

Three values must be the **identical** registrable domain on `https://`:

1. Merchant Center → **Business info → Website** (claimed + verified URL).
2. The **`link`** attribute on every feed item.
3. The domain the shopper lands on **after all redirects**.

### Checklist

- [ ] Shopify *Settings → Domains*: one **Primary domain** chosen (apex
      `wcsafety.com` **or** `www.wcsafety.com` — pick one).
- [ ] All other domains show **"Redirect to primary domain" = on**,
      including the `*.myshopify.com` URL.
- [ ] Feed `link` values use the **primary** domain with `https://`
      (check the Shopify *Google & YouTube* channel output, not a stale
      spreadsheet).
- [ ] Merchant Center website = the **same** primary domain, `https://`,
      **verified and claimed by this account** (not an old/other account).
- [ ] Test in a browser: requesting `http://`, `www`, and the apex all
      land on the single primary `https://` host with **one** 301, no
      loop.

### Common failures

| Symptom | Fix |
| ------- | --- |
| Feed `link` = `wc-safety.myshopify.com`, claimed = `wcsafety.com` | Regenerate feed from primary domain |
| `www` in feed, apex claimed (or vice-versa) | Align both to the chosen primary |
| `http://` feed links 301 → `https://` | Emit `https://` directly in the feed |
| Website claimed by a different Merchant account | Re-claim from this account |

---

## Part B — Broken links

Google crawls the **entire** site, not just feed landing pages. Any
`404`, `5xx`, redirect loop, or dead **outbound** (affiliate/retailer)
link counts.

### Process

1. **Crawl** from a non-sandboxed IP with a Googlebot user-agent using
   Screaming Frog, Sitebulb, or Ahrefs/Semrush Site Audit. Enable
   external-link checking.
2. **Export** every internal + external `4xx`/`5xx` and every redirect
   chain longer than 1 hop.
3. **Fix internal:** repair or remove the link; for moved slugs add a
   Shopify **URL redirect** (*Settings → … → URL redirects*).
4. **Fix outbound:** re-point or remove dead retailer/affiliate links —
   affiliate link rot is the #1 source here.
5. **404 status:** confirm the 404 page returns a real `404`, not
   `200 + soft 404`.
6. **Re-crawl** until the broken-link export is empty.

### Known structural risk areas (from the SEO audit)

- Faceted/duplicate URLs `/collections/all/products/<slug>?_pos=…`
  (SEO audit §4.1).
- The ~190-char keyword-stuffed product slug (SEO audit §4.6) — if
  shortened, add a 301 from the old slug.
- `/collections/master-collection` placeholder route (SEO audit §4.7).
- Outbound "Check price / Buy on Amazon" affiliate links across all
  guides and product pages.

### Recurring maintenance

- [ ] Monthly automated link-rot crawl (outbound links especially).
- [ ] Re-run after any theme change, bulk product import, or slug edit.
</content>
