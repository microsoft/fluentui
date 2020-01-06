import { IPackageGroup } from '../interfaces/index';

const fabricGroup: IPackageGroup = {
  globalName: 'Fabric',
  loadGlobal: () => import('office-ui-fabric-react'),
  packages: []
};
const hooksGroup: IPackageGroup = {
  globalName: 'FabricReactHooks',
  loadGlobal: () => import('@uifabric/react-hooks'),
  packages: []
};
const exampleDataGroup: IPackageGroup = {
  globalName: 'FabricExampleData',
  loadGlobal: () => import('@uifabric/example-data'),
  packages: []
};

let typesContext: __WebpackModuleApi.RequireContext | undefined;
try {
  // Other packages' typings are copied into dist/types by a build step.
  // Load all of those typings dynamically (lazy-once puts them in a chunk together).
  typesContext = require.context('!raw-loader!@uifabric/tsx-editor/dist/types', false, /.*\.d\.ts$/, 'lazy-once');
} catch (ex) {
  // We're probably running in jest, which doesn't have webpack's require.context
}
if (typesContext) {
  typesContext.keys().forEach(dtsPath => {
    // The api-extractor .d.ts rollups use the package's unscoped name (such as "utilities")
    // as the filename.
    // (example path: '!raw-loader!@uifabric/tsx-editor/dist/types/utilities.d.ts')
    const unscopedName = dtsPath.match(/\/(.*?)\.d\.ts$/)![1];
    const packageName = unscopedName === 'office-ui-fabric-react' ? unscopedName : '@uifabric/' + unscopedName;
    const packageGroup =
      packageName === '@uifabric/example-data' ? exampleDataGroup : packageName === '@uifabric/react-hooks' ? hooksGroup : fabricGroup;
    packageGroup.packages.push({
      packageName,
      loadTypes: () =>
        // raw-loader 0.x exports a single string, and later versions export a default.
        // The package.json specifies 0.x, but handle either just in case.
        typesContext!(dtsPath).then((result: string | { default: string }) => (typeof result === 'string' ? result : result.default))
    });
  });
} else {
  // Use some defaults for jest tests (real types won't be loaded)
  const loadTypes = () => '';
  fabricGroup.packages.push(
    { packageName: 'office-ui-fabric-react', loadTypes },
    { packageName: '@uifabric/foundation', loadTypes },
    { packageName: '@uifabric/icons', loadTypes },
    { packageName: '@uifabric/merge-styles', loadTypes },
    { packageName: '@uifabric/styling', loadTypes },
    { packageName: '@uifabric/utilities', loadTypes }
  );
  hooksGroup.packages.push({ packageName: '@uifabric/react-hooks', loadTypes });
  exampleDataGroup.packages.push({ packageName: '@uifabric/example-data', loadTypes });
}

/**
 * Default supported packages for imports: `office-ui-fabric-react` and everything it exports,
 * plus `@uifabric/example-data`. (React is implicitly supported.)
 */
export const SUPPORTED_PACKAGES: IPackageGroup[] = [fabricGroup, hooksGroup, exampleDataGroup];
