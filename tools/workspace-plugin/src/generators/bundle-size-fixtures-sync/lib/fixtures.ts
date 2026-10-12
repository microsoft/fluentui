const BASE_HOOK_PATTERN = /^use\w+Base_unstable$/;

export interface EntryPointImport {
  /** Namespace binding, eg. `ColorPicker` */
  namespace: string;
  /** Module specifier, eg. `@fluentui/react-headless-components-preview/color-picker` */
  moduleSpecifier: string;
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
  const reservedNamespaces = new Set(imports.map(entry => entry.namespace));
  const usedNamespaces = new Set<string>();
  const uniqueImports = imports.map(entry => {
    let namespace = entry.namespace;
    let suffix = 2;
    while (usedNamespaces.has(namespace) || (namespace !== entry.namespace && reservedNamespaces.has(namespace))) {
      namespace = `${entry.namespace}${suffix}`;
      suffix += 1;
    }
    usedNamespaces.add(namespace);
    return { ...entry, namespace };
  });

  const importLines = uniqueImports.map(
    ({ namespace, moduleSpecifier }) => `import * as ${namespace} from '${moduleSpecifier}';`,
  );
  const logged = uniqueImports.map(({ namespace }) => `  ${namespace},`);

  return [...importLines, '', 'console.log({', ...logged, '});', '', renderMonosizeExport(name), ''].join('\n');
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
