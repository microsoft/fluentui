import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  getNativeProps,
} from '../../Utilities';
import {
  IClassNames
} from '@uifabric/utilities/lib/IClassNames';
import {
  IShimmerProps,
  IShimmerStyleProps,
  IShimmerStyles,
  ShimmerElementType,
  IShimmerCirc,
  IShimmerRect,
  IShimmerGap
} from './Shimmer.types';
import {
  DefaultPalette
} from '../../Styling';
import { ShimmerRectangle } from 'office-ui-fabric-react/lib/components/Shimmer/ShimmerRectangle/ShimmerRectangle';
import { ShimmerCircle } from 'office-ui-fabric-react/lib/components/Shimmer/ShimmerCircle/ShimmerCircle';

const getClassNames = classNamesFunction<IShimmerStyleProps, IShimmerStyles>();

export interface IShimmerState {
  hasCircle: boolean;
}

export class ShimmerBase extends BaseComponent<IShimmerProps, IShimmerState> {
  public static defaultProps: IShimmerProps = {
    width: '100%'
  };
  private _classNames: {[key in keyof IShimmerStyles]: string};
  constructor(props: IShimmerProps) {
    super(props);
  }

  public render() {
    const { getStyles, width, lineElements } = this.props;
    this._classNames = getClassNames(getStyles!, { width });
    const maxHeight: string | undefined = lineElements ? this.findMaxHeight(lineElements) : undefined;

    const elements = lineElements ?
      lineElements.map((elem: IShimmerCirc | IShimmerRect | IShimmerGap, index: number) => {
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
            const gapWidth = elem.width ? elem.width + '%' : '0';
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
      null;

    return (
      <div className={ this._classNames.root }>
        { lineElements ? elements : null }
      </div>
    );
  }

  private findMaxHeight(items: Array<IShimmerCirc | IShimmerGap | IShimmerRect>): string {
    const maxHeight = items.filter((elem) => {
      return elem.type !== ShimmerElementType.GAP;
    }).reduce((acc, next) => {
      return next.height ?
        parseInt(next.height, 10) > acc ? next.height : acc
        : acc;
    }, 0);
    return maxHeight.toString();
  }
}