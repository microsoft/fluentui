import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BaseComponent } from './BaseComponent';

export interface ISettings {
  [key: string]: any;
}

export interface ICustomizerProps {
  settings: ISettings;
}

export interface ICustomizerState {
  injectedProps?: ISettings;
}

export interface IChangeListener {
  (propName?: string): void;
}

let _defaultValues: { [key: string]: any } = {};
let _changeListeners: IChangeListener[] = [];

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
    injectedProps: PropTypes.object
  };

  public static childContextTypes = Customizer.contextTypes;

  public static setDefault(name, value): void {
    _defaultValues[name] = value;
    Customizer._change(name);
  }

  public static getDefault(fieldName) {
    return _defaultValues[fieldName];
  }

  public static addChangeListener(onChanged: IChangeListener): void {
    _changeListeners.push(onChanged);
  }

  public static removeChangeListener(onChanged: IChangeListener): void {
    let index = _changeListeners.indexOf(onChanged);

    if (index >= 0) {
      _changeListeners.splice(index, 1);
    }
  }

  private static _change(propName: string) {
    for (let onChanged of _changeListeners) {
      onChanged(propName);
    }
  }

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
      injectedProps: {
        ...injectedPropsFromContext,
        ...injectedPropsFromSettings
      }
    };
  }
}
