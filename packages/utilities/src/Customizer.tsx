import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BaseComponent, IBaseProps } from './BaseComponent';
import { ICustomizations, Settings, SettingsFunction } from './Customizations';

export interface ICustomizerContext {
  customizations: ICustomizations;
}

export type ICustomizerProps = IBaseProps & Partial<{
  /**
   * @description
   * Settings are used as general settings for the React tree below.
   * Components can subscribe to receive the settings by using `customizable`.
   *
   * @example
   * Settings can be represented by a plain object that contains the key value pairs.
   * ```
   *  <Customizer settings={{ color: 'red' }} />
   * ```
   * or a function that receives the current settings and returns the new ones
   * ```
   *  <Customizer settings={(currentSettings) => ({ ...currentSettings, color: 'red' })} />
   * ```
   */
  settings: Settings | SettingsFunction;
  /**
   * @description
   * Scoped settings are settings that are scoped to a specific scope. The
   * scope is the name that is passed to the `customizable` function when the
   * the component is customized.
   *
   * @example
   * Scoped settings can be represented by a plain object that contains the key value pairs.
   * ```
   *  const myScopedSettings = {
   *    Button: { color: 'red' };
   *  };
   *
   *  <Customizer scopedSettings={myScopedSettings} />
   * ```
   * or a function that receives the current settings and returns the new ones
   * ```
   *  const myScopedSettings = {
   *    Button: { color: 'red' };
   *  };
   *
   *  <Customizer scopedSettings={(currentScopedSettings) => ({ ...currentScopedSettings, ...myScopedSettings })} />
   * ```
   */
  scopedSettings: Settings | SettingsFunction
}>;

/**
 * The Customizer component allows for default props to be mixed into components which
 * are decorated with the customizable() decorator. This enables injection scenarios like:
 *
 * 1. render svg icons instead of the icon font within all buttons
 * 2. inject a custom theme object into a component
 *
 * Props are provided via the settings prop which should be one of the following:
 * - A json map which contains 1 or more name/value pairs representing injectable props.
 * - A function that receives the current settings and returns the new ones that apply to the scope
 *
 * @public
 */
export class Customizer extends BaseComponent<ICustomizerProps, ICustomizerContext> {
  public static contextTypes: {
    customizations: PropTypes.Requireable<{}>;
  } = {
      customizations: PropTypes.object
    };

  public static childContextTypes: {
    customizations: PropTypes.Requireable<{}>;
  } = Customizer.contextTypes;

  // tslint:disable-next-line:no-any
  constructor(props: ICustomizerProps, context: any) {
    super(props);

    this.state = this._getCustomizations(props, context);
  }

  public getChildContext(): ICustomizerContext {
    return this.state;
  }

  // tslint:disable-next-line:no-any
  public componentWillReceiveProps(newProps: any, newContext: any): void {
    this.setState(this._getCustomizations(newProps, newContext));
  }

  public render(): React.ReactElement<{}> {
    return React.Children.only(this.props.children);
  }

  private _getCustomizations(
    props: ICustomizerProps,
    context: ICustomizerContext
  ): ICustomizerContext {
    const {
      customizations = { settings: {}, scopedSettings: {} }
    } = context;

    return {
      customizations: {
        settings: mergeSettings(customizations.settings, props.settings),
        scopedSettings: mergeScopedSettings(customizations.scopedSettings, props.scopedSettings),
      }
    };
  }
}

function mergeSettings(oldSettings: Settings = {}, newSettings?: Settings | SettingsFunction): Settings {
  const mergeSettingsWith = isSettingsFunction(newSettings) ? newSettings : settingsMergeWith(newSettings);

  return mergeSettingsWith(oldSettings);
}

function mergeScopedSettings(oldSettings: Settings = {}, newSettings?: Settings | SettingsFunction): Settings {
  const mergeSettingsWith = isSettingsFunction(newSettings) ? newSettings : scopedSettingsMergeWith(newSettings);

  return mergeSettingsWith(oldSettings);
}

function isSettingsFunction(settings?: Settings | SettingsFunction): settings is SettingsFunction {
  return typeof settings === 'function';
}

function settingsMergeWith(newSettings?: object): (settings: Settings) => Settings {
  return (settings: Settings) => newSettings ? { ...newSettings, ...settings } : settings;
}

function scopedSettingsMergeWith(scopedSettingsFromProps: Settings = {}): (scopedSettings: Settings) => Settings {
  return (oldScopedSettings: Settings): Settings => {
    const newScopedSettings: Settings = { ...oldScopedSettings };

    for (let scopeName in scopedSettingsFromProps) {
      if (scopedSettingsFromProps.hasOwnProperty(scopeName)) {
        newScopedSettings[scopeName] = { ...oldScopedSettings[scopeName], ...scopedSettingsFromProps[scopeName] };
      }
    }

    return newScopedSettings;
  };
}