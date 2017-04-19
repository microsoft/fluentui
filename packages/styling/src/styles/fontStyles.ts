import { defaultFontStyles, IFontStyles } from './defaultFontStyles';
import { getTheme } from '../utilities/theme';
import { CSSProperties } from 'glamor';

export { IFontStyles } from './defaultFontStyles';

export const fontStyles: IFontStyles = {};

for (const fontName in defaultFontStyles) {
  if (defaultFontStyles.hasOwnProperty(fontName)) {
    _defineFontGetter(fontStyles, fontName);
  }
}

/**
 * Defines a getter for the given class configuration.
 */
function _defineFontGetter(obj: IFontStyles, fontName: string): void {
  Object.defineProperty(obj, fontName, {
    get: (): string => getTheme().fonts[fontName],
    enumerable: true,
    configurable: true
  });
}

