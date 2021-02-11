import { HASH_PREFIX } from '../constants';
import { MakeStaticStyles, MakeStylesResolvedRule } from '../types';
import { hashString } from './utils/hashString';
import { compileCSSRules, compileStaticCSS } from './compileStaticCSS';

export function resolveStaticStyleRules(
  styles: MakeStaticStyles,
  result: Record<string, MakeStylesResolvedRule> = {},
): Record<string, MakeStylesResolvedRule> {
  if (typeof styles === 'string') {
    const cssRules = compileCSSRules(styles);
    for (const rule of cssRules) {
      addResolvedStyles(rule, result);
    }
  } else {
    // eslint-disable-next-line guard-for-in
    for (const property in styles) {
      const value = styles[property];
      const staticCSS = compileStaticCSS(property, value);
      addResolvedStyles(staticCSS, result);
    }
  }
  return result;
}

function addResolvedStyles(styles: string, result: Record<string, MakeStylesResolvedRule> = {}): void {
  const staticCSSKey = HASH_PREFIX + hashString(styles);
  result[staticCSSKey] = [undefined, styles /* static rules do not support RTL transforms */];
}
