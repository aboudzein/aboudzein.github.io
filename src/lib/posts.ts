import { getCollection, render, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

// `SHOW_DRAFTS=1 npm run build` builds a private preview with drafts included.
const showDrafts = import.meta.env.DEV || process.env.SHOW_DRAFTS === '1';

/** Published posts, newest first. Drafts show in `astro dev` only. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => showDrafts || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function readingTime(post: Post): Promise<number> {
  const { remarkPluginFrontmatter } = await render(post);
  return remarkPluginFrontmatter.minutesRead ?? 1;
}

export function slugifyTag(tag: string): string {
  return tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function allTags(posts: Post[]): { tag: string; slug: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of posts) for (const t of p.data.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts]
    .map(([tag, count]) => ({ tag, slug: slugifyTag(tag), count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Other parts of the same series, ordered by part. */
export function seriesParts(posts: Post[], post: Post): Post[] {
  const name = post.data.series?.name;
  if (!name) return [];
  return posts
    .filter((p) => p.data.series?.name === name)
    .sort((a, b) => a.data.series!.part - b.data.series!.part);
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
