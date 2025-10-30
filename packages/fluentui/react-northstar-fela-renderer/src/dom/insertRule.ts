import {
  // @ts-expect-error No types available
  generateCSSRule,
  // @ts-expect-error No types available
  generateCSSSupportRule,
  // @ts-expect-error No types available
  getRuleScore,
} from 'fela-utils';

import type { FelaRenderer, FelaRendererRuleChange } from '../types';

export function insertRule(
  { selector, declaration, support, media, pseudo }: FelaRendererRuleChange,
  renderer: FelaRenderer,
  node: HTMLStyleElement,
) {
  const nodeReference = media + support;

  try {
    const score = getRuleScore(renderer.ruleOrder, pseudo);
    const { cssRules } = node.sheet!;

    let index = cssRules.length;

    // This heavily optimises the amount of rule iterations we need
    // due to most rules having a score=0 anyways
    if (score === 0) {
      if (renderer.scoreIndex[nodeReference] === undefined) {
        index = 0;
      } else {
        index = renderer.scoreIndex[nodeReference] + 1;
      }
    } else {
      // we start iterating from the last score=0 entry
      // to correctly inject pseudo classes etc.
      const startIndex = renderer.scoreIndex[nodeReference] || 0;

      for (let i = startIndex, len = cssRules.length; i < len; ++i) {
        if ((cssRules[i] as CSSRule & { score: number }).score > score) {
          index = i;
          break;
        }
      }
    }

    const cssRule = generateCSSRule(selector, declaration);

    if (support.length > 0) {
      const cssSupportRule = generateCSSSupportRule(support, cssRule);
      node.sheet!.insertRule(cssSupportRule, index);
    } else {
      node.sheet!.insertRule(cssRule, index);
    }

    if (score === 0) {
      renderer.scoreIndex[nodeReference] = index;
    }

    (cssRules[index] as CSSRule & { score: number }).score = score;
  } catch {
    // We're disabled these warnings due to false-positive errors with browser prefixes
    // See https://github.com/robinweser/fela/issues/634
    // console.warn(
    //   `An error occurred while inserting the rules into DOM.\n`,
    //   declaration.replace(/;/g, ';\n'),
    //   e
    // )
  }
}
