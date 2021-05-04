import {
  DEFINITION_LOOKUP_TABLE,
  LOOKUP_DEFINITIONS_INDEX,
  LOOKUP_DIR_INDEX,
  MakeStylesReducedDefinitions,
  MakeStylesRenderer,
  MakeStylesResolvedRule,
  RULE_CLASSNAME_INDEX,
  RULE_CSS_INDEX,
  RULE_RTL_CLASSNAME_INDEX,
  RULE_RTL_CSS_INDEX,
  RULE_STYLE_BUCKET_INDEX,
  StyleBucketName,
  styleBucketOrdering,
} from '@fluentui/make-styles';
import * as React from 'react';

type CSSRulesGroupedByStyleBucket = Record<StyleBucketName, Record<string, string>>;

/**
 * This method returns a list of <style> React elements with the rendered CSS. This is useful for Server-Side rendering.
 *
 * @public
 */
export function renderToStyleElements(renderer: MakeStylesRenderer): React.ReactElement[] {
  const styles = styleBucketOrdering.reduce<CSSRulesGroupedByStyleBucket>((acc, bucketName) => {
    return { ...acc, [bucketName]: {} };
  }, {} as CSSRulesGroupedByStyleBucket);

  // eslint-disable-next-line guard-for-in
  for (const definitionKey in DEFINITION_LOOKUP_TABLE) {
    const lookupItem = DEFINITION_LOOKUP_TABLE[definitionKey];

    const definitions: MakeStylesReducedDefinitions = lookupItem[LOOKUP_DEFINITIONS_INDEX];
    const dir = lookupItem[LOOKUP_DIR_INDEX];

    // eslint-disable-next-line guard-for-in
    for (const propertyName in definitions) {
      const definition: MakeStylesResolvedRule = definitions[propertyName];
      const bucketName = definition[RULE_STYLE_BUCKET_INDEX];

      const className = definition[RULE_CLASSNAME_INDEX] as string;
      const rtlClassName = definition[RULE_RTL_CLASSNAME_INDEX];

      const css = definition[RULE_CSS_INDEX] as string;
      const rtlCSS = definition[RULE_RTL_CSS_INDEX];

      const ruleClassName = dir === 'ltr' ? className : rtlClassName || className;
      const ruleCSS = dir === 'rtl' ? rtlCSS || css : css;

      const cacheKey = ruleClassName || propertyName;

      if (renderer.insertionCache[cacheKey]) {
        styles[bucketName][cacheKey] = ruleCSS;
      }
    }
  }

  return (Object.keys(styles) as StyleBucketName[])
    .map(bucketName => {
      const cssRules = Object.keys(styles[bucketName])
        .map(className => styles[bucketName][className])
        .join('');

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
