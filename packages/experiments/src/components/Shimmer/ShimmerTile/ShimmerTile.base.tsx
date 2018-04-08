import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
} from '../../../Utilities';
import {
  IShimmerTileProps,
  IShimmerTileStyleProps,
  IShimmerTileStyles
} from './ShimmerTile.types';

const getClassNames = classNamesFunction<IShimmerTileStyleProps, IShimmerTileStyles>();

export class ShimmerTileBase extends BaseComponent<IShimmerTileProps, {}> {
  private _classNames: {[key in keyof IShimmerTileStyles]: string};

  constructor(props: IShimmerTileProps) {
    super(props);
  }

  public render(): JSX.Element {
    const { getStyles, } = this.props;

    this._classNames = getClassNames(getStyles!, {});

    return (
      <div className={ this._classNames.root } />
    );
  }
}