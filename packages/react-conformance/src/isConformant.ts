import { TestObject, TestingOptions } from './types';
import { withCustomConfig } from 'react-docgen-typescript';
import * as path from 'path';
import { defaultTests } from './defaultTests';

export function isConformant(testInfo: TestingOptions, extraTests?: TestObject) {
  const { componentPath, displayName } = testInfo;
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
  const parser = withCustomConfig(tsconfigPath, {});
  const components = parser.parse(componentPath);
  const mainComponents = components.filter(comp => comp.displayName === displayName);

  if (mainComponents.length === 1) {
    const componentInfo = mainComponents[0];

    for (const test of Object.keys(defaultTests)) {
      defaultTests[test](componentInfo, testInfo);
    }
    if (extraTests) {
      for (const test of Object.keys(extraTests)) {
        extraTests[test](componentInfo, testInfo);
      }
    }
  } else {
    if (components.length === 0) {
      throw Error('No exported components in path: ' + componentPath);
    } else {
      throw Error(
        `No component with name '${displayName}' was found, these are the exported components: {${components
          .map(component => {
            return component.displayName;
          })
          .toString()}} in path ${componentPath}`,
      );
    }
  }
}
