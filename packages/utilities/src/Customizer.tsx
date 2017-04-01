import * as React from 'react';
import { BaseComponent } from './BaseComponent';
import { assign } from './object';

export interface ISettings {
  [key: string]: any;

}

export interface ICustomizerProps {
  settings: ISettings;
}

export interface ICustomizerState {
  injectedProps?: ISettings;
}

export class Customizer extends BaseComponent<ICustomizerProps, ICustomizerState> {
  public static contextTypes = {
    injectedProps: React.PropTypes.object
  };

  public static childContextTypes = Customizer.contextTypes;

  constructor(props, context) {
    super(props);

    this.state = this._getInjectedProps(props, context);
  }

  public getChildContext(): any {
    return this.state;
  }

  public componentWillReceiveProps(newProps, newContext) {

    this.setState(this._getInjectedProps(newProps, newContext));
  }

  public render() {
    return React.Children.only(this.props.children);
  }

  private _getInjectedProps(props: ICustomizerProps, context: ICustomizerState) {
    let { settings: injectedPropsFromSettings = {} as ISettings } = props;
    let { injectedProps: injectedPropsFromContext = {} as ISettings } = context;

    return {
      injectedProps: assign({}, injectedPropsFromContext, injectedPropsFromSettings)
    };
  }
}
