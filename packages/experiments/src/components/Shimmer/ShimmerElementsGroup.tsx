import * as React from 'react';

import { DefaultPalette, IStyleSet } from '../../Styling';
import {
  ShimmerElementType,
  ICircle,
  ILine,
  IGap,
  ShimmerElementVerticalAlign,
  ShimmerElementsDefaultHeights
} from './Shimmer.types';
import { ShimmerLine } from './ShimmerLine/ShimmerLine';
import { ShimmerGap } from './ShimmerGap/ShimmerGap';
import { ShimmerCircle } from './ShimmerCircle/ShimmerCircle';

export interface IShimmerElementsGroupProps {
  lineElements?: Array<ICircle | IGap | ILine>;
  rowHeight?: number;
}

export function ShimmerElementsGroup(props: IShimmerElementsGroupProps): JSX.Element {
  const { lineElements, rowHeight } = props;

  return (
    <div
      style={
        {
          display: 'flex',
          alignItems: 'center',
          alignContent: 'space-between'
        }
      }
    >
      { getRenderedElements(lineElements, rowHeight) }
    </div>
  );
}

function getRenderedElements(lineElements?: Array<ICircle | IGap | ILine>, rowHeight?: number): React.ReactNode {
  const renderedElements: React.ReactNode = lineElements ?
    lineElements.map((elem: ICircle | ILine | IGap, index: number): JSX.Element => {
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

function getBorderStyles(elem: ICircle | IGap | ILine, rowHeight?: number): IStyleSet | undefined {
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