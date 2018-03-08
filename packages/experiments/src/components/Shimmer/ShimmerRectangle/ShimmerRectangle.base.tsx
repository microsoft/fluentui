import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
} from '../../../Utilities';
import { IShimmerRectangleProps, IShimmerRectangleStyleProps, IShimmerRectangleStyles } from './ShimmerRectangle.styles';
import { ShimmerElementVerticalAlign } from '../Shimmer.types';

const getClassNames = classNamesFunction<IShimmerRectangleStyleProps, IShimmerRectangleStyles>();

export class ShimmerRectangleBase extends BaseComponent<IShimmerRectangleProps, {}> {
  public static defaultProps: IShimmerRectangleProps = {
    height: 16,
    verticalAlign: ShimmerElementVerticalAlign.CENTER,
  };
  private _classNames: {[key in keyof IShimmerRectangleStyles]: string};

  constructor(props: IShimmerRectangleProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { height, getStyles, widthInPercentage, widthInPixel, borderAlignStyle } = this.props;

    this._classNames = getClassNames(getStyles!, { height, widthInPixel, widthInPercentage, borderAlignStyle });

    return (
      <div className={ this._classNames.root } />
    );
  }
}