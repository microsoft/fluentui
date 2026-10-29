import * as fs from 'node:fs';
import * as path from 'node:path';
import * as ts from 'typescript';

/**
 * Public API conformance of the package.
 *
 * Every component is shipped from a subpath entry point (`src/<kebab-name>.ts`). The tests below make sure that each
 * entry point exports everything needed to compose its components again (state hooks, render functions, context
 * values hooks, context consumer hooks and the types used by all of them), and nothing else.
 */

type Rule = 'buildingBlocks' | 'contextHooks' | 'referencedTypes' | 'unnecessaryExports' | 'disallowedExports';

type EntryPoint = {
  /** Entry point name, e.g. `tag-picker` for `src/tag-picker.ts` and the `./tag-picker` export map entry. */
  name: string;
  /** Exported symbols keyed by their public name, with re-exports resolved to the original declarations. */
  exports: Map<string, ts.Symbol>;
};

/**
 * Exports which don't follow the component conventions but are an intentional part of the public API.
 */
const ADDITIONAL_EXPORTS: Record<string, string[]> = {
  'avatar-group': ['partitionAvatarGroupItems'],
  calendar: ['calendarFormatters', 'createCalendarDateTimeFormatter'],
  combobox: ['useComboboxFilter'],
  field: ['useFieldControlProps'],
  link: ['linkContextDefaultValue'],
  overflow: [
    'useOverflowMenu',
    'useOverflowCount',
    'useIsOverflowItemVisible',
    'useIsOverflowGroupVisible',
    'useOverflowVisibility',
    'DATA_OVERFLOWING',
    'DATA_OVERFLOW_ITEM',
    'DATA_OVERFLOW_MENU',
    'DATA_OVERFLOW_DIVIDER',
  ],
  positioning: ['usePositioning', 'POSITIONS', 'ALIGNMENTS', 'getPlacementString', 'resolvePositioningShorthand'],
  'tag-picker': ['useTagPickerFilter'],
  toast: ['useToastController'],
  utils: ['toDataAttributeValue'],
};

/**
 * Violations that exist today. Fix them by updating the entry point and remove them from here: the tests fail when a
 * listed violation no longer occurs, so this list can only shrink.
 */
const KNOWN_VIOLATIONS: Record<string, Partial<Record<Rule, string[]>>> = {
  // Removing these exports is a breaking change.
  calendar: {
    unnecessaryExports: ['CalendarYearRange', 'MonthOfYear'],
  },
  nav: {
    unnecessaryExports: ['NavCategoryContextValue'],
  },
  // Renaming this export is a breaking change.
  'tag-picker': {
    disallowedExports: ['useTagPickerContext_unstable'],
  },
  // The base packages don't export consumer hooks for these contexts.
  combobox: {
    contextHooks: ['useComboboxContextValues().combobox'],
  },
  dropdown: {
    contextHooks: ['useDropdownContextValues().combobox'],
  },
  list: {
    contextHooks: ['useListContextValues().synchronousContext'],
  },
  menu: {
    contextHooks: ['useMenuSplitGroupContextValues().menuSplitGroup'],
  },
  provider: {
    contextHooks: [
      'useProviderContextValues().customStyleHooks_unstable',
      'useProviderContextValues().overrides_unstable',
      'useProviderContextValues().iconDirection',
      'useProviderContextValues().tooltip',
    ],
  },
  'teaching-popover': {
    contextHooks: [
      'useTeachingPopoverContextValues().basePopover',
      'useTeachingPopoverCarouselContextValues().carousel',
    ],
  },
  // `OverflowItem`, `OverflowDivider` and `OverflowReorderObserver` are re-exported from `@fluentui/react-overflow`,
  // which doesn't split them into hooks and render functions.
  overflow: {
    buildingBlocks: [
      'renderOverflowItem',
      'OverflowItemState',
      'renderOverflowDivider',
      'OverflowDividerState',
      'useOverflowReorderObserver',
      'renderOverflowReorderObserver',
      'OverflowReorderObserverProps',
      'OverflowReorderObserverState',
    ],
  },
};

