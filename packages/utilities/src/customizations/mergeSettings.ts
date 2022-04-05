import type { ISettings, ISettingsFunction } from './Customizations';

/**
 * Merge new and old settings, giving priority to new settings.
 * New settings is optional in which case oldSettings is returned as-is.
 * @param oldSettings - Old settings to fall back to.
 * @param newSettings - New settings that will be merged over oldSettings.
 * @returns Merged settings.
 */
export function mergeSettings(oldSettings: ISettings = {}, newSettings?: ISettings | ISettingsFunction): ISettings {
  const mergeSettingsWith = _isSettingsFunction(newSettings) ? newSettings : _settingsMergeWith(newSettings);

  return mergeSettingsWith(oldSettings);
}

export function mergeScopedSettings(
  oldSettings: ISettings = {},
  newSettings?: ISettings | ISettingsFunction,
): ISettings {
  const mergeSettingsWith = _isSettingsFunction(newSettings) ? newSettings : _scopedSettingsMergeWith(newSettings);

  return mergeSettingsWith(oldSettings);
}

function _isSettingsFunction(settings?: ISettings | ISettingsFunction): settings is ISettingsFunction {
  return typeof settings === 'function';
}

function _settingsMergeWith(newSettings?: object): (settings: ISettings) => ISettings {
  return (settings: ISettings) => (newSettings ? { ...settings, ...newSettings } : settings);
}

function _scopedSettingsMergeWith(scopedSettingsFromProps: ISettings = {}): (scopedSettings: ISettings) => ISettings {
  return (oldScopedSettings: ISettings): ISettings => {
    const newScopedSettings: ISettings = { ...oldScopedSettings };

    for (let scopeName in scopedSettingsFromProps) {
      if (scopedSettingsFromProps.hasOwnProperty(scopeName)) {
        newScopedSettings[scopeName] = { ...oldScopedSettings[scopeName], ...scopedSettingsFromProps[scopeName] };
      }
    }

    return newScopedSettings;
  };
}
