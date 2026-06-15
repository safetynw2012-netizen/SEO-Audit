# wcsafety.com — Google Merchant Center remediation artifacts

Companion to `audits/wcsafety-com-merchant-center-2026-06-15.md`. These
files address the Merchant Center disapproval *"Website needs improvement
/ Provide a useful and transparent shopping experience"* that is limiting
visibility of all products in the United States.

| File | Requirement(s) addressed | Report section |
| ---- | ------------------------ | -------------- |
| `broken-links-and-domain.md` | Domain match; no broken links | §2, §3 |
| `placeholder-scan.md` | No placeholder images or text | §4 |
| `product-page-requirements.md` | Details/categories match the feed; no generic / no missing crucial info | §5, §6 |

## Read this first

The disapproval is **account/destination-level** — it suppresses *all*
US products, not one item. Cosmetic per-item fixes will not clear it;
Google re-reviews the whole site's landing-page experience.

Before working through these files, resolve the **root-cause decision in
report §1**: are you a genuine first-party seller (Path A — do all of
this) or an affiliate/review site (Path B — remove the product feed
instead of polishing the storefront)? Submitting a feed for products you
don't actually sell will keep tripping Misrepresentation no matter how
clean the storefront is.

## Reminder about the trust pages

The pages in `fixes/wcsafety-com/pages/*.md` (About, Contact, Affiliate
Disclosure, Editorial Methodology) still contain `[BRACKETED]`
placeholders. Publishing them as-is is itself a Requirement-3
("no placeholder text") violation. Fill every bracket before publishing.
</content>
