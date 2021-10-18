import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { GroupedListPageProps } from '@fluentui/react-examples/lib/react/GroupedList/GroupedList.doc';

export const GroupedListPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../dist/api/react/GroupedList.page.json')}
    {...{ ...GroupedListPageProps, ...props }}
  />
);
