import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { ShimmerPageProps } from '@fluentui/react-examples/lib/react/Shimmer/Shimmer.doc';

export const ShimmerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../dist/api/react/Shimmer.page.json')} {...{ ...ShimmerPageProps, ...props }} />
);
