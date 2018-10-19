import { createTheme, ICustomizations } from 'office-ui-fabric-react';
import { addVariants } from '@uifabric/variants';

export const TeamsCustomizations: ICustomizations = {
  settings: {
    theme: createTheme({
      palette: {
        themePrimary: '#6061aa',
        themeLighterAlt: '#f7f7fc',
        themeLighter: '#e1e1f2',
        themeLight: '#c7c8e6',
        themeTertiary: '#9797cd',
        themeSecondary: '#6f70b5',
        themeDarkAlt: '#56579a',
        themeDark: '#494a82',
        themeDarker: '#363660',
        neutralLighterAlt: '#f8f8f8',
        neutralLighter: '#f4f4f4',
        neutralLight: '#eaeaea',
        neutralQuaternaryAlt: '#dadada',
        neutralQuaternary: '#d0d0d0',
        neutralTertiaryAlt: '#c8c8c8',
        neutralTertiary: '#b6b0b0',
        neutralSecondary: '#9f9797',
        neutralPrimaryAlt: '#877f7f',
        neutralPrimary: '#282424',
        neutralDark: '#585151',
        black: '#403b3b',
        white: '#fff'
      },
      semanticColors: {
        buttonBackground: 'transparent',
        buttonBackgroundHovered: '#bdbdbd',
        buttonBackgroundPressed: '#a7a7a7',

        buttonText: '#252424',
        buttonTextPressed: '#252424',
        buttonTextHovered: '#252424',

        buttonBorder: '#bdbdbd',

        primaryBorder: 'transparent'
      }
    })
  },

  scopedSettings: {
    Button: {
      styleVariables: {
        baseVariant: {
          baseState: {
            borderRadius: 3,
            borderWidth: 2,
            iconSize: 16,
            iconWeight: 700,
            textWeight: 400,
            contentPadding: '4px 32px'
          },
          enabled: {
            iconColor: '#252424',
            borderColorHovered: 'transparent',
            borderColorPressed: 'transparent'
          },
          expanded: {
            borderColor: 'transparent'
          }
        },
        circular: {
          baseState: {
            borderWidth: 1
          },
          enabled: {
            backgroundColorHovered: '#464775',
            backgroundColorPressed: '#464775',

            textColorHovered: '#fff',
            textColorPressed: '#fff',

            iconColorHovered: '#fff',
            iconColorPressed: '#fff'
          }
        },
        primary: {
          enabled: {
            iconColor: 'white'
          }
        }
      }
    }
  }
};

addVariants(TeamsCustomizations.settings.theme);
