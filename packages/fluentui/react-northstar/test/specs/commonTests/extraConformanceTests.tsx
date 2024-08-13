import * as _ from 'lodash';
import * as path from 'path';
import type { TestObject } from '@fluentui/react-conformance';

import * as doctrine from 'doctrine';

// NOTE: copied code from '@fluentui/scripts-gulp/src/plugins/util/parseDocblock'
// - all scripts-* packages use esModuleInterop flag which will cause issues when used in northstar source/test files (they don't have that flag enabled)
// - without major rewrite of @fluentui/scripts-gulp to actually not use esModuleImports we cannot use this here thus, copying
const parseDocblock = (docblock: string) => {
  const { description = '', tags = [], ...rest } = doctrine.parse(docblock || '', { unwrap: true });

  return {
    ...rest,
    description,
    tags,
  };
};

/**
 * northstar-specific tests that run using react-conformance
 */
export const extraConformanceTests: TestObject = {
  /** Component has a docblock with 5 to 25 words */
  'has-docblock': (_testInfo, componentInfo) => {
    const maxWords = 25;
    const minWords = 5;

    it(`has a docblock with ${minWords} to ${maxWords} words (has-docblock)`, () => {
      const docblock = parseDocblock(componentInfo.description);
      const description = docblock.description;
      const wordCount = _.words(description).length;

      expect(wordCount).toBeGreaterThanOrEqual(minWords);
      expect(wordCount).toBeLessThanOrEqual(maxWords);
    });
  },

  /** If the component is a subcomponent, ensure its parent has the subcomponent as static property */
  'is-static-property-of-parent': testInfo => {
    const { componentPath, displayName, Component } = testInfo;
    const componentFolder = componentPath.replace(path.basename(componentPath) + path.extname(componentPath), '');
    const dirName = path.basename(componentFolder).replace(path.extname(componentFolder), '');
    const isParent = displayName === dirName;
    if (isParent) {
      return;
    }

    it(`is a static property of its parent (is-static-property-of-parent)`, () => {
      const parentComponentFile = require(path.join(componentFolder, dirName));
      const ParentComponent = parentComponentFile.default || parentComponentFile[dirName];
      expect(ParentComponent[displayName]).toBe(Component);
    });
  },
};
