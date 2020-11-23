import { ITheme, IStyleFunctionOrObject, IStyle } from '@fluentui/react';

export interface IColorPaletteProps {
  colors: IColorSwatch[];
  isCondensed?: boolean;
  onColorSelected?: (color: IColorSwatch) => void;
  styles?: IStyleFunctionOrObject<IColorPaletteStyleProps, IColorPaletteStyles>;
  theme?: ITheme;
  className?: string;
}

export type IColorPaletteStyleProps = Pick<IColorPaletteProps, 'theme' | 'isCondensed' | 'className'>;

export interface IColorPaletteStyles {
  root: IStyle;
  grid: IStyle;
  swatch: IStyle;
  swatchTooltip: IStyle;
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

export interface IColorSwatch {
  name?: string;
  hex: string;
  code?: IColorSwatchCode;
  icon?: string;
  key?: string;
}

export interface IColorSwatchCode {
  core: string;
  react?: string;
  themeSlot?: string;
}

export interface IColorPaletteTheme {
  key?: string;
  name?: string;
  background?: string;
  colors: IColorSwatch[];
}
