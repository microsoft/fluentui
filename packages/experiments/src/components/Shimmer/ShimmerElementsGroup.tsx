import * as React from 'react';

import {
  IShimmerProps,
  IShimmerStyleProps,
  IShimmerStyles,
  ShimmerElementType,
  ICircle,
  ILine,
  IGap,
  ShimmerElementVerticalAlign
} from './Shimmer.types';

export interface IShimmerElementsGroup {
  /**
   * Elements to be rendered on top of the Shimmering background.
   */
  lineElements?: Array<ICircle | IGap | ILine>;
}

export function ShimmerElementsGroup(props: IShimmerElementsGroup): JSX.Element {

  return (
    <div>
      TODO
    </div>
  );
}
