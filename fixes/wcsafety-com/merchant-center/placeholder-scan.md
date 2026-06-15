# Placeholder image & text scan

Addresses Merchant Center requirement **"your website shouldn't contain
any placeholder images or text."** Report section §4.

Run a full-site crawl (non-sandboxed IP, Googlebot UA) and grep the
rendered HTML + product/collection bodies for the strings below, and
visually scan every product for the patterns in the image section.

---

## Placeholder TEXT — strings to search for

### Shopify / theme demo content (Dawn, Debut, and common themes)

- `Welcome to my store`
- `Welcome to our store`
- `Your collection's description`
- `Talk about your brand`
- `Share your store policies`
- `Describe a product, make announcements, or welcome customers`
- `This area is used to describe your store`
- `Example Product Title`
- `Example blog post`
- `News` / sample blog posts that ship with the theme
- Default "About", "Contact us" boilerplate that was never edited

### Generic "not done yet" copy

- `Lorem ipsum`
- `Coming soon`
- `Description coming soon`
- `TBD` / `TODO` / `FIXME`
- `Insert text here` / `Add your content`
- `Default Title` (Shopify's default variant name leaking into copy)

### Your own unfinished trust pages — `[BRACKETED]` placeholders

The pages drafted in `fixes/wcsafety-com/pages/*.md` contain bracketed
placeholders that **must** be replaced before publishing. Search the live
site for a literal `[` to catch any that slipped through:

- `[year founded]`, `[city, state]`, `[Founder Name]`, `[Reviewer Name]`
- `[hello@wcsafety.com ...]`, `[editorial@...]`, `[partnerships@...]`,
  `[support@...]`
- `[Street]`, `[City, State ZIP]`
- `[2 business days]`, `[9am–5pm Eastern]`, `[X hours / Y shifts ...]`
- `[List every other affiliate network ...]`, `[Month Year ...]`

> If any `[BRACKET]` is live, it is simultaneously a Requirement-3
> violation **and** a misrepresentation of the business.

---

## Placeholder IMAGES — patterns to find and replace

- The Shopify **"no image" grey camera/placeholder** swatch (served when a
  product has no image assigned). Every SKU must have a real image.
- `image coming soon` / watermarked stock placeholders.
- The **same hero image reused across unrelated SKUs** (a dropship/import
  fingerprint) — each product needs an image that actually depicts *that*
  product.
- **Hot-linked supplier images** you don't have rights to host — replace
  with owned or properly licensed photography.
- Theme demo banners/hero images still showing stock models or "your
  image here" frames.

### Per-product image rule

Every product must have **at least one** real, owned-or-licensed image
that depicts that exact SKU, and the **main** image must match the feed's
`image_link`.

---

## Sign-off

- [ ] Zero theme/demo strings remain.
- [ ] Zero lorem / "coming soon" / TODO strings remain.
- [ ] Zero `[BRACKET]` placeholders remain on any published page.
- [ ] Every product has a real, SKU-specific main image (no grey
      placeholder, no shared generic photo).
- [ ] Hero/banner/demo images replaced with real store imagery.
</content>
