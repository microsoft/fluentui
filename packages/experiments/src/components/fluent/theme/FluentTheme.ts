import { createTheme, ITheme } from 'office-ui-fabric-react';
import { GrayColors } from './FluentColors';

const FluentTheme: ITheme = createTheme({
  palette: {
    black: GrayColors.black,
    neutralDark: GrayColors.gray190,
    neutralPrimary: GrayColors.gray160,
    neutralPrimaryAlt: GrayColors.gray150,
    neutralSecondary: GrayColors.gray130,
    neutralTertiary: GrayColors.gray90,
    neutralTertiaryAlt: GrayColors.gray60,
    neutralQuaternary: GrayColors.gray50,
    neutralQuaternaryAlt: GrayColors.gray40,
    neutralLight: GrayColors.gray30,
    neutralLighter: GrayColors.gray20,
    neutralLighterAlt: GrayColors.gray10,
    white: GrayColors.white
  }
});

export default FluentTheme;
