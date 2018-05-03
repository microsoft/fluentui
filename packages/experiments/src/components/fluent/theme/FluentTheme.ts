import { createTheme, ITheme } from "office-ui-fabric-react";
import { FluentColors } from "@uifabric/experiments/lib/components/fluent/theme/FluentColors";

const FluentTheme: ITheme = createTheme({
  palette: {
    black: FluentColors.black,
    neutralDark: FluentColors.gray190,
    neutralPrimary: FluentColors.gray160,
    neutralPrimaryAlt: FluentColors.gray150,
    neutralSecondary: FluentColors.gray130,
    neutralTertiary: FluentColors.gray90,
    neutralTertiaryAlt: FluentColors.gray60,
    neutralQuaternary: FluentColors.gray50,
    neutralQuaternaryAlt: FluentColors.gray40,
    neutralLight: FluentColors.gray30,
    neutralLighter: FluentColors.gray20,
    neutralLighterAlt: FluentColors.gray10,
    white: FluentColors.white
  }
});

export default FluentTheme;
