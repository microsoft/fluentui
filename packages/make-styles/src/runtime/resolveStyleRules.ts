import hashString from '@emotion/hash';
import { convertProperty } from 'rtl-css-js/core';
import { expand } from 'inline-style-expand-shorthand';

import { HASH_PREFIX, RTL_PREFIX } from '../constants';
import { MakeStyles, MakeStylesResolvedRule } from '../types';
import { compileCSS } from './compileCSS';
import { compileKeyframeRule } from './compileKeyframeRule';
import { isMediaQuerySelector } from './utils/isMediaQuerySelector';
import { isNestedSelector } from './utils/isNestedSelector';
import { isObject } from './utils/isObject';
import { normalizeNestedProperty } from './utils/normalizeNestedProperty';

export function resolveStyleRules(
  styles: MakeStyles,
  selector = '',
  result: Record<string, MakeStylesResolvedRule> = {},
): Record<string, MakeStylesResolvedRule> {
  const expandedStyles = (expand(styles) as unknown) as MakeStyles;
  const properties = Object.keys(expandedStyles);

  // TODO: => for-in loop
  properties.forEach(propName => {
    const propValue = expandedStyles[propName];

    // eslint-disable-next-line eqeqeq
    if (propValue == null) {
      return;
    } else if (typeof propValue === 'string' || typeof propValue === 'number') {
      // uniq key based on property & selector, used for merging later
      const key = selector + propName;

      // trimming of values is required to generate consistent hashes
      const className = HASH_PREFIX + hashString(selector + propName + propValue.toString().trim());
      const css = compileCSS(className, selector, propName, propValue);

      const rtl = convertProperty(propName, propValue);
      const flippedInRtl = rtl.key !== propName || rtl.value !== propValue;

      if (flippedInRtl) {
        const rtlCSS = compileCSS(RTL_PREFIX + className, selector, rtl.key, rtl.value);

        // There is no sense to store RTL className as it's "r" + regular className
        result[key] = [className, css, rtlCSS];
      } else {
        result[key] = [className, css];
      }
    } else if (isObject(propValue)) {
      if (isNestedSelector(propName)) {
        resolveStyleRules(propValue, selector + normalizeNestedProperty(propName), result);
      } else if (isMediaQuerySelector(propName)) {
        resolveStyleRules(propValue, selector + propName, result);
      } else if (propName === 'animationName') {
        // TODO: support RTL!
        const keyframe = compileKeyframeRule(propValue);
        const animationName = HASH_PREFIX + hashString(keyframe);

        // TODO call Stylis for prefixing
        const keyframeCSS = `@keyframes ${animationName}{${keyframe}}`;

        result[animationName] = [animationName, keyframeCSS /* rtlCSS */];

        resolveStyleRules({ animationName }, selector, result);
      }
      // TODO: support support queries
    }
  });

  return result;
}
