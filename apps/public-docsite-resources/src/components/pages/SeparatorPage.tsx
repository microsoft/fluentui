import * as React from 'react';

import { SeparatorPageProps } from '@fluentui/react-examples/lib/react/Separator/Separator.doc';
import { DemoPage } from '../DemoPage';

export const SeparatorPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/Separator.page.json')}
    {...{ ...SeparatorPageProps, ...props }}
  />
);
