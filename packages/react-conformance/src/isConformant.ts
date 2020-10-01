import * as fs from 'fs';

import { IsConformantOptions } from './types';
import { defaultTests } from './defaultTests';
import { defaultErrorMessages } from './defaultErrorMessages';
import { merge } from './utils/merge';
import chalk from 'chalk';
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

    describe('isConformant', () => {
      afterAll(() => {
        defaultErrorMessages['display-failed-tests'](componentInfo, mergedOptions);
      });

      for (const test of Object.keys(defaultTests)) {
        if (!disabledTests.includes(test)) {
          defaultTests[test](componentInfo, mergedOptions);
        }
      }
    });

    if (extraTests) {
      describe('isConformant - extraTests', () => {
        for (const test of Object.keys(extraTests)) {
          extraTests[test](componentInfo, mergedOptions);
        }
      });
    }
  } else if (components.length === 0) {
    console.log(chalk.yellow(`No exported components in path: `) + paragraph() + chalk.green.italic(componentPath));
    throw new Error('No exported components in path');
  } else {
    console.log(
      chalk.yellow(`No component with name `) +
        chalk.hex('#e00000')(displayName) +
        chalk.yellow(' was found at:') +
        paragraph() +
        chalk.green.italic(componentPath) +
        paragraph() +
        'These are the exported component names:' +
        paragraph() +
        chalk.white.bold.italic.bgHex('#2e2e2e')(components.map(component => component.displayName).join(', ')),
    );
    throw new Error(`No component was found that matches the displayName.`);
  }
}

function paragraph() {
  return `

`;
}
