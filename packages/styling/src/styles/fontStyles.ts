import { defaultFontStyles, IFontStyles } from './defaultFontStyles';
import { getTheme } from '../utilities/theme';

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
    // tslint:disable-next-line:no-any
    get: (): string => (<any>getTheme().fonts)[fontName],
    enumerable: true,
    configurable: true
  });
}
