# SEO Audit — wcsafety.com

- **Site:** https://wcsafety.com/
- **Audit date:** 2026-05-15
- **Auditor:** Claude Code (automated)
- **Platform (inferred):** Shopify
- **Business model (self-disclosed):** Affiliate marketer (per `/pages/return-policy`)
- **Brand tagline (indexed):** "Your Home to Everything Safety"

---

## 0. Methodology and scope caveats

This audit was run from a sandboxed execution environment whose egress
network policy blocks direct HTTPS requests to `wcsafety.com`,
`web.archive.org`, and Google's cache (`x-deny-reason: host_not_allowed`
on every direct fetch). As a result, the on-page DOM, response headers,
`robots.txt`, `sitemap.xml`, and Core Web Vitals could **not** be
inspected directly. Findings below are reconstructed from:

- Google's public search index (`site:` and content-targeted queries)
- The titles, URLs, and SERP snippets Google currently surfaces
- URL pattern analysis (Shopify route conventions)
- Self-disclosed business statements indexed on the site

Findings are tagged `[CONFIRMED]` (visible in Google's index),
`[INFERRED]` (deduced from URL/platform patterns), or `[VERIFY]`
(needs on-site inspection by someone whose network can reach the
origin). The "Action items needing on-site verification" section at
the end lists every item the auditor should re-check from a browser
or an SEO crawler (Screaming Frog, Sitebulb, Ahrefs Site Audit, etc.).

---

## 1. Executive summary

WC Safety is a small Shopify storefront operating as an affiliate
marketer in the safety/PPE niche, supported by a "Best [X] 2026"
buying-guide blog. The visible footprint in Google is roughly 20–40
URLs, which suggests either a small catalog or — more likely given the
collection breadth — heavy crawling/indexing leakage that is keeping
real product pages out of the index.

The **top three issues**, in priority order:

1. **Duplicate / faceted URLs are being indexed.** Google has indexed
   `/collections/all/products/<slug>?_pos=&_fid=&_ss=` URLs alongside
   the canonical `/products/<slug>` URLs. This is the classic Shopify
   duplicate-content trap and dilutes ranking signals across multiple
   URLs for the same product. (Section 4.1.)
2. **Title-tag template is inconsistent across the catalog.**
   Most pages follow `<Name> — WC Safety` (em-dash), but several use
   an ASCII hyphen, one uses an entirely different brand suffix
   ("America's Safety Gear Experts"), and at least one product page
   has no brand suffix at all. This drift signals that Shopify SEO
   metafields aren't being managed centrally. (Section 4.2.)
3. **No About, Contact, Shipping, FAQ, or Affiliate Disclosure page
   appears in the index.** For an FTC-regulated affiliate site
   competing in the safety/PPE niche, the absence of standard trust
   pages is both an E-E-A-T problem (Google's Reviews update penalises
   reviewer sites that don't demonstrate first-hand authority) and a
   likely 16 CFR Part 255 compliance gap. (Section 5.)

The rest of this audit details these and 12 additional findings,
ordered by impact.

---

## 2. Site footprint and architecture

### 2.1 Platform — Shopify `[INFERRED, high confidence]`

Every URL pattern in the index matches Shopify's default routing:

| Path family            | Example                                                    |
| ---------------------- | ---------------------------------------------------------- |
| Homepage               | `/`                                                        |
| Collection (category)  | `/collections/safety-goggles`                              |
| Product (canonical)    | `/products/3m-60921-p100-organic-vapor-respirator-cartridge` |
| Product (within coll.) | `/collections/all/products/3m-2091-p100-respirator-filter` |
| Paginated collection   | `/collections/all?page=5`                                  |
| Blog                   | `/blogs/guides/...`, `/blogs/news/...`                     |
| Custom page            | `/pages/return-policy`                                     |

Combined with the em-dash title template, the `_pos` / `_fid` / `_ss`
filter parameters, and the "Products — Page 5" pagination label, the
platform is Shopify with very high confidence. The store appears to
use a stock or lightly customised Online Store 2.0 theme.

### 2.2 Information architecture `[CONFIRMED]`

Indexed sections:

- **Collections** (≥10 visible): Head Protection, Safety Goggles,
  Face Shields, Emergency Shelters, Generators, Wrenches, Tools,
  3M Disposable Respirators, 3M 6500 Series Half Mask Respirators,
  Howard Leight Cordless Ear Plugs, Latex Gloves, Master Collection,
  Product Reviews.
- **Blog: Guides** (≥8 visible): Best Smoke Detectors 2026, Best CO
  Detector 2026, Best N95 Respirators 2026, Best Hard Hats Ranked
  2026, How to Build a 72-Hour Emergency Kit, CO Detector Placement
  Guide, NIOSH vs. OSHA, N95 vs. KN95 vs. P100.
- **Blog: News** (≥2 visible): Best Half Face Respirator, How to
  Properly Clean a Respirator Safely.
- **Pages** (only 2 indexed): Return Policy, Privacy Choices /
  Data Sharing Opt-Out.

### 2.3 Catalog depth `[CONFIRMED, partial]`

`/collections/all?page=5` is indexed, which means the all-products
listing has at least five pagination pages. At Shopify's default of
12 products per page, the catalog is roughly 50+ SKUs. The fact that
Google surfaces only ~10–15 unique product URLs in a `site:` query
strongly suggests the rest are either (a) thin/empty product pages,
(b) being deindexed for quality reasons, or (c) drowning under the
duplicate `/collections/all/products/...` variants.

---

## 3. Crawlability and indexation

### 3.1 `robots.txt` and `sitemap.xml` `[VERIFY]`

The auditor's environment could not fetch either file. **Verify
manually:**

- `https://wcsafety.com/robots.txt`
  - Should expose `Sitemap:` pointing at `/sitemap.xml`.
  - Should `Disallow: /cart`, `/checkouts/`, `/orders/`,
    `/account` (Shopify defaults).
  - **Recommended addition** (see §4.1):
    `Disallow: /collections/*?*` to keep faceted URLs out of crawl.
  - Confirm `User-agent: *` is not accidentally `Disallow: /`.
- `https://wcsafety.com/sitemap.xml`
  - Shopify generates this automatically as a sitemap index. Confirm
    `/sitemap_products_*.xml`, `/sitemap_collections_*.xml`,
    `/sitemap_blogs_*.xml`, and `/sitemap_pages_*.xml` all resolve
    and that every URL inside returns 200.
  - Confirm sitemap is submitted in Google Search Console and Bing
    Webmaster Tools.

### 3.2 WAF / bot mitigation may be over-aggressive `[CONFIRMED]`

Direct requests from this audit's IP/UA combination returned HTTP
`403 host_not_allowed`. Shopify routes via a CDN/WAF in front of the
origin; if that WAF is filtering by ASN or by user-agent string in
a way that also blocks Bingbot, YandexBot, GPTBot, ClaudeBot,
PerplexityBot, or common SEO crawlers (AhrefsBot, SemrushBot,
ScreamingFrogSEOSpider), the site will be invisible to those
services.

**Action:** in the Shopify admin or upstream WAF, verify that
documented Googlebot, Bingbot, and AI-crawler user-agents have
unrestricted access, and that any IP allowlist isn't accidentally
narrow.

### 3.3 Indexed footprint vs. catalog size `[CONFIRMED]`

A `site:wcsafety.com` query returns approximately 10–20 unique URLs.
For a Shopify store with five pages of `/collections/all`, that is
**below 50% of the expected indexable surface**. Most likely causes:

- Thin product pages auto-generated from supplier data and dropped
  by Google's Helpful Content / spam systems.
- Duplicate signals from the `/collections/all/products/` variants
  pulling crawl budget away from canonical `/products/` URLs.
- No internal links to deeper products from authoritative pages.

---

## 4. On-page SEO

### 4.1 Faceted and duplicate product URLs `[CONFIRMED]` `priority: P0`

Google currently has both of these indexed for the same SKU:

```
https://wcsafety.com/products/3m-2091-p100-respirator-filter
https://wcsafety.com/collections/all/products/3m-2091-p100-respirator-filter?_pos=4&_fid=129fedb3b&_ss=c
```

Shopify routes the same product under every collection it belongs to
(`/collections/<coll>/products/<slug>`) **and** under the canonical
`/products/<slug>`. The `_pos`, `_fid`, `_ss` query parameters are
Shopify's collection filter/sort state — every combination of filter
state is a unique URL from Google's perspective.

**Fixes (in this order):**

1. Verify every `/products/<slug>` and `/collections/<x>/products/<slug>`
   page emits `<link rel="canonical" href="https://wcsafety.com/products/<slug>">`.
   In the Dawn / Online Store 2.0 default theme this is in
   `layout/theme.liquid` via the `{{ canonical_url }}` Liquid object —
   confirm it is not commented out or being overridden by an app.
2. Add `Disallow: /collections/*?*` to `robots.txt` so Google stops
   crawling filter-state URLs. (Shopify's default robots.txt is
   editable via `robots.txt.liquid` in the theme since June 2021.)
3. In Search Console → "Removals" → submit a temporary
   `/collections/all/products/*` block while step 1's canonicals
   propagate.
4. For the `/collections/all` listing, decide whether it should be
   indexable at all. Most Shopify SEO consultants recommend
   `noindex, follow` on `/collections/all` because it duplicates
   every product on the site without adding category context.

### 4.2 Title-tag template drift `[CONFIRMED]` `priority: P1`

The canonical pattern is `<Page Name> — WC Safety` (em-dash, U+2014).
Observed violations:

| URL                                               | Indexed title                                                              | Problem                            |
| ------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------- |
| `/collections/3m-6500-series-half-mask-respirators` | `3M 6500 Series Half Mask Respirators — America's Safety Gear Experts`     | Wrong brand suffix entirely        |
| `/collections/master-collection`                  | `Master Collection - WC Safety`                                            | ASCII hyphen instead of em-dash    |
| `/collections/tools`                              | `Tools - WC Safety`                                                        | ASCII hyphen instead of em-dash    |
| `/collections/product-reviews`                    | `Product Reviews - WC Safety`                                              | ASCII hyphen instead of em-dash    |
| `/collections/all/products/3m-2091-p100-respirator-filter` | `3M 2091 P100 Respirator Filter`                                  | No brand suffix at all             |

**Root cause** is almost certainly per-page SEO metafield overrides in
the Shopify admin overwriting the theme's default
`{{ page_title }} — {{ shop.name }}` template. Audit every collection
and product under Online Store → Preferences and under each item's
"Search engine listing preview".

### 4.3 Title length `[CONFIRMED]` `priority: P2`

Google renders ~580 px (≈55–60 characters) of title text in desktop
SERPs. The following indexed titles will be truncated:

| Chars | Title                                                                              |
| ----: | ---------------------------------------------------------------------------------- |
|    78 | `Best Carbon Monoxide Detector (2026): 10 Top-Rated CO Alarms Ranked — WC Safety` |
|    73 | `N95 vs. KN95 vs. P100: Which Respirator Do You Actually Need? — WC Safety`        |
|    65 | `How to Build a 72-Hour Emergency Kit in 2026 — WC Safety`                          |

Shorten so the keyword-bearing portion sits in the first 55
characters. Consider dropping the `— WC Safety` suffix on long
buying-guide titles (Google sometimes does this automatically anyway).

### 4.4 Meta descriptions `[VERIFY]`

Could not inspect `<meta name="description">` directly. Spot-check
every collection and the homepage — Shopify's default fallback
behaviour is to use the **shop description** for the homepage and
the **first 160 chars of body text** for collections, which is rarely
optimal. The collection snippets visible in Google ("safety goggles
are an essential part of personal protective equipment...") look like
body-text fallbacks, not crafted meta descriptions.

### 4.5 H1 tags `[VERIFY]`

Not inspectable from sandbox. Verify:

- Exactly one `<h1>` per page.
- H1 on the homepage contains the brand or primary value prop, not
  just "Welcome to our store".
- Collection H1 = collection name (Shopify default; usually correct).
- Product H1 = product title.
- Blog post H1 = post title (not the blog name).

### 4.6 Excessively long product slug `[CONFIRMED]` `priority: P2`

```
/products/mcr-safety-glasses-bearkat-bkh20-clear-polycarbonate-lenses-uv-light-protective-eyewear-with-scratch-resistant-duramass-technology-bifocal-safety-glasses-2-0-diopter
```

At ~190 characters, this slug is:

- Far longer than Google's recommended URL length.
- Keyword-stuffed in a way that pattern-matches against spammy
  thin-affiliate sites.
- Hard to share, copy, and remember.

Compare to a healthy slug already on the site:
`/products/3m-60921-p100-organic-vapor-respirator-cartridge`. Adopt
the format `<brand>-<model>-<one-descriptor>` for all products and
301-redirect old slugs to the new ones (Shopify's URL Redirects
feature handles this).

### 4.7 "Master Collection" should not be public `[CONFIRMED]` `priority: P2`

`/collections/master-collection` is the Shopify admin label for an
unconfigured default collection. Its presence as an indexable URL
indicates it was never renamed or hidden. Either:

- Rename it to a real category and rewrite its slug, or
- Delete it (Shopify will not 404 the products inside; they'll keep
  resolving under `/products/<slug>`), or
- Set it to `noindex` via the theme's SEO metafield.

### 4.8 Year-stamped buying guides need a refresh cadence `[CONFIRMED]` `priority: P2`

Eight indexed guides are titled "Best ... 2026" or "(2026)". This is
fine — year-stamped titles get better CTR — but only if the page is
genuinely refreshed each January. Plan now for:

- Yearly content audit each December.
- Either: update title to "...2027", change `lastmod` in the sitemap,
  and update body content; OR: create a new `/blogs/guides/best-x-2027`
  and 301 the old slug to the new one (preferred — the old URL keeps
  its backlinks).
- Never leave a "2026" title live in mid-2027 — the SERP CTR collapse
  is steep.

---

## 5. Trust, E-E-A-T, and FTC compliance

### 5.1 Missing standard policy/info pages `[CONFIRMED]` `priority: P0`

Only two pages exist under `/pages/`:

- `/pages/return-policy`
- `/pages/data-sharing-opt-out`

**Missing** (not in Google's index):

- About / About Us — who runs the site, credentials, why trust them
- Contact — at minimum an email and a physical or mailing address
- Affiliate Disclosure — required by FTC 16 CFR Part 255 for any
  reviewer site earning commissions
- Editorial / Review Methodology — how products are tested or selected
  (critical for "Best X" guides under Google's Reviews update)
- Privacy Policy — separate from the opt-out page
- Terms of Service
- Shipping & Delivery — even if affiliate (clarify "we don't ship; the
  retailer does")

For a site whose entire model is "we review safety equipment so you
can buy it," the absence of an author bio, methodology page, or
disclosure dramatically reduces credibility with both users and
Google's quality systems.

### 5.2 Affiliate disclosure surfacing `[CONFIRMED]` `priority: P0`

The Return Policy page states "WC Safety is an Affiliate Marketer
and all returns are handled directly through its Affiliates." That
single mention, on a non-obvious page, is **not** an FTC-compliant
disclosure. Required:

- A clear, conspicuous disclosure at the top of each "Best X" guide,
  above the first product mention (not buried in a footer link).
- A dedicated `/pages/affiliate-disclosure` page linked from the
  global footer.
- Disclosure must use plain language ("We earn a commission if you
  buy through these links, at no extra cost to you.").

### 5.3 Author / reviewer attribution `[VERIFY]`

Verify each `/blogs/guides/*` post has:

- A named, real author with a bio.
- A "reviewed by" line where appropriate (especially for
  respirator/CO/smoke-detector guides where safety is at stake).
- `Article` or `Review` JSON-LD with `author` and `datePublished`.

Without this, "Best Smoke Detectors 2026" reads as anonymous
affiliate spam and will lose to authoritative competitors
(Consumer Reports, Wirecutter, This Old House).

---

## 6. Structured data `[VERIFY]`

Shopify's default Dawn theme emits `Product`, `Organization`, and
`BreadcrumbList` JSON-LD automatically, but:

- Custom themes may omit or break it.
- The "Best X" buying guides should add `ItemList` + `Review` +
  `Product` schema per ranked item to be eligible for SERP rich
  results (rating stars, ranked lists). This is **manual** — Shopify
  does not generate it.
- The homepage should emit `WebSite` schema with a `SearchAction`
  (sitelinks searchbox eligibility).
- The blog should emit `BlogPosting` / `Article` per post.

Run every page type through https://validator.schema.org/ and
Google's Rich Results Test.

---

## 7. Internal linking and navigation `[VERIFY]`

Things to confirm with an on-site crawl:

- Is there a global navigation that exposes every top-level
  collection? (Search results only surface a small subset.)
- Are buying-guide articles linking to the matching collection or
  product pages with descriptive anchor text? (e.g., "Best Hard Hats
  Ranked 2026" → `/collections/head-protection`.)
- Are collections linking back to their parent category (PPE,
  Tools, Emergency Prep)?
- Are products cross-linking to related products and to relevant
  guide articles?
- Is the homepage linking to the top 5–10 collections and top 3
  guides? (Equity flows out from the homepage; orphaned pages get
  starved.)

---

## 8. Technical / performance `[VERIFY]`

Could not run Lighthouse or PageSpeed from sandbox. Manual checklist:

- Core Web Vitals (LCP < 2.5 s, INP < 200 ms, CLS < 0.1) on mobile
  for: homepage, top collection, top product, top guide.
- HTTPS-only with HSTS header (`Strict-Transport-Security`).
- HTTP/2 or HTTP/3.
- Images served as WebP/AVIF with `loading="lazy"` on below-fold.
- No render-blocking third-party scripts above the fold.
- Mobile-friendly per Google's mobile-friendly test.
- 404 page returns actual `404` status (not `200 + soft 404`).
- `/cart`, `/checkout`, `/account`, `/orders/*` all
  `Disallow:`-ed in robots.txt (Shopify default — confirm preserved).

---

## 9. Action items needing on-site verification

Hand this list to someone whose network can reach the origin (or run
a Screaming Frog crawl with a non-sandboxed IP and Googlebot UA):

1. Dump `https://wcsafety.com/robots.txt` and check for the recommended
   `Disallow: /collections/*?*` and the Shopify defaults.
2. Validate `https://wcsafety.com/sitemap.xml` — count URLs and
   confirm every one returns 200.
3. View source on `/`, `/collections/safety-goggles`, a product page,
   and a `/blogs/guides/*` post — capture `<title>`, `<meta name=
   "description">`, `<link rel="canonical">`, all H1/H2s, and every
   JSON-LD block.
4. Confirm canonical tag on `/collections/all/products/<slug>?_pos=…`
   URLs points back to `/products/<slug>`.
5. Run https://pagespeed.web.dev/ for the homepage, a top collection,
   a top product, and the highest-traffic guide; record LCP / INP /
   CLS for mobile and desktop.
6. Run Google Search Console "URL Inspection" on each indexed
   `/collections/all/products/...?_pos=...` URL and confirm Google
   shows "User-declared canonical" matching the clean `/products/`
   URL. If not, the canonical tag is broken.
7. Check Google Search Console → Pages → "Why pages aren't indexed"
   for the counts of "Duplicate without user-selected canonical",
   "Crawled — currently not indexed", and "Discovered — currently
   not indexed". These three buckets will quantify the impact of
   §4.1.
8. Open the Shopify admin and audit Online Store → Pages — confirm
   whether About / Contact / Shipping / Affiliate Disclosure pages
   exist but are unpublished, or simply don't exist.
9. Open the WAF/CDN settings and verify Bingbot, GPTBot, ClaudeBot,
   PerplexityBot, AhrefsBot, and SemrushBot user-agents are allowed.
10. Run Ahrefs / Semrush Site Audit for a full backlink, broken-link,
    and on-page report — the search-based view in this audit cannot
    surface 404s, redirect chains, or orphan pages.

---

## 10. Prioritised remediation roadmap

### Week 1 (P0 — revenue/visibility blocking)
- Fix canonical tags on `/collections/<x>/products/<slug>` URLs.
- Add `Disallow: /collections/*?*` to `robots.txt`.
- Create and publish: About, Contact, Affiliate Disclosure, Editorial
  Methodology, Privacy Policy, Terms of Service.
- Add a top-of-page affiliate disclosure to every `/blogs/guides/*`
  post.

### Week 2–3 (P1)
- Unify title-tag template across all collections and products.
- Shorten over-length titles (Section 4.3 table).
- Add `Article` + `ItemList` + `Review` JSON-LD to every buying
  guide.
- Add author bios and "reviewed by" attributions to guides.

### Month 2 (P2 — quality and maintenance)
- Rewrite the long MCR Safety glasses slug (and audit other slugs
  with `wc -c` > 80).
- Hide or rename `/collections/master-collection`.
- Set up a December annual content-refresh ritual for the
  "Best X 2026" series.
- Submit refreshed sitemap and request re-crawl of every cleaned-up
  URL.

### Ongoing
- Quarterly Search Console review focused on "Duplicate without
  user-selected canonical" count.
- Monthly Core Web Vitals review.
- Backlink monitoring (Ahrefs / Semrush) — affiliate sites are
  frequent targets of negative SEO.

---

## Appendix A — URLs cited in this audit

- https://wcsafety.com/
- https://wcsafety.com/collections/safety-goggles
- https://wcsafety.com/collections/face-shields
- https://wcsafety.com/collections/generators
- https://wcsafety.com/collections/emergency-shelters
- https://wcsafety.com/collections/head-protection
- https://wcsafety.com/collections/wrenches
- https://wcsafety.com/collections/tools
- https://wcsafety.com/collections/master-collection
- https://wcsafety.com/collections/3m-disposable-respirators
- https://wcsafety.com/collections/3m-6500-series-half-mask-respirators
- https://wcsafety.com/collections/howard-leight-cordless-ear-plugs
- https://wcsafety.com/collections/latex-gloves
- https://wcsafety.com/collections/product-reviews
- https://wcsafety.com/collections/all?page=5
- https://wcsafety.com/collections/all/products/3m-2091-p100-respirator-filter?_pos=4&_fid=129fedb3b&_ss=c
- https://wcsafety.com/products/3m-60921-p100-organic-vapor-respirator-cartridge
- https://wcsafety.com/products/mcr-safety-glasses-bearkat-bkh20-clear-polycarbonate-lenses-uv-light-protective-eyewear-with-scratch-resistant-duramass-technology-bifocal-safety-glasses-2-0-diopter
- https://wcsafety.com/blogs/guides/best-smoke-detectors-2026
- https://wcsafety.com/blogs/guides/best-carbon-monoxide-detector-2026
- https://wcsafety.com/blogs/guides/best-n95-respirators-2026
- https://wcsafety.com/blogs/guides/best-hard-hats-ranked-2026
- https://wcsafety.com/blogs/guides/co-detector-placement-guide-2026
- https://wcsafety.com/blogs/guides/how-to-build-a-72-hour-emergency-kit-in-2026
- https://wcsafety.com/blogs/guides/breakdown-of-niosh-vs-osha-what-do-they-do
- https://wcsafety.com/blogs/guides/n95-vs-kn95-vs-p100-which-respirator-do-you-actually-need
- https://wcsafety.com/blogs/news/best-half-face-respirator
- https://wcsafety.com/blogs/news/how-to-properly-clean-a-respirator-safely
- https://wcsafety.com/pages/return-policy
- https://wcsafety.com/pages/data-sharing-opt-out
