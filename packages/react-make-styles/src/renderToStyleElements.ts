import { MakeStylesRenderer, StyleBucketName, styleBucketOrdering } from '@fluentui/make-styles';
import * as React from 'react';

type CSSRulesGroupedByStyleBucket = Record<StyleBucketName, string[]>;

/**
 * This method returns a list of <style> React elements with the rendered CSS. This is useful for Server-Side rendering.
 *
 * @public
 */
export function renderToStyleElements(renderer: MakeStylesRenderer): React.ReactElement[] {
  const styles = styleBucketOrdering.reduce<CSSRulesGroupedByStyleBucket>((acc, bucketName) => {
    return { ...acc, [bucketName]: [] };
  }, {} as CSSRulesGroupedByStyleBucket);

  // eslint-disable-next-line guard-for-in
  for (const cssRule in renderer.insertionCache) {
    const bucketName: StyleBucketName = renderer.insertionCache[cssRule];

    styles[bucketName].push(cssRule);
  }

  return (Object.keys(styles) as StyleBucketName[])
    .map(bucketName => {
      const cssRules = styles[bucketName].join('');

      // We don't want to create empty style elements
      if (cssRules.length === 0) {
        return null;
      }

      return React.createElement('style', {
        key: bucketName,

        // TODO: support "nonce"
        // ...renderer.styleNodeAttributes,

        'data-make-styles-bucket': bucketName || 'default',
        'data-make-styles-rehydration': true,

        dangerouslySetInnerHTML: {
          __html: cssRules,
        },
      });
    })
    .filter(Boolean) as React.ReactElement[];
}
