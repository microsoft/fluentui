import type { Metadata, PackageUsageData, AstParser, UsageReportOutput, TypeUsage, CategoryLegendEntry } from './types';
import { getGitRoot } from './package-resolver';
import { discoverSourceFiles, filterSourceFiles } from './file-discovery';
import { TsMorphAstParser } from './ast-parser';
import {
  CatalogInventoryError,
  findSelectedPackageRoot,
  getCatalogInventory,
  parsePackageSpecifier,
  type CatalogDiagnostic,
  type CatalogInventory,
  type CatalogSelectionOptions,
} from '../../../utils';

import * as fs from 'node:fs';
import * as path from 'node:path';

/** tsconfig file names to probe, in priority order. */
const TSCONFIG_CANDIDATES = ['tsconfig.json', 'tsconfig.base.json'];

/** Category legend included in every long report output. */
const CATEGORY_LEGEND: Record<string, CategoryLegendEntry> = {
  components: {
    name: 'Components',
    description: 'React components (JSX elements). Tracks per-component prop usage with values.',
  },
  hooks: {
    name: 'Hooks',
    description: 'React hooks (use* naming convention). Tracks call-site argument usage with values.',
  },
  types: {
    name: 'Types',
    description:
      'TypeScript interfaces, type aliases, and enums. Distinguishes typeof references from standard annotations and captures generic type arguments.',
  },
  others: {
    name: 'Other Exports',
    description:
      'Value exports that are not components or hooks (constants, utility functions, theme objects). Tracks call-site argument usage when invoked.',
  },
  unknowns: {
    name: 'Unknowns',
    description:
      'Symbols whose .d.ts declarations could not be resolved. Install types or add declarations to improve classification.',
  },
};

/**
 * Create an empty PackageUsageData entry.
 */
function createEmptyPackageUsageData(): PackageUsageData {
  return {
    components: {},
    hooks: {},
    types: {},
    others: {},
    unknowns: {},
    count: 0,
  };
}

/**
 * Collect the long report output by analyzing source files.
 *
 * @param rootPath - Root directory for file traversal.
 * @param parser - AST parser implementation (defaults to TsMorphAstParser).
 * @param include - Glob patterns to include.
 * @param exclude - Glob patterns to exclude.
 */
