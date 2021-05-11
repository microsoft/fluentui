import * as React from 'react';

import { ExampleSource } from '../../../types';
import { examplesContext } from '../../../contexts/examplesContext';
import { exampleSourcesContext } from '../../../contexts/exampleSourcesContext';
import { componentAPIs, ComponentAPIs } from './componentAPIs';

const getExampleModule = (
  examplePath: string,
  componentAPI: keyof ComponentAPIs,
):
  | {
      defaultExport: React.ElementType;
      namedExports: { [key: string]: React.ElementType };
      source: ExampleSource;
    }
  | undefined => {
  const fileSuffix = componentAPIs[componentAPI].fileSuffix;

  const sourcePath = `${examplePath.replace(/^components/, '.')}${fileSuffix}.source.json`;
  const modulePath = `./${examplePath}${fileSuffix}.tsx`;

  try {
    return {
      defaultExport: examplesContext(modulePath).default,
      namedExports: examplesContext(modulePath),
      source: exampleSourcesContext(sourcePath),
    };
  } catch (e) {
    return null;
  }
};

export default getExampleModule;
