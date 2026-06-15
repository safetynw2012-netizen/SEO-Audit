# Return Policy — rewrite

Drop-in replacement for the live `/pages/return-policy` content. Reconciles
the current page's *"WC Safety is an Affiliate Marketer, and all returns
are handled directly through its Affiliates"* line with the About page's
actual positioning (*"independent industrial PPE retailer"* that stocks,
ships direct from a Shopify storefront, with Amazon Associates as a
secondary revenue stream).

> **Why this matters for SEO + Trust:** the current Return Policy
> text contradicts every other page on the site. Google's Quality Rater
> Guidelines specifically penalize sites whose stated business model is
> inconsistent across pages — it's a textbook YMYL credibility flag. Same
> for FTC: an inconsistent monetization story makes the affiliate
> disclosure harder to substantiate. This fixes both.

> **Honesty gate.** Every `[VERIFY]` / `[CHOOSE]` token is a fact only the
> operator can supply. Don't publish until each one is filled with a true
> answer.

## Page meta

- **Page handle:** `return-policy` (keep existing)
- **SEO title:** `Return Policy — WC Safety`
- **Meta description:** `WC Safety's return policy for direct Shopify purchases of industrial PPE, plus how Amazon-purchased items are handled. PPE-specific hygiene rules included.`

---

## Return Policy

WC Safety stocks and ships industrial PPE directly through our Shopify
storefront at wcsafety.com. We also publish editorial buyer's guides and
product reviews that link to Amazon Associates affiliate listings. The two
sales channels have different return paths — this page covers both.

### Direct purchases from wcsafety.com

If you bought a product directly from WC Safety through this storefront
(your order confirmation came from `[ORDER CONFIRMATION DOMAIN]` and the
charge on your card reads "WC Safety" or `[ACTUAL DESCRIPTOR]`), the return
is handled by us under the terms below.

#### Return window

We accept returns within **`[CHOOSE: 30 / 60 / 90]` days of delivery** for
unopened, unused product in original packaging.

#### What's eligible for return

- Unopened, unused product in resaleable original packaging.
- Defective product (manufacturer fault), regardless of opened/unopened
  status — see *Defective product* below.
- Wrong item shipped — we cover the return and the replacement.

#### What's NOT eligible for return (and why)

Some PPE cannot be returned and resold once it has been used or had its
seal broken — this is a hygiene and safety requirement, not a business
preference:

- **Respirators (half-mask, full-face, and disposable N95 / P100) that
  have been worn or had their seal broken.** Used respirators cannot be
  resold under any safety program — they would carry contamination from
  the prior wearer.
- **Cartridges and filters that have been removed from their original
  sealed packaging.** Once exposed to ambient air, the sorbent's service
  life clock has started. We can't resell something whose remaining
  service life is unknown.
- **Hearing protection that has been inserted (foam ear plugs) or worn
  (banded plugs, ear muffs with disposable hygiene covers).**
- **Safety eyewear that has been worn against the face** (lenses can be
  inspected for resale; padded frames with face-contact wear cannot).
- **Hard hats that have been adjusted to a worker's head, dropped, or
  exposed to chemicals or UV beyond brief storefront display.**

If you are unsure whether a specific item qualifies, email
**`[support@wcsafety.com]`** with your order number before opening the
package — we'll tell you before the seal is broken.

#### Defective product

If a product arrives defective from the manufacturer (broken seal,
manufacturing fault, missing approval marking that should be present), we
replace it at no cost to you. Email **`[support@wcsafety.com]`** with your
order number and a photo of the defect. We do not require return of
NIOSH-approved respirators or cartridges whose seal has been compromised
in transit — destroy them per `[YOUR PREFERRED DISPOSAL INSTRUCTION]`
rather than ship a possibly-contaminated unit.

#### Wrong item shipped

If we shipped the wrong product, we cover return shipping and replacement
shipping. Email **`[support@wcsafety.com]`** with your order number.

