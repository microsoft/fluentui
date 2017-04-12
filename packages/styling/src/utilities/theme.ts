export interface IColorPalette {
  backgroundColor: string;
  themePrimaryColor: string;
  themeAccentColor: string;
}

export interface IFont {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  fontStyle?: string;
}

export interface IFontPallete {
  tiny: IFont;
  xsmall: IFont;
  small: IFont;
  smallPlus: IFont;
  medium: IFont;
  mediumPlus: IFont;
  large: IFont;
  xLarge: IFont;
  xxLarge: IFont;
  superLarge: IFont;
}
/*

export interface ITheme {

}

export function setTheme(theme: ITheme): void {

}

export function generateColorSteps(fromColor: string, toColor: string, stepsInBetween: number) {


}

export function createTheme(colors: IColorPalette, fonts: IFontPallete): ITheme {
  return {
    themePrimary: colors.themePrimaryColor,
    themeSecondary: colors.themeSecondary || lighter(colors.themePrimaryColor, 10),
    themeTertiary
  };
}

export function lighter(color: string) {

}*/
