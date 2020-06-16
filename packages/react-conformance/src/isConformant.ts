import * as React from 'react';
import { IsConformantOptions, ConformanceTest } from './types';

export function isConformant(
  Component: React.ComponentType,
  options: IsConformantOptions,
  extraTests?: ConformanceTest[],
) {
  // const { constructorName, exportedAtTopLevel = true, packageRoot } = options;
  // if (extraTests) {
  //   extraTests.forEach((test: ConformanceTest) => {
  //     test();
  //   });
  // }
}
