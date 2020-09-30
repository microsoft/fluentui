import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { GroupedListPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/GroupedList/GroupedList.doc';

export const GroupedListPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/GroupedList.page.json')}
    {...{ ...GroupedListPageProps, ...props }}
  />
);
