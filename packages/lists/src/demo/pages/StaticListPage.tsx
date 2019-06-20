import * as React from 'react';
import { ComponentPage, ExampleCard, Markdown } from '@uifabric/example-app-base';

import { StaticListExample } from '../../components/StaticList/examples/StaticList.Example';
import { StaticOrderedListExample } from '../../components/StaticList/examples/StaticOrderedList.Example';
import { StaticListTableExample } from '../../components/StaticList/examples/StaticTable.Example';

const StaticListExampleCode = require('!raw-loader!@uifabric/lists/src/components/StaticList/examples/StaticList.Example.tsx') as string;
const StaticOrderedListExampleCode = require('!raw-loader!@uifabric/lists/src/components/StaticList/examples/StaticOrderedList.Example.tsx') as string;
const StaticListTableExampleCode = require('!raw-loader!@uifabric/lists/src/components/StaticList/examples/StaticTable.Example.tsx') as string;

export const StaticListPage = () => (
  <ComponentPage
    title="StaticList"
    componentName="StaticList examples"
    exampleCards={
      <>
        <ExampleCard title="StaticList example" code={StaticListExampleCode}>
          <StaticListExample />
        </ExampleCard>
        <ExampleCard title="StaticList ordered list" code={StaticOrderedListExampleCode}>
          <StaticOrderedListExample />
        </ExampleCard>
        <ExampleCard title="StaticList table" code={StaticListTableExampleCode}>
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
