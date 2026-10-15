const BASE_HOOK_PATTERN = /^use\w+Base_unstable$/;

export interface EntryPointImport {
  /** Prefix for aliasing names exported by more than one entry point, eg. `ColorPicker` */
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

export function renderEntryPointsFixture(imports: EntryPointImport[], name: string): string {
  const usedBindings = new Set<string>();
  const importLines: string[] = [];
  const logged: string[] = [];

  for (const { namespace, moduleSpecifier, exports } of imports) {
    // an entry point without value exports is still imported, so an unresolvable subpath keeps failing the build
    if (exports.length === 0) {
      importLines.push(`import '${moduleSpecifier}';`);
      continue;
    }

    const specifiers = exports.map(exportName => {
      let binding = exportName;
      let suffix = 2;
      if (usedBindings.has(binding)) {
        binding = `${namespace}_${exportName}`;
      }
      while (usedBindings.has(binding)) {
        binding = `${namespace}_${exportName}${suffix}`;
        suffix += 1;
      }
      usedBindings.add(binding);
      logged.push(`  ${binding},`);

      return binding === exportName ? `  ${exportName},` : `  ${exportName} as ${binding},`;
    });

    importLines.push(`import {\n${specifiers.join('\n')}\n} from '${moduleSpecifier}';`);
  }

  return [
    '// Named imports only - a namespace import keeps every export name as a string property in the minified output,',
    '// which no consumer ships, and inflates the measured size.',
    ...importLines,
    '',
    'console.log(',
    ...logged,
    ');',
    '',
    renderMonosizeExport(name),
    '',
  ].join('\n');
}

export function renderBaseHooksFixture(imports: BaseHookImport[], name: string): string {
  const importLines = imports.map(
    ({ packageName, hooks }) => `import {\n${hooks.map(hook => `  ${hook},`).join('\n')}\n} from '${packageName}';`,
  );
  const logged = imports.flatMap(({ hooks }) => hooks).map(hook => `  ${hook},`);

  return [
    '// Named imports only - a namespace import would retain every styled component and defeat the isolation check.',
    ...importLines,
    '',
    'console.log(',
    ...logged,
    ');',
    '',
    renderMonosizeExport(name),
    '',
  ].join('\n');
}

function renderMonosizeExport(name: string): string {
  return `export default {\n  name: ${JSON.stringify(name)},\n};`;
}
