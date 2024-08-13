import * as fs from 'fs';

import { BaseConformanceTest, ConformanceTest, DefaultTestObject, IsConformantOptions } from './types';
import { defaultTests } from './defaultTests';
import { merge } from './utils/merge';
import { createTsProgram } from './utils/createTsProgram';
import { getComponentDoc } from './utils/getComponentDoc';

export function isConformant<TProps = {}>(...testInfo: Partial<IsConformantOptions<TProps>>[]) {
  const mergedOptions = merge<IsConformantOptions>(...testInfo);

  const {
    componentPath,
    displayName,
    disabledTests = [],
    extraTests,
    tsConfig,
    // eslint-disable-next-line deprecation/deprecation
    tsconfigDir,
    disableTypeTests,
  } = mergedOptions;

  const mergedTsConfig = {
    configDir: tsConfig?.configDir ?? tsconfigDir,
    configName: tsConfig?.configName,
  };

  describe('isConformant', () => {
    if (!fs.existsSync(componentPath)) {
      throw new Error(`Path ${componentPath} does not exist`);
    }

    if (disableTypeTests) {
      runNonTypeTests(mergedOptions);
      return;
    }

    const tsProgram = createTsProgram(componentPath, mergedTsConfig);

    const components = getComponentDoc(componentPath, tsProgram);
    const mainComponents = components.filter(comp => comp.displayName === displayName);

    if (mainComponents.length === 1) {
      const componentInfo = mainComponents[0];

      for (const test of Object.keys(defaultTests)) {
        if (!disabledTests.includes(test)) {
          defaultTests[test as keyof DefaultTestObject](mergedOptions, componentInfo, tsProgram);
        }
      }

      if (extraTests) {
        describe('extraTests', () => {
          for (const test of Object.keys(extraTests)) {
            if (!disabledTests.includes(test)) {
              extraTests[test](mergedOptions, componentInfo, tsProgram);
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

/**
 * Run default and extra tests that don't require TypeScript information
 * @param mergedOptions
 */
function runNonTypeTests(mergedOptions: IsConformantOptions) {
  const { disabledTests = [], extraTests } = mergedOptions;

  for (const test of Object.keys(defaultTests)) {
    if (!disabledTests.includes(test)) {
      const func = defaultTests[test as keyof DefaultTestObject];
      if (isNonTypeTest(func)) {
        func(mergedOptions);
      }
    }
  }

  if (extraTests) {
    describe('extraTests', () => {
      for (const test of Object.keys(extraTests)) {
        if (!disabledTests.includes(test)) {
          const func = extraTests[test];
          if (isNonTypeTest(func)) {
            func(mergedOptions);
          }
        }
      }
    });
  }
}

/**
 * Verifies that a test function has only one parameter. If so, this test does not require TS info.
 */
function isNonTypeTest<TProps = {}>(func: ConformanceTest<TProps>): func is BaseConformanceTest<TProps> {
  return func.length === 1;
}