export function collectUsageReportData(
  rootPath?: string,
  parser?: AstParser,
  include?: string[],
  exclude?: string[],
  catalogOptions: CatalogSelectionOptions & {
    inventory?: CatalogInventory;
    diagnostics?: CatalogDiagnostic[];
  } = {},
): UsageReportOutput {
  const resolvedRoot = rootPath ?? getGitRoot();
  const astParser = parser ?? new TsMorphAstParser();
  const diagnostics = catalogOptions.diagnostics ?? [];
  const inventoryCache = new Map<string, CatalogInventory>();
  const config = catalogOptions.config ? path.resolve(resolvedRoot, catalogOptions.config) : undefined;
  const createInventory = (cwd: string): CatalogInventory =>
    getCatalogInventory({
      config,
      system: catalogOptions.system,
      package: catalogOptions.package,
      metadataMode: catalogOptions.metadataMode,
      cwd,
    });
  const baseInventory = catalogOptions.inventory ?? createInventory(resolvedRoot);
  inventoryCache.set(findSelectedPackageRoot(resolvedRoot), baseInventory);
  addDiagnostics(diagnostics, baseInventory.diagnostics);
  const getInventory = (filePath: string): CatalogInventory => {
    if (catalogOptions.inventory) {
      return catalogOptions.inventory;
    }
    const selectedRoot = findSelectedPackageRoot(filePath);
    const cached = inventoryCache.get(selectedRoot);
    if (cached) {
      return cached;
    }
    const inventory = createInventory(path.dirname(filePath));
    inventoryCache.set(selectedRoot, inventory);
    addDiagnostics(diagnostics, inventory.diagnostics);
    return inventory;
  };

  // Discover source files and apply include/exclude filters
  let filePaths = discoverSourceFiles(resolvedRoot);
  filePaths = filterSourceFiles(filePaths, resolvedRoot, include, exclude);
  if (filePaths.length === 0) {
    return { legend: CATEGORY_LEGEND, fileMap: [], packages: {} };
  }

  // Build relative fileMap for output
  const fileMap = filePaths.map(fp => path.relative(resolvedRoot, fp)).sort();

  // Auto-detect tsconfig for path alias resolution
  const tsConfigPath = findTsConfig(resolvedRoot);

  // Initialize the parser with discovered files + tsconfig (or rootPath fallback)
  astParser.createProject(filePaths, tsConfigPath, resolvedRoot);

  const metadata: Metadata = {};

  const sourceFiles = astParser.getSourceFiles();

  for (const filePath of sourceFiles) {
    const inventory = getInventory(filePath);
    // Process imports to categorize symbols
    const imports = astParser.getImportDeclarations(filePath);

    for (const importDecl of imports) {
      if (!inventory.selection.matches(importDecl.moduleSpecifier)) {
        continue;
      }

      const moduleSpec = importDecl.moduleSpecifier;
      if (!metadata[moduleSpec]) {
        metadata[moduleSpec] = createEmptyPackageUsageData();
      }

      const pkgData = metadata[moduleSpec];
      pkgData.count += importDecl.namedImports.length;

      // Categorize each named import
      for (const name of importDecl.namedImports) {
        if (importDecl.isTypeOnly) {
          classifyUsageSymbol(inventory, moduleSpec, name, 'type', () => 'type', diagnostics);
          // Explicit `import type` always goes to types
          if (!pkgData.types[name]) {
            pkgData.types[name] = { count: 0, typeofCount: 0, props: {} };
          }
          pkgData.types[name].count++;
          continue;
        }

        // Use the AST parser to classify the symbol by its actual type definition
        const localName = importDecl.localNames?.[name] ?? name;
        const classification = classifyUsageSymbol(
          inventory,
          moduleSpec,
          name,
          'value',
          () => astParser.classifySymbol(filePath, localName, moduleSpec),
          diagnostics,
        );

        switch (classification) {
          case 'component':
            if (!pkgData.components[name]) {
              pkgData.components[name] = { props: {}, count: 0 };
            }
            break;
          case 'hook':
            if (!pkgData.hooks[name]) {
              pkgData.hooks[name] = { props: {}, count: 0 };
            }
            break;
          case 'type':
            if (!pkgData.types[name]) {
              pkgData.types[name] = { count: 0, typeofCount: 0, props: {} };
            }
            pkgData.types[name].count++;
            break;
          case 'unknown':
            if (!pkgData.unknowns[name]) {
              pkgData.unknowns[name] = { props: {}, count: 0, description: astParser.describeUnknownSymbol(name) };
            }
            pkgData.unknowns[name].count++;
            break;
          default:
            if (!pkgData.others[name]) {
              pkgData.others[name] = { props: {}, count: 0 };
            }
            pkgData.others[name].count++;
            break;
        }
      }
    }

    // Enrich component usage with JSX prop analysis
    const jsxUsages = astParser.getJsxElementUsages(filePath);
    for (const usage of jsxUsages) {
      if (!inventory.selection.matches(usage.moduleSpecifier)) {
        continue;
      }

      const moduleSpec = usage.moduleSpecifier;
      if (!metadata[moduleSpec]) {
        metadata[moduleSpec] = createEmptyPackageUsageData();
      }

      const pkgData = metadata[moduleSpec];
      if (!pkgData.components[usage.componentName]) {
        pkgData.components[usage.componentName] = { props: {}, count: 0 };
      }

      const comp = pkgData.components[usage.componentName];
      comp.count++;

      // Track prop usage
      for (const [propName, propValue] of Object.entries(usage.props)) {
        if (!comp.props[propName]) {
          comp.props[propName] = { values: [], count: 0 };
        }
        comp.props[propName].count++;
        if (propValue !== undefined && !comp.props[propName].values.includes(propValue)) {
          comp.props[propName].values.push(propValue);
        }
      }
    }

    // Enrich hook, function, and unknown symbol usage with call expression analysis
    const callUsages = astParser.getCallExpressionUsages(filePath);
    for (const usage of callUsages) {
      if (!inventory.selection.matches(usage.moduleSpecifier)) {
        continue;
      }

      const callClassification = classifyUsageSymbol(
        inventory,
        usage.moduleSpecifier,
        usage.functionName,
        'value',
        () => astParser.classifySymbol(filePath, usage.functionName, usage.moduleSpecifier),
        diagnostics,
      );

      // Determine target category
      let targetCategory: 'hooks' | 'others' | 'unknowns' | null = null;
      if (callClassification === 'hook' || (callClassification === 'unknown' && /^use[A-Z]/.test(usage.functionName))) {
        targetCategory = 'hooks';
      } else if (callClassification === 'other') {
        targetCategory = 'others';
      } else if (callClassification === 'unknown') {
        targetCategory = 'unknowns';
      }

      if (!targetCategory) {
        continue;
      }

      const moduleSpec = usage.moduleSpecifier;
      if (!metadata[moduleSpec]) {
        metadata[moduleSpec] = createEmptyPackageUsageData();
      }

      const pkgData = metadata[moduleSpec];
      const category = pkgData[targetCategory] as Record<
        string,
        { props: Record<string, { values: string[]; count: number }>; count: number }
      >;
      if (!category[usage.functionName]) {
        if (targetCategory === 'unknowns') {
          (pkgData.unknowns as Record<string, { props: Record<string, never>; count: number; description: string }>)[
            usage.functionName
          ] = {
            props: {},
            count: 0,
            description: astParser.describeUnknownSymbol(usage.functionName),
          };
        } else {
          category[usage.functionName] = { props: {}, count: 0 };
        }
      }

      const entry = category[usage.functionName];
      entry.count++;

      // Track argument usage
      for (const [argName, argValue] of Object.entries(usage.args)) {
        if (!entry.props[argName]) {
          entry.props[argName] = { values: [], count: 0 };
        }
        entry.props[argName].count++;
        if (argValue !== undefined && !entry.props[argName].values.includes(argValue)) {
          entry.props[argName].values.push(argValue);
        }
      }
    }

    // Track typeof usages and generic type parameters
    const typeRefUsages = astParser.getTypeReferenceUsages(filePath);
    for (const usage of typeRefUsages) {
      if (!inventory.selection.matches(usage.moduleSpecifier)) {
        continue;
      }

      const moduleSpec = usage.moduleSpecifier;
      if (!metadata[moduleSpec]) {
        metadata[moduleSpec] = createEmptyPackageUsageData();
      }

      const pkgData = metadata[moduleSpec];

      if (usage.kind === 'typeof') {
        // typeof references go to types with typeofCount tracking
        if (!pkgData.types[usage.symbolName]) {
          pkgData.types[usage.symbolName] = { count: 0, typeofCount: 0, props: {} };
        }
        pkgData.types[usage.symbolName].count++;
        pkgData.types[usage.symbolName].typeofCount++;
      } else if (usage.kind === 'generic' && usage.typeArgs) {
        // Generic type params — ensure the type exists and capture args as props
        if (!pkgData.types[usage.symbolName]) {
          pkgData.types[usage.symbolName] = { count: 0, typeofCount: 0, props: {} };
        }

        const typeEntry: TypeUsage = pkgData.types[usage.symbolName];
        typeEntry.count++;
        for (let i = 0; i < usage.typeArgs.length; i++) {
          const propName = `typeArg${i}`;
          if (!typeEntry.props[propName]) {
            typeEntry.props[propName] = { values: [], count: 0 };
          }
          typeEntry.props[propName].count++;
          const argValue = usage.typeArgs[i];
          if (!typeEntry.props[propName].values.includes(argValue)) {
            typeEntry.props[propName].values.push(argValue);
          }
        }
      }
    }

    // Track component value references (non-JSX usage like `component: Button`)
    const valueRefs = astParser.getValueReferenceUsages(filePath);
    for (const ref of valueRefs) {
      if (!inventory.selection.matches(ref.moduleSpecifier)) {
        continue;
      }

      const moduleSpec = ref.moduleSpecifier;
      if (!metadata[moduleSpec]) {
        metadata[moduleSpec] = createEmptyPackageUsageData();
      }

      const pkgData = metadata[moduleSpec];
      const classification = classifyUsageSymbol(
        inventory,
        moduleSpec,
        ref.symbolName,
        'value',
        () => astParser.classifySymbol(filePath, ref.symbolName, moduleSpec),
        diagnostics,
      );

      if (classification === 'component') {
        // Component used as a value reference — count as component usage
        if (!pkgData.components[ref.symbolName]) {
          pkgData.components[ref.symbolName] = { props: {}, count: 0 };
        }
        pkgData.components[ref.symbolName].count++;
      }
    }
  }

  // Post-process: deduplicate symbols across categories
  for (const pkgData of Object.values(metadata)) {
    for (const name of Object.keys(pkgData.others)) {
      if (pkgData.components[name] && pkgData.components[name].count > 0) {
        delete pkgData.others[name];
      }
    }
    // If an unknown symbol was also categorized elsewhere (e.g., as component via JSX), remove from unknowns
    for (const name of Object.keys(pkgData.unknowns)) {
      if (
        (pkgData.components[name] && pkgData.components[name].count > 0) ||
        pkgData.hooks[name] ||
        pkgData.types[name] ||
        pkgData.others[name]
      ) {
        delete pkgData.unknowns[name];
      }
    }
  }

  return { legend: CATEGORY_LEGEND, fileMap, packages: metadata };
}

