import { createTheme } from '@fluentui/react';
import { addVariants } from '@fluentui/scheme-utilities';
import type { ICustomizations, Theme } from '@fluentui/react';

export const WordTheme: Theme = createTheme({
  palette: {
    themePrimary: '#2b579a',
    themeSecondary: '#366ec2',
  },
  semanticColors: {
    buttonBackground: '#FFF',
    buttonBackgroundHovered: 'rgb(240, 240, 240)',
    buttonBackgroundPressed: 'rgb(240, 240, 240)',
    buttonText: 'rgb(43, 87, 154)',
    buttonBorder: 'rgb(237, 235, 233)',
  },
});

addVariants(WordTheme);

export const WordCustomizations: ICustomizations = {
  settings: {
    theme: WordTheme,
  },

  scopedSettings: {},
};
