import { Stylesheet } from './Stylesheet';
import { IFontFace } from './IRawStyle';
import { serializeRuleEntries } from './styleToClassName';

/**
 * Registers a font face.
 * @public
 */
export function fontFace(font: IFontFace): void {
  Stylesheet.getInstance().insertRule(`@font-face{${serializeRuleEntries(font as {})}}`);
}
