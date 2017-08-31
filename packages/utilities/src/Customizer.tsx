import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BaseComponent } from './BaseComponent';

/**
 * Settings interface.
 *
 * @internal
 */
export interface ISettings {
  // tslint:disable-next-line:no-any
  [key: string]: any;
}

/**
 * Customizer component props.
 *
 * @public
 */
export interface ICustomizerProps {
  componentRef?: () => void;

  settings: ISettings;
}

/**
 * Customizer component state.
 *
 * @internal
 */
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
 * Props are provided via the settings prop, which should be a json map which contains 1 or more
 * name/value pairs representing injectable props.
 *
 * @public
 */
export class Customizer extends BaseComponent<ICustomizerProps, ICustomizerState> {
  public static contextTypes: {
    injectedProps: PropTypes.Requireable<{}>;
  } = {
    injectedProps: PropTypes.object
  };

  public static childContextTypes: {
    injectedProps: PropTypes.Requireable<{}>;
  } = Customizer.contextTypes;

  // tslint:disable-next-line:no-any
  constructor(props: ICustomizerProps, context: any) {
    super(props);

    this.state = this._getInjectedProps(props, context);
  }

  public getChildContext(): ICustomizerState {
    return this.state;
  }

  // tslint:disable-next-line:no-any
  public componentWillReceiveProps(newProps: ICustomizerProps, newContext: any): void {
    this.setState(this._getInjectedProps(newProps, newContext));
  }

  public render(): React.ReactElement<{}> {
    return React.Children.only(this.props.children);
  }

  private _getInjectedProps(props: ICustomizerProps, context: ICustomizerState): {
    injectedProps: {
      // tslint:disable-next-line:no-any
      [x: string]: any;
    };
  } {
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
