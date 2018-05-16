import * as React from 'react';

import { DefaultPalette, IStyleSet } from '../../Styling';
import {
  ShimmerElementType,
  ShimmerElementVerticalAlign,
  ShimmerElementsDefaultHeights,
  IShimmerElement
} from './Shimmer.types';
import { ShimmerLine } from './ShimmerLine/ShimmerLine';
import { ShimmerGap } from './ShimmerGap/ShimmerGap';
import { ShimmerCircle } from './ShimmerCircle/ShimmerCircle';

export interface IShimmerElementsGroupProps {
  shimmerElements?: IShimmerElement[];
  rowHeight?: number;
  flexWrap?: boolean;
  width?: string;
}

export type ShimmerElementsGroup = React.StatelessComponent<IShimmerElementsGroupProps>;

export const ShimmerElementsGroup: ShimmerElementsGroup = (props: IShimmerElementsGroupProps): JSX.Element => {
  const {
    shimmerElements,
    rowHeight,
    flexWrap = false,
    width
  } = props;
  const height = rowHeight ? rowHeight : findMaxElementHeight(shimmerElements ? shimmerElements : []);

  return (
    <div
      style={
        {
          display: 'flex',
          alignItems: 'center',
          flexWrap: flexWrap ? 'wrap' : 'nowrap',
          width: width ? width : 'auto'
        }
      }
    >
      { getRenderedElements(shimmerElements, height) }
    </div>
  );
};

function getRenderedElements(shimmerElements?: IShimmerElement[], rowHeight?: number): React.ReactNode {
  const renderedElements: React.ReactNode = shimmerElements ?
    shimmerElements.map((elem: IShimmerElement, index: number): JSX.Element => {
      switch (elem.type) {
        case ShimmerElementType.circle:
          return (
            <ShimmerCircle
              key={ index }
              { ...elem }
              borderStyle={ getBorderStyles(elem, rowHeight) }
            />
          );
        case ShimmerElementType.gap:
          return (
            <ShimmerGap
              key={ index }
              { ...elem }
              borderStyle={ getBorderStyles(elem, rowHeight) }
            />
          );
        case ShimmerElementType.line:
          return (
            <ShimmerLine
              key={ index }
              { ...elem }
              borderStyle={ getBorderStyles(elem, rowHeight) }
            />
          );
      }
    }) : (
      <ShimmerLine
        height={ ShimmerElementsDefaultHeights.line }
      />
    );

  return renderedElements;
}

function getBorderStyles(elem: IShimmerElement, rowHeight?: number): IStyleSet | undefined {
  const elemHeight: number | undefined = elem.height;

  const dif: number = rowHeight && elemHeight ? rowHeight - elemHeight : 0;

  let borderStyle: IStyleSet | undefined;

  if (!elem.verticalAlign || elem.verticalAlign === ShimmerElementVerticalAlign.center) {
    borderStyle = {
      borderBottom: `${dif ? Math.floor(dif / 2) : 0}px solid ${DefaultPalette.white}`,
      borderTop: `${dif ? Math.ceil(dif / 2) : 0}px solid ${DefaultPalette.white}`
    };
  } else if (elem.verticalAlign && elem.verticalAlign === ShimmerElementVerticalAlign.top) {
    borderStyle = {
      borderBottom: `${dif ? dif : 0}px solid ${DefaultPalette.white}`,
      borderTop: `0px solid ${DefaultPalette.white}`
    };
  } else if (elem.verticalAlign && elem.verticalAlign === ShimmerElementVerticalAlign.bottom) {
    borderStyle = {
      borderBottom: `0px solid ${DefaultPalette.white}`,
      borderTop: `${dif ? dif : 0}px solid ${DefaultPalette.white}`
    };
  }

  return borderStyle;
}

// User should not worry to provide which of the elements is the highest, we do the calculation for him.
export function findMaxElementHeight(elements: IShimmerElement[]): number {
  const itemsDefaulted: IShimmerElement[] = elements.map((elem: IShimmerElement): IShimmerElement => {
    switch (elem.type) {
      case ShimmerElementType.circle:
        if (!elem.height) {
          elem.height = ShimmerElementsDefaultHeights.circle;
        }
      case ShimmerElementType.line:
        if (!elem.height) {
          elem.height = ShimmerElementsDefaultHeights.line;
        }
      case ShimmerElementType.gap:
        if (!elem.height) {
          elem.height = ShimmerElementsDefaultHeights.gap;
        }
    }
    return elem;
  });

  const rowHeight = itemsDefaulted.reduce((acc: number, next: IShimmerElement): number => {
    return next.height ?
      next.height > acc ? next.height : acc
      : acc;
  }, 0);

  return rowHeight;
}