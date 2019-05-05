import { ITheme, IStyleFunctionOrObject, IStyle } from 'office-ui-fabric-react';

export interface IColorPaletteProps {
  colors: IColor[];
  isCondensed?: boolean;
  onColorSelected?: (color: IColor) => void;
  styles?: IStyleFunctionOrObject<IColorPaletteStyleProps, IColorPaletteStyles>;
  theme?: ITheme;
}

export type IColorPaletteStyleProps = Pick<IColorPaletteProps, 'theme' | 'isCondensed'>;

export interface IColorPaletteStyles {
  root: IStyle;
  grid: IStyle;
  swatch: IStyle;
  swatchSelected: IStyle;
  swatchContent: IStyle;
  swatchContentSelected: IStyle;
  swatchIcon: IStyle;
  swatchName: IStyle;
  detail: IStyle;
  detailContentWrapper: IStyle;
  detailName: IStyle;
  detailValues: IStyle;
  detailHex: IStyle;
  detailCode: IStyle;
  detailCodeInfoIcon: IStyle;
}

export interface IColor {
  name?: string;
  hex: string;
  code?: IColorCode;
  icon?: string;
  key?: string;
}

export interface IColorCode {
  core: string;
  react: string;
}

export interface IColorPaletteTheme {
  key?: string;
  name?: string;
  background?: string;
  colors: IColor[];
}
