import {
  RULE_CLASSNAME_INDEX,
  RULE_CSS_INDEX,
  RULE_RTL_CSS_INDEX,
  RULE_STYLE_BUCKET_INDEX,
  RULE_RTL_CLASSNAME_INDEX,
} from '../constants';
import { MakeStylesRenderer, StyleBucketName } from '../types';
import { getStyleSheetForBucket } from './getStyleSheetForBucket';

// Regexps to extract names of classes and animations
// https://github.com/styletron/styletron/blob/e0fcae826744eb00ce679ac613a1b10d44256660/packages/styletron-engine-atomic/src/client/client.js#L8
const STYLES_HYDRATOR = /\.([^{:]+)(:[^{]+)?{(?:[^}]*;)?([^}]*?)}/g;
const KEYFRAMES_HYRDATOR = /@keyframes ([^{]+){((?:(?:from|to|(?:\d+\.?\d*%))\{(?:[^}])*})*)}/g;

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

    insertDefinitions(dir, definitions): string {
      let classes = '';
      // eslint-disable-next-line guard-for-in
      for (const propName in definitions) {
        const definition = definitions[propName];
        // 👆 [bucketName, className, css, rtlClassName?, rtlCSS?]

        const className = definition[RULE_CLASSNAME_INDEX];
        const rtlClassName = definition[RULE_RTL_CLASSNAME_INDEX];

        const ruleClassName = dir === 'ltr' ? className : rtlClassName || className;

        if (ruleClassName) {
          // Should be done always to return classes even if they have been already inserted to DOM
          classes += ruleClassName + ' ';
        }

        const cacheKey = ruleClassName || propName;

        if (renderer.insertionCache[cacheKey]) {
          continue;
        }

        const bucketName = definition[RULE_STYLE_BUCKET_INDEX];
        const css = definition[RULE_CSS_INDEX];
        const rtlCSS = definition[RULE_RTL_CSS_INDEX];
        const ruleCSS = dir === 'rtl' ? rtlCSS || css : css;

        if (target) {
          const sheet = getStyleSheetForBucket(bucketName, target, renderer);

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

        renderer.insertionCache[cacheKey] = true;
      }

      return classes.slice(0, -1);
    },

    rehydrateCache() {
      if (target) {
        const styleElements = target.querySelectorAll<HTMLStyleElement>('[data-make-styles-bucket]');

        styleElements.forEach((styleElement) => {
          const bucketName = styleElement.dataset.makeStylesBucket as StyleBucketName;
          const regex = bucketName === 'k' ? KEYFRAMES_HYRDATOR : STYLES_HYDRATOR;

          let match;
          while ((match = regex.exec(styleElement.textContent!))) {
            // "cacheKey" is either a class name or an animation name
            const [, cacheKey] = match;

            renderer.insertionCache[cacheKey] = true;
          }
        });
      }
    },
  };

  return renderer;
}
