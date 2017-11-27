import { IPalette } from './IPalette';
import { IFontStyles } from './IFontStyles';
import { ISemanticColors } from './ISemanticColors';

/**
 * The theme object.
 *
 * @public
 */
export interface ITheme {
  palette: IPalette;
  fonts: IFontStyles;
  semanticColors: ISemanticColors;
  isInverted: boolean;
}

/**
 * Partial theme.
 *
 * @public
 */
export type IPartialTheme = Partial<ITheme>;
