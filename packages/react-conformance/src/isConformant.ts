import * as fs from 'fs';

import { IsConformantOptions } from './types';
import { defaultTests } from './defaultTests';
import { merge } from './utils/merge';
import { getComponentDoc } from './utils/getComponentDoc';

export function isConformant(...testInfo: Partial<IsConformantOptions>[]) {
  const mergedOptions = merge<IsConformantOptions>(...testInfo);
  const { componentPath, displayName, disabledTests = [], extraTests, isInternal } = mergedOptions;
  if (!fs.existsSync(componentPath)) {
    throw new Error(`Path ${componentPath} does not exist`);
  }

  const components = getComponentDoc(componentPath);
  const mainComponents = components.filter(comp => comp.displayName === displayName);

  if (mainComponents.length === 1) {
    const componentInfo = mainComponents[0];

    if (isInternal) {
      disabledTests.push('exported-top-level');
    }

    for (const test of Object.keys(defaultTests)) {
      if (!disabledTests.includes(test)) {
        defaultTests[test](componentInfo, mergedOptions);
      }
    }
    if (extraTests) {
      for (const test of Object.keys(extraTests)) {
        extraTests[test](componentInfo, mergedOptions);
      }
    }
  } else if (components.length === 0) {
    throw new Error('No exported components in path: ' + componentPath);
  } else {
    throw new Error(
      `No component with name '${displayName}' was found at ${componentPath}. ` +
        `These are the exported component names: ${components.map(component => component.displayName).join(', ')}`,
    );
  }
}
