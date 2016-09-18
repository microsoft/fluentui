import * as React from 'react';
import { BaseStore } from './BaseStore';
import { BaseComponent, autobind, assign, shallowCompare } from '../Utilities';

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

  constructor(props: IConnectedHostProps) {
    super(props);

    this.state = {
      props: null
    };
  }

  public componentWillMount() {
    this.state = {
      props: this._getComponentProps(this.props)
    };
  }

  public componentDidMount() {
    let stores = this.context.stores;
    let { storesToSubscribe } = this.props;

    if (storesToSubscribe) {
      for (let storeName of storesToSubscribe) {
        let store = stores[storeName];

        this._disposables.push(store.subscribe(this._updateProps));
      }
    } else {
      for (let storeName in stores) {
        if (stores.hasOwnProperty(storeName)) {
          let store = stores[storeName];
          this._disposables.push(store.subscribe(this._updateProps));
        }
      }
    }
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
  private _updateProps(props?: any) {
    props = this._getComponentProps(props || this.props);
    this.setState({ props });
  }

  private _getComponentProps(props) {
    let stores = this.context.stores;

    let newProps = assign(
      {},
      props.componentProps,
      props.getProps(props.componentProps, stores));

    return newProps;
  }
}
