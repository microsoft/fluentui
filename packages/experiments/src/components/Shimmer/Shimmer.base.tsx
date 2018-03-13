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
import { ShimmerRectangle } from './ShimmerRectangle/ShimmerRectangle';
import { ShimmerCircle } from './ShimmerCircle/ShimmerCircle';

const getClassNames = classNamesFunction<IShimmerStyleProps, IShimmerStyles>();

export class ShimmerBase extends BaseComponent<IShimmerProps, {}> {
  public static defaultProps: IShimmerProps = {
    width: 100,
    isDataLoaded: false
  };
  private _classNames: {[key in keyof IShimmerStyles]: string};
  constructor(props: IShimmerProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { getStyles, width, lineElements, children, isDataLoaded } = this.props;
    const maxHeight: number | undefined = lineElements ? this._findMaxHeight(lineElements) : undefined;
    this._classNames = getClassNames(getStyles!, { width, maxHeight, isDataLoaded });

    const elements: JSX.Element[] | JSX.Element = lineElements ?
      lineElements.map((elem: ICircle | ILine | IGap, index: number): JSX.Element => {
        switch (elem.type) {
          case ShimmerElementType.CIRCLE:
            return (
              <ShimmerCircle
                key={ index }
                { ...elem }
                borderAlignStyle={ this._getBorderAlignStyles(maxHeight, elem) }
              />
            );
          case ShimmerElementType.GAP:
            const gapWidth = elem.width ? elem.width + '%' : '1%';
            return (
              <div
                key={ index }
                // tslint:disable-next-line:jsx-ban-props
                style={ {
                  width: gapWidth,
                  height: maxHeight + 'px',
                  backgroundColor: `${DefaultPalette.white}`
                } }
              />
            );
          case ShimmerElementType.RECTANGLE:
            return (
              <ShimmerRectangle
                key={ index }
                { ...elem }
                borderAlignStyle={ this._getBorderAlignStyles(maxHeight, elem) }
              />
            );
        }
      }) :
      <ShimmerRectangle />;

    return (
      <div className={ this._classNames.root }>
        <div className={ this._classNames.shimmerWrapper }>
          { elements }
        </div>
        <div className={ this._classNames.dataWrapper }>
          { !!isDataLoaded ?
            !!children ? children : null
            : null }
        </div>
      </div>
    );
  }

  private _findMaxHeight(items: Array<ICircle | IGap | ILine>): number {
    const maxHeight = items.reduce((acc: number, next: ICircle | IGap | ILine): number => {
      return next.height ?
        next.height > acc ? next.height : acc
        : acc;
    }, 0);
    return maxHeight;
  }

  private _getBorderAlignStyles(maxHeight: number | undefined, elem: ICircle | IGap | ILine): IStyleSet | undefined {
    let height: number | undefined;
    switch (elem.type) {
      case ShimmerElementType.RECTANGLE:
        height = !!elem.height ? elem.height : 16;
        break;
      case ShimmerElementType.CIRCLE:
        height = !!elem.height ? elem.height : 24;
        break;
    }
    console.log(height);
    const dif: number | undefined = maxHeight && height ?
      maxHeight - height > 0 ?
        maxHeight - height : undefined
      : undefined;

    let borderStyle: IStyleSet | undefined;
    const hasVerticalAlign: boolean = elem.verticalAlign ? true : false;

    if (elem.verticalAlign === ShimmerElementVerticalAlign.CENTER || !hasVerticalAlign) {
      borderStyle = {
        alignSelf: 'center',
        borderBottom: `${dif ? dif / 2 : 0}px solid ${DefaultPalette.white}`,
        borderTop: `${dif ? dif / 2 : 0}px solid ${DefaultPalette.white}`
      };
    } else if (elem.verticalAlign === ShimmerElementVerticalAlign.TOP && hasVerticalAlign) {
      borderStyle = {
        alignSelf: 'top',
        borderBottom: `${dif ? dif : 0}px solid ${DefaultPalette.white}`,
        borderTop: `0px solid ${DefaultPalette.white}`
      };
    } else if (elem.verticalAlign === ShimmerElementVerticalAlign.BOTTOM && hasVerticalAlign) {
      borderStyle = {
        alignSelf: 'bottom',
        borderBottom: `0px solid ${DefaultPalette.white}`,
        borderTop: `${dif ? dif : 0}px solid ${DefaultPalette.white}`
      };
    }
    return borderStyle;
  }
}