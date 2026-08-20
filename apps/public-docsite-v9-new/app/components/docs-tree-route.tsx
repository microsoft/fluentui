import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import { Suspense, use } from 'react';

import type { reactSource } from '../source';

/** Both trees are built by the same `loader()` call shape, so one type covers both. */
type Source = typeof reactSource;
type Page = NonNullable<ReturnType<Source['getPage']>>;

/**
 * `use()` requires a promise that is stable across renders, so each page's load is cached
 * by its URL. Content is immutable for the lifetime of the app, so this never goes stale.
 */
const contentCache = new Map<string, Promise<unknown>>();

function loadContent(page: Page) {
  const cached = contentCache.get(page.url);

  if (cached) {
    return cached;
  }

  // `async: true` collections expose the compiled body behind `load()` so that each page's
  // content is a separate chunk rather than part of one eager bundle.
  const promise = (page.data as unknown as { load: () => Promise<unknown> }).load();
  contentCache.set(page.url, promise);

  return promise;
}

function PageContent({ page }: { page: Page }) {
  const data = use(loadContent(page)) as {
    body: React.ComponentType<{ components?: unknown }>;
    toc?: unknown;
  };

  const MDX = data.body;

  return (
    <DocsPage toc={data.toc as never}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={defaultMdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}

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

  return (
    <DocsLayout tree={source.pageTree} nav={{ title }}>
      {/*
       * Prerendering resolves this boundary before emitting HTML (see entry.server.tsx), so
       * the fallback is only ever seen during client-side navigation to a not-yet-loaded page.
       */}
      <Suspense fallback={<DocsPage>{null}</DocsPage>}>
        <PageContent page={page} />
      </Suspense>
    </DocsLayout>
  );
}
