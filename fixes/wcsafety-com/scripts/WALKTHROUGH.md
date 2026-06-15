# WALKTHROUGH — running the scripts for the first time

For: someone who has never run a Node script against the Shopify Admin
API. Walks through one-time setup → first dry run → first apply. Total
time, start to finish: **~25–30 minutes** including waiting for npm.

You'll do this once on your local machine. The Shopify token never leaves
your machine — not into this repo, not into any chat.

---

## Pre-flight: what you need

1. **A computer you trust** — your own Mac, Windows, or Linux machine.
   Not a shared one, not a cloud IDE. The token will live in your shell
   env temporarily.
2. **Terminal access** — Terminal.app (Mac), Windows Terminal or
   PowerShell (Windows), or any terminal (Linux).
3. **A password manager** — 1Password, Bitwarden, or even Apple Keychain.
   You'll store the Shopify token there after you create it.
4. **About 30 minutes** of uninterrupted time.

---

## Stage 1 — Check / install Node.js (5 min)

The scripts need **Node.js version 20 or newer**.

### Check what you have

In your terminal, run:

```sh
node --version
```

- **`v20.x.x` or higher** → ✅ you're done with this stage.
- **`v18.x.x` or lower** → upgrade (instructions below).
- **`command not found`** → install (instructions below).

### Install or upgrade — pick your OS

**Mac (recommended path with Homebrew):**
```sh
brew install node
node --version
```

**Mac / Linux (recommended path with nvm — best if you might also run other Node versions):**
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# close and reopen terminal
nvm install 20
nvm use 20
node --version
```

**Windows (recommended):** download the LTS installer from
<https://nodejs.org/> — install the latest LTS (20 or higher), restart
your terminal, run `node --version`.

---

## Stage 2 — Clone or pull the repo (2 min)

If you have the repo locally already, just pull:

```sh
cd /path/to/SEO-Audit
git pull
```

If you don't have it yet, clone:

```sh
git clone https://github.com/safetynw2012-netizen/SEO-Audit.git
cd SEO-Audit
```

Then change into the scripts directory — every command from here lives in
`fixes/wcsafety-com/scripts/`:

```sh
cd fixes/wcsafety-com/scripts
```

---

## Stage 3 — Install the `marked` dependency (1 min)

Only `publish-guides.mjs` needs this, but install once and you're done.

```sh
npm install
```

You'll see something like `added 1 package in 2s`. A `node_modules/`
folder gets created — it's already in `.gitignore`, you don't need to
commit anything.

---

## Stage 4 — Get a Shopify Admin API token (10 min)

This is the only stage that touches credentials. **Do not paste the token
into this chat, this repo, or any committed file** — only into your
terminal env (Stage 5) and your password manager.

### 4A. Create or find a custom app

In Shopify admin → **Settings → Apps and sales channels → Develop apps**.

- If you've already created a custom app for SEO work, click it and skip
  to 4B.
- If not, click **Create an app**, name it `WC Safety SEO Scripts`, click
  Create app.

### 4B. Configure Admin API scopes

Click **Configure Admin API scopes** and check the boxes for:

| Scope | Why |
| ----- | --- |
| `read_content` | Read existing blogs / articles / pages / redirects |
| `write_content` | Create blog articles, URL redirects |
| `read_products` | Read product handles + current SEO titles |
| `write_products` | Update product SEO titles, rename product handles |
| `read_themes` | Read existing theme file content (for conflict check) |
| `write_themes` | Upload theme snippets |

Click **Save**.

### 4C. Install the app

Click **Install app** at the top right. Confirm the install. You'll
land on the **API credentials** page.

### 4D. Reveal and copy the token — once

Under **Admin API access token**, click **Reveal token once**. The token
starts with `shpat_` followed by 32 characters.

**Right now, before doing anything else:**
1. Copy the token to your clipboard.
2. Open your password manager.
3. Create an entry called `WC Safety Shopify Admin API token` and paste
   the token into the password field.
4. Save the entry.

Now the token lives in two places: your clipboard (about to be used) and
your password manager (durable). **Never** save it to a file, a note app,
or paste it into any chat — including this one.

If the token leaks for any reason, come back to this page and click
**Uninstall app** → re-install → generate a fresh token. Rotating is free.

---

## Stage 5 — Set the two env vars (2 min)

In your terminal, set both variables. They live in your shell only for
the duration of the session — close the terminal and they vanish.

**Mac / Linux:**
```sh
export SHOPIFY_STORE=wcsafety.myshopify.com
export SHOPIFY_ADMIN_TOKEN=shpat_…paste_here…
```

**Windows PowerShell:**
```powershell
$env:SHOPIFY_STORE = "wcsafety.myshopify.com"
$env:SHOPIFY_ADMIN_TOKEN = "shpat_…paste_here…"
```

**Windows cmd.exe:**
```cmd
set SHOPIFY_STORE=wcsafety.myshopify.com
set SHOPIFY_ADMIN_TOKEN=shpat_…paste_here…
```

### What's `wcsafety.myshopify.com`?

That's your store's `*.myshopify.com` hostname (the internal one Shopify
gives every store, regardless of the custom domain). If you log in at
`admin.shopify.com`, you'll see it in the URL or at the bottom of the
Shopify admin sidebar. **Use that hostname, not `wcsafety.com`.**

### Sanity check

```sh
echo $SHOPIFY_STORE         # mac/linux
# or
echo $env:SHOPIFY_STORE     # powershell
```

Should print `wcsafety.myshopify.com`. **Do not echo the token** — there's
no need to verify it that way.

---

## Stage 6 — Your first dry run (3 min)

This is the safe part. Dry run makes **zero changes** — it just prints
what each script would do.

Run them one at a time. Read the output of each before moving on.

### 6A. Dry-run apply-redirects

```sh
node apply-redirects.mjs
```

Expected output (roughly):

```
=== apply-redirects ===
mode: DRY RUN (no changes)
store: wcsafety.myshopify.com
api version: 2025-01

