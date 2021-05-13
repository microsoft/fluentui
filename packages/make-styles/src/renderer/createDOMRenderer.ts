import { MakeStylesRenderer, StyleBucketName } from '../types';
import { getStyleSheetForBucket } from './getStyleSheetForBucket';

let lastIndex = 0;

/**
 * Creates a new instances of a renderer.
 *
 * @public
 */
export function createDOMRenderer(
  target: Document | undefined = typeof document === 'undefined' ? undefined : document,
): MakeStylesRenderer {
  const renderer: MakeStylesRenderer = {
    insertionCache: {},
    styleElements: {},

    id: `d${lastIndex++}`,

    insertCSSRules(cssRules) {
      // eslint-disable-next-line guard-for-in
      for (const styleBucketName in cssRules) {
        const cssRulesForBucket = cssRules[styleBucketName as StyleBucketName]!;
        const sheet = target && getStyleSheetForBucket(styleBucketName as StyleBucketName, target, renderer);

        for (let i = 0, l = cssRulesForBucket.length; i < l; i++) {
          const ruleCSS = cssRulesForBucket[i];

          if (renderer.insertionCache[ruleCSS]) {
            continue;
          }

          renderer.insertionCache[ruleCSS] = styleBucketName as StyleBucketName;

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
      }
    },
  };

  return renderer;
}

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
