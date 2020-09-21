import { initializeThemeInCustomizations } from '@fluentui/theme';

export {
  createTheme,
  initializeThemeInCustomizations,
  ThemeSettingName,
  loadTheme,
  getTheme,
  registerOnThemeChangeCallback,
  removeOnThemeChangeCallback,
} from '@fluentui/theme';

// TODO: check if this is the same as `createTheme({})`.
initializeThemeInCustomizations();
