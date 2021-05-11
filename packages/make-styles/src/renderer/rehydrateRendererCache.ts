import { MakeStylesRenderer, StyleBucketName } from '../types';

// Regexps to extract names of classes and animations
// https://github.com/styletron/styletron/blob/e0fcae826744eb00ce679ac613a1b10d44256660/packages/styletron-engine-atomic/src/client/client.js#L8
const STYLES_HYDRATOR = /\.([^{:]+)(:[^{]+)?{(?:[^}]*;)?([^}]*?)}/g;
const KEYFRAMES_HYDRATOR = /@keyframes ([^{]+){((?:(?:from|to|(?:\d+\.?\d*%))\{(?:[^}])*})*)}/g;

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
      const regex = bucketName === 'k' ? KEYFRAMES_HYDRATOR : STYLES_HYDRATOR;

      // 👇 If some elements are not created yet, we will register them in renderer
      if (!renderer.styleElements[bucketName]) {
        renderer.styleElements[bucketName] = styleElement;
      }

      let match;
      while ((match = regex.exec(styleElement.textContent!))) {
        // "cacheKey" is either a class name or an animation name
        const [, cacheKey] = match;

        renderer.insertionCache[cacheKey] = true;
      }
    });
  }
}
