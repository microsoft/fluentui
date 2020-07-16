import { GlobalSettings } from '../GlobalSettings';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  inCustomizerContext: false,
});

let _events: (() => void)[] = [];

export class Customizations {
  private static _suppressUpdates: boolean;

  public static reset(): void {
    _allSettings.settings = {};
    _allSettings.scopedSettings = {};
  }

  /** Apply global Customization settings.
   * @example Customizations.applySettings(\{ theme: \{...\} \});
   */
  public static applySettings(settings: ISettings): void {
    _allSettings.settings = { ..._allSettings.settings, ...settings };
    Customizations._raiseChange();
  }

  /** Apply Customizations to a particular named scope, like a component.
   * @example Customizations.applyScopedSettings('Nav', \{ styles: () =\> \{\} \});
   */
  public static applyScopedSettings(scopeName: string, settings: ISettings): void {
    _allSettings.scopedSettings[scopeName] = { ..._allSettings.scopedSettings[scopeName], ...settings };
    Customizations._raiseChange();
  }

  public static getSettings(
    properties: string[],
    scopeName?: string,
    localSettings: ICustomizations = NO_CUSTOMIZATIONS,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any {
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

  /** Used to run some code that sets Customizations without triggering an update until the end.
   * Useful for applying Customizations that don't affect anything currently rendered, or for
   * applying many customizations at once.
   * @param suppressUpdate - Do not raise the change event at the end, preventing all updates
   */
  public static applyBatchedUpdates(code: () => void, suppressUpdate?: boolean): void {
    Customizations._suppressUpdates = true;
    try {
      code();
    } catch {
      /* do nothing */
    }
    Customizations._suppressUpdates = false;
    if (!suppressUpdate) {
      Customizations._raiseChange();
    }
  }

  public static observe(onChange: () => void): void {
    _events.push(onChange);
  }

  public static unobserve(onChange: () => void): void {
    _events = _events.filter((cb: () => void) => cb !== onChange);
  }

  private static _raiseChange(): void {
    if (!Customizations._suppressUpdates) {
      _events.forEach((cb: () => void) => cb());
    }
  }
}
