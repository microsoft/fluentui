import * as fs from 'node:fs';
import * as path from 'node:path';

import type { CommandHandler } from '../../utils/types';
import type { MetadataArgs, MetadataOutput } from './impl/types';
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

  // 4. Assemble output
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

  // 5. Format
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

  // 6. Output
  if (output) {
    const outputPath = path.resolve(cwd, output);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, formatted, 'utf-8');
    console.log(`Metadata written to ${outputPath}`);
  } else {
    console.log(formatted);
  }
};
