import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs';

/** Map from component name to alternative package name from which it should import a version file */
const componentPackageMap: { [componentName: string]: string } = {
  FocusZone: '@fluentui/react-focus',
};

describe('Top Level Component File Conformance', () => {
  const privateComponents = new Set<string>();
  privateComponents.add('ContextualMenuItemWrapper');

  const components: string[] = glob
    .sync(path.resolve(process.cwd(), 'src/components/**/index.ts*'))
    .map(file => {
      const componentName = path.basename(path.dirname(file));
      return componentName[0] === componentName[0].toUpperCase() ? path.basename(path.dirname(file)) : '';
    })
    .filter(f => f && !privateComponents.has(f));

  const topLevelComponentFiles = components
    .map(f => {
      for (const fileName of [`${f}.ts`, `${f}.tsx`]) {
        const fullPath = path.resolve(__dirname, '..', fileName);
        if (fs.existsSync(fullPath)) {
          return fullPath;
        }
      }
      return '';
    })
    .filter(f => f);

  beforeEach(() => {
    jest.resetModules();
  });

  // make sure that there is a version import in each corresponding top level component file
  topLevelComponentFiles.forEach(file => {
    const componentName = path.basename(file).split('.')[0];
    const packageName = componentPackageMap[componentName] || '@fluentui/react';

    it(`${componentName} imports the ${packageName} version file`, () => {
      (window as any).__packages__ = null;
      require(file);
      expect((window as any).__packages__[packageName]).not.toBeUndefined();
    });
  });
});
