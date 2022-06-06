import * as _ from 'lodash';
import * as path from 'path';
import { TestObject } from '@fluentui/react-conformance';
import parseDocblock from '@fluentui/scripts/gulp/plugins/util/parseDocblock';

/**
 * northstar-specific tests that run using react-conformance
 */
export const extraConformanceTests: TestObject = {
  /** Component has a docblock with 5 to 25 words */
  'has-docblock': (componentInfo, testInfo) => {
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
  'is-static-property-of-parent': (componentInfo, testInfo) => {
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
