import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
} from '../../../Utilities';
import { IShimmerRectangleProps, IShimmerRectangleStyleProps, IShimmerRectangleStyles } from './ShimmerRectangle.styles';
import { ShimmerElementVerticalAlign } from 'experiments/lib/Shimmer';

const getClassNames = classNamesFunction<IShimmerRectangleStyleProps, IShimmerRectangleStyles>();

export class ShimmerRectangleBase extends BaseComponent<IShimmerRectangleProps, {}> {
  public static defaultProps: IShimmerRectangleProps = {
    height: 16,
    verticalAlign: ShimmerElementVerticalAlign.CENTER,
    width: 100
  };
  private _classNames: {[key in keyof IShimmerRectangleStyles]: string};

  constructor(props: IShimmerRectangleProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { height, getStyles, width, borderAlignStyle } = this.props;

    this._classNames = getClassNames(getStyles!, { height, width, borderAlignStyle });

    return (
      <div className={ this._classNames.root } />
    );
  }
}