import hashString from '@emotion/hash';
import { convert, convertProperty } from 'rtl-css-js/core';

import { HASH_PREFIX } from '../constants';
import { compileCSS } from './compileCSS';
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
import type { MakeStyles, CSSClassesMap, CSSRulesByBucket, StyleBucketName } from '../types';
import type { CompileCSSOptions } from './compileCSS';

function pushToClassesMap(
  classesMap: CSSClassesMap,
  propertyKey: string,
  ltrClassname: string,
  rtlClassname: string | undefined,
) {
  classesMap[propertyKey] = rtlClassname ? [ltrClassname!, rtlClassname] : ltrClassname;
}

function pushToCSSRules(
  cssRulesByBucket: CSSRulesByBucket,
  styleBucketName: StyleBucketName,
  ltrCSS: string,
  rtlCSS: string | undefined,
) {
  cssRulesByBucket[styleBucketName] = cssRulesByBucket[styleBucketName] || [];
  cssRulesByBucket[styleBucketName]!.push(ltrCSS);

  if (rtlCSS) {
    cssRulesByBucket[styleBucketName]!.push(rtlCSS);
  }
}

function resolveStyleRulesInner(
  styles: MakeStyles,
  unstable_cssPriority: number = 0,
  pseudo = '',
  media = '',
  support = '',
  cssClassesMap: CSSClassesMap = {},
  cssRulesByBucket: CSSRulesByBucket = {},
  rtlValue?: string,
): [CSSClassesMap, CSSRulesByBucket] {
  // eslint-disable-next-line guard-for-in
  for (const property in styles) {
    const value = styles[property];

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

      const rtlClassName = flippedInRtl
        ? hashClassName({
            value: rtlDefinition.value.toString(),
            property: rtlDefinition.key,
            pseudo,
            media,
            support,
            unstable_cssPriority,
          })
        : undefined;
      const rtlCompileOptions: Partial<CompileCSSOptions> | undefined = flippedInRtl
        ? {
            rtlClassName,
            rtlProperty: rtlDefinition.key,
            rtlValue: rtlDefinition.value,
          }
        : undefined;

      const styleBucketName = getStyleBucketName(pseudo, media, support);
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

      pushToClassesMap(cssClassesMap, key, className, rtlClassName);
      pushToCSSRules(cssRulesByBucket, styleBucketName, ltrCSS, rtlCSS);
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

      pushToCSSRules(
        cssRulesByBucket,
        'k', // keyframes styles should be inserted into own bucket
        keyframeCSS,
        keyframeRtlCSS || undefined,
      );
      resolveStyleRulesInner(
        { animationName },
        unstable_cssPriority,
        pseudo,
        media,
        support,
        cssClassesMap,
        cssRulesByBucket,
        animationNameRtl,
      );
    } else if (isObject(value)) {
      if (isNestedSelector(property)) {
        resolveStyleRulesInner(
          value,
          unstable_cssPriority,
          pseudo + normalizeNestedProperty(property),
          media,
          support,
          cssClassesMap,
          cssRulesByBucket,
        );
      } else if (isMediaQuerySelector(property)) {
        const combinedMediaQuery = generateCombinedQuery(media, property.slice(6).trim());

        resolveStyleRulesInner(
          value,
          unstable_cssPriority,
          pseudo,
          combinedMediaQuery,
          support,
          cssClassesMap,
          cssRulesByBucket,
        );
      } else if (isSupportQuerySelector(property)) {
        const combinedSupportQuery = generateCombinedQuery(support, property.slice(9).trim());

        resolveStyleRulesInner(
          value,
          unstable_cssPriority,
          pseudo,
          media,
          combinedSupportQuery,
          cssClassesMap,
          cssRulesByBucket,
        );
      }
    }
  }

  return [cssClassesMap, cssRulesByBucket];
}

/**
 * Transforms input styles to classes maps & CSS rules.
 *
 * @internal
 */
export function resolveStyleRules(
  styles: MakeStyles,
  unstable_cssPriority: number = 0,
): [CSSClassesMap, CSSRulesByBucket] {
  // expandShorthand() and resolveProxyValues() are recursive functions and should be evaluated once for a style object
  const expandedStyles: MakeStyles = expandShorthand(resolveProxyValues(styles));

  return resolveStyleRulesInner(expandedStyles, unstable_cssPriority);
}
