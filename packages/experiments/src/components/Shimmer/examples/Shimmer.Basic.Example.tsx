import * as React from 'react';
import {
  Shimmer,
  ShimmerElementType as ElemType,
  ShimmerElementVerticalAlign as ElemVerticalAlign
} from 'experiments/lib/Shimmer';

export class ShimmerBasicExample extends React.Component<{}, {}> {

  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {

    return (
      // tslint:disable-next-line:jsx-ban-props
      <div style={ { padding: '2px' } }>
        Generic Shimmer with no elements provided.
        <Shimmer />
        <Shimmer
          width={ 75 }
        />
        <Shimmer
          width={ 50 }
        />
        Custom Shimmer with elements provided.
        <Shimmer
          lineElements={ [
            { type: ElemType.CIRCLE },
            { type: ElemType.GAP, widthInPercentage: 2 },
            { type: ElemType.LINE },
          ] }
        />
        Notice how the same elements change relative to the shimmer width provided.
        <Shimmer
          lineElements={ [
            { type: ElemType.CIRCLE, height: 24 },
            { type: ElemType.GAP, widthInPercentage: 2 },
            { type: ElemType.LINE, height: 16, widthInPercentage: 20 },
            { type: ElemType.GAP, widthInPercentage: 5 },
            { type: ElemType.LINE, height: 16, widthInPercentage: 20 },
            { type: ElemType.GAP, widthInPercentage: 10 },
            { type: ElemType.LINE, height: 16, widthInPercentage: 15 },
            { type: ElemType.GAP, widthInPercentage: 10 },
            { type: ElemType.LINE, height: 16 }
          ] }
        />
        <Shimmer
          width={ 70 }
          lineElements={ [
            { type: ElemType.CIRCLE, height: 24 },
            { type: ElemType.GAP, widthInPercentage: 2 },
            { type: ElemType.LINE, height: 16, widthInPercentage: 20 },
            { type: ElemType.GAP, widthInPercentage: 5 },
            { type: ElemType.LINE, height: 16, widthInPercentage: 20 },
            { type: ElemType.GAP, widthInPercentage: 10 },
            { type: ElemType.LINE, height: 16, widthInPercentage: 15 },
            { type: ElemType.GAP, widthInPercentage: 10 },
            { type: ElemType.LINE, height: 16 }
          ] }
        />
        Variations of vertical alignment for Circles and Lines.
        <Shimmer
          lineElements={ [
            { type: ElemType.CIRCLE },
            { type: ElemType.GAP, widthInPercentage: 2 },
            { type: ElemType.CIRCLE, height: 15, verticalAlign: ElemVerticalAlign.TOP },
            { type: ElemType.GAP, widthInPercentage: 2 },
            { type: ElemType.LINE, verticalAlign: ElemVerticalAlign.BOTTOM, widthInPercentage: 20 },
            { type: ElemType.GAP, widthInPercentage: 2 },
            { type: ElemType.LINE, height: 5, verticalAlign: ElemVerticalAlign.TOP, widthInPercentage: 20 },
            { type: ElemType.GAP, widthInPercentage: 2 },
            { type: ElemType.LINE, height: 16, widthInPercentage: 15 },
            { type: ElemType.GAP, widthInPercentage: 2 },
            { type: ElemType.LINE, height: 10, verticalAlign: ElemVerticalAlign.BOTTOM }
          ] }
        />
      </div>
    );
  }
}