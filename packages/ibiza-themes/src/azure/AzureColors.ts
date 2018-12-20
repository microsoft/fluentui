import { IThemeSemanticColors } from './IThemeSemanticColors';

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
    disabled: BaseColors.GRAY_808080_010,
    section: BaseColors.GRAY_6B849C_006
  };
  export const textControlOutline = {
    rest: BaseColors.GRAY_808080_070,
    hover: BaseColors.GRAY_808080
  };
  export const controlOutline = {
    rest: BaseColors.GRAY_808080,
    disabled: BaseColors.GRAY_808080_070
  };
}

export const DarkSemanticColors: IThemeSemanticColors = {
  background: BaseColors.GRAY_252525,
  text: {
    heading: BaseColors.WHITE,
    body: BaseColors.WHITE,
    value: BaseColors.WHITE,
    icon: BaseColors.WHITE,
    label: BaseColors.GRAY_AFAFAF,
    disabled: BaseColors.GRAY_808080_070,
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

export const LightSemanticColors: IThemeSemanticColors = {
  background: BaseColors.WHITE,
  text: {
    heading: BaseColors.GRAY_161616,
    body: BaseColors.GRAY_161616,
    value: BaseColors.GRAY_161616,
    icon: BaseColors.GRAY_161616,
    label: BaseColors.GRAY_595959,
    disabled: BaseColors.GRAY_808080_070,
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
