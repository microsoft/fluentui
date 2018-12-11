import { IbizaThemeDark } from './ibiza/IbizaThemeDark';
import { IbizaThemeLight } from './ibiza/IbizaThemeLight';
import { IbizaStyle } from './ibiza/IbizaStyles';
import { ICustomizations } from 'office-ui-fabric-react';
// import { addVariants } from '@uifabric/variants';

export const IbizaCustomizationsDark: ICustomizations = {
  settings: {
    theme: { ...IbizaThemeDark }
  },
  scopedSettings: { ...IbizaStyle(IbizaThemeDark) }
};

export const IbizaCustomizationsLight: ICustomizations = {
  settings: {
    theme: { ...IbizaThemeLight }
  },
  scopedSettings: { ...IbizaStyle(IbizaThemeLight) }
};

// addVariants(IbizaCustomizationsDark.settings.theme);
