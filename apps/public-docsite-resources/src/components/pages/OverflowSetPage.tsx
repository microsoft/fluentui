import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { OverflowSetPageProps } from '@fluentui/react-examples/lib/react/OverflowSet/OverflowSet.doc';

export const OverflowSetPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../dist/api/react/OverflowSet.page.json')}
    {...{ ...OverflowSetPageProps, ...props }}
  />
);
