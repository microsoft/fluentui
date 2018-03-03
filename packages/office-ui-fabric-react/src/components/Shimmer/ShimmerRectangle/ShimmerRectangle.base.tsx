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

export class ShimmerRectangleBase extends BaseComponent<IShimmerRectangleProps, {}> {
  public static defaultProps: IShimmerRectangleProps = {
    height: '16',
    verticalAlign: 'center',
    width: '100'
  };
  private _classNames: {[key in keyof IShimmerRectangleStyles]: string};

  constructor(props: IShimmerRectangleProps) {
    super(props);
  }

  public render() {
    const { height, getStyles, verticalAlign, maxHeight, width } = this.props;

    this._classNames = getClassNames(getStyles!, { height, verticalAlign, maxHeight, width });

    return (
      <div className={ this._classNames.root } />
    );
  }
}