[DRY] CREATE: /products/3m-2091-vs-3m-2097
              -> /blogs/guides/3m-2091-vs-2097-filter
[DRY] CREATE: /collections/3m-2091-vs-3m-2097 -> …
[DRY] CREATE: /products/3m-60921-vs-60923 -> …
[DRY] SKIP (destination not yet published): /collections/3m-60921-vs-60923-vs-60926-respirator-cartridges
       wanted target: /blogs/guides/3m-60921-vs-60923-vs-60926-cartridge
       publish that guide first, flip destinationLive=true, re-run.
[DRY] SKIP (destination not yet published): …
[DRY] CREATE: /collections/3m-6001-vs-3m-6003 -> …
[DRY] CREATE: /collections/3m-6001-vs-6003 -> …
[DRY] SKIP (destination not yet published): …
[DRY] CREATE: /products/n95-vs-p100-respirator -> …

Summary:
  6 would be created
  0 already exist (target matches, no action)
  0 already exist with DIFFERENT target (skipped — review manually)
  6 pending (destination not yet published — use --include-pending to force)
```

✅ If you see this shape (some CREATE, some SKIP, no FAILED), you're good.

❌ Common errors:
- `HTTP 401` → token is wrong or wasn't pasted correctly. Re-do Stage 5.
- `HTTP 403` → the custom app doesn't have the scopes from 4B. Go back to
  4B, add `read_content` + `write_content`, click Save.
- `Missing required env` → env vars didn't stick. Re-do Stage 5 in the
  same terminal you're running from.

### 6B. Dry-run apply-seo-titles

```sh
node apply-seo-titles.mjs
```

Expected: ~9 `UPDATE` lines (3 rogue-brand collections/products, the
product-reviews collection, and 5 over-length blog articles).

### 6C. Dry-run apply-theme

```sh
node apply-theme.mjs
```

Expected: 2 `UPLOAD (new)` lines for `research-methodology-callout.liquid`
and `article-jsonld.liquid`.

### 6D. Dry-run publish-guides

```sh
node publish-guides.mjs
```

Expected: **9 REFUSE** lines, one per guide draft. They all refuse because
every draft still has `[VERIFY]` markers in it. **This is correct
behavior** — you fill the markers in the `.md` files before this script
will publish anything. Save the markers-filling for after the other three
scripts are done.

---

## Stage 7 — Your first apply (10 min)

You've now seen exactly what each script will do. Time to mutate.

### 7A. Ship the safe 6 redirects

```sh
node apply-redirects.mjs --apply
```

You should see `[APPLY] CREATE:` lines instead of `[DRY] CREATE:`, and at
the end `6 created`.

**Verify in Shopify admin:** Online Store → Navigation → URL Redirects.
You should see 6 new rows. Test one — paste an old URL into your browser
and confirm it redirects to the new path.

### 7B. Ship the SEO title fixes

```sh
node apply-seo-titles.mjs --apply
```

**Verify:** open one of the products or collections the script touched
(e.g. the 3M 1100 ear plugs product). Scroll to **Search engine listing
preview**. The new title should be there.

### 7C. Upload the theme snippets

```sh
node apply-theme.mjs --apply
```

The script will also print instructions for the two manual `{% render %}`
edits in `sections/main-article.liquid` and `layout/theme.liquid`, plus
the four article metafield definitions to add. Do those next in Shopify
admin — they're click-paste edits, not script work.

### 7D. (Defer until guides are filled)

Skip `publish-guides.mjs --apply` for now. It'll only do anything once
you've replaced the `[VERIFY]` markers in at least one guide draft with
real values.

---

## Stage 8 — When the session is done

Close the terminal. The env vars vanish.

If you'll come back tomorrow:
- Re-open the terminal
- Re-do Stage 5 (export the two env vars), getting the token from your
  password manager
- The scripts are idempotent: re-running them on the same data is safe.
  `apply-redirects.mjs` will just say `SKIP (already exists)` for the
  6 you already shipped.

If you're handing off the work:
- Whoever takes over creates their **own** custom app and token (Stage
  4). Don't share tokens between people.

---

## What to come back and tell me

After Stage 7 lands:

1. The output from each `--apply` run (the summary lines, not the token).
2. Anything unexpected — `FAILED`, `HTTP 403`, `userErrors`, etc.
3. Whether the manual edits from `apply-theme.mjs`'s output instructions
   went smoothly.

I'll re-scan the live index in ~3–7 days (Google's re-crawl window) and
update the scorecard with the realized lift.

---

## Quick reference card

```sh
# Stage 1: one-time install Node 20+
node --version           # should be v20+

# Stage 2: pull repo, cd in
cd /path/to/SEO-Audit && git pull
cd fixes/wcsafety-com/scripts

# Stage 3: one-time npm install
npm install

# Stage 4: create Shopify custom app, get token, store in password manager

# Stage 5: every new terminal session
export SHOPIFY_STORE=wcsafety.myshopify.com
export SHOPIFY_ADMIN_TOKEN=shpat_…

# Stage 6: dry runs (no changes)
node apply-redirects.mjs
node apply-seo-titles.mjs
node apply-theme.mjs
node publish-guides.mjs

# Stage 7: apply
node apply-redirects.mjs --apply
node apply-seo-titles.mjs --apply
node apply-theme.mjs --apply
# publish-guides.mjs --apply only after you've filled [VERIFY] markers
```
