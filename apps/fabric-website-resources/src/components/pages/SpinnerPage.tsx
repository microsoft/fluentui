import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { SpinnerPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Spinner/Spinner.doc';

export const SpinnerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Spinner.page.json')}
    {...{ ...SpinnerPageProps, ...props }}
  />
);
