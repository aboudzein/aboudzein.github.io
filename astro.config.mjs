// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeMermaid from 'rehype-mermaid';
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';
import { remarkMermaidPre } from './src/plugins/remark-mermaid-pre.mjs';

export default defineConfig({
  site: 'https://aboudzein.github.io',
  trailingSlash: 'ignore',
  integrations: [
    // Must come before mdx() so it also handles code blocks in .mdx files.
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
      useDarkModeMediaQuery: false,
      styleOverrides: {
        borderRadius: '6px',
        codeFontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
        codeFontSize: '0.875rem',
        uiFontFamily: 'inherit',
      },
      defaultProps: { wrap: false },
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    processor: unified({
      // Mermaid blocks become <pre class="mermaid"> before Expressive Code sees them,
      // then rehype-mermaid renders them to inline SVG at build time (no client JS).
      remarkPlugins: [remarkReadingTime, remarkMath, remarkMermaidPre],
      rehypePlugins: [
        [rehypeKatex, { output: 'html', throwOnError: true }],
        [rehypeMermaid, { strategy: 'inline-svg', mermaidConfig: { theme: 'neutral', fontFamily: 'inherit' } }],
      ],
    }),
  },
});
