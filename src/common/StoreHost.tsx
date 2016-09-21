import * as React from 'react';
import { StoreSet } from './StoreSet';

export interface IStoreHostProps extends React.Props<StoreHost> {
  stores?: StoreSet;
}

export interface IStoreHostContext {
  stores?: StoreSet;
}

export class StoreHost extends React.Component<IStoreHostProps, {}> {
  public static contextTypes = {
    stores: React.PropTypes.object
  };

  public static childContextTypes = {
    stores: React.PropTypes.object
  };

  public context: IStoreHostContext ;

  public getChildContext(): IStoreHostContext {
    let { stores: parentStores } = this.context;
    let { stores: currentStores } = this.props;

    return { stores: parentStores ? parentStores.merge(currentStores) : currentStores };
  }

  public render() {
    return React.Children.only(this.props.children);
  }
}