/**
 * Declarations from these modules are generic building blocks (React, DOM, slot, ARIA and context-selector utilities)
 * which consumers import from their own packages, so entry points don't need to re-export them.
 */
const EXTERNAL_TYPE_SOURCES = [
  /[\\/]node_modules[\\/]/,
  /[\\/]react-utilities[\\/]/,
  /[\\/]react-jsx-runtime[\\/]/,
  /[\\/]react-context-selector[\\/]/,
  /[\\/]react-aria[\\/]/,
  /[\\/]react-tabster[\\/]/,
  /[\\/]keyboard-keys[\\/]/,
];

const packageRoot = path.resolve(__dirname, '../..');
const srcRoot = path.join(packageRoot, 'src');

const entryPointFiles = fs
  .readdirSync(srcRoot)
  .filter(fileName => fileName.endsWith('.ts') && fileName !== 'index.ts' && !/\.(test|spec)\.ts$/.test(fileName));

const typeOnlyExportsFixture = path.join(__dirname, '__fixtures__', 'typeOnlyExports.ts');

const program = createProgram([
  ...['index.ts', ...entryPointFiles].map(fileName => path.join(srcRoot, fileName)),
  typeOnlyExportsFixture,
]);
const checker = program.getTypeChecker();

const entryPoints: EntryPoint[] = entryPointFiles.map(fileName => ({
  name: fileName.replace(/\.ts$/, ''),
  exports: getModuleExports(path.join(srcRoot, fileName)),
}));

// Context hooks and types can be imported from any entry point, e.g. `MessageBarActions` provides the context consumed
// by `useButtonContext` exported from `/button`.
const packageExports = entryPoints.flatMap(entryPoint => [...entryPoint.exports]);
const packageHooks = packageExports.filter(([name, symbol]) => isValue(symbol) && /^use[A-Z]/.test(name));
const packageTypeSymbols = new Set(
  packageExports.filter(([, symbol]) => !isValue(symbol) && !isTypeOnlyValueExport(symbol)).map(([, symbol]) => symbol),
);
const packageTypes = [...packageTypeSymbols].map(symbol => checker.getDeclaredTypeOfSymbol(symbol));

describe('public API', () => {
  it('ships every entry point through the export map', () => {
    const packageJson = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf-8'));
    const exportMapEntries = Object.keys(packageJson.exports).filter(key => key !== '.' && key !== './package.json');

    expect(exportMapEntries.sort()).toEqual(entryPoints.map(entryPoint => `./${entryPoint.name}`).sort());
  });

  it('does not export anything from the root entry point', () => {
    expect([...getModuleExports(path.join(srcRoot, 'index.ts')).keys()]).toEqual([]);
  });

  it('does not accept type-only re-exports of runtime values', () => {
    const violations = analyzeEntryPoint({ name: 'fixture', exports: getModuleExports(typeOnlyExportsFixture) });

    expect(violations.buildingBlocks).toContain('useDialog');
    expect(violations.disallowedExports).toEqual(['useDialog']);
  });

  it('only lists existing entry points in ADDITIONAL_EXPORTS and KNOWN_VIOLATIONS', () => {
    const names = entryPoints.map(entryPoint => entryPoint.name);
    const listed = [...Object.keys(ADDITIONAL_EXPORTS), ...Object.keys(KNOWN_VIOLATIONS)];

    expect(listed.filter(name => !names.includes(name))).toEqual([]);
  });

  describe.each(entryPoints)('$name', entryPoint => {
    const violations = analyzeEntryPoint(entryPoint);

    it('exports the hooks, render function and types of every component', () => {
      expectViolations(entryPoint, 'buildingBlocks', violations.buildingBlocks);
    });

    it('exports a consumer hook for every context provided by its components', () => {
      expectViolations(entryPoint, 'contextHooks', violations.contextHooks);
    });

    it('exports every type used by its hooks and render functions', () => {
      expectViolations(entryPoint, 'referencedTypes', violations.referencedTypes);
    });

    it('has no unnecessary exports', () => {
      expectViolations(entryPoint, 'unnecessaryExports', violations.unnecessaryExports);
    });

    it('has no style hooks, class names, raw contexts or unstable exports', () => {
      expectViolations(entryPoint, 'disallowedExports', violations.disallowedExports);
    });
  });
});

