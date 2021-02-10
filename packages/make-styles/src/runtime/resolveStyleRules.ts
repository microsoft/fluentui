import { convert, convertProperty } from 'rtl-css-js/core';
import { expand } from 'inline-style-expand-shorthand';

import { HASH_PREFIX, RTL_PREFIX } from '../constants';
import { MakeStyles, MakeStylesResolvedRule } from '../types';
import { compileCSS } from './compileCSS';
import { compileKeyframeRule, compileKeyframesCSS } from './compileKeyframeCSS';
import { hashString } from './utils/hashString';
import { generateCombinedQuery } from './utils/generateCombinedMediaQuery';
import { isMediaQuerySelector } from './utils/isMediaQuerySelector';
import { isNestedSelector } from './utils/isNestedSelector';
import { isSupportQuerySelector } from './utils/isSupportQuerySelector';
import { normalizeNestedProperty } from './utils/normalizeNestedProperty';
import { isObject } from './utils/isObject';

export function resolveStyleRules(
  styles: MakeStyles,
  unstable_cssPriority: number = 0,
  pseudo = '',
  media = '',
  support = '',
  result: Record<string, MakeStylesResolvedRule> = {},
  rtlValue?: string,
): Record<string, MakeStylesResolvedRule> {
  const expandedStyles: MakeStyles = expand(styles);
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
      const classNameHash = hashString(pseudo + media + support + property + value.toString().trim());
      const className = HASH_PREFIX + classNameHash + (unstable_cssPriority === 0 ? '' : unstable_cssPriority);

      const css = compileCSS({
        className,
        media,
        pseudo,
        property,
        support,
        value,
        unstable_cssPriority,
      });

      const rtl = (rtlValue && { key: property, value: rtlValue }) || convertProperty(property, value);
      const flippedInRtl = rtl.key !== property || rtl.value !== value;

      if (flippedInRtl) {
        const rtlCSS = compileCSS({
          className: RTL_PREFIX + className,
          media,
          pseudo,
          property: rtl.key,
          support,
          value: rtl.value,
          unstable_cssPriority,
        });

        // There is no sense to store RTL className as it's "r" + regular className
        result[key] = [className, css, rtlCSS];
      } else {
        result[key] = [className, css];
      }
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
          const nameRtl = RTL_PREFIX + name;
          keyframeRtlCSS += compileKeyframesCSS(nameRtl, rtlKeyframe);
          namesRtl.push(nameRtl);
        } else {
          namesRtl.push(name);
        }
      }

      const animationName = names.join(' ');
      const animationNameRtl = namesRtl.join(' ');
      result[animationName] = [undefined, keyframeCSS, keyframeRtlCSS || undefined];
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
      } else {
        // TODO: what about static css (e.g. font-face)?
      }
    }
  });

  return result;
}
