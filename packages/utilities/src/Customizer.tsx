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
 * Props are provided via the settings prop, which should be a json map which contains 1 or more
 * name/value pairs representing injectable props.
 */
export class Customizer extends BaseComponent<ICustomizerProps, ICustomizerState> {
  public static contextTypes = {
    injectedProps: PropTypes.object
  };

  public static childContextTypes = Customizer.contextTypes;

  /**
   * Sets a default value for the given field.
   */
  public static setDefault(name: string, value: any): void {
    _defaultValues[name] = value;
    Customizer._change(name);
  }

  /**
   * Gets the current default value for a given field.
   */
  public static getDefault(fieldName: string): any {
    return _defaultValues[fieldName];
  }

  /**
   * Adds a change listener for when customizable defaults change.
   */
  public static addChangeListener(onChanged: IChangeListener): void {
    _changeListeners.push(onChanged);
  }

  /**
   * Removes a change listener that was added.
   */
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

  constructor(props: any, context: any) {
    super(props);

    this.state = this._getInjectedProps(props, context);
  }

  public getChildContext(): any {
    return this.state;
  }

  public componentWillReceiveProps(newProps: any, newContext: any) {
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
