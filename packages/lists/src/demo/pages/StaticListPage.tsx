import * as React from 'react';
import { ComponentPage, ExampleCard, Markdown } from '@uifabric/example-app-base';

import { StaticListExample, StaticOrderedListExample, StaticListTableExample } from '../../StaticList/StaticList.Example';

export const StaticListPage = () => (
  <ComponentPage
    title="StaticList"
    componentName="StaticList examples"
    exampleCards={
      <>
        <ExampleCard title="StaticList example">
          <StaticListExample />
        </ExampleCard>
        <ExampleCard title="StaticList ordered list">
          <StaticOrderedListExample />
        </ExampleCard>
        <ExampleCard title="StaticList table">
          <StaticListTableExample />
        </ExampleCard>
      </>
    }
    overview={<Markdown>{require<string>('!raw-loader!./docs/StaticListOverview.md')}</Markdown>}
  />
);
