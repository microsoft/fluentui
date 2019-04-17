import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../../Utilities';
import { IShimmerElementsGroupProps, IShimmerElementsGroupStyleProps, IShimmerElementsGroupStyles } from './ShimmerElementsGroup.types';
import { IStyle } from '../../../Styling';
import { ShimmerElementType, ShimmerElementVerticalAlign, ShimmerElementsDefaultHeights, IShimmerElement } from '../Shimmer.types';
import { ShimmerLine } from '../ShimmerLine/ShimmerLine';
import { ShimmerGap } from '../ShimmerGap/ShimmerGap';
import { ShimmerCircle } from '../ShimmerCircle/ShimmerCircle';

const getClassNames = classNamesFunction<IShimmerElementsGroupStyleProps, IShimmerElementsGroupStyles>();

export class ShimmerElementsGroupBase extends BaseComponent<IShimmerElementsGroupProps, {}> {
  public static defaultProps: IShimmerElementsGroupProps = {
    flexWrap: false
  };

  private _classNames: { [key in keyof IShimmerElementsGroupStyles]: string };

  constructor(props: IShimmerElementsGroupProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { styles, width, shimmerElements, rowHeight, flexWrap, theme } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      flexWrap,
      width
    });

    const height = rowHeight ? rowHeight : this._findMaxElementHeight(shimmerElements ? shimmerElements : []);

    return <div className={this._classNames.root}>{this._getRenderedElements(shimmerElements, height)}</div>;
  }

  private _getRenderedElements = (shimmerElements?: IShimmerElement[], rowHeight?: number): React.ReactNode => {
    const renderedElements: React.ReactNode = shimmerElements ? (
      shimmerElements.map(
        (elem: IShimmerElement, index: number): JSX.Element => {
          const { type, ...filteredElem } = elem;
          switch (elem.type) {
            case ShimmerElementType.circle:
              return <ShimmerCircle key={index} {...filteredElem} borderStyle={this._getBorderStyles(elem, rowHeight)} />;
            case ShimmerElementType.gap:
              return <ShimmerGap key={index} {...filteredElem} borderStyle={this._getBorderStyles(elem, rowHeight)} />;
            case ShimmerElementType.line:
              return <ShimmerLine key={index} {...filteredElem} borderStyle={this._getBorderStyles(elem, rowHeight)} />;
          }
        }
      )
    ) : (
      <ShimmerLine height={ShimmerElementsDefaultHeights.line} />
    );

    return renderedElements;
  };

  private _getBorderStyles = (elem: IShimmerElement, rowHeight?: number): IStyle | undefined => {
    const elemHeight: number | undefined = elem.height;
    const dif: number = rowHeight && elemHeight ? rowHeight - elemHeight : 0;

    let borderStyle: IStyle | undefined;

    if (!elem.verticalAlign || elem.verticalAlign === ShimmerElementVerticalAlign.center) {
      borderStyle = {
        borderBottomWidth: `${dif ? Math.floor(dif / 2) : 0}px`,
        borderTopWidth: `${dif ? Math.ceil(dif / 2) : 0}px`
      };
    } else if (elem.verticalAlign && elem.verticalAlign === ShimmerElementVerticalAlign.top) {
      borderStyle = {
        borderBottomWidth: `${dif ? dif : 0}px`,
        borderTopWidth: `0px`
      };
    } else if (elem.verticalAlign && elem.verticalAlign === ShimmerElementVerticalAlign.bottom) {
      borderStyle = {
        borderBottomWidth: `0px`,
        borderTopWidth: `${dif ? dif : 0}px`
      };
    }

    return borderStyle;
  };

  /**
   * User should not worry to provide which of the elements is the highest, we do the calculation for him.
   * Plus if user forgot to specify the height we assign their defaults.
   */
  private _findMaxElementHeight = (elements: IShimmerElement[]): number => {
    const itemsDefaulted: IShimmerElement[] = elements.map(
      (elem: IShimmerElement): IShimmerElement => {
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
      }
    );

    const rowHeight = itemsDefaulted.reduce((acc: number, next: IShimmerElement): number => {
      return next.height ? (next.height > acc ? next.height : acc) : acc;
    }, 0);

    return rowHeight;
  };
}
