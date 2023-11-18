import { IFontFace } from './IRawStyleBase';
import { getStyleOptions } from './StyleOptionsState';
import { Stylesheet } from './Stylesheet';
import { serializeRuleEntries } from './styleToClassName';

/**
 * Registers a font face.
 * @public
 */
export function fontFace(font: IFontFace): void {
  const stylesheet = Stylesheet.getInstance();

  const rule = serializeRuleEntries(getStyleOptions(), font as {});

  const className = stylesheet.classNameFromKey(rule);

  if (className) {
    return;
  }

  const name = stylesheet.getClassName();
  stylesheet.insertRule(`@font-face{${rule}}`, true);
  stylesheet.cacheClassName(name, rule, [], ['font-face', rule]);
}
