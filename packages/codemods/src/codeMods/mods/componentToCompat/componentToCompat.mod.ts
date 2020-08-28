import { runComponentToCompat, buildCompatHash, RawCompat, ComponentToCompat, getNamedExports } from './compatHelpers';
import { CodeMod } from '../../types';
import { SourceFile } from 'ts-morph';
import { Ok } from '../../../helpers/result';

// Not sure if this the best way to get all the things exported from button. It's dependent on version
// And other things. Ideally we'd be able to get it from within ts-morph.
// For some reason button and pivot don't work, need to investigate why
// import * as Button from 'office-ui-fabric-react/lib-commonjs/Button';
// import * as Pivot from 'office-ui-fabric-react/lib-commonjs/Pivot';
import * as Checkbox from 'office-ui-fabric-react/lib-commonjs/Checkbox';
import * as Link from 'office-ui-fabric-react/lib-commonjs/Link';
import * as Slider from 'office-ui-fabric-react/lib-commonjs/Slider';
import * as Toggle from 'office-ui-fabric-react/lib-commonjs/Toggle';

const exportMapping: RawCompat[] = [
  // { componentName: 'Button', namedExports: Button },
  // { componentName: 'Pivot', namedExports: Pivot },
  { componentName: 'Checkbox', namedExports: Checkbox },
  { componentName: 'Link', namedExports: Link },
  { componentName: 'Slider', namedExports: Slider },
  { componentName: 'Toggle', namedExports: Toggle },
];

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
    runComponentToCompat(file, buildCompatHash(exportMapping, createComponentToCompat), fabricindex);
    return Ok({ logs: ['Moved imports to compat'] });
  },
  name: 'ComponentToCompat',
  version: '1.0.0',
  enabled: true,
};

export default ComponentToCompat;
