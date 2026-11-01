# aboudzein.github.io

Source for [aboudzein.github.io](https://aboudzein.github.io), Zein Eddin's blog.

Astro, Markdown/MDX posts, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

```bash
npm ci
npx playwright install chromium                   # Mermaid renders at build time
npm run dev                                      # drafts are visible in dev
npm run build                                    # drafts are left out
SHOW_DRAFTS=1 npm run build                      # local preview build with drafts
```

How to write and publish a post: [WRITING.md](WRITING.md).
