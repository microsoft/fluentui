import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
} from '../../Utilities';
import {
  IClassNames
} from '@uifabric/utilities/lib/IClassNames';
import {
  IShimmerProps,
  IShimmerStyleProps,
  IShimmerStyles,
  ShimmerElementType,
  ICircle,
  ILine,
  IGap,
} from './Shimmer.types';
import {
  DefaultPalette
} from '../../Styling';
import { ShimmerRectangle } from 'office-ui-fabric-react/lib/components/Shimmer/ShimmerRectangle/ShimmerRectangle';
import { ShimmerCircle } from 'office-ui-fabric-react/lib/components/Shimmer/ShimmerCircle/ShimmerCircle';
import { IStyle } from '@uifabric/styling';

const getClassNames = classNamesFunction<IShimmerStyleProps, IShimmerStyles>();

export class ShimmerBase extends BaseComponent<IShimmerProps, {}> {
  public static defaultProps: IShimmerProps = {
    width: 100
  };
  private _classNames: {[key in keyof IShimmerStyles]: string};
  constructor(props: IShimmerProps) {
    super(props);
  }

  public render() {
    const { getStyles, width, lineElements } = this.props;
    this._classNames = getClassNames(getStyles!, { width });
    const maxHeight: number | undefined = lineElements ? this.findMaxHeight(lineElements) : undefined;

    const elements: JSX.Element[] | JSX.Element = lineElements ?
      lineElements.map((elem: ICircle | ILine | IGap, index: number): JSX.Element => {
        switch (elem.type) {
          case ShimmerElementType.CIRCLE:
            return (
              <ShimmerCircle
                key={ index }
                maxHeight={ maxHeight }
                { ...elem }
              />
            );
          case ShimmerElementType.GAP:
            const gapWidth = elem.width ? elem.width + '%' : '1%';
            return (
              <div
                key={ index }
                style={ {
                  width: gapWidth,
                  height: maxHeight + 'px',
                  backgroundColor: `${DefaultPalette.white}`
                } }>
              </div>
            );
          case ShimmerElementType.RECTANGLE:
            return (
              <ShimmerRectangle
                key={ index }
                maxHeight={ maxHeight }
                { ...elem }
              />
            );
        }
      }) :
      <ShimmerRectangle />;

    return (
      <div className={ this._classNames.root }>
        { elements }
      </div>
    );
  }

  private findMaxHeight(items: Array<ICircle | IGap | ILine>): number {
    const maxHeight = items.reduce((acc: number, next: ICircle | IGap | ILine): number => {
      return next.height ?
        next.height > acc ? next.height : acc
        : acc;
    }, 0);
    return maxHeight;
  }

  private getBorderAlignStyles(maxHeight: number, elem: ICircle | IGap | ILine) {

  }
}