function expectViolations(entryPoint: EntryPoint, rule: Rule, violations: string[]) {
  const known = KNOWN_VIOLATIONS[entryPoint.name]?.[rule] ?? [];

  expect({
    new: violations.filter(violation => !known.includes(violation)),
    fixed: known.filter(violation => !violations.includes(violation)),
  }).toEqual({ new: [], fixed: [] });
}

function analyzeEntryPoint({ name, exports }: EntryPoint): Record<Rule, string[]> {
  const values = [...exports].filter(([, symbol]) => isValue(symbol));
  const additionalExports = ADDITIONAL_EXPORTS[name] ?? [];

  const components = values.filter(([exportName, symbol]) => isComponent(exportName, symbol)).map(([n]) => n);
  const contextProviders = values.filter(([, symbol]) => isContextProvider(symbol)).map(([n]) => n);

  // 1. Every component `X` follows the `useX`/`renderX` naming, and all functions it is composed of are exported.
  const exportNames = new Map([...exports].map(([exportName, symbol]) => [symbol, exportName]));
  const buildingBlocks = new Set<string>();
  const missingBuildingBlocks: string[] = [];
  const contextValuesHooks = new Set<ts.Symbol>(
    values.filter(([exportName]) => /^use[A-Z]\w*ContextValues$/.test(exportName)).map(([, symbol]) => symbol),
  );

  for (const component of components) {
    const required = [`use${component}`, `render${component}`, `${component}Props`, `${component}State`];

    const state = exports.get(`${component}State`);
    if (state && checker.getDeclaredTypeOfSymbol(state).getProperty('components')) {
      required.push(`${component}Slots`);
    }

    required.forEach(requiredName => buildingBlocks.add(requiredName));
    missingBuildingBlocks.push(
      ...required.filter(requiredName => {
        const symbol = exports.get(requiredName);
        // Hooks and render functions are called at runtime, so they need to be value exports.
        return !symbol || (/^(use|render)[A-Z]/.test(requiredName) && !isValue(symbol));
      }),
    );

    const composition = getComposition(exports.get(component)!);
    for (const part of composition.parts) {
      const exportName = exportNames.get(part);

      if (exportName) {
        buildingBlocks.add(exportName);
      } else {
        missingBuildingBlocks.push(part.name);
      }
    }
    composition.contextValuesHooks.forEach(hook => contextValuesHooks.add(hook));

    // Custom render functions need to name the type of the context values they receive.
    const render = exports.get(`render${component}`);
    for (const signature of render ? getCallSignatures(render) : []) {
      const declaration = signature.getDeclaration() as ts.SignatureDeclaration | undefined;
      const contextValues = declaration?.parameters[1];

      if (contextValues && !(contextValues.type && ts.isTypeReferenceNode(contextValues.type))) {
        missingBuildingBlocks.push(`render${component}(state, contextValues: <named type>)`);
      }
    }
  }

  // 2. Every context provided by a component can be consumed with an exported hook.
  const contextHooks = new Set<string>();
  const contextsWithoutHook: string[] = [];

  for (const hook of contextValuesHooks) {
    const hookName = exportNames.get(hook) ?? hook.name;

    for (const signature of getCallSignatures(hook)) {
      const returnType = signature.getReturnType();
      // `useXContextValues` returns the values of all contexts provided by `X`, `useXContextValue` a single one.
      const contexts = /ContextValues$/.test(hookName)
        ? returnType
            .getProperties()
            .map(property => [`${hookName}().${property.name}`, checker.getTypeOfSymbol(property)] as const)
        : [[`${hookName}()`, returnType] as const];

      for (const [contextName, contextValue] of contexts) {
        // Contexts holding primitive values (e.g. a size) are consumed by the components that read them.
        if (!isObjectType(contextValue)) {
          continue;
        }

        const consumers = packageHooks
          .filter(([, consumer]) => consumer !== hook && consumesContextValue(consumer, contextValue))
          .map(([consumerName]) => consumerName);

        consumers.forEach(consumer => contextHooks.add(consumer));
        if (consumers.length === 0) {
          contextsWithoutHook.push(contextName);
        }
      }
    }
  }

  // 3. Every type used by a hook or a render function is exported, so consumers can type the code calling them.
  const missingReferencedTypes = new Set<string>();

  for (const [exportName, symbol] of values) {
    if (components.includes(exportName) || contextProviders.includes(exportName)) {
      continue;
    }

    for (const [referenced, type] of collectSignatureTypes(symbol)) {
      if (packageTypeSymbols.has(referenced) || isExternalDeclaration(referenced)) {
        continue;
      }

      // A base type (e.g. `ButtonBaseState`) is fine as long as consumers can name one of its subtypes.
      if (!packageTypes.some(exportedType => checker.isTypeAssignableTo(exportedType, type))) {
        missingReferencedTypes.add(referenced.name);
      }
    }
  }

  // 4. Every export is a part of a component, or is referenced by (or derived from) the rest of the public API.
  const reachableTypes = collectReachableTypes(values.map(([, symbol]) => symbol));
  const isNecessary = (exportName: string, symbol: ts.Symbol): boolean => {
    if (buildingBlocks.has(exportName) || additionalExports.includes(exportName)) {
      return true;
    }

    if (isValue(symbol)) {
      return (
        components.includes(exportName) ||
        contextProviders.includes(exportName) ||
        contextHooks.has(exportName) ||
        /^use[A-Z]\w*Context(Value)?$/.test(exportName)
      );
    }

    return (
      reachableTypes.has(symbol) ||
      // Helper types, e.g. `type DialogOpenChangeEventHandler = EventHandler<DialogOpenChangeData>`.
      [...collectReferencedTypes(symbol.declarations ?? []).keys()].some(
        referenced => reachableTypes.has(referenced) && !isExternalDeclaration(referenced),
      ) ||
      // Types derived from exported values, e.g. `type OverflowGroupState = ReturnType<typeof useIsOverflowGroupVisible>`.
      collectTypeQueries(symbol.declarations ?? []).some(queried => exportNames.has(queried))
    );
  };

  // 5. Headless components are unstyled and their API is stable within the package.
  const isDisallowed = (exportName: string, symbol: ts.Symbol): boolean =>
    /_unstable$/i.test(exportName) ||
    /^use\w*Styles$/.test(exportName) ||
    /ClassNames?$/.test(exportName) ||
    isReactContext(symbol) ||
    // `export type { useX }` compiles away, so consumers would get `undefined` at runtime.
    isTypeOnlyValueExport(symbol);

  return {
    buildingBlocks: missingBuildingBlocks,
    contextHooks: contextsWithoutHook,
    referencedTypes: [...missingReferencedTypes],
    unnecessaryExports: [...exports].filter(([n, symbol]) => !isNecessary(n, symbol)).map(([n]) => n),
    disallowedExports: [...exports].filter(([n, symbol]) => isDisallowed(n, symbol)).map(([n]) => n),
  };
}

