import { createTheme, ICustomizations, IPalette, ITheme } from 'office-ui-fabric-react';
import { addVariants } from '@uifabric/variants';

const DarkDefaultPalette: Partial<IPalette> = {
  themeDarker: '#8ac2ec',
  themeDark: '#65aee6',
  themeDarkAlt: '#4ba0e1',
  themePrimary: '#3a96dd',
  themeSecondary: '#3385c3',
  themeTertiary: '#235a85',
  themeLight: '#112d43',
  themeLighter: '#091823',
  themeLighterAlt: '#020609',
  black: '#ffffff',
  neutralDark: '#faf9f8',
  neutralPrimary: '#f3f2f1',
  neutralPrimaryAlt: '#c8c6c4',
  neutralSecondary: '#a19f9d',
  neutralSecondaryAlt: '#979693',
  neutralTertiary: '#797775',
  neutralTertiaryAlt: '#484644',
  neutralQuaternary: '#3b3a39',
  neutralQuaternaryAlt: '#323130',
  neutralLight: '#292827',
  neutralLighter: '#252423',
  neutralLighterAlt: '#201f1e',
  white: '#1b1a19'
};

const DarkTheme: ITheme = createTheme({
  palette: DarkDefaultPalette,
  semanticColors: {
    menuBackground: DarkDefaultPalette.neutralLighter,
    menuItemBackgroundHovered: DarkDefaultPalette.neutralLight,
    menuItemBackgroundPressed: DarkDefaultPalette.neutralQuaternaryAlt,
    menuDivider: DarkDefaultPalette.neutralTertiaryAlt,
    menuIcon: DarkDefaultPalette.themeDarkAlt,
    menuHeader: DarkDefaultPalette.themeDarkAlt,
    menuItemText: DarkDefaultPalette.neutralPrimary,
    menuItemTextHovered: DarkDefaultPalette.neutralDark
  }
});

export const DarkCustomizations: ICustomizations = {
  settings: {
    theme: DarkTheme
  },
  scopedSettings: {}
};

addVariants(DarkCustomizations.settings.theme);
