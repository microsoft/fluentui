import { ICustomizations } from '@fluentui/react';
import { AzureThemeDark } from './azure/AzureThemeDark';
import { AzureThemeLight } from './azure/AzureThemeLight';
import { AzureThemeHighContrastLight } from './azure/AzureThemeHighContrastLight';
import { AzureThemeHighContrastDark } from './azure/AzureThemeHighContrastDark';
import { AzureStyleSettings } from './azure/AzureStyleSettings';

export const AzureCustomizationsDark: ICustomizations = {
  settings: {
    theme: { ...AzureThemeDark },
  },
  scopedSettings: { ...AzureStyleSettings(AzureThemeDark) },
};

export const AzureCustomizationsLight: ICustomizations = {
  settings: {
    theme: { ...AzureThemeLight },
  },
  scopedSettings: { ...AzureStyleSettings(AzureThemeLight) },
};

export const AzureCustomizationsHighContrastLight: ICustomizations = {
  settings: {
    theme: { ...AzureThemeHighContrastLight },
  },
  scopedSettings: { ...AzureStyleSettings(AzureThemeHighContrastLight) },
};

export const AzureCustomizationsHighContrastDark: ICustomizations = {
  settings: {
    theme: { ...AzureThemeHighContrastDark },
  },
  scopedSettings: { ...AzureStyleSettings(AzureThemeHighContrastDark) },
};
