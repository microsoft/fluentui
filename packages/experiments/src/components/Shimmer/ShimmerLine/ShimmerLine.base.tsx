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
import { ShimmerElementVerticalAlign } from '../Shimmer.types';

const getClassNames = classNamesFunction<IShimmerLineStyleProps, IShimmerLineStyles>();

export class ShimmerLineBase extends BaseComponent<IShimmerLineProps, {}> {
  private _classNames: { [key in keyof IShimmerLineStyles]: string };

  constructor(props: IShimmerLineProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { height, getStyles, widthInPercentage, widthInPixel, borderStyle } = this.props;

    this._classNames = getClassNames(getStyles!, { height, widthInPixel, widthInPercentage, borderStyle });

    return (
      <div className={ this._classNames.root } />
    );
  }
}