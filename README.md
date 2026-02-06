# Will you be my Valentine? 💕

A stylish single-page Valentine’s ask with unlimited “No” prompts and confetti when they say Yes.

## Host on Netlify

1. **Push your project to Git** (GitHub, GitLab, or Bitbucket) — the repo can be the whole project; Netlify will use the `website/valentine` folder (see `netlify.toml` in the repo root).

2. **Log in to [Netlify](https://www.netlify.com)** and click **Add new site** → **Import an existing project**.

3. **Connect your Git provider** and choose the repository. Netlify will read `netlify.toml` and set:
   - **Publish directory:** `website/valentine`
   - No build command needed.

4. **Deploy** — Netlify will build and give you a URL like `https://random-name-123.netlify.app`. You can change it in **Site settings** → **Domain management** → **Edit site name**.

**Drag-and-drop option:** In the Netlify dashboard, go to **Sites** → **Add new site** → **Deploy manually**, then drag the **valentine** folder (the one containing `index.html`, `styles.css`, `script.js`) into the drop zone. No Git needed.

---

## Host on GitHub Pages

1. **Create a new repo** on GitHub (e.g. `valentine` or `Ask-out-your-Valentine`).

2. **Push this folder as the repo** (only the contents of `valentine` need to be in the root of the repo for Pages):
   - Either create a new repo and upload the files from the `valentine` folder.
   - Or clone your repo, copy `index.html`, `styles.css`, `script.js` into the repo root, commit and push.

3. **Turn on GitHub Pages**
   - Repo → **Settings** → **Pages**.
   - Under **Source** choose **Deploy from a branch**.
   - Branch: **main** (or **master**), folder: **/ (root)**.
   - Save.

4. **Open the site**  
   After a minute or two it will be at:
   `https://<your-username>.github.io/<repo-name>/`

   Example: `https://jane.github.io/valentine/`

## Optional: Use a custom domain

In **Settings → Pages** you can set a **Custom domain** (e.g. `valentine.yourdomain.com`) and add the CNAME record at your DNS provider.

## What’s in this project

- **Unlimited “No” prompts** – 100+ different messages; they’re chosen at random so it doesn’t repeat quickly.
- **Yes button grows** – Each time they click “No”, the “Yes” button gets a bit bigger.
- **No button moves** – After a few “No”s, the “No” button starts moving so it’s harder to click (and more fun).
- **Confetti on Yes** – Uses [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) when they click “Yes”.

Enjoy and good luck. 💖
