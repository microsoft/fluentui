import { createTheme, ITheme } from '@uifabric/styling';
import { NeutralColors, SharedColors } from './FluentColors';
import { Depths } from './FluentDepths';
import { FontSizes } from './FluentType';

export const FluentTheme: ITheme = createTheme({
  palette: {
    black: NeutralColors.black,
    neutralDark: NeutralColors.gray190,
    neutralPrimary: NeutralColors.gray160,
    neutralPrimaryAlt: NeutralColors.gray150,
    neutralSecondary: NeutralColors.gray130,
    neutralSecondaryAlt: NeutralColors.gray110,
    neutralTertiary: NeutralColors.gray90,
    neutralTertiaryAlt: NeutralColors.gray60,
    neutralQuaternary: NeutralColors.gray50,
    neutralQuaternaryAlt: NeutralColors.gray40,
    neutralLight: NeutralColors.gray30,
    neutralLighter: NeutralColors.gray20,
    neutralLighterAlt: NeutralColors.gray10,
    white: NeutralColors.white,
    // Shared Colors
    red: SharedColors.red10,
    redDark: SharedColors.red20
  },
  effects: {
    roundedCorner2: '2px',
    elevation4: Depths.depth4,
    elevation8: Depths.depth8,
    elevation16: Depths.depth16,
    elevation64: Depths.depth64
  },
  fonts: {
    tiny: { fontSize: FontSizes.size10 },
    xSmall: { fontSize: FontSizes.size12 },
    small: { fontSize: FontSizes.size14 },
    smallPlus: { fontSize: FontSizes.size16 },
    medium: { fontSize: FontSizes.size18 },
    mediumPlus: { fontSize: FontSizes.size20 },
    large: { fontSize: FontSizes.size24 },
    xLarge: { fontSize: FontSizes.size28 },
    xxLarge: { fontSize: FontSizes.size32 },
    superLarge: { fontSize: FontSizes.size42 },
    mega: { fontSize: FontSizes.size68 }
  }
});

export default FluentTheme;
