import { IColor } from '../../utilities/Color/IColor.ts';

export interface IFabricTheme {
  primaryPalette: IColor;
  secondaryPalette: IColor;
  neutralPalette: IColor;

  primaryLightest: IColor;
  primaryLighter: IColor;
  primaryMedium: IColor;
  primaryDarker: IColor;
  primaryDarkest: IColor;

  secondaryLightest: IColor;
  secondaryLighter: IColor;
  secondaryMedium: IColor;
  secondaryDarker: IColor;
  secondaryDarkest: IColor;

  neutralLightest: IColor;
  neutralLighter: IColor;
  neutralMedium: IColor;
  neutralDarker: IColor;
  neutralDarkest: IColor;

  /* semantic slots go here */
}