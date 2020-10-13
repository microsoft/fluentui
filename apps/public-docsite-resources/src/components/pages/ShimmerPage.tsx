import * as React from 'react';

import { DemoPage } from '../DemoPage';
import { ShimmerPageProps } from '@fluentui/react-examples/lib/react/Shimmer/Shimmer.doc';

export const ShimmerPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/Shimmer.page.json')}
    {...{ ...ShimmerPageProps, ...props }}
  />
);
