import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../../Utilities';
import { IShimmerLineProps, IShimmerLineStyleProps, IShimmerLineStyles } from './ShimmerLine.types';

const getClassNames = classNamesFunction<IShimmerLineStyleProps, IShimmerLineStyles>();

export class ShimmerLineBase extends BaseComponent<IShimmerLineProps, {}> {
  private _classNames: { [key in keyof IShimmerLineStyles]: string };

  constructor(props: IShimmerLineProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { height, styles, widthInPercentage, widthInPixel, borderStyle, theme } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      height,
      widthInPixel,
      widthInPercentage,
      borderStyle
    });

    return (
      <div className={this._classNames.root}>
        <svg width="2" height="2" className={this._classNames.topLeftCorner}>
          <path d="M0 2 A 2 2, 0, 0, 1, 2 0 L 0 0 Z" />
        </svg>
        <svg width="2" height="2" className={this._classNames.topRightCorner}>
          <path d="M0 0 A 2 2, 0, 0, 1, 2 2 L 2 0 Z" />
        </svg>
        <svg width="2" height="2" className={this._classNames.bottomRightCorner}>
          <path d="M2 0 A 2 2, 0, 0, 1, 0 2 L 2 2 Z" />
        </svg>
        <svg width="2" height="2" className={this._classNames.bottomLeftCorner}>
          <path d="M2 2 A 2 2, 0, 0, 1, 0 0 L 0 2 Z" />
        </svg>
      </div>
    );
  }
}
