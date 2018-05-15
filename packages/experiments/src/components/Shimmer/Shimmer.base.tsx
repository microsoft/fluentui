import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import {
  IShimmerProps,
  IShimmerStyleProps,
  IShimmerStyles,
  ShimmerElementType,
  ShimmerElementsDefaultHeights,
  IShimmerElement,
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

    this._warnDeprecations({
      'isBaseStyle': 'customElementsGroup',
      'width': 'widthInPercentage or widthInPixel',
      'lineElements': 'shimmerElements'
    });

    this._warnMutuallyExclusive({
      'widthInPixel': 'widthInPercentage',
      'lineElements': 'shimmerElements',
      'customElementsGroup': 'lineElements'
    });
  }

  public render(): JSX.Element {
    const {
      getStyles,
      width,
      lineElements,
      shimmerElements,
      children,
      isDataLoaded,
      isBaseStyle,
      widthInPercentage,
      widthInPixel,
      className,
      customElementsGroup
    } = this.props;

    // lineElements is a deprecated prop so need to check which one was used.
    const elements: IShimmerElement[] | undefined = shimmerElements || lineElements;
    const rowHeight: number | undefined = elements ? this._findMaxElementHeight(elements) : undefined;

    this._classNames = getClassNames(getStyles!, {
      width, rowHeight, isDataLoaded, widthInPercentage, widthInPixel, className
    });

    return (
      <div className={ this._classNames.root }>
        <div className={ this._classNames.shimmerWrapper }>
          { isBaseStyle ? children : // isBaseStyle prop is deprecated and this check needs to be removed in the future
            customElementsGroup ? customElementsGroup :
              <ShimmerElementsGroup
                shimmerElements={ elements }
                rowHeight={ rowHeight }
              />
          }
        </div>
        { !isBaseStyle && // same in here... this check needs to be removed in the future
          <div className={ this._classNames.dataWrapper }>
            { children ? children : null }
          </div>
        }
      </div>
    );
  }

  // User should not worry to provide which of the elements is the highest, we do the calculation for him.
  private _findMaxElementHeight(elements: IShimmerElement[]): number {
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
}