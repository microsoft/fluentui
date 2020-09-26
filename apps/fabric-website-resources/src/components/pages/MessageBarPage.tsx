import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { MessageBarPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/MessageBar/MessageBar.doc';

export const MessageBarPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/MessageBar.page.json')}
    {...{ ...MessageBarPageProps, ...props }}
  />
);
