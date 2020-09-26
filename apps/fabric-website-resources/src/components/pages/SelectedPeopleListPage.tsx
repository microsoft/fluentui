import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { SelectedPeopleListPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/SelectedPeopleList/SelectedPeopleList.doc';

export const SelectedPeopleListPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/SelectedPeopleList.page.json')}
    {...{ ...SelectedPeopleListPageProps, ...props }}
  />
);
