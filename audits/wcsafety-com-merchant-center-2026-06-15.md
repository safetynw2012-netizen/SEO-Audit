# Google Merchant Center Remediation — wcsafety.com

- **Site:** https://wcsafety.com/
- **Report date:** 2026-06-15
- **Author:** Claude Code (automated)
- **Platform (inferred):** Shopify
- **Trigger:** Google Merchant Center disapproval —
  *"Website or online store needs improvement / Limits visibility of all
  products in United States"* under the **"Provide a useful and
  transparent shopping experience"** policy.
- **Companion docs:** `audits/wcsafety-com-2026-05-15.md` (full SEO
  audit), `fixes/wcsafety-com/` (paste-ready fix artifacts).

---

## 0. What the disapproval actually means

Google sent this exact notice:

> **Website or online store needs improvement** — Limits visibility of
> all products in United States. There was a problem identified with your
> website. Update your entire website to provide a useful and transparent
> shopping experience for customers. Make sure your website meets the
> following requirements:
>
> - Your website should have a domain name that matches the uploaded
>   domain name
> - Your entire website shouldn't have any broken links
> - Your website shouldn't contain any placeholder images or text
> - The product details and categories should match those that you
>   provide in your product data
> - Your website shouldn't contain generic information and shouldn't miss
>   crucial information about products

This is an **account/destination-level** enforcement (it says *all*
products in the United States), not a per-item issue. Until it is
cleared, **every** product is suppressed in US Shopping surfaces (free
listings + Shopping ads). Per-item fixes alone will not lift it — Google
re-reviews the **whole site** and the landing-page experience.

It is filed under the Merchant Center **"Misrepresentation"** family,
specifically the *"Provide a useful and transparent shopping experience"*
requirement. The five bullets are Google's published landing-page
checklist, and this report is organised around them one-for-one.

### Methodology and scope caveat (same as the SEO audit)

This report was produced from a sandboxed environment whose egress
policy blocks direct HTTPS to `wcsafety.com` (`host_not_allowed`). On-DOM
verification of titles, prices, images, links, and feed values could
**not** be performed here. Findings are tagged:

- `[CONFIRMED]` — visible in Google's public index / prior audit.
- `[INFERRED]` — deduced from Shopify conventions + the disclosed
  business model.
- `[VERIFY]` — must be checked from a browser, a crawler, or the Merchant
  Center / Shopify admin before sign-off.

Every `[VERIFY]` item is collected into the checklist in §8.

---

## 1. The root-cause finding you must decide first `[CONFIRMED]` `priority: P0`

The prior audit established, from the site's own Return Policy, that:

> "WC Safety is an Affiliate Marketer and all returns are handled
> directly through its Affiliates."

That single fact is the most likely **root cause** of this disapproval,
and it has to be resolved before the five cosmetic bullets matter.

**Google Merchant Center lists products on the premise that the merchant
named in the account is the seller** — the entity that takes payment,
fulfils, and handles returns on its own domain. A storefront that imports
supplier/affiliate catalog data, shows products it does not itself stock,
and hands the customer off (or whose returns are "handled by affiliates")
is exactly the pattern Google's reviewers flag as *not a useful and
transparent shopping experience*. The symptoms Google lists — generic
copy, placeholder images, landing-page data that doesn't match the feed —
are the **fingerprints of imported affiliate/dropship catalog data**, not
coincidental cosmetic bugs.

You therefore have to pick a lane, and the rest of this document changes
depending on which:

| Path | What it means | What §2–§6 require |
| ---- | ------------- | ------------------- |
| **A. Become a genuine first-party seller** | WC Safety actually sells and ships the SKUs in the feed; cart/checkout on `wcsafety.com` completes the sale; you own returns. | Do all of §2–§6. This is the only path that keeps products in Merchant Center. |
| **B. Stay an affiliate/review site** | You keep redirecting buyers to Amazon/Grainger/Home Depot. | You should **stop advertising these as your own products in Merchant Center** — the feed misrepresents who the seller is. Remove the product feed; pursue traffic through organic/affiliate channels and the SEO fixes in the companion audit instead. Submitting a feed for goods you don't sell will keep tripping Misrepresentation. |

> **Decision required from the operator.** Everything below assumes
> **Path A** (you want these products live in US Shopping). If the real
> answer is Path B, the correct fix is to remove the Merchant Center feed,
> not to polish the storefront — note that and stop here.

---

## 2. Requirement 1 — Domain must match the uploaded domain `[VERIFY]` `priority: P0`

> *"Your website should have a domain name that matches the uploaded
> domain name."*

Google compares three things and they must all be the **same** registrable
domain on `https`:

