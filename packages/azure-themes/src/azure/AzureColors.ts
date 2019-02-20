import { IAzureSemanticColors } from './IAzureSemanticColors';

/* tslint:disable:no-any */
export namespace BaseColors {
  export const BLUE_CCE1FF = '#cce1ff';
  export const BLUE_016AFE = '#016afe';
  export const BLUE_015CDA = '#015cda';
  export const BLUE_014DB7 = '#014db7';
  export const BLUE_012B65 = '#012b65';
  export const BLUE_6CA9FE = '#6ca9fe';
  export const BLUE_4894FE = '#4894fe';
  export const BLUE_257FFE = '#257FFE';
  export const BLUE_55B3FF = '#55b3ff';
  export const GREEN_E6FFCC = '#e6ffcc';
  export const GREEN_5DB300 = '#5db300';
  export const GREEN_428000 = '#428000';
  export const GREEN_1A3300 = '#1a3300';
  export const RED_FDD8DB = '#fdd8db';
  export const RED_F63747 = '#f63747';
  export const RED_E00B1C = '#e00b1c';
  export const RED_61050C = '#61050c';
  export const ORANGE_FFDFB8 = '#ffdfb8';
  export const ORANGE_FF8C00 = '#ff8c00';
  export const ORANGE_422400 = '#422400';
  export const PURPLE_EFDBF5 = '#efdbf5';
  export const PURPLE_C87FDC = '#c87fdc';
  export const PURPLE_8A2DA5 = '#8a2da5';
  export const PURPLE_471754 = '#471754';
  export const GRAY_111111 = '#111111';
  export const GRAY_161616 = '#161616';
  export const GRAY_595959 = '#595959';
  export const GRAY_747474 = '#747474';
  export const GRAY_808080 = '#808080';
  export const GRAY_AFAFAF = '#afafaf';
  export const GRAY_6B849C = '#6B849C';
  export const BLACK = '#000000';
  export const WHITE = '#ffffff';

  export const GRAY_000000_060 = 'rgba(0, 0, 0, .6)';
  export const GRAY_6B849C_006 = 'rgba(107, 132, 156, .06)';
  export const GRAY_6B849C_025 = 'rgba(107, 132, 156, .25)';
  export const GRAY_6B849C_035 = 'rgba(107, 132, 156, .35)';

  export const GRAY_808080_010 = 'rgba(128, 128, 128, .10)';
  export const GRAY_808080_015 = 'rgba(128, 128, 128, .15)';
  export const GRAY_808080_025 = 'rgba(128, 128, 128, .25)';
  export const GRAY_808080_070 = 'rgba(128, 128, 128, .70)';
  export const BLUE_55B3FF_010 = 'rgba(85, 179, 255, .10)';
  export const BLUE_55B3FF_020 = 'rgba(85, 179, 255, .20)';

  // Extended Palette Colors (not in Azure spec)
  export const GRAY_FFFFFF_050 = 'rgba(255,255,255,.5)'; // overlay light
  export const GRAY_000000_050 = 'rgba(0,0,0,.5)'; // overlay dark
  export const GRAY_404040 = '#404040'; // shimmer
  export const GRAY_F7F7F7 = '#f7f7f7'; // shimmer
  export const GRAY_DFDFDF = '#dfdfdf'; // shimmer
}

export namespace CommonSemanticColors {
  export const icons = {
    okay: BaseColors.GREEN_5DB300,
    error: BaseColors.RED_E00B1C,
    warning: BaseColors.ORANGE_FF8C00,
    information: BaseColors.BLUE_015CDA,
    upsell: BaseColors.PURPLE_8A2DA5
  };
  export const dividers = {
    lineSeparator: BaseColors.GRAY_6B849C_025,
    sectionDivider: BaseColors.GRAY_6B849C_035
  };
  export const backgrounds = {
    disabled: BaseColors.GRAY_808080_010,
    section: BaseColors.GRAY_6B849C_006,
    overlay: BaseColors.GRAY_000000_060
  };
  export const textControlOutline = {
    rest: BaseColors.GRAY_808080_070,
    hover: BaseColors.GRAY_808080
  };
  export const controlOutline = {
    rest: BaseColors.GRAY_808080,
    disabled: BaseColors.GRAY_808080_070
  };
  export const overlay = {
    light: BaseColors.GRAY_FFFFFF_050,
    dark: BaseColors.GRAY_000000_050
  };
}

