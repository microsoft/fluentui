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
            { type: ElemType.circle },
            { type: ElemType.gap, widthInPercentage: 2 },
            { type: ElemType.line },
          ] }
        />
        Notice how the same elements change relative to the shimmer width provided.
        <Shimmer
          lineElements={ [
            { type: ElemType.circle, height: 24 },
            { type: ElemType.gap, widthInPercentage: 2 },
            { type: ElemType.line, height: 16, widthInPercentage: 20 },
            { type: ElemType.gap, widthInPercentage: 5 },
            { type: ElemType.line, height: 16, widthInPercentage: 20 },
            { type: ElemType.gap, widthInPercentage: 10 },
            { type: ElemType.line, height: 16, widthInPercentage: 15 },
            { type: ElemType.gap, widthInPercentage: 10 },
            { type: ElemType.line, height: 16 }
          ] }
        />
        <Shimmer
          width={ 70 }
          lineElements={ [
            { type: ElemType.circle, height: 24 },
            { type: ElemType.gap, widthInPercentage: 2 },
            { type: ElemType.line, height: 16, widthInPercentage: 20 },
            { type: ElemType.gap, widthInPercentage: 5 },
            { type: ElemType.line, height: 16, widthInPercentage: 20 },
            { type: ElemType.gap, widthInPercentage: 10 },
            { type: ElemType.line, height: 16, widthInPercentage: 15 },
            { type: ElemType.gap, widthInPercentage: 10 },
            { type: ElemType.line, height: 16 }
          ] }
        />
        Variations of vertical alignment for Circles and Lines.
        <Shimmer
          lineElements={ [
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
          ] }
        />
      </div>
    );
  }
}