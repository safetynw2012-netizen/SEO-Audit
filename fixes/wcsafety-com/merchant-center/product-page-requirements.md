# Product-page requirements: feed parity + non-generic, complete info

Addresses Merchant Center requirements **"product details and categories
should match those in your product data"** and **"shouldn't contain
generic information and shouldn't miss crucial information about
products."** Report sections §5 and §6.

---

## Part A — Landing page must MATCH the feed (per SKU)

Google's reviewer cross-checks the feed row against the live landing
page. Use this as the per-product sign-off table.

| Feed attribute | Must equal on the landing page | ✓ |
| -------------- | ------------------------------- | - |
| `title` | Visible product title / `<h1>` | ☐ |
| `price` | Displayed price, same currency & basis | ☐ |
| `sale_price` (+ effective dates) | Displayed sale price + validity | ☐ |
| `availability` | "In/out of stock / preorder" shown | ☐ |
| `image_link` | Main product image is the same image | ☐ |
| `brand` | Brand shown on page | ☐ |
| `gtin` / `mpn` | UPC/EAN/model shown on page | ☐ |
| `condition` | New/used/refurbished shown | ☐ |
| `product_type` / `google_product_category` | On-site breadcrumb/category is consistent & sane | ☐ |

### The two most common mismatches that cause this disapproval

1. **Price mismatch.** Feed `19.99 USD`, page shows a different number.
   Causes: stale spreadsheet feed, currency-converter apps, geo/IP price
   switching, tax-inclusive vs exclusive display. The price shown to
   Googlebot **and** to a US shopper must equal the feed price in **USD**.
2. **Availability mismatch.** Feed says `in_stock`, page says "Sold out"
   (or vice-versa).

### Fixes

- [ ] Generate the feed from the Shopify **Google & YouTube** sales
      channel so feed and storefront share one data source (no hand-edited
      sheet that drifts).
- [ ] Disable geo/IP price or currency switching for Googlebot + US, or
      guarantee USD parity.
- [ ] Audit price + availability parity across a sample of every
      collection; fix every disagreement.
- [ ] Set a correct `google_product_category` per item; make breadcrumbs
      and collection assignment match `product_type`.
- [ ] Rename or hide `/collections/master-collection` so no product sits
      in a placeholder category (SEO audit §4.7).

---

## Part B — Required structure for a NON-generic, COMPLETE product page

"Generic" = the same templated paragraph or raw supplier marketing copy
reused across SKUs. "Missing crucial info" = a shopper can't decide. Every
product page should contain, written uniquely for that SKU:

1. **Identity line** — Brand + exact model number/MPN + GTIN/UPC.
2. **One-paragraph specific description** — what it is, who it's for, what
   problem it solves. Written for *this* product; not cloned, not raw
   supplier copy shared by every dropshipper.
3. **Technical specifications** (as a spec table):
   - Dimensions, weight, materials.
   - Relevant US safety certifications, stated explicitly — e.g.
     NIOSH 42 CFR 84 (respirators), ANSI/ISEA Z89.1 (hard hats),
     UL 217 (smoke alarms), UL 2034 (CO alarms), ANSI Z87.1 (eyewear).
   - Capacity/ratings/runtime where applicable.
4. **What's in the box** + compatible parts/accessories.
5. **Intended use & limitations** — and any safety warnings.
6. **Price, in USD, matching the feed**, with shipping cost/timeframe and
   the return path clearly stated or linked.
7. **At least one real, SKU-specific image** matching the feed
   `image_link`.

### Anti-generic checklist

- [ ] Description is unique to this SKU (not shared across products).
- [ ] Not a copy-paste of the manufacturer's marketing blurb verbatim.
- [ ] Real specs present (not "high quality, durable, great value").
- [ ] Model number / GTIN present and correct.
- [ ] Image actually depicts this exact product.

---

## Part C — Site-wide CRUCIAL information (footer-linked on every page)

A "useful and transparent shopping experience" also requires the
store-level basics. These overlap with the SEO audit's E-E-A-T fixes —
draft pages already exist in `fixes/wcsafety-com/pages/`.

- [ ] **Contact** — real business name, email, physical/mailing address
      (`pages/contact.md`).
- [ ] **Return & refund policy** — specific and honest about who handles
      returns (`/pages/return-policy`).
- [ ] **Shipping & delivery** — costs, methods, timeframes, regions.
- [ ] **Privacy Policy + Terms of Service** — Shopify *Settings →
      Policies* generator.
- [ ] **About** — who runs the store (`pages/about.md`).
- [ ] **Secure checkout** on your own domain (Path A).
- [ ] All of the above linked from the **global footer**.

> If you are operating as an affiliate (report §1, Path B), a conspicuous
> FTC affiliate disclosure is also crucial info — but Path B means you
> should not be running a Merchant Center product feed in the first place.
</content>
