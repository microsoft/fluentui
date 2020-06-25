import * as path from 'path';
import * as fs from 'fs';

import { IsConformantOptions } from './types';
import { withCustomConfig } from 'react-docgen-typescript';
import { defaultTests } from './defaultTests';

export function isConformant(testInfo: IsConformantOptions) {
  const { componentPath, displayName, disabledTests = [], extraTests, isInternal } = testInfo;
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');

  if (!fs.existsSync(componentPath)) {
    throw new Error(`Path ${componentPath} does not exist`);
  }

  // Props need to be filtered since react-docgen shows all the props including props
  // that aren't specified in the component.
  const parser = withCustomConfig(tsconfigPath, {
    propFilter: prop => !/@types[\\/]react[\\/]/.test(prop.parent?.fileName || ''),
  });
  const components = parser.parse(componentPath);
  const mainComponents = components.filter(comp => comp.displayName === displayName);

  if (mainComponents.length === 1) {
    const componentInfo = mainComponents[0];

    if (isInternal) {
      disabledTests.push('exported-top-level');
    }

    for (const test of Object.keys(defaultTests)) {
      if (!disabledTests.includes(test)) {
        defaultTests[test](componentInfo, testInfo);
      }
    }
    if (extraTests) {
      for (const test of Object.keys(extraTests)) {
        extraTests[test](componentInfo, testInfo);
      }
    }
  } else {
    if (components.length === 0) {
      throw new Error('No exported components in path: ' + componentPath);
    } else {
      throw new Error(
        `No component with name '${displayName}' was found at ${componentPath}. ` +
          `These are the exported component names: ${components.map(component => component.displayName).join(', ')}`,
      );
    }
  }
}
