import { expand } from 'inline-style-expand-shorthand';
import { HASH_PREFIX } from '../constants';
import { MakeStaticStyles, MakeStylesResolvedRule } from '../types';
import { hashString } from './utils/hashString';
import { compileStaticCSS } from './compileStaticCSS';

export function resolveStaticStyleRules(
  styles: MakeStaticStyles,
  result: Record<string, MakeStylesResolvedRule> = {},
): Record<string, MakeStylesResolvedRule> {
  if (typeof styles === 'string') {
    addResolvedStyles(styles, result);
  } else {
    const expandedStyles: MakeStaticStyles = expand(styles);

    Object.keys(expandedStyles).forEach(property => {
      const value = expandedStyles[property];
      const staticCSS = compileStaticCSS(property, value);
      addResolvedStyles(staticCSS, result);
    });
  }
  return result;
}

function addResolvedStyles(styles: string, result: Record<string, MakeStylesResolvedRule> = {}): void {
  const staticCSSKey = HASH_PREFIX + hashString(styles);
  result[staticCSSKey] = [undefined, styles /* no RTL support for static css */];
}
