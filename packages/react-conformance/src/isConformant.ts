import * as fs from 'fs';

import { IsConformantOptions } from './types';
import { defaultTests } from './defaultTests';
import { merge } from './utils/merge';
import { createTsProgram } from './utils/createTsProgram';
import { getComponentDoc } from './utils/getComponentDoc';

export function isConformant<TProps = {}>(...testInfo: Partial<IsConformantOptions<TProps>>[]) {
  const mergedOptions = merge<IsConformantOptions>(...testInfo);
  const { componentPath, displayName, disabledTests = [], extraTests, tsconfigDir } = mergedOptions;

  describe('isConformant', () => {
    if (!fs.existsSync(componentPath)) {
      throw new Error(`Path ${componentPath} does not exist`);
    }

    const tsProgram = createTsProgram(componentPath, tsconfigDir);

    const components = getComponentDoc(componentPath, tsProgram);
    const mainComponents = components.filter(comp => comp.displayName === displayName);

    if (mainComponents.length === 1) {
      const componentInfo = mainComponents[0];

      for (const test of Object.keys(defaultTests)) {
        if (!disabledTests.includes(test)) {
          defaultTests[test](componentInfo, mergedOptions, tsProgram);
        }
      }

      if (extraTests) {
        describe('extraTests', () => {
          for (const test of Object.keys(extraTests)) {
            if (!disabledTests.includes(test)) {
              extraTests[test](componentInfo, mergedOptions, tsProgram);
            }
          }
        });
      }
    } else if (components.length === 0) {
      throw new Error(`No exported components found at path: ${componentPath}`);
    } else {
      throw new Error(
        `No component with name "${displayName}" was found at "${componentPath}".\n\n` +
          'These are the exported component names: ' +
          components.map(component => component.displayName).join(', '),
      );
    }
  });
}
