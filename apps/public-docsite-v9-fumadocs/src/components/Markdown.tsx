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
        rehypePlugins: [rehypeRaw],
      }),
    [prefix],
  );

  const source = children.replace(
    /href=(["'])\/?\?path=\/docs\/overview-browser-support--docs(#[^"']*)?\1/g,
    `href=$1${docsBasename}/headless/guide/browser-support$2$1`,
  );

  return (
    <div ref={ref}>
      <Markdown components={{ pre: DescriptionCode }}>{source}</Markdown>
    </div>
  );
});

const headingCounts = new WeakMap<object, Map<string, number>>();

Description.displayName = 'Description';
