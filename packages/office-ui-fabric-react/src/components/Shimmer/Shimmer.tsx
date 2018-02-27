import * as React from 'react';
import {
  BaseComponent,
  inputProperties,
  getNativeProps,
} from '../../Utilities';

import { IShimmerProps } from './Shimmer.types';

export interface IShimmerState {
  isGeneric: boolean;
}

export class Shimmer extends BaseComponent<IShimmerProps, IShimmerState> {
  public static defaultProps: IShimmerProps = {
    isGeneric: false
  };
  constructor(props: IShimmerProps) {
    super(props);

    this.state = {
      isGeneric: !!this.props.isGeneric
    };
  }

  public render() {
    return (
      <h1>SHIMMER</h1>
    );
  }
}