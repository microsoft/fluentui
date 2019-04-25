import { ITheme } from 'office-ui-fabric-react/lib/Styling';

export interface IColorPaletteProps {
  colors: IColor[];
  isCondensed?: boolean;
  onColorSelected?: (color: IColor) => void;
  /** Theme provided by higher-order component. */
  theme?: ITheme;
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
