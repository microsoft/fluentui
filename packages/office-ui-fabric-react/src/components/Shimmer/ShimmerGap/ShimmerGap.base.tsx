import * as React from 'react';
import { classNamesFunction } from '../../../Utilities';
import { IShimmerGapProps, IShimmerGapStyleProps, IShimmerGapStyles } from './ShimmerGap.types';

const getClassNames = classNamesFunction<IShimmerGapStyleProps, IShimmerGapStyles>();

/**
 * {@docCategory Shimmer}
 */
export const ShimmerGapBase: React.FunctionComponent<IShimmerGapProps> = props => {
  const { height, styles, width, borderStyle, theme } = props;

  const classNames = getClassNames(styles!, {
    theme: theme!,
    height,
    borderStyle
  });

  return (
    <div
      style={{ width: width ? width : '10px', minWidth: typeof width === 'number' ? `${width}px` : 'auto' }}
      className={classNames.root}
    />
  );
};
