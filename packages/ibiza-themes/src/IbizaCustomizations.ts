import { ICustomizations } from 'office-ui-fabric-react';
import { AzureThemeDark } from './azure/AzureThemeDark';
import { AzureThemeLight } from './azure/AzureThemeLight';
import { AzureStyleSettings } from './azure/AzureStyleSettings';

export const IbizaCustomizationsDark: ICustomizations = {
  settings: {
    theme: { ...AzureThemeDark }
  },
  scopedSettings: { ...AzureStyleSettings(AzureThemeDark) }
};

export const IbizaCustomizationsLight: ICustomizations = {
  settings: {
    theme: { ...AzureThemeLight }
  },
  scopedSettings: { ...AzureStyleSettings(AzureThemeLight) }
};
