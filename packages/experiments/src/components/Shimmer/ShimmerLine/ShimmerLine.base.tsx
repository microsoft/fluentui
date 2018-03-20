import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
} from '../../../Utilities';
import {
  IShimmerLineProps,
  IShimmerLineStyleProps,
  IShimmerLineStyles
} from './ShimmerLine.types';
import { ShimmerElementVerticalAlign } from 'experiments/lib/Shimmer';

const getClassNames = classNamesFunction<IShimmerLineStyleProps, IShimmerLineStyles>();

export class ShimmerLineBase extends BaseComponent<IShimmerLineProps, {}> {
  public static defaultProps: IShimmerLineProps = {
    verticalAlign: ShimmerElementVerticalAlign.CENTER,
  };
  private _classNames: {[key in keyof IShimmerLineStyles]: string};

  constructor(props: IShimmerLineProps) {
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