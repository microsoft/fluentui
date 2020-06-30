import { runComponentToCompat, buildCompatHash, rawCompat, IComponentToCompat, getNamedExports } from './CompatHelpers';
import { ICodeMod } from '../../ICodeMod';
import { SourceFile } from 'ts-morph';

// Not sure if this the best way to get all the things exported from button. It's dependent on version
// And other things. Ideally we'd be able to get it from within ts-morph.
import * as ButtonImports from 'office-ui-fabric-react/lib/Button';

//const defaultSearchRegex = /^office\-ui\-fabric\-react/;
const fabricindex = 'office-ui-fabric-react';
const completePath = 'office-ui-fabric-react/lib/';
const newPathStart = '@fluentui/react/lib/compat/';
const exportMapping: rawCompat[] = [{ componentName: 'Button', namedExports: ButtonImports }];
const getPath = (root: string, componentName: string) => {
  return `${root}${componentName}`;
};
export const createComponentToCompat = (comp: rawCompat): IComponentToCompat => {
  return {
    oldPath: getPath(completePath, comp.componentName),
    newComponentPath: getPath(newPathStart, comp.componentName),
    namedExports: getNamedExports(comp.namedExports),
  };
};
const ComponentToCompat: ICodeMod = {
  run: (file: SourceFile) => {
    runComponentToCompat(file, buildCompatHash(exportMapping, createComponentToCompat), fabricindex);
    return { success: true };
  },
  name: 'ComponentToCompat',
  version: '1.0.0',
  enabled: true,
};
export default ComponentToCompat;
