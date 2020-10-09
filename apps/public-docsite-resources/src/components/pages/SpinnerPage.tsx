import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { SpinnerPageProps } from '@fluentui/react-examples/lib/react/Spinner/Spinner.doc';

export const SpinnerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/Spinner.page.json')}
    {...{ ...SpinnerPageProps, ...props }}
  />
);
