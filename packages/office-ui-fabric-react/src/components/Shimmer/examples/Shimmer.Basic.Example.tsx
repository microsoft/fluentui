import * as React from 'react';

import { Shimmer, ShimmerElementType as ElemType } from 'office-ui-fabric-react/lib/Shimmer';

import * as ShimmerExampleStyles from './Shimmer.Example.scss';

export class ShimmerBasicExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className={ ShimmerExampleStyles.shimmerExampleContainer }>
        Basic Shimmer with no elements provided. It defaults to a line of 16px height.
        <Shimmer />
        <Shimmer width={ '75%' } />
        <Shimmer width={ '50%' } />
        Basic Shimmer with elements provided.
        <Shimmer
          shimmerElements={ [{ type: ElemType.circle }, { type: ElemType.gap, width: '2%' }, { type: ElemType.line }] }
        />
        <Shimmer
          shimmerElements={ [
            { type: ElemType.circle, height: 24 },
            { type: ElemType.gap, width: '2%' },
            { type: ElemType.line, height: 16, width: '20%' },
            { type: ElemType.gap, width: '5%' },
            { type: ElemType.line, height: 16, width: '20%' },
            { type: ElemType.gap, width: '10%' },
            { type: ElemType.line, height: 16, width: '15%' },
            { type: ElemType.gap, width: '10%' },
            { type: ElemType.line, height: 16 }
          ] }
        />
        <Shimmer
          width={ '70%' }
          shimmerElements={ [
            { type: ElemType.circle, height: 24 },
            { type: ElemType.gap, width: '2%' },
            { type: ElemType.line, height: 16, width: '20%' },
            { type: ElemType.gap, width: '5%' },
            { type: ElemType.line, height: 16, width: '20%' },
            { type: ElemType.gap, width: '10%' },
            { type: ElemType.line, height: 16, width: '15%' },
            { type: ElemType.gap, width: '10%' },
            { type: ElemType.line, height: 16 }
          ] }
        />
        Variations of vertical alignment for Circles and Lines.
        <Shimmer
          shimmerElements={ [
            { type: ElemType.circle },
            { type: ElemType.gap, width: '2%' },
            { type: ElemType.circle, height: 15, verticalAlign: 'top' },
            { type: ElemType.gap, width: '2%' },
            { type: ElemType.line, verticalAlign: 'bottom', width: '20%' },
            { type: ElemType.gap, width: '2%' },
            { type: ElemType.line, height: 5, verticalAlign: 'top', width: '20%' },
            { type: ElemType.gap, width: '2%' },
            { type: ElemType.line, height: 16, width: '15%' },
            { type: ElemType.gap, width: '2%' },
            { type: ElemType.line, height: 10, verticalAlign: 'bottom' }
          ] }
        />
      </div>
    );
  }
}
