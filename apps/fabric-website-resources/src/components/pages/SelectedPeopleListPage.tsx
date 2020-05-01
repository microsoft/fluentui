import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { SelectedPeopleListPageProps } from 'office-ui-fabric-react/lib/components/SelectedItemsList/SelectedPeopleList/SelectedPeopleList.doc';

export const SelectedPeopleListPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/SelectedPeopleList.page.json')}
    {...{ ...SelectedPeopleListPageProps, ...props }}
  />
);
