import type { Metadata, PackageUsageData, AstParser, LongReportOutput, TypeUsage, CategoryLegendEntry } from './types';
import { isReportablePackageForLong, getGitRoot } from './package-resolver';
import { discoverSourceFiles, filterSourceFiles } from './file-discovery';
import { TsMorphAstParser } from './ast-parser';

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
export function collectLongReportData(
  rootPath?: string,
  parser?: AstParser,
  include?: string[],
  exclude?: string[],
): LongReportOutput {
  const resolvedRoot = rootPath ?? getGitRoot();
  const astParser = parser ?? new TsMorphAstParser();

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
    // Process imports to categorize symbols
    const imports = astParser.getImportDeclarations(filePath);

    for (const importDecl of imports) {
      if (!isReportablePackageForLong(importDecl.moduleSpecifier)) {
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
          // Explicit `import type` always goes to types
          if (!pkgData.types[name]) {
            pkgData.types[name] = { count: 0, typeofCount: 0, props: {} };
          }
          pkgData.types[name].count++;
          continue;
        }

        // Use the AST parser to classify the symbol by its actual type definition
        const classification = astParser.classifySymbol(filePath, name, moduleSpec);

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
      if (!isReportablePackageForLong(usage.moduleSpecifier)) {
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
      if (!isReportablePackageForLong(usage.moduleSpecifier)) {
        continue;
      }

      const callClassification = astParser.classifySymbol(filePath, usage.functionName, usage.moduleSpecifier);

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
          (pkgData.unknowns as Record<string, any>)[usage.functionName] = {
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
      if (!isReportablePackageForLong(usage.moduleSpecifier)) {
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
      if (!isReportablePackageForLong(ref.moduleSpecifier)) {
        continue;
      }

      const moduleSpec = ref.moduleSpecifier;
      if (!metadata[moduleSpec]) {
        metadata[moduleSpec] = createEmptyPackageUsageData();
      }

      const pkgData = metadata[moduleSpec];
      const classification = astParser.classifySymbol(filePath, ref.symbolName, moduleSpec);

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
 */
export async function runLongReport(
  rootPath?: string,
  reporter: 'json' | 'markdown' | 'html' = 'json',
  include?: string[],
  exclude?: string[],
): Promise<void> {
  const reportData = collectLongReportData(rootPath, undefined, include, exclude);

  if (reporter === 'markdown') {
    const { formatMetadataAsMarkdown } = await import('./markdown-reporter');
    console.log(formatMetadataAsMarkdown(reportData));
  } else if (reporter === 'html') {
    const { formatMetadataAsHtml } = await import('./html-reporter');
    console.log(formatMetadataAsHtml(reportData));
  } else {
    console.log(JSON.stringify(reportData, null, 2));
  }
}
