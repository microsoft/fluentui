import * as fs from 'node:fs';
import * as path from 'node:path';

import type { CommandHandler } from '../../utils/types';
import type { MetadataArgs, MetadataOutput, ExternalPackageRef, RefOrInline } from './impl/types';
import type { ParseResult } from './impl/dts-parser';
import { resolveEntry, readPackageInfo } from './impl/entry-resolver';
import { parseDtsEntry } from './impl/dts-parser';
import { loadDependencyMetadata, buildCrossPackageRef } from './impl/cross-package-resolver';
import { formatMetadataAsMarkdown } from './impl/markdown-formatter';
import { formatMetadataAsHtml } from './impl/html-formatter';

const LEGEND = {
  components: { name: 'Components', description: 'React components (ForwardRef, FC, class)' },
  hooks: { name: 'Hooks', description: 'React hooks (use* convention)' },
  types: { name: 'Types', description: 'Interfaces, type aliases, and enums' },
  others: { name: 'Others', description: 'Constants, render functions, and utilities' },
};

export const handler: CommandHandler<MetadataArgs> = async argv => {
  const { entry, reporter = 'json', output } = argv;

  // 1. Resolve entry .d.ts
  const entryPath = resolveEntry(entry);
  const packageInfo = readPackageInfo(path.dirname(entryPath));

  // 2. Parse the .d.ts
  const parseResult = parseDtsEntry(entryPath);

  // 3. Resolve cross-package $refs
  const cwd = process.cwd();
  const depMetadataCache = new Map<string, MetadataOutput | null>();

  for (const pkgSpec of parseResult.importedPackages) {
    if (!depMetadataCache.has(pkgSpec)) {
      depMetadataCache.set(pkgSpec, loadDependencyMetadata(pkgSpec, cwd));
    }
  }

  // Enhance component propsType refs with cross-package resolution
  for (const comp of Object.values(parseResult.components)) {
    if (comp.propsType && '$ref' in comp.propsType) {
      const localRef = comp.propsType.$ref;
      const symbolName = localRef.split('/').pop()!;

      // If the type isn't in our own types, check dependencies
      if (!(symbolName in parseResult.types)) {
        for (const [pkgSpec, depMetadata] of depMetadataCache) {
          if (depMetadata) {
            const crossRef = buildCrossPackageRef(pkgSpec, symbolName, depMetadata);
            if (crossRef) {
              comp.propsType = crossRef;
              break;
            }
          }
        }
      }
    }
  }

  // 4. Build external references
  const externalReferences = buildExternalReferences(parseResult, depMetadataCache);

  // 5. Assemble output
  const metadataOutput: MetadataOutput = {
    package: packageInfo,
    legend: LEGEND,
    categories: {
      components: parseResult.components,
      hooks: parseResult.hooks,
      types: parseResult.types,
      others: parseResult.others,
    },
  };

  if (Object.keys(externalReferences).length > 0) {
    metadataOutput.externalReferences = externalReferences;
  }

  // 6. Format
  let formatted: string;
  switch (reporter) {
    case 'markdown':
      formatted = formatMetadataAsMarkdown(metadataOutput);
      break;
    case 'html':
      formatted = formatMetadataAsHtml(metadataOutput);
      break;
    case 'json':
    default:
      formatted = JSON.stringify(metadataOutput, null, 2);
      break;
  }

  // 7. Output
  if (output) {
    const outputPath = path.resolve(cwd, output);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, formatted, 'utf-8');
    console.log(`Metadata written to ${outputPath}`);
  } else {
    console.log(formatted);
  }
};

// ---------------------------------------------------------------------------
// External references
// ---------------------------------------------------------------------------

/**
 * Collect all type strings from the parsed API surface.
 */
function collectAllTypeStrings(parseResult: ParseResult): string[] {
  const strings: string[] = [];

  for (const comp of Object.values(parseResult.components)) {
    strings.push(comp.typeSignature);
  }

  for (const hook of Object.values(parseResult.hooks)) {
    strings.push(hook.typeSignature, hook.returnType);
    for (const p of hook.parameters) {
      strings.push(p.type);
    }
  }

  for (const type of Object.values(parseResult.types)) {
    strings.push(type.typeSignature);
    for (const m of Object.values(type.members)) {
      strings.push(m.type);
    }
  }

  for (const other of Object.values(parseResult.others)) {
    strings.push(other.typeSignature);
    if (other.parameters) {
      for (const p of other.parameters) {
        strings.push(p.type);
      }
    }
    if (other.returnType) {
      strings.push(other.returnType);
    }
  }

  return strings;
}

/**
 * Determine which imported external symbols are actually referenced
 * in the public API surface, and build the externalReferences map.
 */
function buildExternalReferences(
  parseResult: ParseResult,
  depMetadataCache: Map<string, MetadataOutput | null>,
): Record<string, ExternalPackageRef> {
  const allTypeStrings = collectAllTypeStrings(parseResult);
  const joinedTypes = allTypeStrings.join('\n');

  // Collect all locally-defined symbol names to exclude from external detection
  const localSymbols = new Set<string>([
    ...Object.keys(parseResult.components),
    ...Object.keys(parseResult.hooks),
    ...Object.keys(parseResult.types),
    ...Object.keys(parseResult.others),
  ]);

  const result: Record<string, ExternalPackageRef> = {};

  for (const [pkgSpec, importedNames] of parseResult.importedSymbols) {
    const usedSymbols: Record<string, RefOrInline> = {};
    const depMetadata = depMetadataCache.get(pkgSpec) ?? null;

    for (const symbolName of importedNames) {
      // Skip symbols that are defined locally (re-declared in this package)
      if (localSymbols.has(symbolName)) {
        continue;
      }

      // Check if this symbol name appears in any type signature
      if (!isSymbolReferenced(symbolName, joinedTypes)) {
        continue;
      }

      // Build ref or inline fallback
      if (depMetadata) {
        const ref = buildCrossPackageRef(pkgSpec, symbolName, depMetadata);
        if (ref) {
          usedSymbols[symbolName] = ref;
          continue;
        }
      }

      usedSymbols[symbolName] = { inline: symbolName };
    }

    if (Object.keys(usedSymbols).length > 0) {
      result[pkgSpec] = {
        metadataRef: `${pkgSpec}/metadata.json`,
        symbols: usedSymbols,
      };
    }
  }

  return result;
}

/**
 * Check if a symbol name is referenced in the joined type strings.
 * Uses word-boundary matching to avoid false positives from substrings.
 */
function isSymbolReferenced(symbolName: string, joinedTypes: string): boolean {
  const escaped = symbolName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(?<![a-zA-Z0-9_])${escaped}(?![a-zA-Z0-9_])`);
  return pattern.test(joinedTypes);
}
