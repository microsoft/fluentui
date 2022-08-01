import { IExampleCardTheme, IAppThemes } from '@fluentui/react-docsite-components';
import { AzureThemeLight, AzureThemeDark } from '@fluentui/azure-themes';
import { DefaultTheme, TeamsTheme, WordTheme } from '@fluentui/theme-samples';

const exampleCardTheme: IExampleCardTheme[] = [
  { title: 'Default', theme: DefaultTheme },
  { title: 'Azure Light', theme: AzureThemeLight },
  { title: 'Azure Dark', theme: AzureThemeDark },
  { title: 'Word', theme: WordTheme },
  { title: 'Teams', theme: TeamsTheme },
];

export const AppThemes: IAppThemes = {
  exampleCardTheme,
  hideSchemes: true,
};
