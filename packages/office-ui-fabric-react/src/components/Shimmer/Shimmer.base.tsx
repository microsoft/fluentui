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
    // let highest:

    const elements = lineElements ?
      lineElements.map((elem: IShimmerCirc | IShimmerRect | IShimmerGap) => {
        switch (elem.type) {
          case ShimmerElementType.CIRCLE:
            return (
              <ShimmerCircle { ...elem } />
            );
          // case ShimmerElementType.GAP:
          //   return (

          // );
        }
      }) :
      null;

    return (
      <div className={ this._classNames.root }>
        <ShimmerCircle />
        <ShimmerRectangle />
      </div>
    );
  }
}