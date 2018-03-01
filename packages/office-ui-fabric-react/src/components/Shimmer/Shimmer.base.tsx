import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  getNativeProps,
} from '../../Utilities';
import {
  IClassNames
} from '@uifabric/utilities/lib/IClassNames';
import { IShimmerProps, IShimmerStyleProps, IShimmerStyles } from './Shimmer.types';

const getClassNames = classNamesFunction<IShimmerStyleProps, IShimmerStyles>();

export interface IShimmerState {
  hasCircle: boolean;
}

export class ShimmerBase extends BaseComponent<IShimmerProps, IShimmerState> {
  public static defaultProps: IShimmerProps = {
    // hasCircle: false
  };
  private _classNames: {[key in keyof IShimmerStyles]: string};
  constructor(props: IShimmerProps) {
    super(props);
  }

  public render() {
    const { getStyles, children } = this.props;
    this._classNames = getClassNames(getStyles!, {});

    return (
      <div className={ this._classNames.root }>
        { children }
        {/* <div
          className={ this._classNames.line }
        /> */}
      </div>
    );
  }
}