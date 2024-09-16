import * as React from 'react';
import { classNamesFunction } from '../../../Utilities';
import type { IShimmerGapProps, IShimmerGapStyleProps, IShimmerGapStyles } from './ShimmerGap.types';

const getClassNames = classNamesFunction<IShimmerGapStyleProps, IShimmerGapStyles>();

/**
 * {@docCategory Shimmer}
 */
export const ShimmerGapBase: React.FunctionComponent<IShimmerGapProps> = props => {
  // eslint-disable-next-line deprecation/deprecation
  const { height, styles, width = '10px', borderStyle, theme } = props;

  const classNames = getClassNames(styles!, {
    theme: theme!,
    height,
    borderStyle,
  });

  return (
    <div style={{ width, minWidth: typeof width === 'number' ? `${width}px` : 'auto' }} className={classNames.root} />
  );
};
