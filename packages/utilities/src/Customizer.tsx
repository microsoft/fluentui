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

/**
 * The Customizer component allows for default props to be mixed into components which
 * are decorated with the customizable() decorator. This enables injection scenarios like:
 *
 * 1. render svg icons instead of the icon font within all buttons
 * 2. inject a custom theme object into a component
 *
 * Props are provided via the settings prop, which should be a json map where the key is
 * the name of the customizable component, and the value is are the props to pass in.
 */
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
