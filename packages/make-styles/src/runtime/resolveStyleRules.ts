import hashString from '@emotion/hash';
import { convertProperty } from 'rtl-css-js/core';
import { expand } from 'inline-style-expand-shorthand';

import { HASH_PREFIX, RTL_PREFIX } from '../constants';
import { MakeStyles, MakeStylesResolvedRule } from '../types';
import { compileCSS } from './compileCSS';
import { compileKeyframeRule } from './compileKeyframeRule';
import { generateCombinedQuery } from './utils/generateCombinedMediaQuery';
import { isMediaQuerySelector } from './utils/isMediaQuerySelector';
import { isNestedSelector } from './utils/isNestedSelector';
import { isObject } from './utils/isObject';
import { isSupportQuerySelector } from './utils/isSupportQuerySelector';
import { normalizeNestedProperty } from './utils/normalizeNestedProperty';

export function resolveStyleRules(
  styles: MakeStyles,
  pseudo = '',
  media = '',
  support = '',
  result: Record<string, MakeStylesResolvedRule> = {},
): Record<string, MakeStylesResolvedRule> {
  const expandedStyles = (expand(styles) as unknown) as MakeStyles;
  const properties = Object.keys(expandedStyles);

  // TODO: => for-in loop
  properties.forEach(property => {
    const value = expandedStyles[property];

    // eslint-disable-next-line eqeqeq
    if (value == null) {
      return;
    } else if (typeof value === 'string' || typeof value === 'number') {
      // uniq key based on property & selector, used for merging later
      const key = pseudo + media + support + property;

      // trimming of values is required to generate consistent hashes
      const className = HASH_PREFIX + hashString(pseudo + media + support + property + value.toString().trim());
      const css = compileCSS({
        className,
        media,
        pseudo,
        property,
        support,
        value,
      });

      const rtl = convertProperty(property, value);
      const flippedInRtl = rtl.key !== property || rtl.value !== value;

      if (flippedInRtl) {
        const rtlCSS = compileCSS({
          className: RTL_PREFIX + className,
          media,
          pseudo,
          property: rtl.key,
          support,
          value: rtl.value,
        });

        // There is no sense to store RTL className as it's "r" + regular className
        result[key] = [className, css, rtlCSS];
      } else {
        result[key] = [className, css];
      }
    } else if (isObject(value)) {
      if (isNestedSelector(property)) {
        resolveStyleRules(value, pseudo + normalizeNestedProperty(property), media, support, result);
      } else if (isMediaQuerySelector(property)) {
        const combinedMediaQuery = generateCombinedQuery(media, property.slice(6).trim());

        resolveStyleRules(value, pseudo, combinedMediaQuery, support, result);
      } else if (isSupportQuerySelector(property)) {
        const combinedSupportQuery = generateCombinedQuery(support, property.slice(9).trim());

        resolveStyleRules(value, pseudo, media, combinedSupportQuery, result);
      } else if (property === 'animationName') {
        // TODO: support RTL!
        const keyframe = compileKeyframeRule(value);
        const animationName = HASH_PREFIX + hashString(keyframe);

        // TODO call Stylis for prefixing
        const keyframeCSS = `@keyframes ${animationName}{${keyframe}}`;

        result[animationName] = [animationName, keyframeCSS /* rtlCSS */];

        resolveStyleRules({ animationName }, pseudo, media, support, result);
      }
    }
  });

  return result;
}
