import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { TogglePageProps } from '@fluentui/react-examples/lib/react-toggle/Toggle/Toggle.doc';

export const TogglePage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/Toggle.page.json')}
    {...{ ...TogglePageProps, ...props }}
  />
);
