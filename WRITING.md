# Writing a post

A post is one file in `src/content/posts/`. The file name is the URL:
`src/content/posts/my-post.md` → `https://aboudzein.github.io/writing/my-post/`.

Use `.md` for plain posts and `.mdx` when you need components.

## Frontmatter

```yaml
---
title: A deploy guard for EF Core migrations      # required
description: One plain sentence for lists, RSS and link previews.   # required, max 200 chars
date: 2026-11-01            # required, the publish date
updated: 2026-11-15         # optional
tags: [dotnet, deploys]     # optional, lower-case
draft: true                 # optional, default false. Drafts never reach the live site.
series:                     # optional, for multi-part posts
  name: Building Otto
  part: 2
---
```

Reading time, the Open Graph image, RSS and the sitemap are made automatically.

## What you can use in a post

- Code: fenced blocks with a language, e.g. ` ```csharp `. Add `title="Program.cs"` or `{3}` to highlight line 3.
- Math: `$inline$` and display math in `$$ … $$` on their own lines (KaTeX).
- Diagrams: a ` ```mermaid ` block. It renders to SVG at build time.
- Footnotes, tables and images (put images next to the post or in `public/`).

`src/content/posts/style-guide.mdx` is a draft that uses every feature. Check it after changing the site.

## Preview

```bash
npm run dev          # http://<this-pc>:4321, drafts included
```

## Publish

Push to `main`. GitHub Actions builds the site and deploys it to Pages in about two minutes.

## How Otto drafts and publishes

1. Otto writes the post with `draft: true` and pushes it. It's in the repo, not on the site.
2. Otto sends Zein the title, the one-line summary and the reading time, with a preview link.
3. Nothing publishes without Zein's OK on the text. If he asks for edits, Otto edits and asks again.
4. On his OK, Otto sets `draft: false` (and the `date` to the publish day), pushes, waits for the deploy and
   checks the post is live.

Rules for drafts: Zein's voice (plain, specific, short sentences, no hype). Nothing private: no employer or
client names or code, no secrets, keys, hostnames or IPs, no family.
