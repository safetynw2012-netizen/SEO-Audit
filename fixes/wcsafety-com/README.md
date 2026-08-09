# wcsafety.com — Shopify fix artifacts

Companion to `audits/wcsafety-com-2026-05-15.md`. Each file in this
directory is ready to paste into the Shopify admin to address a
specific P0 finding from the audit.

> ⚠️ **Read `audits/incident-2026-07-robots-block.md` before touching
> `theme/robots.txt.liquid`.** The version of that file deployed around
> 2026-07-01 blocked `/collections/*/products/`, which stranded ranking
> signals instead of consolidating them and cost organic traffic. The
> file here has been revised; the two harmful rules are gone and must
> not be re-added.
>
> **The audit's fix order is load-bearing.** §4.1 lists canonical
> verification as step 1 and robots.txt as step 2. Step 1 (item 1 below)
> was never done, which is what turned step 2 into an outage. Work
> `canonical-verification.md` before deploying any crawl-blocking rule,
> and before requesting validation in Search Console.

| File                                              | Audit section | Where it goes in Shopify                                                                                       |
| ------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------- |
| `theme/robots.txt.liquid`                         | 4.1, 3.1      | Online Store → Themes → Edit code → Templates → Add a new template → "robots" / "liquid" → paste contents      |
| `canonical-verification.md`                       | 4.1 (step 1)  | Checklist — do this **before** robots.txt and before any Search Console validation request                     |
| `theme/snippets/affiliate-disclosure.liquid`      | 5.2           | Online Store → Themes → Edit code → Snippets → Add new → name `affiliate-disclosure` → paste contents          |
| `pages/about.md`                                  | 5.1           | Online Store → Pages → Add page → handle `about` → paste body                                                  |
| `pages/contact.md`                                | 5.1           | Online Store → Pages → Add page → handle `contact` → paste body                                                |
| `pages/affiliate-disclosure.md`                   | 5.1, 5.2      | Online Store → Pages → Add page → handle `affiliate-disclosure` → paste body, then add footer link             |
| `pages/editorial-methodology.md`                  | 5.3           | Online Store → Pages → Add page → handle `editorial-methodology` → paste body                                  |

## What still needs to be done outside this repo

These were called out in the audit but cannot be solved with files alone:

1. **Canonical-tag verification (audit 4.1).** ⚠️ **Still open, and
   now the highest priority.** Skipping this is what made the July
   robots.txt deploy harmful. Full procedure is in
   `canonical-verification.md`; in short, open `layout/theme.liquid`
   and confirm `<link rel="canonical" href="{{ canonical_url }}">` is
   present in `<head>` and not overridden by any installed app, then
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
