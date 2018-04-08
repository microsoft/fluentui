import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
} from '../../Utilities';
import {
  IShimmerProps,
  IShimmerStyleProps,
  IShimmerStyles,
  ShimmerElementType,
  ICircle,
  ILine,
  IGap,
  ShimmerElementVerticalAlign,
} from './Shimmer.types';
import {
  DefaultPalette,
  IStyleSet
} from '../../Styling';
import { ShimmerLine } from './ShimmerLine/ShimmerLine';
import { ShimmerCircle } from './ShimmerCircle/ShimmerCircle';

const LINE_DEFAULT_HEIGHT = 16;
const GAP_DEFAULT_HEIGHT = 16;
const CIRCLE_DEFAULT_HEIGHT = 24;

const getClassNames = classNamesFunction<IShimmerStyleProps, IShimmerStyles>();

export class ShimmerBase extends BaseComponent<IShimmerProps, {}> {
  public static defaultProps: IShimmerProps = {
    width: 100,
    isDataLoaded: false,
    isBaseStyle: false
  };
  private _classNames: {[key in keyof IShimmerStyles]: string};
  constructor(props: IShimmerProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { getStyles, width, lineElements, children, isDataLoaded, isBaseStyle } = this.props;

    const rowHeight: number | undefined = lineElements ? findMaxHeight(lineElements) : undefined;

    this._classNames = getClassNames(getStyles!, { width, rowHeight, isDataLoaded, isBaseStyle });

    const renderedElements: JSX.Element[] | JSX.Element = getRenderedElements(lineElements, rowHeight);

    return (
      <div className={ this._classNames.root }>
        <div className={ this._classNames.shimmerWrapper }>
          { !!isBaseStyle ? children : renderedElements }
        </div>

        { !!isDataLoaded &&
          <div className={ this._classNames.dataWrapper }>
            { !!children ? children : null }
          </div>
        }
      </div>
    );
  }
}

export function getRenderedElements(lineElements?: Array<ICircle | IGap | ILine>, rowHeight?: number): JSX.Element[] | JSX.Element {
  const renderedElements: JSX.Element[] | JSX.Element = lineElements ?
    lineElements.map((elem: ICircle | ILine | IGap, index: number): JSX.Element => {
      switch (elem.type) {
        case ShimmerElementType.CIRCLE:
          return (
            <ShimmerCircle
              key={ index }
              { ...elem }
              borderAlignStyle={ getBorderAlignStyles(elem, rowHeight) }
            />
          );
        case ShimmerElementType.GAP:
          const gapWidth = elem.widthInPercentage || elem.widthInPixel ?
            elem.widthInPercentage ? elem.widthInPercentage + '%' : elem.widthInPixel + 'px'
            : '5px';
          return (
            <div
              key={ index }
              // tslint:disable-next-line:jsx-ban-props
              style={ {
                width: gapWidth,
                height: rowHeight + 'px',
                backgroundColor: `${DefaultPalette.white}`
              } }
            />
          );
        case ShimmerElementType.LINE:
          return (
            <ShimmerLine
              key={ index }
              { ...elem }
              borderAlignStyle={ getBorderAlignStyles(elem, rowHeight) }
            />
          );
      }
    }) : (
      <ShimmerLine
        height={ LINE_DEFAULT_HEIGHT }
      />
    );

  return renderedElements;
}

export function getBorderAlignStyles(elem: ICircle | IGap | ILine, rowHeight?: number): IStyleSet | undefined {
  const elemHeight: number | undefined = elem.height;

  const dif: number = rowHeight && elemHeight ? rowHeight - elemHeight : 0;

  let borderStyle: IStyleSet | undefined;

  if (!elem.verticalAlign || elem.verticalAlign === ShimmerElementVerticalAlign.CENTER) {
    borderStyle = {
      alignSelf: 'center',
      borderBottom: `${dif ? dif / 2 : 0}px solid ${DefaultPalette.white}`,
      borderTop: `${dif ? dif / 2 : 0}px solid ${DefaultPalette.white}`
    };
  } else if (elem.verticalAlign && elem.verticalAlign === ShimmerElementVerticalAlign.TOP) {
    borderStyle = {
      alignSelf: 'top',
      borderBottom: `${dif ? dif : 0}px solid ${DefaultPalette.white}`,
      borderTop: `0px solid ${DefaultPalette.white}`
    };
  } else if (elem.verticalAlign && elem.verticalAlign === ShimmerElementVerticalAlign.BOTTOM) {
    borderStyle = {
      alignSelf: 'bottom',
      borderBottom: `0px solid ${DefaultPalette.white}`,
      borderTop: `${dif ? dif : 0}px solid ${DefaultPalette.white}`
    };
  }

  return borderStyle;
}

export function findMaxHeight(elements: Array<ICircle | IGap | ILine>): number {
  const itemsDefaulted: Array<ICircle | IGap | ILine> = elements.map((elem: ICircle | IGap | ILine): ICircle | IGap | ILine => {
    switch (elem.type) {
      case ShimmerElementType.CIRCLE:
        if (!elem.height) {
          elem.height = CIRCLE_DEFAULT_HEIGHT;
        }
      case ShimmerElementType.LINE:
        if (!elem.height) {
          elem.height = LINE_DEFAULT_HEIGHT;
        }
      case ShimmerElementType.GAP:
        if (!elem.height) {
          elem.height = GAP_DEFAULT_HEIGHT;
        }
    }
    return elem;
  });

  const rowHeight = itemsDefaulted.reduce((acc: number, next: ICircle | IGap | ILine): number => {
    return next.height ?
      next.height > acc ? next.height : acc
      : acc;
  }, 0);

  return rowHeight;
}