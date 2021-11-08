import hashString from '@emotion/hash';
import { convert, convertProperty } from 'rtl-css-js/core';

import { HASH_PREFIX } from '../constants';
import { MakeStylesStyle, CSSClassesMap, CSSRulesByBucket, StyleBucketName, MakeStylesAnimation } from '../types';
import { compileCSS, CompileCSSOptions } from './compileCSS';
import { compileKeyframeRule, compileKeyframesCSS } from './compileKeyframeCSS';
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
  styles: MakeStylesStyle,
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
    const value = styles[property as keyof MakeStylesStyle];

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
      const animationNameValue = Array.isArray(value)
        ? (value as MakeStylesAnimation[])
        : [value as MakeStylesAnimation];

      const animationNames: string[] = [];
      const rtlAnimationNames: string[] = [];

      for (const keyframeObject of animationNameValue) {
        const keyframeCSS = compileKeyframeRule(keyframeObject);
        const rtlKeyframeCSS = compileKeyframeRule(convert(keyframeObject));

        const animationName = HASH_PREFIX + hashString(keyframeCSS);
        let rtlAnimationName: string;

        const keyframeRules = compileKeyframesCSS(animationName, keyframeCSS);
        let rtlKeyframeRules: string[] = [];

        if (keyframeCSS === rtlKeyframeCSS) {
          // If CSS for LTR & RTL are same we will re-use animationName from LTR to avoid duplication of rules in output
          rtlAnimationName = animationName;
        } else {
          rtlAnimationName = HASH_PREFIX + hashString(rtlKeyframeCSS);
          rtlKeyframeRules = compileKeyframesCSS(rtlAnimationName, rtlKeyframeCSS);
        }

        for (let i = 0; i < keyframeRules.length; i++) {
          pushToCSSRules(
            cssRulesByBucket,
            // keyframes styles should be inserted into own bucket
            'k',
            keyframeRules[i],
            rtlKeyframeRules[i],
          );
        }

        animationNames.push(animationName);
        rtlAnimationNames.push(rtlAnimationName);
      }

      resolveStyleRulesInner(
        { animationName: animationNames.join(', ') },
        unstable_cssPriority,
        pseudo,
        media,
        support,
        cssClassesMap,
        cssRulesByBucket,
        rtlAnimationNames.join(', '),
      );
    } else if (isObject(value)) {
      if (isNestedSelector(property)) {
        resolveStyleRulesInner(
          value as MakeStylesStyle,
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
          value as MakeStylesStyle,
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
          value as MakeStylesStyle,
          unstable_cssPriority,
          pseudo,
          media,
          combinedSupportQuery,
          cssClassesMap,
          cssRulesByBucket,
        );
      } else {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.error(`Please fix the unresolved style rule: \n ${property} \n ${JSON.stringify(value, null, 2)}"`);
        }
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
  styles: MakeStylesStyle,
  unstable_cssPriority: number = 0,
): [CSSClassesMap, CSSRulesByBucket] {
  // resolveProxyValues() is recursive function and should be evaluated once for a style object
  const expandedStyles: MakeStylesStyle = resolveProxyValues(styles);

  return resolveStyleRulesInner(expandedStyles, unstable_cssPriority);
}