function createProgram(rootNames: string[]): ts.Program {
  const configFile = ts.getParsedCommandLineOfConfigFile(path.join(packageRoot, 'tsconfig.lib.json'), undefined, {
    ...ts.sys,
    onUnRecoverableConfigFileDiagnostic: diagnostic => {
      throw new Error(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
    },
  });

  if (!configFile) {
    throw new Error('Unable to parse tsconfig.lib.json');
  }

  return ts.createProgram({ rootNames, options: { ...configFile.options, noEmit: true } });
}

function getModuleExports(fileName: string): Map<string, ts.Symbol> {
  const sourceFile = program.getSourceFile(fileName);
  const moduleSymbol = sourceFile && checker.getSymbolAtLocation(sourceFile);

  if (!moduleSymbol) {
    throw new Error(`${fileName} is not a module`);
  }

  // Type-only re-exports of runtime values are kept as unresolved aliases, so they never count as values.
  return new Map(
    checker
      .getExportsOfModule(moduleSymbol)
      .map(symbol => [symbol.name, isTypeOnlyValueExport(symbol) ? symbol : resolveAlias(symbol)]),
  );
}

/**
 * Whether a runtime value (e.g. a hook) is exported only as a type, anywhere along its re-export chain.
 */
function isTypeOnlyValueExport(symbol: ts.Symbol): boolean {
  const target = resolveAlias(symbol);

  if (target === symbol || !isValue(target) || hasFlag(target.flags, ts.SymbolFlags.Type)) {
    return false;
  }

  for (
    let alias: ts.Symbol | undefined = symbol;
    alias && hasFlag(alias.flags, ts.SymbolFlags.Alias);
    alias = checker.getImmediateAliasedSymbol(alias)
  ) {
    if ((alias.declarations ?? []).some(declaration => ts.isTypeOnlyImportOrExportDeclaration(declaration))) {
      return true;
    }
  }

  return false;
}

function hasFlag(flags: number, flag: number): boolean {
  // eslint-disable-next-line no-bitwise
  return (flags & flag) !== 0;
}

function resolveAlias(symbol: ts.Symbol): ts.Symbol {
  return hasFlag(symbol.flags, ts.SymbolFlags.Alias) ? checker.getAliasedSymbol(symbol) : symbol;
}

function isValue(symbol: ts.Symbol): boolean {
  return hasFlag(symbol.flags, ts.SymbolFlags.Value);
}

function getCallSignatures(symbol: ts.Symbol): readonly ts.Signature[] {
  return checker.getTypeOfSymbol(symbol).getCallSignatures();
}

function getTypeName(type: ts.Type): string | undefined {
  return (type.aliasSymbol ?? type.getSymbol())?.getName();
}

function isContextProvider(symbol: ts.Symbol): boolean {
  if (!isValue(symbol)) {
    return false;
  }

  const type = checker.getTypeOfSymbol(symbol);
  const typeName = getTypeName(type);

  return (
    typeName === 'Provider' ||
    typeName === 'ProviderExoticComponent' ||
    // Context selector providers are typed as `React.FC<React.ProviderProps<Value>>`.
    type.getCallSignatures().some(signature => {
      const [props] = signature.parameters;
      return props !== undefined && getTypeName(checker.getTypeOfSymbol(props)) === 'ProviderProps';
    })
  );
}

function isReactContext(symbol: ts.Symbol): boolean {
  return isValue(symbol) && getTypeName(checker.getTypeOfSymbol(symbol)) === 'Context';
}

function isComponent(exportName: string, symbol: ts.Symbol): boolean {
  if (!/^[A-Z][a-z]/.test(exportName) || isContextProvider(symbol) || isReactContext(symbol)) {
    return false;
  }

  const type = checker.getTypeOfSymbol(symbol);

  return type.getCallSignatures().length > 0 || type.getProperty('$$typeof') !== undefined;
}

/**
 * Finds the functions a component defined in this package is composed of: the arguments of `composeComponent`, or
 * the package hooks and render functions called by the component.
 */
function getComposition(component: ts.Symbol): { parts: ts.Symbol[]; contextValuesHooks: ts.Symbol[] } {
  const declaration = component.valueDeclaration;
  const parts: ts.Symbol[] = [];
  const contextValuesHooks: ts.Symbol[] = [];

  if (
    !declaration ||
    // TypeScript uses forward slashes even when node:path returns Windows separators.
    !path.resolve(declaration.getSourceFile().fileName).startsWith(srcRoot + path.sep) ||
    !ts.isVariableDeclaration(declaration)
  ) {
    return { parts, contextValuesHooks };
  }

  const getSymbol = (node: ts.Node) => {
    const symbol = checker.getSymbolAtLocation(node);
    return symbol && resolveAlias(symbol);
  };

  const visit = (node: ts.Node) => {
    if (ts.isCallExpression(node)) {
      const callee = getSymbol(node.expression);

      if (callee?.name === 'composeComponent') {
        const [, useState, render, useContextValues] = node.arguments.map(getSymbol);
        parts.push(...[useState, render, useContextValues].filter((part): part is ts.Symbol => part !== undefined));
        if (useContextValues) {
          contextValuesHooks.push(useContextValues);
        }
      } else if (callee && /^(use|render)[A-Z]/.test(callee.name) && !isExternalDeclaration(callee)) {
        parts.push(callee);
        if (/ContextValues?$/.test(callee.name)) {
          contextValuesHooks.push(callee);
        }
      }
    }

    ts.forEachChild(node, visit);
  };

  if (declaration.initializer) {
    visit(declaration.initializer);
  }

  return { parts, contextValuesHooks };
}

function isObjectType(type: ts.Type): boolean {
  return type.isIntersection() || hasFlag(type.flags, ts.TypeFlags.Object);
}

function isSameType(a: ts.Type, b: ts.Type): boolean {
  return a === b || (checker.isTypeAssignableTo(a, b) && checker.isTypeAssignableTo(b, a));
}

/**
 * A hook consumes a context value when it returns it (`useXContext()`) or when it accepts a selector of it
 * (`useXContext(selector)`).
 */
function consumesContextValue(hook: ts.Symbol, contextValue: ts.Type): boolean {
  return getCallSignatures(hook).some(signature => {
    if (isSameType(checker.getNonNullableType(signature.getReturnType()), contextValue)) {
      return true;
    }

    const [selector] = signature.parameters;
    const [selectorSignature] = selector ? checker.getTypeOfSymbol(selector).getCallSignatures() : [];
    const [selectorParameter] = selectorSignature?.parameters ?? [];

    return selectorParameter !== undefined && isSameType(checker.getTypeOfSymbol(selectorParameter), contextValue);
  });
}

function isTypeDeclaration(symbol: ts.Symbol): boolean {
  return (symbol.declarations ?? []).some(
    declaration => ts.isTypeAliasDeclaration(declaration) || ts.isInterfaceDeclaration(declaration),
  );
}

function isExternalDeclaration(symbol: ts.Symbol): boolean {
  return (symbol.declarations ?? []).some(declaration =>
    EXTERNAL_TYPE_SOURCES.some(pattern => pattern.test(declaration.getSourceFile().fileName)),
  );
}

/**
 * Collects the named types (type aliases and interfaces) referenced by type annotations of the given nodes, together
 * with the types they resolve to at the place of use (i.e. with type arguments applied).
 */
function collectReferencedTypes(
  nodes: readonly ts.Node[],
  result = new Map<ts.Symbol, ts.Type>(),
): Map<ts.Symbol, ts.Type> {
  const visit = (node: ts.Node) => {
    const typeName = ts.isTypeReferenceNode(node)
      ? node.typeName
      : ts.isExpressionWithTypeArguments(node)
        ? node.expression
        : undefined;
    const symbol = typeName && checker.getSymbolAtLocation(typeName);

    if (symbol && isTypeDeclaration(resolveAlias(symbol)) && !result.has(resolveAlias(symbol))) {
      result.set(resolveAlias(symbol), checker.getTypeAtLocation(node));
    }

    ts.forEachChild(node, visit);
  };

  nodes.forEach(visit);

  return result;
}

/**
 * Collects the values referenced by `typeof` queries in the given nodes.
 */
function collectTypeQueries(nodes: readonly ts.Node[]): ts.Symbol[] {
  const result: ts.Symbol[] = [];

  const visit = (node: ts.Node) => {
    const symbol = ts.isTypeQueryNode(node) ? checker.getSymbolAtLocation(node.exprName) : undefined;

    if (symbol) {
      result.push(resolveAlias(symbol));
    }

    ts.forEachChild(node, visit);
  };

  nodes.forEach(visit);

  return result;
}

/**
 * Collects the named types used by a type, without looking into the members of the types it names.
 */
function collectTypesOfType(type: ts.Type, result: Map<ts.Symbol, ts.Type>, visited = new Set<ts.Type>()): void {
  if (visited.has(type)) {
    return;
  }
  visited.add(type);

  const named = type.aliasSymbol ?? type.getSymbol();
  if (named && isTypeDeclaration(named)) {
    if (!result.has(named)) {
      result.set(named, type);
    }
    if (!isExternalDeclaration(named)) {
      return;
    }
  }

  const visit = (nested: ts.Type) => collectTypesOfType(nested, result, visited);

  type.aliasTypeArguments?.forEach(visit);
  if (type.isUnionOrIntersection()) {
    type.types.forEach(visit);
  }
  if (
    hasFlag(type.flags, ts.TypeFlags.Object) &&
    hasFlag((type as ts.ObjectType).objectFlags, ts.ObjectFlags.Reference)
  ) {
    checker.getTypeArguments(type as ts.TypeReference).forEach(visit);
  }
  for (const signature of type.getCallSignatures()) {
    signature.parameters.forEach(parameter => visit(checker.getTypeOfSymbol(parameter)));
    visit(signature.getReturnType());
  }
}

/**
 * Collects the named types used by the parameters and the return type of a function. Type annotations are preferred
 * over the resolved types, as the latter lose the name of aliases like `type ButtonBaseState = Omit<ButtonState, ...>`.
 */
function collectSignatureTypes(symbol: ts.Symbol): Map<ts.Symbol, ts.Type> {
  const result = new Map<ts.Symbol, ts.Type>();

  for (const signature of getCallSignatures(symbol)) {
    const declaration = signature.getDeclaration() as ts.SignatureDeclaration | undefined;

    signature.parameters.forEach((parameter, index) => {
      const annotation = declaration?.parameters[index]?.type;

      if (annotation) {
        collectReferencedTypes([annotation], result);
      } else {
        collectTypesOfType(checker.getTypeOfSymbol(parameter), result);
      }
    });

    if (declaration?.type) {
      collectReferencedTypes([declaration.type], result);
    } else {
      collectTypesOfType(signature.getReturnType(), result);
    }
  }

  return result;
}

/**
 * Collects all named types reachable from the given values: the types used by their signatures and, transitively,
 * the types referenced by the declarations of those types.
 */
function collectReachableTypes(values: ts.Symbol[]): Set<ts.Symbol> {
  const result = new Set<ts.Symbol>();
  const queue: ts.Symbol[] = [];

  for (const value of values) {
    const types = collectSignatureTypes(value);
    collectTypesOfType(checker.getTypeOfSymbol(value), types);
    queue.push(...types.keys());
  }

  while (queue.length > 0) {
    const symbol = queue.pop()!;

    if (result.has(symbol)) {
      continue;
    }
    result.add(symbol);

    if (!isExternalDeclaration(symbol)) {
      queue.push(...collectReferencedTypes(symbol.declarations ?? []).keys());
    }
  }

  return result;
}
