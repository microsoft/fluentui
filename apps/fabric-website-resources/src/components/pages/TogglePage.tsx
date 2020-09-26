import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { TogglePageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Toggle/Toggle.doc';

export const TogglePage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Toggle.page.json')}
    {...{ ...TogglePageProps, ...props }}
  />
);
