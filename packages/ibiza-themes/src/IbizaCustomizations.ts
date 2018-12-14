import IbizaExtendedThemeDark from './ibiza/IbizaExtendedThemeDark';
import IbizaExtendedThemeLight from './ibiza/IbizaExtendedThemeLight';
import { IbizaStyle } from './ibiza/IbizaStyles';
import { ICustomizations } from 'office-ui-fabric-react';
// import { addVariants } from '@uifabric/variants';

export const IbizaCustomizationsDark: ICustomizations = {
  settings: {
    theme: { ...IbizaExtendedThemeDark.theme }
  },
  scopedSettings: { ...IbizaStyle(IbizaExtendedThemeDark) }
};

export const IbizaCustomizationsLight: ICustomizations = {
  settings: {
    theme: { ...IbizaExtendedThemeLight.theme }
  },
  scopedSettings: { ...IbizaStyle(IbizaExtendedThemeLight) }
};

// addVariants(IbizaCustomizationsDark.settings.theme);
