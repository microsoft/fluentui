import * as _ from 'lodash';

/**
 * Converts kebab-cased-example-name back into the original filename.
 */
export const exampleKebabNameToFilename = (exampleKebabName: string) => {
  // button-example           => ButtonExample.source.json
  // button-example-shorthand => ButtonExample.shorthand.source.json
  return `${_.startCase(exampleKebabName)
    .replace(/ /g, '')
    .replace(/Shorthand$/, '.shorthand')
    .replace(/Rtl$/, '.rtl')
    .replace(/Perf$/, '.perf')
    .replace(/Bsize$/, '.bsize')}.tsx`;
};

/**
 * Converts kebab-cased-example-name to readable name.
 */
export const exampleKebabNameToDisplayName = (exampleKebabName: string) => {
  // button-example           => Button Example
  return _.startCase(exampleKebabName);
};
