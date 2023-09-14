import { DefaultTheme, DarkTheme } from '@fluentui/theme-samples';
import { IAppThemes, IExampleCardTheme } from '@fluentui/react-docsite-components';
const exampleCardTheme: IExampleCardTheme[] = [
  { title: 'Default', theme: DefaultTheme },
  { title: 'Dark', theme: DarkTheme },
];

export const AppThemes: IAppThemes = {
  exampleCardTheme,
  hideSchemes: true,
};
