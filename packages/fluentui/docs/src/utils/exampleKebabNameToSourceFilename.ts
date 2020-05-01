import * as _ from 'lodash';

/**
 * Converts kebab-cased-example-name back into the original filename.
 */
const exampleKebabNameToSourceFilename = (exampleKebabName: string) => {
  // button-example           => ButtonExample.source.json
  // button-example-shorthand => ButtonExample.shorthand.source.json
  return `${_.startCase(exampleKebabName)
    .replace(/ /g, '')
    .replace(/Shorthand$/, '.shorthand')
    .replace(/Rtl$/, '.rtl')
    .replace(/Perf$/, '.perf')
    .replace(/Bsize$/, '.bsize')}.source.json`;
};

export default exampleKebabNameToSourceFilename;
