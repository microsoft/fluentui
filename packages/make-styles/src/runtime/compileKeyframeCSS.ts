import { MakeStyles } from '../types';
import { compile, middleware, serialize, rulesheet, stringify, prefixer } from 'stylis';
import { cssifyObject } from './utils/cssifyObject';

export function compileKeyframeRule(keyframeObject: MakeStyles): string {
  let css: string = '';

  // eslint-disable-next-line guard-for-in
  for (const percentage in keyframeObject) {
    css += `${percentage}{${cssifyObject(keyframeObject[percentage])}}`;
  }

  return css;
}

/**
 * Creates CSS rules for insertion from passed CSS.
 */
export function compileKeyframesCSS(keyframeName: string, keyframeCSS: string): string[] {
  const cssRule = `@keyframes ${keyframeName} {${keyframeCSS}}`;
  const rules: string[] = [];

  serialize(
    compile(cssRule),
    middleware([
      prefixer,
      stringify,

      // 💡 we are using `.insertRule()` API for DOM operations, which does not support
      // insertion of multiple CSS rules in a single call. `rulesheet` plugin extracts
      // individual rules to be used with this API
      rulesheet(rule => rules.push(rule)),
    ]),
  );

  return rules;
}
