import * as React from 'react';
import { ComponentPage } from '@uifabric/example-app-base';

import { StaticListExample, StaticOrderedListExample, StaticListTableExample } from '../../StaticList/StaticList.Example';

export const StaticListPage = () => (
  <ComponentPage
    title="StaticList"
    componentName="StaticList examples"
    exampleCards={
      <>
        <StaticListExample />,
        <StaticOrderedListExample />,
        <StaticListTableExample />
      </>
    }
  />
);
