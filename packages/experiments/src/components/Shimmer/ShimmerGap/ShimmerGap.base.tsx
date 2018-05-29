import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  customizable
} from '../../../Utilities';
import {
  IShimmerGapProps,
  IShimmerGapStyleProps,
  IShimmerGapStyles
} from './ShimmerGap.types';

const getClassNames = classNamesFunction<IShimmerGapStyleProps, IShimmerGapStyles>();

@customizable('ShimmerGap', ['theme'])
export class ShimmerGapBase extends BaseComponent<IShimmerGapProps, {}> {
  private _classNames: { [key in keyof IShimmerGapStyles]: string };

  constructor(props: IShimmerGapProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {
      height,
      getStyles,
      widthInPercentage,
      widthInPixel,
      borderStyle,
      theme
    } = this.props;

    this._classNames = getClassNames(getStyles!, {
      theme: theme!,
      height,
      widthInPixel,
      widthInPercentage,
      borderStyle
    });

    return (
      <div className={ this._classNames.root } />
    );
  }
}