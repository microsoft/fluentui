import hashString from '@emotion/hash';

import { MakeStaticStyles, MakeStylesResolvedRule } from '../types';
import { compileStaticCSS } from './compileStaticCSS';
import { compileCSSRules } from './compileCSS';

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
  const staticCSSKey = hashString(styles);

  result[staticCSSKey] = [
    '', // static rules support be inserted into default bucket
    undefined,
    styles, // static rules do not support RTL transforms
  ];
}
