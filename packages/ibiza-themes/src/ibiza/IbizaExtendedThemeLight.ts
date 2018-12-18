import { createTheme, ITheme } from 'office-ui-fabric-react';
import { NeutralColors, LightColors, BaseColors } from './IbizaColors';
import { IExtendedTheme } from './IExtendedTheme';
import { IExtendedThemeColors } from './IExtendedThemeColors';

export class IbizaExtendedThemeLight implements IExtendedTheme {
  public readonly extendedColors: IExtendedThemeColors = {
    background: BaseColors.GRAY_252525,
    text: {
      heading: BaseColors.GRAY_161616,
      body: BaseColors.GRAY_161616,
      value: BaseColors.GRAY_161616,
      icon: BaseColors.GRAY_161616,
      label: BaseColors.GRAY_595959,
      disabledText: BaseColors.GRAY_808080_070,
      hyperlink: BaseColors.BLUE_015CDA,
      success: BaseColors.GREEN_386300,
      error: BaseColors.RED_B40E1B
    },
    primaryButton: {
      rest: {
        background: BaseColors.BLUE_015CDA,
        text: BaseColors.WHITE // verify color
      },
      hover: {
        background: BaseColors.BLUE_016AFE,
        text: BaseColors.WHITE // verify color
      },
      pressed: {
        background: BaseColors.BLUE_014DB7,
        text: BaseColors.WHITE // verify color
      }
    },
    disabledButton: {
      background: BaseColors.GRAY_808080_010,
      text: BaseColors.GRAY_252525 // get color
    },
    secondaryButton: {
      rest: {
        background: BaseColors.WHITE,
        border: BaseColors.BLUE_015CDA
      },
      hover: {
        background: BaseColors.GRAY_252525, // get color
        border: BaseColors.BLUE_016AFE
      },
      pressed: {
        background: BaseColors.GRAY_252525, // get color
        border: BaseColors.BLUE_014DB7
      }
    },
    controlOutlines: {
      rest: BaseColors.GRAY_808080,
      disabled: BaseColors.GRAY_808080_070,
      hover: BaseColors.GRAY_161616,
      accent: BaseColors.BLUE_015CDA, // button in radio, check, et. al.
      error: BaseColors.RED_B40E1B,
      dirty: BaseColors.PURPLE_DDABE9
    }
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
