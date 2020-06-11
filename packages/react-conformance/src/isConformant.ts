import { TestObject, TestingOptions } from './types';
import { withCustomConfig } from 'react-docgen-typescript';
import * as path from 'path';
import { defaultTests } from './defaultTests';

export function isConformant(componentPath: string, options: TestingOptions, extraTests?: TestObject) {
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
  const parser = withCustomConfig(tsconfigPath, {});
  const components = parser.parse(componentPath);

  if (components.length === 1) {
    const componentInfo = components[0];

    for (const test in defaultTests) {
      if (test) {
        defaultTests[test](componentInfo, componentPath, options);
      }
    }
    if (extraTests) {
      for (const test in extraTests) {
        if (test) {
          extraTests[test](componentInfo, componentPath, options);
        }
      }
    }
  } else {
    if (components.length === 0) {
      throw Error('No component found in path: ' + componentPath);
    }
    // heuristic to handle multiple components
  }
}
