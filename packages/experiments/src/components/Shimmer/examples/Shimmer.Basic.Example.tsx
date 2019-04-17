import * as React from 'react';

import {
  Shimmer,
  ShimmerElementType as ElemType,
  ShimmerElementVerticalAlign as ElemVerticalAlign
} from '@uifabric/experiments/lib/Shimmer';

import './Shimmer.Example.scss';

export class ShimmerBasicExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="shimmerBasicExample-container">
        Basic Shimmer with no elements provided. It defaults to a line of 16px height.
        <Shimmer />
        <Shimmer widthInPercentage={75} />
        <Shimmer widthInPercentage={50} />
        Basic Shimmer with elements provided.
        <Shimmer shimmerElements={[{ type: ElemType.circle }, { type: ElemType.gap, widthInPercentage: 2 }, { type: ElemType.line }]} />
        <Shimmer
          shimmerElements={[
            { type: ElemType.circle, height: 24 },
            { type: ElemType.gap, widthInPercentage: 2 },
            { type: ElemType.line, height: 16, widthInPercentage: 20 },
            { type: ElemType.gap, widthInPercentage: 5 },
            { type: ElemType.line, height: 16, widthInPercentage: 20 },
            { type: ElemType.gap, widthInPercentage: 10 },
            { type: ElemType.line, height: 16, widthInPercentage: 15 },
            { type: ElemType.gap, widthInPercentage: 10 },
            { type: ElemType.line, height: 16 }
          ]}
        />
        <Shimmer
          widthInPercentage={70}
          shimmerElements={[
            { type: ElemType.circle, height: 24 },
            { type: ElemType.gap, widthInPercentage: 2 },
            { type: ElemType.line, height: 16, widthInPercentage: 20 },
            { type: ElemType.gap, widthInPercentage: 5 },
            { type: ElemType.line, height: 16, widthInPercentage: 20 },
            { type: ElemType.gap, widthInPercentage: 10 },
            { type: ElemType.line, height: 16, widthInPercentage: 15 },
            { type: ElemType.gap, widthInPercentage: 10 },
            { type: ElemType.line, height: 16 }
          ]}
        />
        Variations of vertical alignment for Circles and Lines.
        <Shimmer
          shimmerElements={[
            { type: ElemType.circle },
            { type: ElemType.gap, widthInPercentage: 2 },
            { type: ElemType.circle, height: 15, verticalAlign: ElemVerticalAlign.top },
            { type: ElemType.gap, widthInPercentage: 2 },
            { type: ElemType.line, verticalAlign: ElemVerticalAlign.bottom, widthInPercentage: 20 },
            { type: ElemType.gap, widthInPercentage: 2 },
            { type: ElemType.line, height: 5, verticalAlign: ElemVerticalAlign.top, widthInPercentage: 20 },
            { type: ElemType.gap, widthInPercentage: 2 },
            { type: ElemType.line, height: 16, widthInPercentage: 15 },
            { type: ElemType.gap, widthInPercentage: 2 },
            { type: ElemType.line, height: 10, verticalAlign: ElemVerticalAlign.bottom }
          ]}
        />
      </div>
    );
  }
}
