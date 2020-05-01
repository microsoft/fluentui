import { IFontFace } from './IRawStyleBase';
import { getStyleOptions } from './StyleOptionsState';
import { Stylesheet } from './Stylesheet';
import { serializeRuleEntries } from './styleToClassName';

/**
 * Registers a font face.
 * @public
 */
export function fontFace(font: IFontFace): void {
  Stylesheet.getInstance().insertRule(`@font-face{${serializeRuleEntries(getStyleOptions(), font as {})}}`, true);
}
