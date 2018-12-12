import { createTheme, ITheme } from 'office-ui-fabric-react';
import { NeutralColors, LightColors } from './IbizaColors';
import { IExtendedTheme } from './IExtendedTheme';

export class IbizaExtendedThemeLight implements IExtendedTheme {
  public readonly semanticColors = {
    errorBorder: LightColors.errorBorder,
    errorText: LightColors.errorText
  };

  public readonly theme: ITheme;
  constructor() {
    this.theme = createTheme({
      palette: {
        themeDarker: LightColors.themeShade10,
        themeDark: LightColors.themeShade20,
        themeDarkAlt: LightColors.themeShade10,
        themePrimary: LightColors.themePrimary,
        themeSecondary: LightColors.themeTint10,
        themeTertiary: LightColors.themeTint20,
        themeLight: LightColors.themeTint30,
        themeLighter: LightColors.themeTint40,
        themeLighterAlt: LightColors.themeTint50,

        neutralDark: NeutralColors.gray110,
        neutralPrimary: NeutralColors.black,
        neutralPrimaryAlt: NeutralColors.gray90,
        neutralSecondary: NeutralColors.gray80,
        neutralTertiary: NeutralColors.gray70,
        neutralTertiaryAlt: NeutralColors.gray60,
        neutralQuaternary: NeutralColors.gray50,
        neutralQuaternaryAlt: NeutralColors.gray40,
        neutralLight: NeutralColors.gray30,
        neutralLighterAlt: NeutralColors.gray10,

        black: NeutralColors.gray120,
        white: NeutralColors.white
      }
    });
  }
}

const ibizaExtendedThemeLight = new IbizaExtendedThemeLight();
export default ibizaExtendedThemeLight;
