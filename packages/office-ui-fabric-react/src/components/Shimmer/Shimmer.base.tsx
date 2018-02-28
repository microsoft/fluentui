import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  getNativeProps,
} from '../../Utilities';
import {
  IClassNames
} from '@uifabric/utilities/lib/IClassNames';

import { IShimmerProps, IShimmerStyleProps, IShimmerStyles } from './Shimmer.types';

const getClassNames = classNamesFunction<IShimmerStyleProps, IShimmerStyles>();

export interface IShimmerState {
  isGeneric: boolean;
  hasCircle: boolean;
}

export class ShimmerBase extends BaseComponent<IShimmerProps, IShimmerState> {
  public static defaultProps: IShimmerProps = {
    isGeneric: false,
    hasCircle: false
  };
  private _classNames: {[key in keyof IShimmerStyles]: string};
  constructor(props: IShimmerProps) {
    super(props);

    this.state = {
      isGeneric: !!this.props.isGeneric,
      hasCircle: !!this.props.hasCircle
    };
  }

  public render() {
    const { isGeneric, hasCircle, getStyles } = this.props;
    this._classNames = getClassNames(getStyles!, { isGeneric, hasCircle });
    // tslint:disable-next-line:no-trailing-whitespace

    return (
      <div className={ this._classNames.root }>
        {
          !!hasCircle &&
          <div className={ this._classNames.circle }>
            <svg viewBox='0 0 15 10' width='36' height='24'>
              <path
                d='M0,0 L15,0 L15,10 L0,10 L0,0 Z M0,5 C0,7.76142375 2.23857625,10 5,10 C7.76142375,10 10,7.76142375 10,5 C10,2.23857625 7.76142375,2.22044605e-16 5,0 C2.23857625,-2.22044605e-16 0,2.23857625 0,5 L0,5 Z'>
              </path>
            </svg>
          </div>
        }
        <div className={ this._classNames.line }></div>
      </div>
    );
  }
}