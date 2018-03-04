/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  Shimmer,
  ShimmerElementType as ElemType,
  ShimmerElementVerticalAlign as ElemVerticalAlign
} from 'office-ui-fabric-react/lib/Shimmer';

// tslint:disable:jsx-no-lambda
export const ShimmerBasicExample = () => (
  <div style={ { padding: '2px' } }>
    <Shimmer />
    <Shimmer
      width={ 50 }
    />
    <hr />
    <Shimmer
      lineElements={ [
        { type: ElemType.CIRCLE, height: 20, verticalAlign: ElemVerticalAlign.TOP },
        { type: ElemType.CIRCLE, height: 39 },
        { type: ElemType.GAP, width: 5 },
        { type: ElemType.RECTANGLE, height: 20, verticalAlign: ElemVerticalAlign.CENTER, width: 30 },
        { type: ElemType.GAP, width: 5 },
        { type: ElemType.RECTANGLE, height: 10, verticalAlign: ElemVerticalAlign.TOP, width: 10 },
        { type: ElemType.GAP },
        { type: ElemType.RECTANGLE, height: 30, verticalAlign: ElemVerticalAlign.BOTTOM },
        { type: ElemType.GAP, width: 10 },
        { type: ElemType.RECTANGLE, height: 5, width: 20 }
      ] }
    />
  </div>
);
