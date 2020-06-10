// import * as React from 'react';
import { ConformanceTest, TestingOptions } from './types';
import { withCustomConfig } from 'react-docgen-typescript';
import * as path from 'path';
import { defaultTests } from './defaultTests';

export function isConformant(componentPath: string, options: TestingOptions, extraTests?: ConformanceTest[]) {
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
  const parser = withCustomConfig(tsconfigPath, {});
  const components = parser.parse(componentPath);

  if (components.length === 1) {
    const componentInfo = components[0];

    defaultTests.forEach(test => {
      test(componentInfo, componentPath, options);
    });

    if (extraTests) {
      extraTests?.forEach(test => {
        test(componentInfo, componentPath, options);
      });
    }
  } else {
    if (components.length === 0) {
      throw Error('No component found in path: ' + componentPath);
    }
    // heuristic to handle multiple components
  }
}
