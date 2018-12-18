import { createTheme, ITheme } from 'office-ui-fabric-react';
import { NeutralColors, DarkColors, BaseColors } from './IbizaColors';
import { IExtendedTheme } from './IExtendedTheme';
import { IExtendedThemeColors } from './IExtendedThemeColors';

export class IbizaExtendedThemeDark implements IExtendedTheme {
  public readonly extendedColors: IExtendedThemeColors = {
    background: BaseColors.GRAY_252525,
    text: {
      heading: BaseColors.WHITE,
      body: BaseColors.WHITE,
      value: BaseColors.WHITE,
      icon: BaseColors.WHITE,
      label: BaseColors.GRAY_AFAFAF,
      disabledText: BaseColors.GRAY_808080_070,
      hyperlink: BaseColors.BLUE_4894FE,
      success: BaseColors.GREEN_70C400,
      error: BaseColors.RED_F7929A
    },
    primaryButton: {
      rest: {
        background: BaseColors.BLUE_4894FE,
        text: BaseColors.GRAY_252525 // verify color
      },
      hover: {
        background: BaseColors.BLUE_6CA9FE,
        text: BaseColors.GRAY_252525 // verify color
      },
      pressed: {
        background: BaseColors.BLUE_257FFE,
        text: BaseColors.GRAY_252525 // verify color
      }
    },
    disabledButton: {
      background: BaseColors.GRAY_808080_010,
      text: BaseColors.GRAY_252525 // get color
    },
    secondaryButton: {
      rest: {
        background: BaseColors.GRAY_252525,
        border: BaseColors.BLUE_4894FE
      },
      hover: {
        background: BaseColors.GRAY_252525,
        border: BaseColors.BLUE_6CA9FE
      },
      pressed: {
        background: BaseColors.GRAY_252525, // get color
        border: BaseColors.BLUE_257FFE
      }
    },
    controlOutlines: {
      rest: BaseColors.GRAY_808080,
      disabled: BaseColors.GRAY_808080_070,
      hover: BaseColors.WHITE,
      accent: BaseColors.BLUE_4894FE, // button in radio, check, et. al.
      error: BaseColors.RED_F7929A,
      dirty: BaseColors.PURPLE_DDABE9
    }
  };

  public readonly theme: ITheme;
  constructor() {
    this.theme = createTheme({
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
  }
}

const ibizaExtendedThemeDark = new IbizaExtendedThemeDark();
export default ibizaExtendedThemeDark;
