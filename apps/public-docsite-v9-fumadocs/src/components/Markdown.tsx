'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { createMarkdownRenderer } from 'fumadocs-core/content/md';
import { remarkHeading } from 'fumadocs-core/mdx-plugins/remark-heading';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { highlight } from './highlighter';
import { toKebabCase } from '../utils/toKebabCase';
import { docsBasename } from '../utils/paths';
import { documentationLink } from '../utils/documentationLinks';
import { useLocation } from 'react-router';
import type { Root, Nodes } from 'hast';

const DescriptionCode: ForwardRefComponent<React.ComponentProps<'div'>> = React.forwardRef(({ children }, ref) => {
  const code = React.Children.toArray(children)[0];

  if (!React.isValidElement<{ children?: string; className?: string }>(code)) {
    return (
      <div ref={ref}>
        <pre>{children}</pre>
      </div>
    );
  }

  const language = code.props.className?.replace(/^language-/, '');
  const html = highlight(String(code.props.children ?? ''), language);
  // eslint-disable-next-line react/no-danger
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
});

DescriptionCode.displayName = 'DescriptionCode';

export const Description: ForwardRefComponent<{ children: string }> = React.forwardRef(({ children }, ref) => {
  const prefix = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const { pathname } = useLocation();
  const { Markdown } = React.useMemo(
    () =>
      createMarkdownRenderer({
        remarkPlugins: [
          remarkGfm,
          [
            remarkHeading,
            {
              slug(root: object, _heading: object, text: string) {
                let counts = headingCounts.get(root);
                if (!counts) {
                  counts = new Map();
                  headingCounts.set(root, counts);
                }
                const slug = toKebabCase(text) || 'section';
                const count = counts.get(slug) ?? 0;
                counts.set(slug, count + 1);
                return `${prefix}-${slug}${count ? `-${count}` : ''}`;
              },
            },
          ],
        ],
        remarkRehypeOptions: { allowDangerousHtml: true },
        rehypePlugins: [
          rehypeRaw,
          () => (tree: Root) => {
            function walk(node: Nodes): void {
              if (node.type === 'element' && node.tagName === 'a' && typeof node.properties.href === 'string') {
                node.properties.href = documentationLink(node.properties.href, pathname, docsBasename, 'html');
              }
              if ('children' in node) {
                node.children.forEach(walk);
              }
            }
            walk(tree);
          },
        ],
      }),
    [prefix, pathname],
  );

  return (
    <div ref={ref}>
      <Markdown components={{ pre: DescriptionCode }}>{children}</Markdown>
    </div>
  );
});

const headingCounts = new WeakMap<object, Map<string, number>>();

Description.displayName = 'Description';