/**
 * Find a tsconfig file in the given directory.
 * Probes common names in priority order: tsconfig.json, tsconfig.base.json.
 */
function findTsConfig(rootPath: string): string | undefined {
  for (const candidate of TSCONFIG_CANDIDATES) {
    const fullPath = path.join(rootPath, candidate);
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }
  return undefined;
}

/**
 * Run the long report: collect data and output in the requested format.
 *
 * @param rootPath - Root directory for file traversal.
 * @param reporter - Output format: 'json' (default), 'markdown', or 'html'.
 * @param include - Glob patterns to include.
 * @param exclude - Glob patterns to exclude.
 * @param output - Output file path. When provided, writes to file instead of stdout.
 */
export async function runUsageReport(
  rootPath?: string,
  reporter: 'json' | 'markdown' | 'html' = 'json',
  include?: string[],
  exclude?: string[],
  output?: string,
  catalogOptions: CatalogSelectionOptions = {},
): Promise<void> {
  const diagnostics: CatalogDiagnostic[] = [];
  const reportData = collectUsageReportData(rootPath, undefined, include, exclude, {
    ...catalogOptions,
    diagnostics,
  });

  let formatted: string;
  if (reporter === 'markdown') {
    const { formatMetadataAsMarkdown } = await import('./markdown-reporter');
    formatted = formatMetadataAsMarkdown(reportData);
  } else if (reporter === 'html') {
    const { formatMetadataAsHtml } = await import('./html-reporter');
    formatted = formatMetadataAsHtml(reportData);
  } else {
    formatted = JSON.stringify(reportData, null, 2);
  }

  if (output) {
    const outputPath = path.resolve(output);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, formatted, 'utf-8');
    console.log(`Report written to ${outputPath}`);
  } else {
    console.log(formatted);
  }
  for (const diagnostic of diagnostics) {
    console.error(`[${diagnostic.code}] ${diagnostic.message}`);
  }
}

