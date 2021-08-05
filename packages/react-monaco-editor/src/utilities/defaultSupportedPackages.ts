import { IPackageGroup } from '../interfaces/index';

const fabricGroup: IPackageGroup = {
  globalName: 'FluentUIReact',
  // Theoretically we could use import() here, but that pulls things into bundles when using
  // commonjs modules due to the way import is transpiled for commonjs
  // https://github.com/webpack/webpack/issues/5703#issuecomment-357512412
  loadGlobal: cb => require.ensure([], require => cb(require('@fluentui/react'))),
  packages: [],
};
const hooksGroup: IPackageGroup = {
  globalName: 'FluentUIReactHooks',
  loadGlobal: cb => require.ensure([], require => cb(require('@fluentui/react-hooks'))),
  packages: [],
};
const exampleDataGroup: IPackageGroup = {
  globalName: 'FluentUIExampleData',
  loadGlobal: cb => require.ensure([], require => cb(require('@fluentui/example-data'))),
  packages: [],
};

let typesContext: __WebpackModuleApi.RequireContext | undefined;
try {
  // Other packages' typings are copied into dist/types by a build step.
  // Load all of those typings dynamically (lazy-once puts them in a chunk together).
  typesContext = require.context(
    '!raw-loader?esModule=false!@fluentui/react-monaco-editor/dist/types',
    false,
    /.*\.d\.ts$/,
    'lazy-once',
  );
} catch (ex) {
  // We're probably running in jest, which doesn't have webpack's require.context
}
if (typesContext) {
  typesContext.keys().forEach(dtsPath => {
    // The api-extractor .d.ts rollups use the package's unscoped name (such as "utilities")
    // as the filename.
    // (example path: '!raw-loader?esModule=false!@fluentui/react-monaco-editor/dist/types/utilities.d.ts')
    const unscopedName = dtsPath.match(/\/(.*?)\.d\.ts$/)![1];
    const packageName = `@fluentui/${unscopedName}`;
    const packageGroup =
      packageName === '@fluentui/example-data'
        ? exampleDataGroup
        : packageName === '@fluentui/react-hooks'
        ? hooksGroup
        : fabricGroup;
    packageGroup.packages.push({
      packageName,
      loadTypes: () =>
        // raw-loader 0.x exports a single string, and later versions export a default.
        // The package.json specifies 0.x, but handle either just in case.
        typesContext!(dtsPath).then((result: string | { default: string }) =>
          typeof result === 'string' ? result : result.default,
        ),
    });
  });
} else {
  // Use some defaults for jest tests (real types won't be loaded)
  const loadTypes = () => '';
  fabricGroup.packages.push(
    // TODO: this probably needs to be dynamically generated so it doesn't break every time we
    // add a new component package exported by @fluentui/react
    { packageName: '@fluentui/font-icons-mdl2', loadTypes },
    { packageName: '@fluentui/foundation-legacy', loadTypes },
    { packageName: '@fluentui/merge-styles', loadTypes },
    { packageName: '@fluentui/react', loadTypes },
    { packageName: '@fluentui/date-time-utilities', loadTypes },
    { packageName: '@fluentui/react-focus', loadTypes },
    { packageName: '@fluentui/style-utilities', loadTypes },
    { packageName: '@fluentui/utilities', loadTypes },
  );
  hooksGroup.packages.push({ packageName: '@fluentui/react-hooks', loadTypes });
  exampleDataGroup.packages.push({ packageName: '@fluentui/example-data', loadTypes });
}

/**
 * Default supported packages for imports: `@fluentui/react` and everything it exports,
 * plus `@fluentui/example-data`. (React is implicitly supported.)
 */
export const SUPPORTED_PACKAGES: IPackageGroup[] = [fabricGroup, hooksGroup, exampleDataGroup];
