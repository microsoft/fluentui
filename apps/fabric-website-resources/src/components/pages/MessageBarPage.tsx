import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { MessageBarPageProps } from 'office-ui-fabric-react/lib/components/MessageBar/MessageBar.doc';

export const MessageBarPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/MessageBar.page.json')}
    {...{ ...MessageBarPageProps, ...props }}
  />
);
