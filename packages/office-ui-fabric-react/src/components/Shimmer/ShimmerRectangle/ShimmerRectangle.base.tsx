import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  getNativeProps,
} from '../../../Utilities';
import {
  IClassNames
} from '@uifabric/utilities/lib/IClassNames';
import { IShimmerRectangleProps, IShimmerRectangleStyleProps, IShimmerRectangleStyles } from './ShimmerRectangle.styles';

const getClassNames = classNamesFunction<IShimmerRectangleStyleProps, IShimmerRectangleStyles>();
// TODO needs to be thought about
export interface IShimmerRectangleState {
  hasRectangle: boolean;
}

export class ShimmerRectangleBase extends BaseComponent<IShimmerRectangleProps, IShimmerRectangleState> {
  public static defaultProps: IShimmerRectangleProps = {
    height: '16px'
  };
  private _classNames: {[key in keyof IShimmerRectangleStyles]: string};
  constructor(props: IShimmerRectangleProps) {
    super(props);
  }

  public render() {
    const { height, getStyles } = this.props;
    this._classNames = getClassNames(getStyles!, { height });

    return (
      <div className={ this._classNames.root } />
    );
  }
}