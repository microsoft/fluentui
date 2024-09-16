import * as React from 'react';
import { classNamesFunction, memoizeFunction } from '../../../Utilities';
import { ShimmerElementType, ShimmerElementsDefaultHeights } from '../Shimmer.types';
import { ShimmerLine } from '../ShimmerLine/ShimmerLine';
import { ShimmerGap } from '../ShimmerGap/ShimmerGap';
import { ShimmerCircle } from '../ShimmerCircle/ShimmerCircle';
import type { IRawStyle } from '../../../Styling';
import type {
  IShimmerElementsGroupProps,
  IShimmerElementsGroupStyleProps,
  IShimmerElementsGroupStyles,
} from './ShimmerElementsGroup.types';
import type { IShimmerElement } from '../Shimmer.types';
import type { IShimmerLineStyles } from '../ShimmerLine/ShimmerLine.types';
import type { IShimmerGapStyles } from '../ShimmerGap/ShimmerGap.types';
import type { IShimmerCircleStyles } from '../ShimmerCircle/ShimmerCircle.types';

const getClassNames = classNamesFunction<IShimmerElementsGroupStyleProps, IShimmerElementsGroupStyles>();

/**
 * {@docCategory Shimmer}
 */
export const ShimmerElementsGroupBase: React.FunctionComponent<IShimmerElementsGroupProps> = props => {
  const {
    styles,
    width = 'auto',
    shimmerElements,
    rowHeight = findMaxElementHeight(shimmerElements || []),
    flexWrap = false,
    theme,
    backgroundColor,
  } = props;

  const classNames = getClassNames(styles!, {
    theme: theme!,
    flexWrap,
  });

  return (
    <div style={{ width }} className={classNames.root}>
      {getRenderedElements(shimmerElements, backgroundColor, rowHeight)}
    </div>
  );
};

function getRenderedElements(
  shimmerElements?: IShimmerElement[],
  backgroundColor?: string,
  rowHeight?: number,
): React.ReactNode {
  const renderedElements: React.ReactNode = shimmerElements ? (
    shimmerElements.map(
      // false positive
      // eslint-disable-next-line array-callback-return
      (element: IShimmerElement, index: number): JSX.Element => {
        const { type, ...filteredElem } = element;
        const { verticalAlign, height } = filteredElem;
        const styles = getElementStyles(verticalAlign, type, height, backgroundColor, rowHeight);

        switch (element.type) {
          case ShimmerElementType.circle:
            return <ShimmerCircle key={index} {...filteredElem} styles={styles} />;
          case ShimmerElementType.gap:
            return <ShimmerGap key={index} {...filteredElem} styles={styles} />;
          case ShimmerElementType.line:
            return <ShimmerLine key={index} {...filteredElem} styles={styles} />;
        }
      },
    )
  ) : (
    <ShimmerLine height={ShimmerElementsDefaultHeights.line} />
  );

  return renderedElements;
}

const getElementStyles = memoizeFunction(
  (
    verticalAlign: 'center' | 'bottom' | 'top' | undefined,
    elementType: ShimmerElementType,
    elementHeight: number | undefined,
    backgroundColor?: string,
    rowHeight?: number,
  ): IShimmerCircleStyles | IShimmerGapStyles | IShimmerLineStyles => {
    const dif: number = rowHeight && elementHeight ? rowHeight - elementHeight : 0;

    let borderStyle: IRawStyle | undefined;

    if (!verticalAlign || verticalAlign === 'center') {
      borderStyle = {
        borderBottomWidth: `${dif ? Math.floor(dif / 2) : 0}px`,
        borderTopWidth: `${dif ? Math.ceil(dif / 2) : 0}px`,
      };
    } else if (verticalAlign && verticalAlign === 'top') {
      borderStyle = {
        borderBottomWidth: `${dif}px`,
        borderTopWidth: `0px`,
      };
    } else if (verticalAlign && verticalAlign === 'bottom') {
      borderStyle = {
        borderBottomWidth: `0px`,
        borderTopWidth: `${dif}px`,
      };
    }

    if (backgroundColor) {
      switch (elementType) {
        case ShimmerElementType.circle:
          return {
            root: { ...borderStyle, borderColor: backgroundColor },
            svg: { fill: backgroundColor },
          };
        case ShimmerElementType.gap:
          return {
            root: { ...borderStyle, borderColor: backgroundColor, backgroundColor },
          };
        case ShimmerElementType.line:
          return {
            root: { ...borderStyle, borderColor: backgroundColor },
            topLeftCorner: { fill: backgroundColor },
            topRightCorner: { fill: backgroundColor },
            bottomLeftCorner: { fill: backgroundColor },
            bottomRightCorner: { fill: backgroundColor },
          };
      }
    }

    return {
      root: borderStyle,
    };
  },
);

/**
 * User should not worry to provide which of the elements is the highest so we do the calculation for him.
 * Plus if user forgot to specify the height we assign their defaults.
 */
function findMaxElementHeight(shimmerElements: IShimmerElement[]): number {
  const shimmerElementsDefaulted: IShimmerElement[] = shimmerElements.map(
    (element: IShimmerElement): IShimmerElement => {
      switch (element.type) {
        case ShimmerElementType.circle:
          if (!element.height) {
            element.height = ShimmerElementsDefaultHeights.circle;
          }
          break;
        case ShimmerElementType.line:
          if (!element.height) {
            element.height = ShimmerElementsDefaultHeights.line;
          }
          break;
        case ShimmerElementType.gap:
          if (!element.height) {
            element.height = ShimmerElementsDefaultHeights.gap;
          }
          break;
      }
      return element;
    },
  );

  const rowHeight = shimmerElementsDefaulted.reduce((acc: number, next: IShimmerElement): number => {
    return next.height ? (next.height > acc ? next.height : acc) : acc;
  }, 0);

  return rowHeight;
}
