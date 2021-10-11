import { createCSSVariablesProxy } from './runtime/createCSSVariablesProxy';
import { resolveStyleRules } from './runtime/resolveStyleRules';
import {
  CSSClassesMapBySlot,
  CSSRulesByBucket,
  MakeStyles,
  MakeStylesStyleFunctionRule,
  StyleBucketName,
  StylesBySlots,
} from './types';

/**
 * Calls resolveStyleRules() for each slot, is also used by build time transform.
 *
 * @param stylesBySlots - An object with makeStyles rules where a key is a slot name
 * @param unstable_cssPriority - Defines priority for selectors of generated CSS rules
 *
 * @return - A tuple with an object classnames mapping where a key is a slot name and an array with CSS rules
 */
export function resolveStyleRulesForSlots<Slots extends string | number, Tokens>(
  id: string,
  stylesBySlots: StylesBySlots<Slots, Tokens>,
  unstable_cssPriority: number,
): [CSSClassesMapBySlot<Slots>, CSSRulesByBucket] {
  const tokensProxy = createCSSVariablesProxy() as Tokens;

  const classesMapBySlot = {} as CSSClassesMapBySlot<Slots>;
  const cssRules: CSSRulesByBucket = {};

  // eslint-disable-next-line guard-for-in
  for (const slotName in stylesBySlots) {
    const slotStyles: MakeStyles =
      typeof stylesBySlots[slotName] === 'function'
        ? (stylesBySlots[slotName] as MakeStylesStyleFunctionRule<Tokens>)(tokensProxy)
        : stylesBySlots[slotName];
    const [cssClassMap, cssRulesByBucket] = resolveStyleRules(id, slotStyles, unstable_cssPriority);

    classesMapBySlot[slotName] = cssClassMap;

    (Object.keys(cssRulesByBucket) as StyleBucketName[]).forEach(styleBucketName => {
      cssRules[styleBucketName] = (cssRules[styleBucketName] || []).concat(cssRulesByBucket[styleBucketName]!);
    });
  }

  return [classesMapBySlot, cssRules];
}
