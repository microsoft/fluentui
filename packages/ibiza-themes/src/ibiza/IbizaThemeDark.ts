import { createTheme, ITheme } from 'office-ui-fabric-react';
import { NeutralColors, DarkColors } from './IbizaColors';

export const IbizaThemeDark: ITheme = createTheme({
  palette: {
    themeDarker: DarkColors.themeTint30,
    themeDark: DarkColors.themeTint20,
    themeDarkAlt: DarkColors.themeTint10,
    themePrimary: DarkColors.themePrimary,
    themeSecondary: DarkColors.themeShade10,
    themeTertiary: DarkColors.themeShade20,
    themeLight: DarkColors.themeShade30,
    themeLighter: DarkColors.themeShade40,
    themeLighterAlt: DarkColors.themeShade50,

    neutralDark: NeutralColors.gray20,
    neutralPrimary: NeutralColors.white,
    neutralPrimaryAlt: NeutralColors.gray40,
    neutralSecondary: NeutralColors.gray50,
    neutralTertiary: NeutralColors.gray60,
    neutralTertiaryAlt: NeutralColors.gray70,
    neutralQuaternary: NeutralColors.gray80,
    neutralQuaternaryAlt: NeutralColors.gray90,
    neutralLight: NeutralColors.gray100,
    neutralLighter: NeutralColors.gray110,
    neutralLighterAlt: NeutralColors.gray120,

    black: NeutralColors.gray10,
    white: NeutralColors.black
  }
});

export default IbizaThemeDark;
