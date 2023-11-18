import { DefaultTheme, DarkTheme } from '@fluentui/theme-samples';
import { Fluent2WebLightTheme, Fluent2WebDarkTheme } from '@fluentui/fluent2-theme';
import { IAppThemes, IExampleCardTheme } from '@fluentui/react-docsite-components';

const exampleCardTheme: IExampleCardTheme[] = [
  { title: 'Default', theme: DefaultTheme },
  { title: 'Dark', theme: DarkTheme },
  { title: 'Fluent 2 Web Light', theme: Fluent2WebLightTheme },
  { title: 'Fluent 2 Web Dark', theme: Fluent2WebDarkTheme },
];

export const AppThemes: IAppThemes = {
  exampleCardTheme,
  hideSchemes: true,
};
