import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListPageProps } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsList.doc';

export const DetailsListPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/DetailsList.page.json')}
    {...{ ...DetailsListPageProps, ...props }}
  />
);
