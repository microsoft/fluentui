import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { MessageBarPageProps } from '@fluentui/react-examples/lib/react/MessageBar/MessageBar.doc';

export const MessageBarPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../dist/api/react/MessageBar.page.json')}
    {...{ ...MessageBarPageProps, ...props }}
  />
);
