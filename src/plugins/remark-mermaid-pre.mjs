import { visit } from 'unist-util-visit';

/** Turns ```mermaid fences into <pre class="mermaid"> so the code highlighter skips them. */
export function remarkMermaidPre() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'mermaid' || !parent || index === undefined) return;
      parent.children[index] = {
        type: 'mermaidBlock',
        data: { hName: 'pre', hProperties: { className: ['mermaid'] } },
        children: [{ type: 'text', value: node.value }],
      };
    });
  };
}
