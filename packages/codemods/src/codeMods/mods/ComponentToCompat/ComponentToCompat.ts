import { SourceFile, Project } from 'ts-morph';
import { ICodeMod } from '../../ICodeMod';
import { utilities } from '../../utilities/utilities';
//import { Button } from 'office-ui-fabric-react/lib/Button';
// Not sure if this the best way to get all the things exported from button. It's dependent on version
// And other things. Ideally we'd be able to get it from within ts-morph.
//import * as ButtonImports from 'office-ui-fabric-react/lib/Button';

const defaultSearchRegex = /^office\-ui\-fabric\-react/;
const completePath = 'office-ui-fabric-react/lib/';
const newPathStart = '@fluentui/react/lib/compat/';

const getNamedExports = (obj: { [key: string]: any }) => {
  return Object.keys(obj);
};

export interface IComponentToCompat {
  // IE Button for the Buttons because
  // office-ui-fabric-react/lib/Button is
  // Where all of button is exported from
  componentName: string;

  oldPath: string;

  // The complete path that should either just replace the old one,
  // Or be where all the compats are imported from.
  newComponentPath: string;

  // All the components, names, and other things that are exported
  // from that root folder and that should get repathed
  namedExports: string[];
}

interface rawCompat {
  component: string;
  exports: { [key: string]: any };
}
const exportMapping: rawCompat[] = [{ component: 'Button', exports: {} }];

const getPath = (root: string, componentName: string) => {
  return `${root}${componentName}`;
};

const createComponentToCompat = (componentName: string, exports: { [key: string]: any }): IComponentToCompat => {
  return {
    componentName: componentName,
    oldPath: getPath(completePath, componentName),
    newComponentPath: getPath(newPathStart, componentName),
    namedExports: getNamedExports(exports),
  };
};

const ComponentToCompat: ICodeMod = {
  run: (file: SourceFile, renames: rawCompat[] = exportMapping, getReplacement = createComponentToCompat) => {
    let indexImport = utilities.getImportsByPath(file, defaultSearchRegex);
    renames
      .map(val => {
        return getReplacement(val.component, val.exports);
      })
      .forEach(compat => {
        let imports = utilities.getImportsByPath(file, compat.oldPath);
        imports.forEach(val => {
          let path = val.getModuleSpecifierValue();
          utilities.repathImport(val, compat.newComponentPath);
        });
      });

    return { success: true };
  },
  name: 'ComponentToCompat',
  version: '1.0.0',
  enabled: true,
};
export const __forTest = { getNamedExports };
export default ComponentToCompat;
