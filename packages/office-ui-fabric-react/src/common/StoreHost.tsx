import * as React from 'react';
import * as PropTypes from 'prop-types';
import { StoreSet } from './StoreSet';
import { BaseComponent } from '../Utilities';

export interface IStoreHostProps extends React.Props<StoreHost> {
  componentRef?: () => void;
  stores?: StoreSet;
}

export interface IStoreHostContext {
  stores?: StoreSet;
}

export class StoreHost extends BaseComponent<IStoreHostProps, {}> {
  public static contextTypes = {
    stores: PropTypes.object
  };

  public static childContextTypes = {
    stores: PropTypes.object
  };

  public context: IStoreHostContext;

  public getChildContext(): IStoreHostContext {
    let { stores: parentStores } = this.context;
    let { stores: currentStores } = this.props;

    return { stores: parentStores ? parentStores.merge(currentStores!) : currentStores };
  }

  public render() {
    return React.Children.only(this.props.children);
  }
}
