/* tslint:disable:no-any */
export namespace BaseColors {
  export const GREEN_5DB300 = '#5db300';
  export const GREEN_386300 = '#386300';
  export const GREEN_70C400 = '#70c400';
  export const GREEN_33CCCC = '#33cccc';
  export const RED_E81123 = '#e81123';
  export const RED_B40E1B = '#b40e1b';
  export const RED_F7929A = '#f7929a';
  export const RED_990066 = '#990066';
  export const PURPLE_6917AA = '#6917aa';
  export const PURPLE_68217A = '#68217a';
  export const PURPLE_DDABE9 = '#ddabe9';
  export const BLUE_015CDA = '#015cda';
  export const BLUE_014DB7 = '#014db7';
  export const BLUE_016AFE = '#016afe';
  export const BLUE_4894FE = '#4894fe';
  export const BLUE_257FFE = '#257ffe';
  export const BLUE_6CA9FE = '6ca9fe';
  export const BLUE_55B3FF = '55b3ff';
  export const BLUE_00BCF2 = '#00BCF2';
  export const GRAY_6B849C = '#6b849c';
  export const GRAY_161616 = '#161616';
  export const GRAY_252525 = '#252525';
  export const GRAY_595959 = '#595959';
  export const GRAY_808080 = '#808080';
  export const GRAY_AFAFAF = '#afafaf';
  export const ORANGE_FF8C00 = '#ff8c00';
  export const BLACK = '#000000';
  export const WHITE = '#ffffff';

  export const GREEN_5DB300_018 = 'rgba(93, 179, 0, .18)';
  export const RED_E81123_018 = 'rgba(232, 17, 35, .18)';
  export const PURPLE_6917AA_018 = 'rgba(105, 23, 170, .18)';
  export const BLUE_015CDA_018 = 'rgba(1, 92, 218, .18)';
  export const ORANGE_FF8C00_018 = 'rgba(255, 140, 0.18)';
  export const GRAY_6B849C_025 = 'rgba(107, 132, 156, .25)';
  export const GRAY_6B849C_035 = 'rgba(107, 132, 156, .35)';
  export const GRAY_6B849C_006 = 'rgba(107, 132, 156, .06)';
  export const GRAY_808080_070 = 'rgba(128, 128, 128, .70)';
  export const GRAY_808080_010 = 'rgba(128, 128, 128, .10)';
  export const BLUE_55B3FF_020 = 'rgba(85, 179, 255, .20)';
  export const BLUE_55B3FF_010 = 'rgba(85, 179, 255, .10)';
}

export namespace CommonSemanticColors {
  export const statusBar = {
    okay: BaseColors.GREEN_5DB300_018,
    error: BaseColors.RED_E81123_018,
    warning: BaseColors.ORANGE_FF8C00_018,
    information: BaseColors.BLUE_015CDA_018,
    upsell: BaseColors.PURPLE_6917AA_018
  };
  export const icons = {
    okay: BaseColors.GREEN_5DB300,
    error: BaseColors.RED_E81123,
    warning: BaseColors.ORANGE_FF8C00_018,
    information: BaseColors.BLUE_015CDA,
    upsell: BaseColors.PURPLE_6917AA
  };
  export const dividers = {
    lineSeparator: BaseColors.GRAY_6B849C_025,
    sectionDivider: BaseColors.GRAY_6B849C_035
  };
  export const backgrounds = {
    section: BaseColors.GRAY_6B849C_006
  };
  export const textControlOutline = {
    rest: BaseColors.GRAY_808080_070,
    disabled: BaseColors.GRAY_808080_070,
    hover: BaseColors.GRAY_808080
  };
  export const controlOutline = {
    rest: BaseColors.GRAY_808080,
    disabled: BaseColors.GRAY_808080_070
  };
}

export namespace LightColors {
  export const themeShade30 = '#003379';
  export const themeShade20 = '#0045a5';
  export const themeShade10 = '#0051c3';
  export const themePrimary = '#015cda';
  export const themeTint10 = '#1b6cdd';
  export const themeTint20 = '#5d97e8';
  export const themeTint30 = '#aac9f4';
  export const themeTint40 = '#d1e2f9';
  export const themeTint50 = '#f3f8fd';
}

export namespace DarkColors {
  export const themeShade50 = '#03060a';
  export const themeShade40 = '#0b1829';
  export const themeShade30 = '#152c4d';
  export const themeShade20 = '#2b5999';
  export const themeShade10 = '#3f82e0';
  export const themePrimary = '#4894fe';
  export const themeTint10 = '#5a9fff';
  export const themeTint20 = '#73aeff';
  export const themeTint30 = '98c3ff';
}

export namespace NeutralColors {
  export const black = '#000000';
  export const gray10 = '#f8f8f8';
  export const gray20 = '#f4f4f4';
  export const gray30 = '#eaeaea';
  export const gray40 = '#dadada';
  export const gray50 = '#d0d0d0';
  export const gray60 = '#c8c8c8';
  export const gray70 = '#595959';
  export const gray80 = '#373737';
  export const gray90 = '#2f2f2f';
  export const gray100 = '#252525';
  export const gray110 = '#151515';
  export const gray120 = '#0b0b0b';
  export const white = '#ffffff';
}
