import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { CommandBarPageProps } from '@fluentui/react-examples/lib/react/CommandBar/CommandBar.doc';

export const CommandBarPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../dist/api/react/CommandBar.page.json')}
    {...{ ...CommandBarPageProps, ...props }}
  />
);
