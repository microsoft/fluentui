import * as _ from 'lodash';

/**
 * Converts kebab-cased-example-name back into the original filename.
 */
const exampleKebabNameToSourceFilename = (exampleKebabName: string) => {
  // button-example           => ButtonExample.tsx
  // button-example-shorthand => ButtonExample.shorthand.tsx
  return `${_.startCase(exampleKebabName)
    .replace(/ /g, '')
    .replace(/Shorthand$/, '.shorthand')
    .replace(/Rtl$/, '.rtl')
    .replace(/Perf$/, '.perf')
    .replace(/Bsize$/, '.bsize')}.tsx`;
};

export default exampleKebabNameToSourceFilename;
