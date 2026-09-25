import { remark } from 'remark';
import type { Nodes } from 'mdast';
import { documentationLink } from './documentationLinks';

/** Edit link destinations in place so example code and authored Markdown formatting stay intact. */
export function rewriteMarkdownLinks(markdown: string, pageUrl: string, basename: string): string {
  const tree = remark().parse(markdown);
  const edits: Array<{ start: number; end: number; text: string }> = [];
  function walk(node: Nodes): void {
    const start = node.position?.start.offset;
    const end = node.position?.end.offset;
    if (start !== undefined && end !== undefined) {
      const original = markdown.slice(start, end);
      if (node.type === 'link' || node.type === 'definition') {
        const url = documentationLink(node.url, pageUrl, basename, 'markdown');
        if (url !== node.url) {
          const destination = node.type === 'link' ? original.lastIndexOf('](') + 2 : original.indexOf(']:') + 2;
          const offset = original.indexOf(node.url, destination);
          if (offset >= destination) {
            edits.push({ start: start + offset, end: start + offset + node.url.length, text: url });
          }
        }
      } else if (node.type === 'html') {
        const text = original.replace(
          /(<a\b[^>]*\bhref\s*=\s*)(["'])(.*?)\2/gi,
          (_, prefix, quote, href) =>
            `${prefix}${quote}${documentationLink(href.replace(/&amp;/g, '&'), pageUrl, basename, 'markdown')}${quote}`,
        );
        if (text !== original) {
          edits.push({ start, end, text });
        }
      }
    }
    if ('children' in node) {
      node.children.forEach(walk);
    }
  }
  walk(tree);
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    markdown = markdown.slice(0, edit.start) + edit.text + markdown.slice(edit.end);
  }
  return markdown;
}
