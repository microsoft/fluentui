import { IExampleCardTheme, IAppThemes } from '@fluentui/react-docsite-components';
import { AzureThemeLight, AzureThemeDark } from '@fluentui/azure-themes';
import { DefaultTheme } from '@fluentui/theme-samples';

const exampleCardTheme: IExampleCardTheme[] = [
  { title: 'Default', theme: DefaultTheme },
  { title: 'Azure', theme: AzureThemeLight },
  { title: 'Azure Dark', theme: AzureThemeDark },
];

export const AppThemes: IAppThemes = {
  exampleCardTheme,
  hideSchemes: true,
};
