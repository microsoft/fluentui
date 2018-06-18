import { createTheme, ITheme } from 'office-ui-fabric-react';
import { NeutralColors } from './FluentColors';

const FluentTheme: ITheme = createTheme({
  palette: {
    black: NeutralColors.black,
    neutralDark: NeutralColors.gray190,
    neutralPrimary: NeutralColors.gray160,
    neutralPrimaryAlt: NeutralColors.gray150,
    neutralSecondary: NeutralColors.gray130,
    neutralTertiary: NeutralColors.gray90,
    neutralTertiaryAlt: NeutralColors.gray60,
    neutralQuaternary: NeutralColors.gray50,
    neutralQuaternaryAlt: NeutralColors.gray40,
    neutralLight: NeutralColors.gray30,
    neutralLighter: NeutralColors.gray20,
    neutralLighterAlt: NeutralColors.gray10,
    white: NeutralColors.white
  }
});

export default FluentTheme;
