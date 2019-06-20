import * as React from 'react';
import { ComponentPage, ExampleCard, Markdown } from '@uifabric/example-app-base';

import { StaticListExample, StaticOrderedListExample, StaticListTableExample } from '../../components/StaticList/StaticList.Example';

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
    bestPractices={<div />}
    dos={
      <div>
        <ul>
          <li>Render a reasonable number of rows that do not degrade user-experience.</li>
          <li>Render content that is paginated either by prepending or appending rows.</li>
        </ul>
      </div>
    }
    donts={
      <div>
        <ul>
          <li>Render large data sets with complex row DOM as it will likely result in a degraded user-experience.</li>
          <li>Rely on default index as key behavior if sorting or filtering row content.</li>
        </ul>
      </div>
    }
  />
);
