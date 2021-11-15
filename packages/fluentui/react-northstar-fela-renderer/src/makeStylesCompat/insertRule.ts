import {
  FONT_TYPE,
  // @ts-ignore
  generateCSSRule,
  KEYFRAME_TYPE,
  RULE_TYPE,
  STATIC_TYPE,
} from 'fela-utils';
import { compile, middleware, serialize, rulesheet, stringify, prefixer } from 'stylis';

import { getStyleSheetForBucket } from './getStyleSheetForBucket';
import type { FelaRendererChange } from '../types';
import type { MakeStylesRenderer, StyleBucketName } from './types';

/**
 * Suffixes to be ignored in case of error
 */
const ignoreSuffixes = [
  '-moz-placeholder',
  '-moz-focus-inner',
  '-moz-focusring',
  '-ms-input-placeholder',
  '-moz-read-write',
  '-moz-read-only',
].join('|');
const ignoreSuffixesRegex = new RegExp(`:(${ignoreSuffixes})`);

function safeInsertToDOM(
  renderer: MakeStylesRenderer,
  sheet: CSSStyleSheet | undefined,
  bucket: StyleBucketName,
  ruleCSS: string,
) {
  if (renderer.insertionCache[ruleCSS]) {
    return;
  }

  renderer.insertionCache[ruleCSS] = bucket!;

  if (sheet) {
    try {
      sheet.insertRule(ruleCSS, sheet.cssRules.length);
    } catch (e) {
      // We've disabled these warnings due to false-positive errors with browser prefixes
      if (process.env.NODE_ENV !== 'production' && !ignoreSuffixesRegex.test(ruleCSS)) {
        // eslint-disable-next-line no-console
        console.error(`There was a problem inserting the following rule: "${ruleCSS}"`, e);
      }
    }
  }
}

export function insertRule(target: Document | undefined, renderer: MakeStylesRenderer) {
  return function (change: FelaRendererChange) {
    const { css, selector, declaration, bucket = 'd', type } = change;
    const sheet = target && getStyleSheetForBucket(bucket, target, renderer);

    switch (type) {
      case KEYFRAME_TYPE:
        // if (node.textContent.indexOf(change.keyframe) === -1) {
        //   node.textContent += change.keyframe
        // }
        break;
      case FONT_TYPE:
        safeInsertToDOM(renderer, sheet, bucket, change.fontFace);
        break;
      case STATIC_TYPE:
        serialize(
          compile(selector ? generateCSSRule(selector, css) : css),
          middleware([
            prefixer,
            stringify,

            // 💡 we are using `.insertRule()` API for DOM operations, which does not support
            // insertion of multiple CSS rules in a single call. `rulesheet` plugin extracts
            // individual rules to be used with this API
            rulesheet(rule => {
              safeInsertToDOM(renderer, sheet, bucket, rule);
            }),
          ]),
        );

        break;
      case RULE_TYPE:
        safeInsertToDOM(renderer, sheet, bucket, generateCSSRule(selector, declaration));
        break;
      default:
        return;
    }
  };
}
