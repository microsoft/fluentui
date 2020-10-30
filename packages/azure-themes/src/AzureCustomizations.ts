import { ICustomizations } from '@fluentui/react';
import { AzureThemeDark } from './azure/AzureThemeDark';
import { AzureThemeLight } from './azure/AzureThemeLight';
import { AzureThemeHighContrastLight } from './azure/AzureThemeHighContrastLight';
import { AzureThemeHighContrastDark } from './azure/AzureThemeHighContrastDark';

const { components: darkScopedSettings, ...darkThemeSettings } = AzureThemeDark;
const { components: lightScopedSettings, ...lightThemeSettings } = AzureThemeLight;
const { components: hcLightScopedSettings, ...hcLightThemeSettings } = AzureThemeHighContrastLight;
const { components: hcDarkScopedSettings, ...hcDarkThemeSettings } = AzureThemeHighContrastDark;

export const AzureCustomizationsDark: ICustomizations = {
  settings: {
    theme: darkThemeSettings,
  },
  scopedSettings: { ...darkScopedSettings },
};

export const AzureCustomizationsLight: ICustomizations = {
  settings: {
    theme: lightThemeSettings,
  },
  scopedSettings: { ...lightScopedSettings },
};

export const AzureCustomizationsHighContrastLight: ICustomizations = {
  settings: {
    theme: hcLightThemeSettings,
  },
  scopedSettings: { ...hcLightScopedSettings },
};

export const AzureCustomizationsHighContrastDark: ICustomizations = {
  settings: {
    theme: hcDarkThemeSettings,
  },
  scopedSettings: { ...hcDarkScopedSettings },
};
