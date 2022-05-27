// @ts-ignore
import { generateCSSRule, generateCSSSupportRule } from 'fela-utils';
import { FelaRendererChange } from '../../types';

/* eslint-disable */
export default function insertRule({ selector, declaration, support }: FelaRendererChange, node: HTMLStyleElement) {
  try {
    const cssRule = generateCSSRule(selector, declaration);
    const sheet = node.sheet!;

    if (support.length > 0) {
      const cssSupportRule = generateCSSSupportRule(support, cssRule);
      sheet.insertRule(cssSupportRule, sheet.cssRules.length);
    } else {
      sheet.insertRule(cssRule, sheet.cssRules.length);
    }
  } catch (e) {
    // We're disabled these warnings due to false-positive errors with browser prefixes
    // See https://github.com/rofrischmann/fela/issues/634
    // console.warn(
    //   `An error occurred while inserting the rules into DOM.\n`,
    //   declaration.replace(/;/g, ';\n'),
    //   e
    // )
  }
}
