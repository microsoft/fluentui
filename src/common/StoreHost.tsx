import * as React from 'react';
import { assign } from '../Utilities';
import { BaseStore } from './BaseStore';

export interface IStoreHostProps extends React.Props<StoreHost> {
  stores?: {
    [key: string]: BaseStore;
  };
}

export class StoreHost extends React.Component<IStoreHostProps, {}> {
  public static contextTypes = {
    stores: React.PropTypes.object
  };

  public static childContextTypes = {
    stores: React.PropTypes.object
  };

  public context: {
    stores?: {
      [key: string]: BaseStore;
    };
  };

  public getChildContext() {
    let { stores: parentStores } = this.context;
    let { stores: currentStores } = this.props;

    return { stores: assign({}, parentStores, currentStores) };
  }

  public render() {
    return React.Children.only(this.props.children);
  }
}
