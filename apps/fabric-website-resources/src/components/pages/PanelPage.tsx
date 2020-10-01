import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { PanelPageProps } from '@fluentui/react-examples/lib/react/Panel/Panel.doc';

export const PanelPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/Panel.page.json')}
    {...{ ...PanelPageProps, ...props }}
  />
);
