import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListPageProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/DetailsList.page.json')}
    {...{ ...DetailsListPageProps, ...props }}
  />
);
