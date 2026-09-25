import * as fs from 'node:fs';
import * as path from 'node:path';

import type { CommandHandler } from '../../utils/types';
import { CliError } from '../../utils/diagnostics';
import { loadMetadataGenerator } from '../../utils/metadata-generator';
import { createEnvelope, emptyCoverage, emitOutput, formatDiagnostics } from '../../utils/output';
import { markdownCode } from '../../utils/markdown';

export interface MetadataGenerateArgs {
  packageRoot?: string;
  packageName?: string;
  entrypoint?: string[];
  condition?: string[];
  output?: string;
  json?: boolean;
}

export const generateHandler: CommandHandler<MetadataGenerateArgs> = async argv => {
  try {
    const packageRoot = path.resolve(argv.packageRoot ?? process.cwd());
    const outputDirectory = path.resolve(argv.output ?? path.join(packageRoot, 'dist/metadata'));
    assertExpectedPackageName(packageRoot, argv.packageName);
    const { generateApiMetadata, writeGeneratedMetadata } = loadMetadataGenerator();
    const result = await generateApiMetadata({
      packageRoot,
      packageName: argv.packageName,
      entrypoints: cleanStringArray(argv.entrypoint),
      declarationConditions: cleanStringArray(argv.condition),
    });
    const written = writeGeneratedMetadata(result, outputDirectory);
    const diagnostics = result.diagnostics.map(diagnostic => ({
      code: diagnostic.code,
      severity: diagnostic.severity,
      message: diagnostic.message,
      path: diagnostic.path,
      package: result.index.package.name,
    }));
    const status = result.index.completeness.api.status;
    const coverage = {
      ...emptyCoverage(status),
      selectedRoots: 1,
      metadataRoots: 1,
    };
    const envelope = createEnvelope(
      'fluentui.metadata-generate',
      {
        package: result.index.package,
        packageRoot,
        outputDirectory,
        indexPath: written.indexPath,
        recordPaths: written.recordPaths,
        entrypoints: [...new Set(result.index.exports.map(route => route.entrypoint))].sort(),
        records: result.index.records.length,
        exports: result.index.exports.length,
        completeness: result.index.completeness,
        capabilities: result.index.capabilities,
      },
      diagnostics,
      coverage,
      status,
    );

    emitOutput({ json: argv.json }, envelope, value =>
      [
        '# API metadata generation',
        '',
        `Generated API metadata for ${markdownCode(`${result.index.package.name}@${result.index.package.version}`)}`,
        '',
        `- **Index:** ${markdownCode(written.indexPath)}`,
        `- **Records:** ${written.recordPaths.length}`,
        `- **Exports:** ${result.index.exports.length}`,
        `- **API coverage:** ${status}`,
        ...(value.diagnostics.length ? ['', '## Diagnostics', '', formatDiagnostics(value.diagnostics)] : []),
      ].join('\n'),
    );
  } catch (error) {
    if (error instanceof CliError) {
      throw error;
    }
    throw new CliError('CLI_METADATA_GENERATE_FAILED', error instanceof Error ? error.message : String(error), 1);
  }
};

function assertExpectedPackageName(packageRoot: string, expectedPackageName: string | undefined): void {
  if (!expectedPackageName) {
    return;
  }

  const manifestPath = path.join(packageRoot, 'package.json');
  let manifest: { name?: unknown };
  try {
    const stats = fs.statSync(manifestPath);
    if (!stats.isFile() || stats.size > 1024 * 1024) {
      throw new Error('package.json must be a regular file no larger than 1 MiB');
    }
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as { name?: unknown };
  } catch (error) {
    throw new CliError(
      'CLI_METADATA_PACKAGE_MANIFEST',
      `Unable to verify the package name in ${manifestPath}: ${error instanceof Error ? error.message : String(error)}`,
      2,
    );
  }

  if (manifest.name !== expectedPackageName) {
    throw new CliError(
      'CLI_METADATA_PACKAGE_NAME_MISMATCH',
      `Expected ${expectedPackageName}, but ${manifestPath} declares ${String(manifest.name)}.`,
      2,
    );
  }
}

function cleanStringArray(values: string[] | undefined): string[] | undefined {
  const filtered = values?.filter((value): value is string => typeof value === 'string' && value.length > 0);
  return filtered?.length ? filtered : undefined;
}
