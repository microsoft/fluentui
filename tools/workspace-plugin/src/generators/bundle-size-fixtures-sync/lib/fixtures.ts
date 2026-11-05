const BASE_HOOK_PATTERN = /^use\w+Base_unstable$/;

export interface NamedImport {
  /** Prefix for aliasing names exported by more than one module, eg. `ColorPicker` */
  namespace: string;
  /** Module specifier, eg. `@fluentui/react-headless-components-preview/color-picker` */
  moduleSpecifier: string;
  /** Value exports of the entry point, eg. `['ColorArea', 'ColorPicker', ...]` */
  exports: string[];
}

export interface BaseHookImport {
  packageName: string;
  hooks: string[];
}

export function isBaseHook(exportName: string): boolean {
  return BASE_HOOK_PATTERN.test(exportName);
}

/** `color-picker` -> `ColorPicker` */
export function toNamespaceBinding(subpath: string): string {
  return subpath
    .split(/[-/]/)
    .map(segment => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
}

export function renderEntryPointsFixture(imports: NamedImport[], name: string): string {
  return renderNamedImportsFixture(
    imports,
    name,
    [
      '// Named imports only - a namespace import keeps every export name as a string property in the minified output,',
      '// which no consumer ships, and inflates the measured size.',
    ],
    true,
  );
}

export function renderBaseHooksFixture(imports: BaseHookImport[], name: string): string {
  return renderNamedImportsFixture(
    imports.map(({ packageName, hooks }) => ({
      namespace: toNamespaceBinding(packageName),
      moduleSpecifier: packageName,
      exports: hooks,
    })),
    name,
    ['// Named imports only - a namespace import would retain every styled component and defeat the isolation check.'],
    false,
  );
}

function renderNamedImportsFixture(
  imports: NamedImport[],
  name: string,
  comments: string[],
  allowBareImports: boolean,
): string {
  const reservedBindings = new Set(imports.flatMap(entry => entry.exports.filter(name => name !== 'default')));
  const usedBindings = new Set<string>();
  const importLines: string[] = [];
  const logged: string[] = [];

  for (const { namespace, moduleSpecifier, exports } of imports) {
    if (exports.length === 0) {
      if (allowBareImports) {
        // Keep subpaths without value exports in the fixture so an unresolvable entry still fails the build.
        importLines.push(`import '${moduleSpecifier}';`);
      }
      continue;
    }

    const specifiers = exports.map(exportName => {
      let binding = exportName === 'default' ? `${namespace}_default` : exportName;
      let suffix = 2;
      if (usedBindings.has(binding) || (binding !== exportName && reservedBindings.has(binding))) {
        binding = `${namespace}_${exportName}`;
      }
      while (usedBindings.has(binding) || (binding !== exportName && reservedBindings.has(binding))) {
        binding = `${namespace}_${exportName}${suffix}`;
        suffix += 1;
      }
      usedBindings.add(binding);
      logged.push(`  ${binding},`);

      return binding === exportName ? `  ${exportName},` : `  ${exportName} as ${binding},`;
    });

    importLines.push(`import {\n${specifiers.join('\n')}\n} from '${moduleSpecifier}';`);
  }

  return [...comments, ...importLines, '', 'console.log(', ...logged, ');', '', renderMonosizeExport(name), ''].join(
    '\n',
  );
}

function renderMonosizeExport(name: string): string {
  return `export default {\n  name: ${JSON.stringify(name)},\n};`;
}
