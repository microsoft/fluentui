import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { PanelPageProps } from 'office-ui-fabric-react/lib/packages/react-fundamentals/components/Panel/Panel.doc';

export const PanelPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Panel.page.json')}
    {...{ ...PanelPageProps, ...props }}
  />
);
