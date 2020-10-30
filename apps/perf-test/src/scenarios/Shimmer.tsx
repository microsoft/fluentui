import * as React from 'react';
import { Shimmer, ShimmerElementType } from '@fluentui/react';

const exampleShimmer = [
  { type: ShimmerElementType.circle },
  { type: ShimmerElementType.gap, width: '2%' },
  { type: ShimmerElementType.line },
];

const Scenario = () => <Shimmer shimmerElements={exampleShimmer} />;

export default Scenario;
