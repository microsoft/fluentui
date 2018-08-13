import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../../Utilities';
import { IShimmerGapProps, IShimmerGapStyleProps, IShimmerGapStyles } from './ShimmerGap.types';

const getClassNames = classNamesFunction<IShimmerGapStyleProps, IShimmerGapStyles>();

export class ShimmerGapBase extends BaseComponent<IShimmerGapProps, {}> {
  private _classNames: { [key in keyof IShimmerGapStyles]: string };

  constructor(props: IShimmerGapProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { height, styles, width, borderStyle, theme } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      height,
      borderStyle
    });

    return (
      <div
        style={{ width: width ? width : '10px', minWidth: typeof width === 'number' ? `${width}px` : 'auto' }}
        className={this._classNames.root}
      />
    );
  }
}
