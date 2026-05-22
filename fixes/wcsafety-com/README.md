# wcsafety.com — Shopify fix artifacts

Companion to `audits/wcsafety-com-2026-05-15.md`. Each file in this
directory is ready to paste into the Shopify admin to address a
specific P0 finding from the audit.

| File                                              | Audit section | Where it goes in Shopify                                                                                       |
| ------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------- |
| `theme/robots.txt.liquid`                         | 4.1, 3.1      | Online Store → Themes → Edit code → Templates → Add a new template → "robots" / "liquid" → paste contents      |
| `theme/snippets/affiliate-disclosure.liquid`      | 5.2           | Online Store → Themes → Edit code → Snippets → Add new → name `affiliate-disclosure` → paste contents          |
| `pages/about.md`                                  | 5.1           | Online Store → Pages → Add page → handle `about` → paste body                                                  |
| `pages/contact.md`                                | 5.1           | Online Store → Pages → Add page → handle `contact` → paste body                                                |
| `pages/affiliate-disclosure.md`                   | 5.1, 5.2      | Online Store → Pages → Add page → handle `affiliate-disclosure` → paste body, then add footer link             |
| `pages/editorial-methodology.md`                  | 5.3           | Online Store → Pages → Add page → handle `editorial-methodology` → paste body                                  |
| `redirects-product-reviews.csv`                   | reviews 2026-05-22 | Online Store → Navigation → URL Redirects → Import → upload CSV (operationalizes the REMOVE verdicts in `audits/wcsafety-com-product-reviews-2026-05-22.md`) |

## What still needs to be done outside this repo

These were called out in the audit but cannot be solved with files alone:

1. **Canonical-tag verification (audit 4.1).** Open
   `layout/theme.liquid` in the theme editor and confirm
   `<link rel="canonical" href="{{ canonical_url }}">` is present
   in `<head>` and not overridden by any installed app. Then
   spot-check a `/collections/all/products/<slug>?_pos=...` URL in
   Search Console's URL Inspection tool and confirm Google reports
   the canonical as `/products/<slug>`.
2. **Title-tag template unification (audit 4.2).** For each
   collection listed in the audit table, open it in the admin →
   "Search engine listing preview" → clear any per-page title
   override so the default template wins.
3. **Footer links.** Add menu items to the footer for: About,
   Contact, Affiliate Disclosure, Editorial Methodology, Privacy
   Policy, Return Policy, Terms of Service.
4. **Privacy Policy and Terms of Service.** Not in this repo — use
   Shopify's built-in policy generator (Settings → Policies) and
   review with counsel.
5. **Apply the affiliate-disclosure snippet to every guide.** Edit
   each `/blogs/guides/*` post and add the disclosure HTML at the
   top of the body, above the first product mention. The snippet
   file shows the exact markup.

## Placeholders to fill in before publishing

Every `[BRACKETED]` value in the `pages/*.md` files is a fact only
the operator can supply (real names, credentials, email addresses,
mailing address, founding year, affiliate networks enrolled in,
testing hours, etc.). Anything left as a placeholder will misrepresent
the business — search-and-replace each one before publishing.
