import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { SpinButtonPageProps } from '@fluentui/react-examples/lib/react/SpinButton/SpinButton.doc';

export const SpinButtonPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@fluentui/api-docs/lib/pages/react/SpinButton.page.json')}
    {...{ ...SpinButtonPageProps, ...props }}
  />
);
