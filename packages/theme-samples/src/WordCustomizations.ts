import { createTheme, ICustomizations } from 'office-ui-fabric-react';
import { addVariants } from '@uifabric/variants';

export const WordCustomizations: ICustomizations = {
  settings: {
    theme: createTheme({
      palette: {
        themePrimary: '#2b579a',
        themeSecondary: '#366ec2'
      },
      semanticColors: {
        buttonBackground: 'white',
        buttonBackgroundHovered: 'rgb(240, 240, 240)',
        buttonBackgroundPressed: 'rgb(240, 240, 240)',
        buttonText: 'rgb(43, 87, 154)',
        buttonBorder: 'rgb(237, 235, 233)'
      },
      layers: {
        Button: {
          parent: 'base',
          borderWidth: 1,
          minHeight: 26,
          fontSize: 13.5,
          lineHeight: 13.5,
          fontWeight: 600,
          slots: {
            icon: {
              fontSize: 12
            },
            stack: {
              padding: '0px 6px'
            }
          }
        }
      }
    })
  },

  scopedSettings: {
    Button: {
      styleVariables: {
        baseVariant: {
          baseState: {
            borderWidth: 1,
            minHeight: 26,
            textSize: 13.5,
            lineHeight: 13.5,
            textWeight: 600,
            iconSize: 12,
            contentPadding: '0px 6px'
          }
        }
      }
    }
  }
};

addVariants(WordCustomizations.settings.theme);
