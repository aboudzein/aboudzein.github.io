import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const fontDir = path.resolve('node_modules/@fontsource/inter/files');
const regular = fs.readFileSync(path.join(fontDir, 'inter-latin-400-normal.woff'));
const bold = fs.readFileSync(path.join(fontDir, 'inter-latin-700-normal.woff'));

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

/** Renders a 1200x630 Open Graph card as PNG. */
export async function ogImage(title: string, subtitle: string): Promise<Uint8Array> {
  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px 80px',
      background: '#fbfbfa',
      color: '#1d1f22',
      fontFamily: 'Inter',
      borderTop: '16px solid #2f6f6a',
    },
    [
      h('div', { fontSize: 30, color: '#5c6370', display: 'flex' }, 'aboudzein.github.io'),
      h('div', { fontSize: title.length > 60 ? 56 : 68, fontWeight: 700, lineHeight: 1.15, display: 'flex' }, title),
      h('div', { fontSize: 30, color: '#5c6370', display: 'flex' }, subtitle),
    ],
  );
  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter', data: regular, weight: 400, style: 'normal' },
      { name: 'Inter', data: bold, weight: 700, style: 'normal' },
    ],
  });
  return new Resvg(svg).render().asPng();
}
