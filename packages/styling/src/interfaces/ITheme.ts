import { IPalette } from './IPalette';
import { IFontStyles } from './IFontStyles';
import { ISemanticColors } from './ISemanticColors';

export interface ITheme {
  palette: IPalette;
  fonts: IFontStyles;
  semanticColors: ISemanticColors;
}
export interface IPartialTheme {
  palette?: Partial<IPalette>;
  fonts?: Partial<IFontStyles>;
  semanticColors?: Partial<ISemanticColors>;
}