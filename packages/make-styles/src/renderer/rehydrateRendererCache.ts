import { MakeStylesRenderer, StyleBucketName } from '../types';

// Regexps to extract names of classes and animations
// https://github.com/styletron/styletron/blob/e0fcae826744eb00ce679ac613a1b10d44256660/packages/styletron-engine-atomic/src/client/client.js#L8
// eslint-disable-next-line @fluentui/max-len
const KEYFRAMES_HYDRATOR = /@-webkit-keyframes ([^{]+){((?:(?:from|to|(?:\d+\.?\d*%))\{(?:[^}])*})*)}@keyframes ([^{]+){((?:(?:from|to|(?:\d+\.?\d*%))\{(?:[^}])*})*)}/g;
const AT_RULES_HYDRATOR = /@(media|supports)[^{]+\{([\s\S]+?})\s*}/g;
const STYLES_HYDRATOR = /\.([^{:]+)(:[^{]+)?{(?:[^}]*;)?([^}]*?)}/g;

const regexps: Partial<Record<StyleBucketName, RegExp>> = {
  k: KEYFRAMES_HYDRATOR,
  t: AT_RULES_HYDRATOR,
};

/**
 * Should be called in a case of Server-Side rendering. Rehydrates cache from for a renderer to avoid double insertion
 * of classes to DOM.
 *
 * @public
 */
export function rehydrateRendererCache(
  renderer: MakeStylesRenderer,
  target: Document | undefined = typeof document === 'undefined' ? undefined : document,
) {
  if (target) {
    const styleElements = target.querySelectorAll<HTMLStyleElement>('[data-make-styles-bucket]');

    styleElements.forEach(styleElement => {
      const bucketName = styleElement.dataset.makeStylesBucket as StyleBucketName;
      const regex = regexps[bucketName] || STYLES_HYDRATOR;

      // 👇 If some elements are not created yet, we will register them in renderer
      if (!renderer.styleElements[bucketName]) {
        renderer.styleElements[bucketName] = styleElement;
      }

      let match;
      while ((match = regex.exec(styleElement.textContent!))) {
        // "cacheKey" is either a class name or an animation name
        const [cssRule] = match;

        renderer.insertionCache[cssRule] = bucketName;
      }
    });
  }
}
