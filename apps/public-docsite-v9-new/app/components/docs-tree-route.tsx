import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';

import type { reactSource } from '../lib/source';

/** Both trees are built by the same `loader()` call shape, so one type covers both. */
type Source = typeof reactSource;

export interface DocsTreeRouteProps {
  source: Source;
  /** Splat segment after the tree prefix, e.g. `components/button`. */
  splat: string | undefined;
  title: string;
}

/**
 * Shared renderer for both documentation trees (design D3). The trees differ only in
 * their content source and title; the chrome is identical.
 */
export function DocsTreeRoute({ source, splat, title }: DocsTreeRouteProps) {
  const slugs = splat ? splat.split('/').filter(Boolean) : [];
  const page = source.getPage(slugs);

  if (!page) {
    return (
      <DocsLayout tree={source.pageTree} nav={{ title }}>
        <DocsPage>
          <DocsTitle>Not found</DocsTitle>
          <DocsBody>
            <p>No documentation page exists at this address.</p>
          </DocsBody>
        </DocsPage>
      </DocsLayout>
    );
  }

  const MDX = page.data.body;

  return (
    <DocsLayout tree={source.pageTree} nav={{ title }}>
      <DocsPage toc={page.data.toc}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDX components={defaultMdxComponents} />
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  );
}
