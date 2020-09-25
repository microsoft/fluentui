import * as React from 'react';

import { SeparatorPageProps } from '@fluentui/examples/lib/office-ui-fabric-react/Separator/Separator.doc';
import { DemoPage } from '../DemoPage';

export const SeparatorPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Separator.page.json')}
    {...{ ...SeparatorPageProps, ...props }}
  />
);
