import * as React from 'react';
import { classNamesFunction } from '../../../Utilities';
import { IRawStyle } from '../../../Styling';
import { IShimmerElementsGroupProps, IShimmerElementsGroupStyleProps, IShimmerElementsGroupStyles } from './ShimmerElementsGroup.types';
import { ShimmerElementType, ShimmerElementsDefaultHeights, IShimmerElement } from '../Shimmer.types';
import { ShimmerLine } from '../ShimmerLine/ShimmerLine';
import { IShimmerLineStyles } from '../ShimmerLine/ShimmerLine.types';
import { ShimmerGap } from '../ShimmerGap/ShimmerGap';
import { IShimmerGapStyles } from '../ShimmerGap/ShimmerGap.types';
import { ShimmerCircle } from '../ShimmerCircle/ShimmerCircle';
import { IShimmerCircleStyles } from '../ShimmerCircle/ShimmerCircle.types';

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
    backgroundColor
  } = props;

  const classNames = getClassNames(styles!, {
    theme: theme!,
    flexWrap
  });

  return (
    <div style={{ width: width }} className={classNames.root}>
      {getRenderedElements(shimmerElements, backgroundColor, rowHeight)}
    </div>
  );
};

function getRenderedElements(shimmerElements?: IShimmerElement[], backgroundColor?: string, rowHeight?: number): React.ReactNode {
  const renderedElements: React.ReactNode = shimmerElements ? (
    shimmerElements.map(
      (element: IShimmerElement, index: number): JSX.Element => {
        const { type, ...filteredElem } = element;
        switch (element.type) {
          case ShimmerElementType.circle:
            return <ShimmerCircle key={index} {...filteredElem} styles={getElementStyles(element, backgroundColor, rowHeight)} />;
          case ShimmerElementType.gap:
            return <ShimmerGap key={index} {...filteredElem} styles={getElementStyles(element, backgroundColor, rowHeight)} />;
          case ShimmerElementType.line:
            return <ShimmerLine key={index} {...filteredElem} styles={getElementStyles(element, backgroundColor, rowHeight)} />;
        }
      }
    )
  ) : (
    <ShimmerLine height={ShimmerElementsDefaultHeights.line} />
  );

  return renderedElements;
}

function getElementStyles(
  element: IShimmerElement,
  backgroundColor?: string,
  rowHeight?: number
): IShimmerCircleStyles | IShimmerGapStyles | IShimmerLineStyles {
  const { verticalAlign, type, height: elementHeight } = element;
  const dif: number = rowHeight && elementHeight ? rowHeight - elementHeight : 0;

  let borderStyle: IRawStyle | undefined;

  if (!verticalAlign || verticalAlign === 'center') {
    borderStyle = {
      borderBottomWidth: `${dif ? Math.floor(dif / 2) : 0}px`,
      borderTopWidth: `${dif ? Math.ceil(dif / 2) : 0}px`
    };
  } else if (verticalAlign && verticalAlign === 'top') {
    borderStyle = {
      borderBottomWidth: `${dif}px`,
      borderTopWidth: `0px`
    };
  } else if (verticalAlign && verticalAlign === 'bottom') {
    borderStyle = {
      borderBottomWidth: `0px`,
      borderTopWidth: `${dif}px`
    };
  }

  if (backgroundColor) {
    switch (type) {
      case ShimmerElementType.circle:
        return {
          root: { ...borderStyle, borderColor: backgroundColor },
          svg: { fill: backgroundColor }
        };
      case ShimmerElementType.gap:
        return {
          root: { ...borderStyle, borderColor: backgroundColor, backgroundColor: backgroundColor }
        };
      case ShimmerElementType.line:
        return {
          root: { ...borderStyle, borderColor: backgroundColor },
          topLeftCorner: { fill: backgroundColor },
          topRightCorner: { fill: backgroundColor },
          bottomLeftCorner: { fill: backgroundColor },
          bottomRightCorner: { fill: backgroundColor }
        };
    }
  }

  return {
    root: borderStyle
  };
}

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
        case ShimmerElementType.line:
          if (!element.height) {
            element.height = ShimmerElementsDefaultHeights.line;
          }
        case ShimmerElementType.gap:
          if (!element.height) {
            element.height = ShimmerElementsDefaultHeights.gap;
          }
      }
      return element;
    }
  );

  const rowHeight = shimmerElementsDefaulted.reduce((acc: number, next: IShimmerElement): number => {
    return next.height ? (next.height > acc ? next.height : acc) : acc;
  }, 0);

  return rowHeight;
}
