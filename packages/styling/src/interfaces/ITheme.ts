import { IPalette } from './IPalette';
import { IFontStyles } from './IFontStyles';
import { ISemanticColors } from './ISemanticColors';
import { IThemeSettings } from './IThemeSettings';

export interface ITheme {
  palette: IPalette;
  fonts: IFontStyles;
  semanticColors: ISemanticColors;
  settings: IThemeSettings;
}

export interface IPartialTheme {
  palette?: Partial<IPalette>;
  fonts?: Partial<IFontStyles>;
  semanticColors?: Partial<ISemanticColors>;
  settings?: Partial<IThemeSettings>;
}
