import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { CommandBarPageProps } from '@fluentui/react-examples/lib/react/CommandBar/CommandBar.doc';

export const CommandBarPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/CommandBar.page.json')}
    {...{ ...CommandBarPageProps, ...props }}
  />
);
