import * as React from 'react';
import { classNamesFunction } from '../../../Utilities';
import type { IShimmerLineProps, IShimmerLineStyleProps, IShimmerLineStyles } from './ShimmerLine.types';

const getClassNames = classNamesFunction<IShimmerLineStyleProps, IShimmerLineStyles>();

/**
 * {@docCategory Shimmer}
 */
export const ShimmerLineBase: React.FunctionComponent<IShimmerLineProps> = props => {
  // eslint-disable-next-line deprecation/deprecation
  const { height, styles, width = '100%', borderStyle, theme } = props;

  const classNames = getClassNames(styles!, {
    theme: theme!,
    height,
    borderStyle,
  });

  return (
    <div style={{ width, minWidth: typeof width === 'number' ? `${width}px` : 'auto' }} className={classNames.root}>
      <svg width="2" height="2" className={classNames.topLeftCorner}>
        <path d="M0 2 A 2 2, 0, 0, 1, 2 0 L 0 0 Z" />
      </svg>
      <svg width="2" height="2" className={classNames.topRightCorner}>
        <path d="M0 0 A 2 2, 0, 0, 1, 2 2 L 2 0 Z" />
      </svg>
      <svg width="2" height="2" className={classNames.bottomRightCorner}>
        <path d="M2 0 A 2 2, 0, 0, 1, 0 2 L 2 2 Z" />
      </svg>
      <svg width="2" height="2" className={classNames.bottomLeftCorner}>
        <path d="M2 2 A 2 2, 0, 0, 1, 0 0 L 0 2 Z" />
      </svg>
    </div>
  );
};
