import * as React from 'react';
import { DemoPage } from '../../DemoPage';
import { DetailsListPageProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react/DetailsList.page.json')}
    {...{ ...DetailsListPageProps, ...props }}
  />
);