#### Return shipping cost

- **Defective product / wrong item shipped:** WC Safety covers all
  shipping.
- **Change of mind (eligible unopened product):** customer covers return
  shipping. Original outbound shipping is `[CHOOSE: refunded / not refunded]`.

#### Restocking fee

`[CHOOSE: No restocking fee / A [X]% restocking fee applies to opened-but-
returnable items]`. Defective or wrong-item returns are never charged a
restocking fee.

#### How to start a return

Email **`[support@wcsafety.com]`** with:

1. Your order number.
2. The item(s) you want to return.
3. A short reason (defective, wrong item, change of mind, fit issue, etc.).

We respond within `[CHOOSE: 1 / 2]` business day(s) with an RMA number and
return-shipping instructions. We do not require you to ship anything before
receiving an RMA.

#### Refund timing

Once the return is received and inspected (typically `[CHOOSE: 3–5]`
business days), we issue the refund to the original payment method. Card
refunds typically post within 5–10 business days depending on your bank.

### Amazon-purchased items (editorial affiliate links)

If you clicked through a "Check Price on Amazon" link from one of our
buyer's guides or reviews and completed the purchase on Amazon, **your
transaction was with Amazon, not with WC Safety.** Returns for those
purchases are handled by Amazon under their published return policy:

- Open your **Amazon order history** → find the order → "Return or
  replace items."
- Amazon's standard return window for most PPE categories is 30 days from
  delivery; check the specific item listing for any exceptions.
- WC Safety cannot process Amazon returns, refunds, or replacements — we
  receive only an affiliate commission on the original sale and have no
  access to Amazon's order or fulfillment systems.

If you are uncertain which channel you bought from, **check your order
confirmation email.** If it's from Amazon, contact Amazon. If it's from
WC Safety (the storefront), contact us.

### Defective safety-critical product — additional path

If a NIOSH-approved respirator, cartridge, or UL-listed alarm you bought
from any channel fails its safety function (a smoke alarm doesn't alarm, a
CO detector reads zero in a known-CO environment, a respirator cartridge
breaks through well before its rated service life), **report it to the
manufacturer and to NIOSH or CPSC as appropriate** — independent of any
refund process:

- NIOSH NPPTL (respirator / cartridge concerns):
  <https://www.cdc.gov/niosh/contact/contact-default.html>
- CPSC (consumer-product alarm failures):
  <https://www.saferproducts.gov/>
- The manufacturer's customer-service line (printed on the product or
  packaging).

These reports feed into the recall and standards-revision systems that
keep the broader category safe. They are not a substitute for your refund
request — they're additive.

### Contact

For all return-related questions: **`[support@wcsafety.com]`** —
response within `[CHOOSE: 1 / 2]` business day(s).

For editorial questions or correction requests on a guide that influenced
your purchase: **`[editor@wcsafety.com]`** (see our
[Affiliate Disclosure](/pages/affiliate-disclosure) and
[About page](/pages/about) for our editorial standards).

---

## Changes from the previous version

(Don't include this section in the published page — it's a changelog for
the operator.)

- **Removed:** the line *"WC Safety is an Affiliate Marketer, and all
  returns are handled directly through its Affiliates."* That conflated
  the two sales channels and contradicted the About page.
- **Added:** explicit "Direct purchases" vs "Amazon-purchased items"
  split that mirrors the About page's monetization disclosure.
- **Added:** PPE-specific hygiene-based non-returnable list (respirators,
  cartridges, etc.) — the existing language said nothing about why some
  PPE can't be returned, which left an FTC + customer-expectation gap.
- **Added:** defective-product reporting paths to NIOSH and CPSC — useful
  for safety-critical product failures and consistent with the site's
  "we recommend reporting to the regulator" stance on the editorial
  methodology page.
- **Added:** plain-English distinction between "your order was with WC
  Safety" vs "your order was with Amazon" — the most common reader
  confusion on affiliate-content sites.
