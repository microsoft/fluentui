import * as React from 'react';
import { Shimmer, ShimmerElementType, IShimmerElement } from 'office-ui-fabric-react/lib/Shimmer';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

const wrapperClass = mergeStyles({
  padding: 2,
  selectors: {
    '& > .ms-Shimmer-container': {
      margin: '10px 0',
    },
  },
});
const shimmerWithElementFirstRow = [
  { type: ShimmerElementType.circle },
  { type: ShimmerElementType.gap, width: '2%' },
  { type: ShimmerElementType.line },
];
const shimmerWithElementSecondRow = [
  { type: ShimmerElementType.circle, height: 24 },
  { type: ShimmerElementType.gap, width: '2%' },
  { type: ShimmerElementType.line, height: 16, width: '20%' },
  { type: ShimmerElementType.gap, width: '5%' },
  { type: ShimmerElementType.line, height: 16, width: '20%' },
  { type: ShimmerElementType.gap, width: '10%' },
  { type: ShimmerElementType.line, height: 16, width: '15%' },
  { type: ShimmerElementType.gap, width: '10%' },
  { type: ShimmerElementType.line, height: 16 },
];
const shimmerWithElementThirdRow = [
  { type: ShimmerElementType.circle, height: 24 },
  { type: ShimmerElementType.gap, width: '2%' },
  { type: ShimmerElementType.line, height: 16, width: '20%' },
  { type: ShimmerElementType.gap, width: '5%' },
  { type: ShimmerElementType.line, height: 16, width: '20%' },
  { type: ShimmerElementType.gap, width: '10%' },
  { type: ShimmerElementType.line, height: 16, width: '15%' },
  { type: ShimmerElementType.gap, width: '10%' },
  { type: ShimmerElementType.line, height: 16 },
];
const shimmerVerticalElement: IShimmerElement[] = [
  { type: ShimmerElementType.circle },
  { type: ShimmerElementType.gap, width: '2%' },
  { type: ShimmerElementType.circle, height: 15, verticalAlign: 'top' },
  { type: ShimmerElementType.gap, width: '2%' },
  { type: ShimmerElementType.line, verticalAlign: 'bottom', width: '20%' },
  { type: ShimmerElementType.gap, width: '2%' },
  { type: ShimmerElementType.line, height: 5, verticalAlign: 'top', width: '20%' },
  { type: ShimmerElementType.gap, width: '2%' },
  { type: ShimmerElementType.line, height: 16, width: '15%' },
  { type: ShimmerElementType.gap, width: '2%' },
  { type: ShimmerElementType.line, height: 10, verticalAlign: 'bottom' },
];

export const ShimmerBasicExample: React.FunctionComponent = () => {
  return (
    <Fabric className={wrapperClass}>
      Basic Shimmer with no elements provided. It defaults to a line of 16px height.
      <Shimmer />
      <Shimmer width="75%" />
      <Shimmer width="50%" />
      Basic Shimmer with elements provided.
      <Shimmer shimmerElements={shimmerWithElementFirstRow} />
      <Shimmer shimmerElements={shimmerWithElementSecondRow} />
      <Shimmer width="70%" shimmerElements={shimmerWithElementThirdRow} />
      Variations of vertical alignment for Circles and Lines.
      <Shimmer shimmerElements={shimmerVerticalElement} />
    </Fabric>
  );
};
