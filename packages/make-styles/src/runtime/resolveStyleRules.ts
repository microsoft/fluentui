import hashString from '@emotion/hash';
import { convert, convertProperty } from 'rtl-css-js/core';

import { HASH_PREFIX } from '../constants';
import { MakeStyles, MakeStylesResolvedRule } from '../types';
import { compileCSS, CompileCSSOptions } from './compileCSS';
import { compileKeyframeRule, compileKeyframesCSS } from './compileKeyframeCSS';
import { expandShorthand } from './expandShorthand';
import { generateCombinedQuery } from './utils/generateCombinedMediaQuery';
import { isMediaQuerySelector } from './utils/isMediaQuerySelector';
import { isNestedSelector } from './utils/isNestedSelector';
import { isSupportQuerySelector } from './utils/isSupportQuerySelector';
import { normalizeNestedProperty } from './utils/normalizeNestedProperty';
import { isObject } from './utils/isObject';
import { getStyleBucketName } from './getStyleBucketName';
import { hashClassName } from './utils/hashClassName';
import { resolveProxyValues } from './createCSSVariablesProxy';
import { hashPropertyKey } from './utils/hashPropertyKey';

/**
 * Transforms input styles to resolved rules: generates classnames and CSS.
 *
 * @internal
 */
export function resolveStyleRules(
  styles: MakeStyles,
  unstable_cssPriority: number = 0,
  pseudo = '',
  media = '',
  support = '',
  result: Record<string, MakeStylesResolvedRule> = {},
  rtlValue?: string,
): Record<string, MakeStylesResolvedRule> {
  const expandedStyles: MakeStyles = expandShorthand(resolveProxyValues(styles));

  // eslint-disable-next-line guard-for-in
  for (const property in expandedStyles) {
    const value = expandedStyles[property];

    // eslint-disable-next-line eqeqeq
    if (value == null) {
      continue;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      // uniq key based on a hash of property & selector, used for merging later
      const key = hashPropertyKey(pseudo, media, support, property);
      const className = hashClassName({
        media,
        value: value.toString(),
        support,
        pseudo,
        property,
        unstable_cssPriority,
      });

      const rtlDefinition = (rtlValue && { key: property, value: rtlValue }) || convertProperty(property, value);
      const flippedInRtl = rtlDefinition.key !== property || rtlDefinition.value !== value;

      const rtlClassName = hashClassName({
        value: rtlDefinition.value.toString(),
        property: rtlDefinition.key,
        pseudo,
        media,
        support,
        unstable_cssPriority,
      });

      const rtlCompileOptions: Partial<CompileCSSOptions> | undefined = flippedInRtl
        ? {
            rtlClassName,
            rtlProperty: rtlDefinition.key,
            rtlValue: rtlDefinition.value,
          }
        : undefined;

      const [ltrCSS, rtlCSS] = compileCSS({
        className,
        media,
        pseudo,
        property,
        support,
        value,
        unstable_cssPriority,
        ...rtlCompileOptions,
      });

      const resolvedRule: MakeStylesResolvedRule = [getStyleBucketName(pseudo, media, support), className, ltrCSS];

      if (rtlCSS) {
        resolvedRule.push(rtlClassName, rtlCSS);
      }

      result[key] = resolvedRule;
    } else if (property === 'animationName') {
      const animationNames = Array.isArray(value) ? value : [value];
      let keyframeCSS = '';
      let keyframeRtlCSS = '';

      const names = [];
      const namesRtl = [];

      for (const val of animationNames) {
        const keyframe = compileKeyframeRule(val);
        const name = HASH_PREFIX + hashString(keyframe);

        keyframeCSS += compileKeyframesCSS(name, keyframe);
        names.push(name);

        const rtlKeyframe = compileKeyframeRule(convert(val));

        if (keyframe !== rtlKeyframe) {
          const nameRtl = HASH_PREFIX + hashString(rtlKeyframe);
          keyframeRtlCSS += compileKeyframesCSS(nameRtl, rtlKeyframe);
          namesRtl.push(nameRtl);
        } else {
          namesRtl.push(name);
        }
      }

      const animationName = names.join(' ');
      const animationNameRtl = namesRtl.join(' ');
      result[animationName] = [
        'k', // keyframes styles should be inserted into own bucket
        undefined,
        keyframeCSS,
        undefined,
        keyframeRtlCSS || undefined,
      ];
      resolveStyleRules({ animationName }, unstable_cssPriority, pseudo, media, support, result, animationNameRtl);
    } else if (isObject(value)) {
      if (isNestedSelector(property)) {
        resolveStyleRules(
          value,
          unstable_cssPriority,
          pseudo + normalizeNestedProperty(property),
          media,
          support,
          result,
        );
      } else if (isMediaQuerySelector(property)) {
        const combinedMediaQuery = generateCombinedQuery(media, property.slice(6).trim());

        resolveStyleRules(value, unstable_cssPriority, pseudo, combinedMediaQuery, support, result);
      } else if (isSupportQuerySelector(property)) {
        const combinedSupportQuery = generateCombinedQuery(support, property.slice(9).trim());

        resolveStyleRules(value, unstable_cssPriority, pseudo, media, combinedSupportQuery, result);
      }
    }
  }

  return result;
}
