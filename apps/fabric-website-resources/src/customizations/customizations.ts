import { createTheme, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { ICustomizations } from 'office-ui-fabric-react/lib/Utilities';
import { IExampleCardCustomizations, IAppCustomizations } from '@uifabric/example-app-base';
import { getNeutralVariant, getSoftVariant, getStrongVariant } from '@uifabric/variants';

const defaultCustomizations: ICustomizations = {
  settings: {
    theme: createTheme({})
  },
  scopedSettings: {}
};

const wordCustomizations: ICustomizations = {
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

const teamsCustomizations: ICustomizations = {
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

const exampleCardCustomizations: IExampleCardCustomizations[] = [
  { title: 'Default', customizations: defaultCustomizations },
  { title: 'Word', customizations: wordCustomizations },
  { title: 'Teams', customizations: teamsCustomizations }
];

exampleCardCustomizations.forEach(theme => {
  _updateSchemes(theme.customizations.settings.theme);
});

export const AppCustomizations: IAppCustomizations = {
  exampleCardCustomizations
};

function _updateSchemes(theme: ITheme): void {
  theme.schemes = {
    strong: getStrongVariant(theme),
    soft: getSoftVariant(theme),
    neutral: getNeutralVariant(theme)
  };
}
