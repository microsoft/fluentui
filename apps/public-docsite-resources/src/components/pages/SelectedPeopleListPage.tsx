import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { SelectedPeopleListPageProps } from '@fluentui/react-examples/lib/react/SelectedPeopleList/SelectedPeopleList.doc';

export const SelectedPeopleListPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../dist/api/react/SelectedPeopleList.page.json')}
    {...{ ...SelectedPeopleListPageProps, ...props }}
  />
);
