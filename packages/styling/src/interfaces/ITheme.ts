import { IPalette } from './IPalette';
import { IFontStyles } from './IFontStyles';
import { ISemanticColors } from './ISemanticColors';

export interface IThemeFlags {
  noGlobalClassNames: boolean;
}

export interface ITheme {
  palette: IPalette;
  fonts: IFontStyles;
  semanticColors: ISemanticColors;
  isInverted: boolean;
  flags: IThemeFlags;
}

export interface IPartialTheme {
  palette?: Partial<IPalette>;
  fonts?: Partial<IFontStyles>;
  semanticColors?: Partial<ISemanticColors>;
  isInverted?: boolean;
  flags?: Partial<IThemeFlags>;
}