function classifyUsageSymbol(
  inventory: CatalogInventory,
  moduleSpecifier: string,
  exportName: string,
  namespace: 'type' | 'value',
  fallback: () => ReturnType<AstParser['classifySymbol']>,
  diagnostics: CatalogDiagnostic[],
): ReturnType<AstParser['classifySymbol']> {
  if (inventory.metadataMode === 'off') {
    return fallback();
  }

  const parsed = parsePackageSpecifier(moduleSpecifier);
  const matchingRoots = parsed
    ? inventory.roots.filter(
        root => root.packageName === parsed.packageName || root.requestedPackage === parsed.packageName,
      )
    : [];
  const routes = matchingRoots.flatMap(root =>
    (root.catalog?.index.exports ?? []).filter(
      route => route.entrypoint === parsed?.entrypoint && route.export === exportName && route.namespace === namespace,
    ),
  );
  if (namespace === 'value' && routes.length === 0) {
    const typeRoutes = matchingRoots.flatMap(root =>
      (root.catalog?.index.exports ?? []).filter(
        route => route.entrypoint === parsed?.entrypoint && route.export === exportName && route.namespace === 'type',
      ),
    );
    if (typeRoutes.length > 0) {
      return 'type';
    }
  }
  const facets = new Set(routes.flatMap(route => route.classifications.map(classification => classification.facet)));
  if (namespace === 'type' && routes.length > 0) {
    return 'type';
  }
  if (facets.has('component')) {
    return 'component';
  }
  if (facets.has('hook')) {
    return 'hook';
  }
  if (facets.size > 0) {
    return 'other';
  }

  if (inventory.metadataMode === 'required') {
    throw new CatalogInventoryError(
      'catalog.metadataRequired',
      `Metadata is required, but ${moduleSpecifier} does not classify the ${exportName} ${namespace} export`,
    );
  }
  addDiagnostics(diagnostics, [
    {
      code: 'catalog.classificationFallback',
      severity: 'warning',
      message: `Falling back to declaration analysis for ${moduleSpecifier}#${exportName}`,
      package: parsed?.packageName,
    },
  ]);
  return fallback();
}

function addDiagnostics(target: CatalogDiagnostic[], additions: readonly CatalogDiagnostic[]): void {
  const existing = new Set(target.map(diagnostic => diagnosticKey(diagnostic)));
  for (const diagnostic of additions) {
    const key = diagnosticKey(diagnostic);
    if (!existing.has(key)) {
      target.push(diagnostic);
      existing.add(key);
    }
  }
}

function diagnosticKey(diagnostic: CatalogDiagnostic): string {
  return `${diagnostic.code}\0${diagnostic.package ?? ''}\0${diagnostic.path ?? ''}\0${diagnostic.message}`;
}
