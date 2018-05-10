import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import {
  IShimmerProps,
  IShimmerStyleProps,
  IShimmerStyles,
  ShimmerElementType,
  ICircle,
  ILine,
  IGap,
  ShimmerElementsDefaultHeights,
} from './Shimmer.types';
import { ShimmerElementsGroup } from './ShimmerElementsGroup';

const getClassNames = classNamesFunction<IShimmerStyleProps, IShimmerStyles>();

export class ShimmerBase extends BaseComponent<IShimmerProps, {}> {
  public static defaultProps: IShimmerProps = {
    isDataLoaded: false,
    isBaseStyle: false
  };
  private _classNames: { [key in keyof IShimmerStyles]: string };
  constructor(props: IShimmerProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {
      getStyles,
      width,
      lineElements,
      children,
      isDataLoaded,
      isBaseStyle,
      widthInPercentage,
      widthInPixel,
      className
    } = this.props;

    const rowHeight: number | undefined = lineElements ? this._findMaxElementHeight(lineElements) : undefined;

    this._classNames = getClassNames(getStyles!, {
      width, rowHeight, isDataLoaded, isBaseStyle, widthInPercentage, widthInPixel, className
    });

    return (
      <div className={ this._classNames.root }>
        <div className={ this._classNames.shimmerWrapper }>
          { isBaseStyle ? children :
            <ShimmerElementsGroup
              lineElements={ lineElements }
              rowHeight={ rowHeight }
            />
          }
        </div>
        { isDataLoaded &&
          <div className={ this._classNames.dataWrapper }>
            { !!children ? children : null }
          </div>
        }
      </div>
    );
  }

  private _findMaxElementHeight(elements: Array<ICircle | IGap | ILine>): number {
    const itemsDefaulted: Array<ICircle | IGap | ILine> = elements.map((elem: ICircle | IGap | ILine): ICircle | IGap | ILine => {
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

    const rowHeight = itemsDefaulted.reduce((acc: number, next: ICircle | IGap | ILine): number => {
      return next.height ?
        next.height > acc ? next.height : acc
        : acc;
    }, 0);

    return rowHeight;
  }
}