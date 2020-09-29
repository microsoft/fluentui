import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { PickersPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Pickers/Pickers.doc';

export const PickersPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Pickers.page.json')}
    {...{ ...PickersPageProps, ...props }}
  />
);