1. The **website URL** claimed and verified in Merchant Center
   (Business info → About your business → "Website").
2. The **`link`** value on every item in the product feed.
3. The domain the customer actually lands on **after all redirects**.

Common Shopify failure modes to check:

- **`myshopify.com` vs custom domain.** If the feed `link` (or the claimed
  URL) points at `wc-safety.myshopify.com` while the verified domain is
  `wcsafety.com` (or vice-versa), every click looks like a cross-domain
  redirect and the match fails. Shopify's default `.myshopify.com` URL
  must 301 to the primary domain, and the feed must emit the **primary
  domain**.
- **`www` vs apex.** Decide on one (`https://wcsafety.com` *or*
  `https://www.wcsafety.com`), make the other 301-redirect to it, and use
  the canonical one everywhere — Merchant Center, feed `link`, Shopify
  *Settings → Domains → primary domain*.
- **`http` → `https`.** The verified URL and every feed `link` must be
  `https://`. An `http://` feed link that redirects to `https://` is a
  redirect mismatch.
- **Domain claim still valid.** Merchant Center → Business info →
  verify the website is both **verified and claimed** by this account,
  and not claimed by a different/old account.

**Remediation:**

1. Shopify *Settings → Domains*: set `wcsafety.com` (your choice of apex
   vs www) as **Primary domain**; confirm all other domains "Redirect to
   primary domain" is **on**.
2. In the product feed source (Shopify's *Google & YouTube* channel app,
   or whatever feed tool is in use), confirm the generated `link` uses the
   primary domain with `https://`.
3. Merchant Center → Business info → Website: ensure the claimed URL is
   the **identical** primary domain, verified and claimed by this account.
4. Re-verify with the "request review" only after 2–4 match.

---

## 3. Requirement 2 — No broken links `[VERIFY]` `priority: P0`

> *"Your entire website shouldn't have any broken links."*

Google's reviewer crawls the whole site, not just feed landing pages. Any
`404`, `5xx`, redirect loop, or dead outbound link counts. The prior SEO
audit already flagged structural sources of breakage:

- **Faceted / duplicate URLs** (`/collections/all/products/<slug>?_pos=…`)
  — even if these resolve `200` today, the `robots.txt.liquid` fix and the
  long keyword-stuffed slugs raise the risk of stale internal links and
  redirect chains. (SEO audit §4.1, §4.6.)
- **Affiliate "Check price / Buy on Amazon" outbound links** — affiliate
  link rot is the single most common broken-link source on review sites.
  Dead or parked affiliate URLs read to Google as broken links and as a
  broken shopping experience.
- **`/collections/master-collection`** and other unconfigured default
  routes — orphan/placeholder routes that may 404 or soft-404.

**Remediation (do all):**

1. **Crawl the entire site** with a real crawler from a non-sandboxed IP
   using a Googlebot UA: Screaming Frog, Sitebulb, or Ahrefs/Semrush Site
   Audit. Export every `4xx`/`5xx` (internal **and** external) and every
   redirect chain > 1 hop.
2. **Fix or remove** each broken internal link; add Shopify *URL
   Redirects* (Settings → … → URL redirects, or the *Navigation* /
   *Redirects* admin) for any moved product/collection slugs.
3. **Re-check every outbound retailer/affiliate link.** Replace or remove
   dead ones. Set a recurring monthly link-rot check (affiliate links
   change constantly).
