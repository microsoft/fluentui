import * as React from 'react';
import { Details } from './types';

function isConformant(Component: React.ComponentType, options: Details = {}) {
  const { constructorName } = options;

  if (!constructorName) {
    throw new Error('Constructor name is needed');
  }

  const infoJSONPath = `@fluentui/docs/src/componentInfo/${constructorName}.info.json`;

  try {
    require(infoJSONPath);
  } catch (error) {
    // handled in the test() below
    test('component info file exists', () => {
      throw new Error(
        [
          '!! ==========================================================',
          `!! Missing ${infoJSONPath}.`,
          '!! Run `yarn test` or `yarn test:watch` again to generate one.',
          '!! ==========================================================',
        ].join('\n'),
      );
    });
  }
}
export default isConformant;
