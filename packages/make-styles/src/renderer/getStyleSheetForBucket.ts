import { MakeStylesRenderer, StyleBucketName } from '../types';

/**
 * Ordered style buckets using their short pseudo name.
 *
 * @private
 */
export const styleBucketOrdering: StyleBucketName[] = [
  // catch-all
  '',
  // link
  'l',
  // visited
  'v',
  // focus-within
  'w',
  // focus
  'f',
  // focus-visible
  'i',
  // hover
  'h',
  // active
  'a',
  // keyframes
  'k',
  // at-rules
  't',
];

/**
 * Lazily adds a `<style>` bucket to the `<head>`. This will ensure that the style buckets are ordered.
 */
export function getStyleSheetForBucket(
  bucketName: StyleBucketName,
  target: Document,
  renderer: MakeStylesRenderer,
): CSSStyleSheet {
  if (!renderer.styleElements[bucketName]) {
    let currentBucketIndex = styleBucketOrdering.indexOf(bucketName) + 1;
    let nextBucketFromCache = null;

    // Find the next bucket which we will add our new style bucket before.
    for (; currentBucketIndex < styleBucketOrdering.length; currentBucketIndex++) {
      const nextBucket = renderer.styleElements[styleBucketOrdering[currentBucketIndex]];
      if (nextBucket) {
        nextBucketFromCache = nextBucket;
        break;
      }
    }

    const tag = target.createElement('style');

    tag.dataset.makeStylesBucket = bucketName || 'default';
    renderer.styleElements[bucketName] = tag;

    target.head.insertBefore(tag, nextBucketFromCache);
  }

  return renderer.styleElements[bucketName]!.sheet as CSSStyleSheet;
}
