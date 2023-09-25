import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { ProgressIndicatorPageProps } from '@fluentui/react-examples/lib/react/ProgressIndicator/ProgressIndicator.doc';

export const ProgressIndicatorPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../dist/api/react/ProgressIndicator.page.json')}
    {...{ ...ProgressIndicatorPageProps, ...props }}
  />
);
