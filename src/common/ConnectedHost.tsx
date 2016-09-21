import * as React from 'react';
import { BaseStore } from './BaseStore';
import { BaseComponent, autobind, assign, shallowCompare } from '../Utilities';

// Track all components that require changes.
let _changedComponents: ConnectedHost[];

export interface IConnectedHostProps {
  componentProps: any;
  storesToSubscribe: string[];
  component: any;
  getProps: (stores: any, props: any) => any;
}

export interface IConnectedHostState {
  props: any;
}

export class ConnectedHost extends BaseComponent<IConnectedHostProps, IConnectedHostState> {
  public static contextTypes = {
    stores: React.PropTypes.object
  };

  public context: {
    stores: {
      [key: string]: BaseStore
    };
  };

  private _stores: any[];
  private _changeEnqueued: boolean;
  private _isMounted: boolean;

  constructor(props: IConnectedHostProps) {
    super(props);

    this.state = {
      props: null
    };
  }

  public componentWillMount() {
    if (this.props.storesToSubscribe && this.props.storesToSubscribe.length > 0) {
      if (!this.context.stores) {
        throw `A connected component was hosted in an environment where no stores were hosted. Use the StoreHost to host components.`;
      }

      // Resolve and subscribe to stores.
      this._stores = this.props.storesToSubscribe.map(storeName => {
        let store = this.context.stores[storeName];

        if (!store) {
          throw `The "${storeName}" store was required by a connected component, but not exposed.`;
        }
        this._disposables.push(store.subscribe(this._onStoreChanged));

        return store;
      });
    }

    // We can only initialize state at this point, where context has been resolved.
    this.state = {
      props: this._getComponentProps(this.props)
    };
  }

  public componentDidMount() {
    this._isMounted = true;
  }

  public componentWillUnmount() {
    this._isMounted = false;
  }

  public componentWillReceiveProps(newProps) {
    this._updateProps(newProps);
  }

  public shouldComponentUpdate(newProps: IConnectedHostProps, newState) {
    let inputPropsHaveChanged = !shallowCompare(this.props.componentProps, newProps.componentProps);
    let computedPropsHaveChanged = !shallowCompare(this.state.props, newState.props);
    let shouldUpdate = inputPropsHaveChanged || computedPropsHaveChanged;

    return shouldUpdate;
  }

  public render() {
    let { component: Component } = this.props;
    let { props } = this.state;

    return props ? <Component { ...props } /> : null;
  }

  @autobind
  private _onStoreChanged() {
    if (!this._changeEnqueued) {
      if (!_changedComponents) {
        _changedComponents = [];
        this._async.setImmediate(() => {
          _changedComponents.forEach(comp => comp._updateProps());
          _changedComponents = null;
        });
      }
      _changedComponents.push(this);
      this._changeEnqueued = true;
    }
  }

  @autobind
  private _updateProps(props?: any) {
    this._changeEnqueued = false;
    props = this._getComponentProps(props || this.props);
    this.setState({ props });
  }

  private _getComponentProps(props) {
    let newProps = assign(
      {},
      props.componentProps,
      props.getProps(props.componentProps, ...this._stores));

    return newProps;
  }
}
