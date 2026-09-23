'use client';

import * as React from 'react';
import { useParams } from 'react-router';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import browserCollections from '../../.source/browser';
import { sources } from '../source';
import type { DocsTree } from '../source';
import { StandaloneExample } from './StandaloneExample';
import type { ExampleContent } from './StandaloneExample';

type ExampleProps = { name: string; title: string; ref?: React.Ref<HTMLElement> };

const loaders = {
  react: browserCollections.react.createClientLoader({
    component: (data, props: ExampleProps) => (
      <StandaloneExample {...props} components={data._componentPages as ExampleContent[]} />
    ),
  }),
  headless: browserCollections.headless.createClientLoader({
    component: (data, props: ExampleProps) => (
      <StandaloneExample {...props} components={data._componentPages as ExampleContent[]} />
    ),
  }),
};

const ExampleRoute: ForwardRefComponent<React.ComponentProps<'main'> & { collection?: DocsTree }> = React.forwardRef(
  ({ collection: fixedCollection }, ref) => {
    const { collection: routeCollection, example, '*': path } = useParams();
    const collection = fixedCollection ?? routeCollection;

    if ((collection !== 'react' && collection !== 'headless') || !example) {
      return (
        <main ref={ref}>
          <p role="alert">Example not found.</p>
        </main>
      );
    }

    const page = sources[collection].getPage(path?.split('/').filter(Boolean) ?? []);

    if (!page) {
      return (
        <main ref={ref}>
          <p role="alert">Example page not found.</p>
        </main>
      );
    }

    const Content = loaders[collection].getComponent(page.path);

    return (
      <React.Suspense fallback={<p role="status">Loading example…</p>}>
        <Content name={example} title={page.data.title} ref={ref} />
      </React.Suspense>
    );
  },
);

ExampleRoute.displayName = 'ExampleRoute';

export default ExampleRoute;
