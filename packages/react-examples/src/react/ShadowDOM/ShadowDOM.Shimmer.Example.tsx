import * as React from 'react';
import { Shadow } from './ShadowHelper';
import { ShimmerBasicExample } from '../Shimmer/Shimmer.Basic.Example';

export const ShadowDOMShimmerExample: React.FunctionComponent = () => {
  return (
    <Shadow>
      <ShimmerBasicExample />
    </Shadow>
  );
};
