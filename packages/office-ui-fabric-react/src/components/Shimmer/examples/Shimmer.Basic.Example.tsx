import * as React from 'react';
import {
  Shimmer,
  ShimmerElementType as ElemType,
  ShimmerElementVerticalAlign as ElemVerticalAlign
} from 'office-ui-fabric-react/lib/Shimmer';

export class ShimmerBasicExample extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public render() {

    return (
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
            { type: ElemType.CIRCLE, height: 24 },
            { type: ElemType.GAP, width: 2 },
            { type: ElemType.RECTANGLE, height: 16 },
          ] }
        />
        Notice how the same elements change relative to the shimmer width provided.
        <Shimmer
          lineElements={ [
            { type: ElemType.CIRCLE, height: 24 },
            { type: ElemType.GAP, width: 2 },
            { type: ElemType.RECTANGLE, height: 16, width: 20 },
            { type: ElemType.GAP, width: 5 },
            { type: ElemType.RECTANGLE, height: 16, width: 20 },
            { type: ElemType.GAP, width: 10 },
            { type: ElemType.RECTANGLE, height: 16, width: 15 },
            { type: ElemType.GAP, width: 10 },
            { type: ElemType.RECTANGLE, height: 16 }
          ] }
        />
        <Shimmer
          width={ 70 }
          lineElements={ [
            { type: ElemType.CIRCLE, height: 24 },
            { type: ElemType.GAP, width: 2 },
            { type: ElemType.RECTANGLE, height: 16, width: 20 },
            { type: ElemType.GAP, width: 5 },
            { type: ElemType.RECTANGLE, height: 16, width: 20 },
            { type: ElemType.GAP, width: 10 },
            { type: ElemType.RECTANGLE, height: 16, width: 15 },
            { type: ElemType.GAP, width: 10 },
            { type: ElemType.RECTANGLE, height: 16 }
          ] }
        />
      </div>
    );
  }
}