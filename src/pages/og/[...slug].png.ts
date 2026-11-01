import type { APIRoute, GetStaticPaths } from 'astro';
import { getPosts, formatDate, type Post } from '../../lib/posts';
import { ogImage } from '../../lib/og';
import { SITE } from '../../consts';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  return [
    { params: { slug: 'default' }, props: { title: SITE.title, subtitle: SITE.description } },
    ...posts.map((post: Post) => ({
      params: { slug: post.id },
      props: { title: post.data.title, subtitle: `${SITE.author} · ${formatDate(post.data.date)}` },
    })),
  ];
};

export const GET: APIRoute = async ({ props }) => {
  const png = await ogImage(props.title, props.subtitle);
  return new Response(Buffer.from(png), { headers: { 'Content-Type': 'image/png' } });
};