4. **Confirm the 404 page returns a real `404` status**, not `200 + soft
   404` (Shopify's default 404 is fine; custom themes sometimes break it).
5. Re-crawl until the broken-link export is **empty**, then request review.

A reusable process + checklist is in
`fixes/wcsafety-com/merchant-center/broken-links-and-domain.md`.

---

## 4. Requirement 3 — No placeholder images or text `[INFERRED]` `priority: P0`

> *"Your website shouldn't contain any placeholder images or text."*

For a Shopify store built from imported supplier/affiliate data, this is
almost certainly a **real and current** violation. Placeholders Google
penalises include:

- **Theme demo content** still live: "Welcome to my store", "Your
  collection's description", default Dawn/Debut hero text, the stock
  "Talk about your brand" / "Share your store policies" blocks, sample
  collections, and demo blog posts.
- **Lorem ipsum** or "Description coming soon" / "TBD" in product bodies.
- **Missing/placeholder product images**: the grey Shopify "no image"
  camera icon, a generic stock swatch, watermarked supplier photos, or the
  same hero image reused across unrelated SKUs.
- **`[BRACKETED]` placeholders in your own new pages.** The pages shipped
  in `fixes/wcsafety-com/pages/*.md` (About, Contact, Affiliate
  Disclosure, Editorial Methodology) **all still contain bracketed
  placeholders** (real names, email addresses, mailing address, founding
  year, affiliate networks). If those pages were published as-is, they are
  themselves a Requirement-3 violation. **Fill every `[BRACKET]` before
  publishing** — see §0 of `fixes/wcsafety-com/README.md`.

**Remediation:**

1. Run the placeholder scan in
   `fixes/wcsafety-com/merchant-center/placeholder-scan.md` against the
   live site (it lists the exact strings and image patterns to grep/crawl
   for).
2. Every product must have **at least one real, owned-or-licensed image**
   that actually depicts that exact SKU. No "image coming soon", no shared
   generic photo, no hot-linked supplier image you don't have rights to.
3. Replace all demo/theme copy with real, store-specific content.
4. Search-and-replace every `[BRACKETED]` value in the new trust pages.

---

## 5. Requirement 4 — Landing-page details and categories must match the feed `[VERIFY]` `priority: P0`

> *"The product details and categories should match those that you provide
> in your product data."*

This is the **literal heart** of "transparent shopping experience": what
the customer sees on the landing page must equal what you submitted in the
feed. Google's reviewer cross-checks, per item:

| Feed attribute | Must match on the landing page |
| -------------- | ------------------------------- |
| `title` | Visible product title / `<h1>` |
| `price` | Displayed price (same currency, incl. the same shown tax/shipping basis) |
| `sale_price` | Displayed sale price + sale validity |
| `availability` | "In stock / out of stock" shown matches feed (`in_stock`, `out_of_stock`, `preorder`) |
| `image_link` | The main product image is the same image |
| `gtin` / `mpn` / `brand` | Brand + model/identifiers shown on page |
| `product_type` / `google_product_category` | The on-site category/breadcrumb is consistent and sane |
| `condition` | New/used/refurbished shown matches |

The single most common reason for **this** disapproval is a **price or
availability mismatch** (feed says \$19.99 in stock; page shows \$24.99 or
"sold out"). Currency must be USD for US, and any price shown to the bot
must equal the price a US shopper sees (watch ge/IP price switching and
currency-converter apps — those frequently break the match).

**Remediation:**

1. **Single source of truth.** Let Shopify's *Google & YouTube* sales
   channel generate the feed directly from product records so the feed and
   the page are driven by the same data. Avoid a hand-edited spreadsheet
   feed that drifts from the storefront.
2. **Audit price + availability parity** on a sample across every
   collection; fix any product where the page and feed disagree.
3. **Disable IP/geo price or currency switching** for Googlebot and US
   shoppers, or make sure the displayed USD price equals the feed price.
4. **Fix category coherence:** breadcrumbs and on-site collection
   assignment should match `product_type`; set a correct
   `google_product_category` per item. Rename/hide
   `/collections/master-collection` (SEO audit §4.7) so no product sits in
   a meaningless category.
5. Use the per-field parity table in
   `fixes/wcsafety-com/merchant-center/product-page-requirements.md` as the
   sign-off checklist for each SKU.

---

## 6. Requirement 5 — No generic info; don't omit crucial product info `[INFERRED]` `priority: P0`

> *"Your website shouldn't contain generic information and shouldn't miss
> crucial information about products."*

"Generic" = the same templated paragraph reused across SKUs, or
manufacturer marketing boilerplate with no store-specific substance.
"Crucial information missing" = a shopper can't actually make a purchase
decision: no specs, no clear price, no shipping/returns terms, no contact
path, no seller identity.

This requirement overlaps heavily with the SEO audit's E-E-A-T section
(§5) — the same missing trust pages that hurt SEO also fail this Merchant
Center bullet. **Crucial site-wide information that must be present and
linked from the footer on every page:**

- **Contact information** — a real business name, email, and a physical/
  mailing address (use `fixes/wcsafety-com/pages/contact.md`).
- **Return & refund policy** — clear, specific, and *honest about who
  handles returns* (exists at `/pages/return-policy`; make sure it reads as
  a real first-party policy if you're on Path A).
- **Shipping & delivery** — costs, methods, timeframes, regions.
- **Payment / checkout** — secure checkout on your domain (Path A).
- **Business identity** — About page with who you are
  (`fixes/wcsafety-com/pages/about.md`).
- **Privacy Policy & Terms** — Shopify's *Settings → Policies* generator.

**Per-product, "not generic" means each page carries SKU-specific:**

- Brand, exact model number / MPN, and GTIN/UPC.
- Real technical specifications (size, weight, materials, certifications —
  e.g. NIOSH 42 CFR 84, ANSI/ISEA Z89.1, UL 217/2034, ANSI Z87.1).
- What's in the box, compatible parts, intended use.
- A **unique** description written for that product — not the same
  paragraph cloned across the catalog, and not raw supplier marketing copy
  shared by every other dropshipper.
- Genuine, specific images of that SKU.

**Remediation:** rewrite thin/duplicate product bodies using the required
structure in
`fixes/wcsafety-com/merchant-center/product-page-requirements.md`, and
publish + footer-link the trust pages already drafted in
`fixes/wcsafety-com/pages/`. If you operate as an affiliate (Path B), the
FTC affiliate disclosure (SEO audit §5.2) is also crucial-info that must
be conspicuous — but again, Path B means you should not be running the
Merchant Center feed at all.

---

## 7. Remediation order and how to request review

Do **not** click "Request review" until every box below is checked —
a failed review can extend the cool-down before the next one.

### Step 1 — Strategic decision (blocks everything)
- [ ] Decide Path A (genuine seller) vs Path B (affiliate → remove feed).
      (§1)

### Step 2 — If Path A, fix the five requirements (any order, but all)
- [ ] **Domain match:** primary domain set, redirects on, feed `link` +
      Merchant Center URL identical `https` domain, verified & claimed.
      (§2)
- [ ] **Broken links:** full crawl clean of `4xx`/`5xx`, redirect chains
      resolved, outbound affiliate links live, real `404` status. (§3)
- [ ] **Placeholders:** zero demo/theme copy, zero lorem/"coming soon",
      every SKU has a real image, every `[BRACKET]` in the new pages
      filled. (§4)
- [ ] **Feed parity:** title/price/availability/image/brand/category match
      the feed on every sampled SKU; currency USD; no geo price switching.
      (§5)
- [ ] **Crucial + non-generic info:** unique product copy with real specs;
      Contact, Return, Shipping, Privacy, Terms, About all published and
      footer-linked. (§6)

### Step 3 — Request review
- [ ] Merchant Center → Diagnostics → the *"Website needs improvement /
      Misrepresentation"* issue → **Request review**.
- [ ] Reviews typically take up to ~7 business days; the issue may also
      auto-clear on the next routine crawl. Do not submit repeated reviews.

---

## 8. Items needing on-site / in-admin verification (hand-off checklist)

Run from a non-sandboxed browser, crawler, and the Shopify + Merchant
Center admins:

1. Confirm the verified Merchant Center website URL, the feed `link`
   domain, and the post-redirect landing domain are byte-identical
   (scheme + host). (§2)
2. Shopify *Settings → Domains*: primary domain + "redirect to primary"
   on; `.myshopify.com` 301s to it. (§2)
3. Full Screaming Frog / Sitebulb crawl (Googlebot UA, non-sandboxed IP);
   export all `4xx`/`5xx` internal + external and redirect chains. (§3)
4. Manually click a sample of "Buy / Check price" outbound links across
   guides and product pages; record any dead/parked targets. (§3)
5. Crawl + visually scan for placeholder strings and the Shopify "no
   image" icon using `merchant-center/placeholder-scan.md`. (§4)
6. Confirm every published page from `fixes/wcsafety-com/pages/*.md` has
   **no remaining `[BRACKET]`**. (§4)
7. For ≥1 product per collection, compare landing-page
   title/price/sale_price/availability/image/brand/GTIN/category against
   the feed row. Record every mismatch. (§5)
8. Confirm USD pricing for US and that no currency/geo app changes the
   price shown to Googlebot vs a US shopper. (§5)
9. Confirm Contact, Return Policy, Shipping, Privacy Policy, Terms, and
   About exist, are published, and are linked in the global footer. (§6)
10. Spot-check 10 product descriptions for duplicate/generic/boilerplate
    copy and missing specs; rewrite per the template. (§6)
11. Confirm `/collections/master-collection` is renamed or hidden so no
    product sits in a placeholder category. (§5, SEO audit §4.7)

---

## Appendix — Mapping of Google's 5 requirements to this document

| Google requirement | Section | Companion fix artifact |
| ------------------- | ------- | ----------------------- |
| Domain matches uploaded domain | §2 | `merchant-center/broken-links-and-domain.md` |
| No broken links | §3 | `merchant-center/broken-links-and-domain.md` |
| No placeholder images or text | §4 | `merchant-center/placeholder-scan.md`, `pages/*.md` |
| Details/categories match product data | §5 | `merchant-center/product-page-requirements.md` |
| No generic info / no missing crucial info | §6 | `merchant-center/product-page-requirements.md`, `pages/*.md` |
| (Root cause) seller-of-record vs affiliate | §1 | — operator decision |
</content>
</invoke>
