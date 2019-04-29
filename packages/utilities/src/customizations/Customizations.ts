import { GlobalSettings } from '../GlobalSettings';

// tslint:disable-next-line:no-any
export type ISettings = { [key: string]: any };
export type ISettingsFunction = (settings: ISettings) => ISettings;

/**
 * @deprecated Use ISettings.
 */
export type Settings = ISettings;

/**
 * @deprecated Use ISettingsFunction.
 */
export type SettingsFunction = ISettingsFunction;

export interface ICustomizations {
  settings: ISettings;
  scopedSettings: { [key: string]: ISettings };
  inCustomizerContext?: boolean;
}

const CustomizationsGlobalKey = 'customizations';
const NO_CUSTOMIZATIONS = { settings: {}, scopedSettings: {}, inCustomizerContext: false };

let _allSettings = GlobalSettings.getValue<ICustomizations>(CustomizationsGlobalKey, {
  settings: {},
  scopedSettings: {},
  inCustomizerContext: false
});

let _events: (() => void)[] = [];

export class Customizations {
  public static reset(): void {
    _allSettings.settings = {};
    _allSettings.scopedSettings = {};
  }

  // tslint:disable-next-line:no-any
  public static applySettings(settings: ISettings): void {
    _allSettings.settings = { ..._allSettings.settings, ...settings };
    Customizations._raiseChange();
  }

  // tslint:disable-next-line:no-any
  public static applyScopedSettings(scopeName: string, settings: ISettings): void {
    _allSettings.scopedSettings[scopeName] = { ..._allSettings.scopedSettings[scopeName], ...settings };
    Customizations._raiseChange();
  }

  public static getSettings(
    properties: string[],
    scopeName?: string,
    localSettings: ICustomizations = NO_CUSTOMIZATIONS
    // tslint:disable-next-line:no-any
  ): any {
    // tslint:disable-next-line:no-any
    const settings: ISettings = {};
    const localScopedSettings = (scopeName && localSettings.scopedSettings[scopeName]) || {};
    const globalScopedSettings = (scopeName && _allSettings.scopedSettings[scopeName]) || {};

    for (let property of properties) {
      settings[property] =
        localScopedSettings[property] ||
        localSettings.settings[property] ||
        globalScopedSettings[property] ||
        _allSettings.settings[property];
    }

    return settings;
  }

  public static observe(onChange: () => void): void {
    _events.push(onChange);
  }

  public static unobserve(onChange: () => void): void {
    _events = _events.filter((cb: () => void) => cb !== onChange);
  }

  private static _raiseChange(): void {
    _events.forEach((cb: () => void) => cb());
  }
}
