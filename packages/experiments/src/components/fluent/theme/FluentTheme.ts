import { createTheme, ITheme } from 'office-ui-fabric-react';
import { GrayColors } from '@uifabric/experiments/lib/components/fluent/theme/FluentColors';

const FluentTheme: ITheme = createTheme({
  palette: {
    black: GrayColors.black,
    neutralDark: GrayColors.GrayColors190,
    neutralPrimary: GrayColors.GrayColors160,
    neutralPrimaryAlt: GrayColors.GrayColors150,
    neutralSecondary: GrayColors.GrayColors130,
    neutralTertiary: GrayColors.GrayColors90,
    neutralTertiaryAlt: GrayColors.GrayColors60,
    neutralQuaternary: GrayColors.GrayColors50,
    neutralQuaternaryAlt: GrayColors.GrayColors40,
    neutralLight: GrayColors.GrayColors30,
    neutralLighter: GrayColors.GrayColors20,
    neutralLighterAlt: GrayColors.GrayColors10,
    white: GrayColors.white
  }
});

export default FluentTheme;
