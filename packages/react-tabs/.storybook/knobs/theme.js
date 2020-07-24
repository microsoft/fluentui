import { select } from '@storybook/addon-knobs';
import { MDL2Customizations } from '@uifabric/mdl2-theme';
import { AzureCustomizationsLight, AzureCustomizationsDark } from '@uifabric/azure-themes';
import {
  TeamsCustomizations,
  WordCustomizations,
  DefaultCustomizations,
  DarkCustomizations,
} from '@uifabric/theme-samples';

const themeSelectorLabel = 'Theme';

const themeOptions = [
  { label: 'None', customizations: undefined },
  { label: 'Default', customizations: DefaultCustomizations },
  { label: 'Dark', customizations: DarkCustomizations, isDark: true },
  { label: 'Word', customizations: WordCustomizations },
  { label: 'Teams', customizations: TeamsCustomizations },
  { label: 'Azure', customizations: AzureCustomizationsLight },
  { label: 'Azure Dark', customizations: AzureCustomizationsDark, isDark: true },
  { label: 'MDL2', customizations: MDL2Customizations },
];
const defaultThemeOption = themeOptions[0];

export const useCustomizationOptions = () => select(themeSelectorLabel, themeOptions, defaultThemeOption);
