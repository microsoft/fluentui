'use client';

import { webLightTheme } from '@fluentui/react-theme';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/page';
import * as React from 'react';
import { hasComponentPage } from '../utils/hasComponentPage';
import browserCollections from '../../.source/browser';
import type { TOCItemType } from 'fumadocs-core/toc';
import type { MDXProps } from 'mdx/types';

import { headlessSource } from '../source';
import type { reactSource } from '../source';
import { baseOptions, homeOptions, headlessOptions, headlessHomeOptions } from '../layout.shared';
import { createDocsTree } from '../utils/createDocsTree';
import { toKebabCase } from '../utils/toKebabCase';
import { DocsTypeTable } from './DocsTypeTable';
import { ComponentPageHeaderProvider } from './ComponentPageHeaderContext';
import { DocsHome } from './DocsHome';

const mdxComponents = {
  ...defaultMdxComponents,
  TypeTable: DocsTypeTable,
  // Syntax palettes are authored against their own backgrounds, not the docs card surface.
  pre: (props: React.ComponentProps<'pre'>) => (
    <CodeBlock {...props} keepBackground>
      <Pre>{props.children}</Pre>
    </CodeBlock>
  ),
};

/** Both trees are built by the same `loader()` call shape, so one type covers both. */
type Source = typeof reactSource;
type Page = NonNullable<ReturnType<Source['getPage']>>;

const contentLoaders = {
  react: browserCollections.react.createClientLoader({
    component: (data, props: ContentProps) => (
      <LoadedContent
        {...props}
        data={{
          body: data.default,
          toc: data.toc,
          hasComponentPage: hasComponentPage(data._componentPages),
          components: data.components as MDXProps['components'],
        }}
      />
    ),
  }),
  headless: browserCollections.headless.createClientLoader({
    component: (data, props: ContentProps) => (
      <LoadedContent
        {...props}
        data={{
          body: data.default,
          toc: data.toc,
          hasComponentPage: hasComponentPage(data._componentPages),
          components: data.components as MDXProps['components'],
        }}
      />
    ),
  }),
};

type ContentProps = { page: Page; home?: boolean };

const PageContent = (props: ContentProps) => {
  const collection = props.page.url.startsWith('/headless') ? 'headless' : 'react';
  // Fumadocs caches this component by path; retrieving it does not create a new component.
  const Content = contentLoaders[collection].getComponent(props.page.path);
  // eslint-disable-next-line react-hooks/static-components
  return <Content {...props} />;
};

const LoadedContent = ({
  page,
  home = false,
  data,
}: ContentProps & {
  data: {
    body: React.ComponentType<MDXProps>;
    toc?: TOCItemType[];
    hasComponentPage: boolean;
    components?: MDXProps['components'];
  };
}) => {
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const [renderedToc, setRenderedToc] = React.useState<TOCItemType[]>();

  React.useEffect(() => {
    const body = bodyRef.current;
    if (!body || home) {
      return;
    }

    // Story descriptions and examples render outside MDX's build-time heading extraction.
    const usedIds = new Set(Array.from(body.querySelectorAll('[id]'), element => element.id));
    const toc = Array.from(body.querySelectorAll<HTMLHeadingElement>('h2, h3'))
      .filter(heading => !heading.closest('[data-fluent-preview]'))
      .map(heading => {
        const title = heading.textContent?.trim() ?? '';
        if (!heading.id) {
          const base = toKebabCase(title) || 'section';
          let id = base;
          let suffix = 1;
          while (usedIds.has(id)) {
            id = `${base}-${suffix++}`;
          }
          heading.id = id;
          usedIds.add(id);
        }
        return { title, url: `#${heading.id}`, depth: Number(heading.tagName.slice(1)) };
      });
    setRenderedToc(toc);
  }, [data, home]);

  const MDX = data.body;

  if (home) {
    return (
      <DocsHome
        title={page.data.title}
        description={page.data.description}
        tree={page.url.startsWith('/headless') ? 'headless' : 'react'}
      >
        <MDX components={{ ...mdxComponents, ...data.components }} />
      </DocsHome>
    );
  }

  const header = (
    <div className="not-prose">
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription style={{ marginTop: webLightTheme.spacingVerticalXL }}>{page.data.description}</DocsDescription>
    </div>
  );

  return (
    <DocsPage toc={renderedToc ?? data.toc} className="max-w-none">
      {!data.hasComponentPage && header}
      <DocsBody ref={bodyRef}>
        <ComponentPageHeaderProvider
          value={
            data.hasComponentPage
              ? {
                  title: (
                    <div className="not-prose">
                      <DocsTitle>{page.data.title}</DocsTitle>
                    </div>
                  ),
                  description: page.data.description,
                }
              : undefined
          }
        >
          <MDX components={{ ...mdxComponents, ...data.components }} />
        </ComponentPageHeaderProvider>
      </DocsBody>
    </DocsPage>
  );
};

export interface DocsTreeRouteProps {
  source: Source;
  /** Splat segment after the tree prefix, e.g. `components/button`. */
  splat: string | undefined;
  title: string;
  home?: boolean;
}

/**
 * Shared renderer for both documentation trees (design D3). The trees differ only in
 * their content source and title; the chrome is identical.
 */
export const DocsTreeRoute = ({ source, splat, title, home = false }: DocsTreeRouteProps): React.ReactElement => {
  const slugs = splat ? splat.split('/').filter(Boolean) : [];
  const page = source.getPage(slugs);

  // The chrome is identical on both paths; only the children differ.
  const layoutProps = {
    ...(source === headlessSource ? headlessOptions : baseOptions),
    tree: createDocsTree(source.pageTree),
    containerProps: { className: source === headlessSource ? 'docs-headless' : 'docs-react' },
    tabMode: 'top' as const,
  };

  if (home && slugs.length === 0 && page) {
    return (
      <HomeLayout {...(source === headlessSource ? headlessHomeOptions : homeOptions)}>
        <React.Suspense fallback={<p role="status">Loading {title}…</p>}>
          <PageContent page={page} home />
        </React.Suspense>
      </HomeLayout>
    );
  }

  if (!page) {
    return (
      <DocsLayout {...layoutProps}>
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
    <DocsLayout {...layoutProps}>
      <React.Suspense fallback={<DocsPage>{null}</DocsPage>}>
        <PageContent key={page.url} page={page} />
      </React.Suspense>
    </DocsLayout>
  );
};
