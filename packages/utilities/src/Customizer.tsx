import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BaseComponent } from './BaseComponent';

/**
 * Customizer settings.
 *
 * @public
 */
export interface ICustomizerSettings {
  [key: string]: any;
}

/**
 * Customizer props.
 *
 * @public
 */
export interface ICustomizerProps {
  settings: ICustomizerSettings;
}

/**
 * Customizer state.
 *
 * @internal
 */
export interface ICustomizerState {
  injectedProps?: ICustomizerSettings;
}

/**
 * The Customizer component allows for default props to be mixed into components which
 * are decorated with the customizable() decorator. This enables injection scenarios like:
 *
 * 1. render svg icons instead of the icon font within all buttons
 * 2. inject a custom theme object into a component
 *
 * Props are provided via the settings prop, which should be a json map which contains 1 or more
 * name/value pairs representing injectable props.
 *
 * @public
 */
export class Customizer extends BaseComponent<ICustomizerProps, ICustomizerState> {
  public static contextTypes = {
    injectedProps: PropTypes.object
  };

  public static childContextTypes = Customizer.contextTypes;

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
    let { settings: injectedPropsFromSettings = {} as ICustomizerSettings } = props;
    let { injectedProps: injectedPropsFromContext = {} as ICustomizerSettings } = context;

    return {
      injectedProps: {
        ...injectedPropsFromContext,
        ...injectedPropsFromSettings
      }
    };
  }
}
