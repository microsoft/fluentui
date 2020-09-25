import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { SpinButtonPageProps } from '@fluentui/examples/lib/office-ui-fabric-react/SpinButton/SpinButton.doc';

export const SpinButtonPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/SpinButton.page.json')}
    {...{ ...SpinButtonPageProps, ...props }}
  />
);
