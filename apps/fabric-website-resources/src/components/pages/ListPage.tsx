import * as React from 'react';

import { ListPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/List/List.doc';
import { DemoPage } from '../DemoPage';

export const ListPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/List.page.json')}
    {...{ ...ListPageProps, ...props }}
  />
);
