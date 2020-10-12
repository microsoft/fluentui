import { createTheme, ICustomizations } from 'office-ui-fabric-react';
import { addVariants } from '@uifabric/variants';
import { Theme } from '@fluentui/theme';

export const WordTheme: Theme = createTheme({
  palette: {
    themePrimary: '#2b579a',
    themeSecondary: '#366ec2',
  },
  semanticColors: {
    buttonBackground: 'white',
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
