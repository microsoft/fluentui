import { runComponentToCompat, buildCompatHash, ComponentToCompat, RawCompat, getNamedExports } from './compatHelpers';
import { ExportMapping } from './namedExports';
import { CodeMod } from '../../types';
import { SourceFile } from 'ts-morph';
import { Ok } from '../../../helpers/result';

const fabricindex = 'office-ui-fabric-react';
const completePath = 'office-ui-fabric-react/lib/';
const newPathStart = '@fluentui/react/lib/compat/';

function getPath(root: string, componentName: string) {
  return `${root}${componentName}`;
}

export function createComponentToCompat(comp: RawCompat): ComponentToCompat {
  return {
    oldPath: getPath(completePath, comp.componentName),
    newComponentPath: getPath(newPathStart, comp.componentName),
    namedExports: getNamedExports(comp.namedExports),
  };
}

const ComponentToCompat: CodeMod = {
  run: (file: SourceFile) => {
    runComponentToCompat(file, buildCompatHash(ExportMapping, createComponentToCompat), fabricindex);
    return Ok({ logs: ['Moved imports to compat'] });
  },
  name: 'ComponentToCompat',
  version: '1.0.0',
  enabled: false, // No longer needed; remains for demo purposes
};

export default ComponentToCompat;
