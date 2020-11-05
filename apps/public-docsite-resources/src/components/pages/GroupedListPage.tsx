import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { GroupedListPageProps } from '@fluentui/react-examples/lib/react/GroupedList/GroupedList.doc';

export const GroupedListPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@fluentui/api-docs/lib/pages/react/GroupedList.page.json')}
    {...{ ...GroupedListPageProps, ...props }}
  />
);