export const DarkSemanticColors: IAzureSemanticColors = {
  background: BaseColors.GRAY_111111,
  text: {
    heading: BaseColors.WHITE,
    body: BaseColors.WHITE,
    value: BaseColors.WHITE,
    icon: BaseColors.WHITE,
    label: BaseColors.GRAY_808080,
    disabled: BaseColors.GRAY_808080_070,
    hyperlink: BaseColors.BLUE_4894FE,
    success: BaseColors.GREEN_5DB300,
    error: BaseColors.RED_F63747,
    placeholder: BaseColors.GRAY_AFAFAF
  },
  statusBar: {
    okay: BaseColors.GREEN_1A3300,
    error: BaseColors.RED_61050C,
    warning: BaseColors.ORANGE_422400,
    information: BaseColors.BLUE_012B65,
    upsell: BaseColors.PURPLE_8A2DA5
  },
  primaryButton: {
    rest: {
      background: BaseColors.BLUE_4894FE,
      text: BaseColors.GRAY_111111 // verify color
    },
    hover: {
      background: BaseColors.BLUE_6CA9FE,
      text: BaseColors.GRAY_111111 // verify color
    },
    pressed: {
      background: BaseColors.BLUE_257FFE,
      text: BaseColors.GRAY_111111 // verify color
    }
  },
  disabledButton: {
    background: BaseColors.GRAY_808080_010,
    text: BaseColors.GRAY_808080_070 // get color
  },
  secondaryButton: {
    rest: {
      background: BaseColors.GRAY_111111,
      border: BaseColors.BLUE_4894FE
    },
    hover: {
      background: BaseColors.GRAY_111111,
      border: BaseColors.BLUE_6CA9FE
    },
    pressed: {
      background: BaseColors.GRAY_111111, // get color
      border: BaseColors.BLUE_257FFE
    }
  },
  controlOutlines: {
    rest: BaseColors.GRAY_808080,
    disabled: BaseColors.GRAY_808080_070,
    hover: BaseColors.WHITE,
    accent: BaseColors.BLUE_4894FE, // button in radio, check, et. al.
    error: BaseColors.RED_F63747,
    dirty: BaseColors.PURPLE_C87FDC
  },
  item: {
    hover: BaseColors.GRAY_808080_015,
    select: BaseColors.GRAY_808080_025
  },
  shimmer: {
    primary: BaseColors.GRAY_808080,
    secondary: BaseColors.GRAY_404040
  }
};

export const LightSemanticColors: IAzureSemanticColors = {
  background: BaseColors.WHITE,
  text: {
    heading: BaseColors.GRAY_161616,
    body: BaseColors.GRAY_161616,
    value: BaseColors.GRAY_161616,
    icon: BaseColors.GRAY_161616,
    label: BaseColors.GRAY_747474,
    disabled: BaseColors.GRAY_808080_070,
    hyperlink: BaseColors.BLUE_015CDA,
    success: BaseColors.GREEN_428000,
    error: BaseColors.RED_E00B1C,
    placeholder: BaseColors.GRAY_808080
  },
  statusBar: {
    okay: BaseColors.GREEN_E6FFCC,
    error: BaseColors.RED_FDD8DB,
    warning: BaseColors.ORANGE_FFDFB8,
    information: BaseColors.BLUE_CCE1FF,
    upsell: BaseColors.PURPLE_EFDBF5
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
    text: BaseColors.GRAY_808080_070 // get color
  },
  secondaryButton: {
    rest: {
      background: BaseColors.WHITE,
      border: BaseColors.BLUE_015CDA
    },
    hover: {
      background: BaseColors.GRAY_808080_010, // get color
      border: BaseColors.BLUE_016AFE
    },
    pressed: {
      background: BaseColors.GRAY_808080_010, // get color
      border: BaseColors.BLUE_014DB7
    }
  },
  controlOutlines: {
    rest: BaseColors.GRAY_808080,
    disabled: BaseColors.GRAY_808080_070,
    hover: BaseColors.GRAY_161616,
    accent: BaseColors.BLUE_015CDA,
    error: BaseColors.RED_E00B1C,
    dirty: BaseColors.PURPLE_8A2DA5
  },
  item: {
    hover: BaseColors.BLUE_55B3FF_010,
    select: BaseColors.BLUE_55B3FF_020
  },
  shimmer: {
    primary: BaseColors.GRAY_F7F7F7,
    secondary: BaseColors.GRAY_DFDFDF
  }
};
