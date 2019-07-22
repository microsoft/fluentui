import * as React from 'react';

import { ListPageProps } from 'office-ui-fabric-react/lib/components/List/List.doc';
import { DemoPage } from '../DemoPage';

export const ListPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/List.page.json')} {...{ ...ListPageProps, ...props }} />
);
