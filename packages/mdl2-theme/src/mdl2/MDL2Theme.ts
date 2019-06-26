import { createTheme, ITheme, FontWeights } from '@uifabric/styling';
import { FontSizes } from './MDL2Type';

export const MDL2Theme: ITheme = createTheme({
  palette: {
    neutralDark: '#212121',
    neutralPrimary: '#333333',
    neutralPrimaryAlt: '#3c3c3c',
    neutralSecondary: '#666666',
    neutralSecondaryAlt: '#767676',
    neutralTertiary: '#a6a6a6',
    neutralTertiaryAlt: '#c8c8c8',
    neutralQuaternary: '#d0d0d0',
    neutralQuaternaryAlt: '#dadada',
    neutralLight: '#eaeaea',
    neutralLighter: '#f4f4f4',
    neutralLighterAlt: '#f8f8f8',
    // Shared Colors
    red: '#e81123',
    redDark: '#a80000'
  },
  semanticColors: {
    buttonBorder: 'transparent',
    buttonBorderDisabled: 'transparent'
  },
  effects: {
    roundedCorner2: '0px',
    elevation4: '0 0 5px 0 rgba(0,0,0,.4)',
    elevation8: '0 0 5px 0 rgba(0,0,0,.4)',
    elevation16: '0 0 5px 0 rgba(0,0,0,.4)',
    elevation64: '0 0 5px 0 rgba(0,0,0,.4)'
  },
  fonts: {
    tiny: {
      fontSize: FontSizes.mini,
      fontWeight: FontWeights.semibold
    },
    xSmall: {
      fontSize: FontSizes.xSmall
    },
    small: {
      fontSize: FontSizes.small
    },
    smallPlus: {
      fontSize: FontSizes.smallPlus
    },
    medium: {
      fontSize: FontSizes.medium
    },
    mediumPlus: {
      fontSize: FontSizes.mediumPlus
    },
    large: {
      fontSize: FontSizes.large,
      fontWeight: FontWeights.semilight
    },
    xLarge: {
      fontSize: FontSizes.xLarge,
      fontWeight: FontWeights.light
    },
    xLargePlus: {
      fontSize: FontSizes.xLargePlus,
      fontWeight: FontWeights.light
    },
    xxLarge: {
      fontSize: FontSizes.xxLarge,
      fontWeight: FontWeights.light
    },
    xxLargePlus: {
      fontSize: FontSizes.xxLargePlus,
      fontWeight: FontWeights.light
    },
    superLarge: {
      fontSize: FontSizes.superLarge,
      fontWeight: FontWeights.light
    },
    mega: {
      fontSize: FontSizes.mega,
      fontWeight: FontWeights.light
    }
  }
});

export default MDL2Theme;
