import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { OverflowSetPageProps } from 'office-ui-fabric-react/lib/components/OverflowSet/OverflowSet.doc';

export const OverflowSetPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage {...{ ...OverflowSetPageProps, ...props }} />
);
