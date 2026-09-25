import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

import { type ExecutorContext, type PromiseExecutor, logger, serializeJson } from '@nx/devkit';
import { assertValidApiRecord, assertValidPackageIndex, validateCatalog } from '@fluentui/api-metadata';
import { spawnSync } from 'node:child_process';

import micromatch from 'micromatch';

import { type VerifyPackagingExecutorSchema } from './schema';
import { measureEnd, measureStart } from '../../utils';
import type { PackageJson } from '../../types';

const runExecutor: PromiseExecutor<VerifyPackagingExecutorSchema> = async (schema, context) => {
  measureStart('VerifyTargetExecutor');

  const options = normalizeOptions(schema, context);

  const success = await runVerifyPackaging(options, context);

  measureEnd('VerifyTargetExecutor');

  return { success };
};

export default runExecutor;

// ========

interface NormalizedOptions extends ReturnType<typeof normalizeOptions> {}

async function runVerifyPackaging(options: NormalizedOptions, context: ExecutorContext): Promise<boolean> {
  const tags = new Set(options.project.tags ?? []);
  const isPublic = tags.has('npm:public');

  // no need to check if package is not being published yet
  if (!isPublic) {
    return true;
  }

  const packOutput = npmPackOutput(options, context);

  const issues = [
    ...assertions(packOutput, options, tags),
    ...metadataAssertions(packOutput, join(context.root, options.project.root)),
  ];

  if (issues.length === 0) {
    return true;
  }

  logger.error(`Package verification failed!`);
  logger.error(serializeJson(issues));

  return false;
}

function normalizeOptions(schema: VerifyPackagingExecutorSchema, context: ExecutorContext) {
  const defaults = {};
  const project = context.projectsConfigurations!.projects[context.projectName!];
  const isProduction = Boolean(process.env.FLUENT_PROD_BUILD);

  /**
   * @see https://docs.npmjs.com/cli/v10/commands/npm-publish#files-included-in-package
   */
  const alwaysPublishedFiles = ['LICENSE', 'package.json', 'README.md'];
  const rootConfigFiles = [
    'just.config.[jt]s',
    'jest.config.[jt]s',
    'eslint.config.(js|cjs|mjs)',
    'project.json',
    '.babelrc.json',
    '.swcrc',
    'tsconfig(.*)?.json',
  ];
  const nonProdAssets = ['assets/', 'docs/*', 'temp/*', 'bundle-size/*', '.storybook/*', 'stories/*'];

  const filePatterns = { alwaysPublishedFiles, rootConfigFiles, nonProdAssets };

  return { ...defaults, ...schema, project, isProduction, filePatterns };
}

function npmPackOutput(options: NormalizedOptions, context: ExecutorContext) {
  const packDirectory = join(context.root, '.nx/verify-packaging', context.projectName!);
  rmSync(packDirectory, { recursive: true, force: true });
  mkdirSync(packDirectory, { recursive: true });
  const npmPackResult = spawnSync('npm', ['pack', '--json', '--pack-destination', packDirectory], {
    cwd: join(context.root, options.project.root),
    encoding: 'utf8',
  });
  rmSync(packDirectory, { recursive: true, force: true });

  if (npmPackResult.status && npmPackResult.status !== 0) {
    throw new Error(npmPackResult.stderr || `npm pack failed with exit code ${npmPackResult.status}`);
  }

  try {
    const output = JSON.parse(npmPackResult.stdout || '') as Array<{ files?: Array<{ path: string }> }>;
    if (output[0]?.files) {
      return output[0].files.map(file => file.path);
    }
  } catch {
    // Older npm output and unit fixtures use the human-readable notice format.
  }

  const processedResult = npmPackResult.output
    .toString()
    .replace(/\bnpm notice\b\s+[\d.]+[MkB]+\s+/gi, '')
    .replace(/[ ]+/g, '');
  return processedResult.split('\n').filter(Boolean);
}

function metadataAssertions(
  npmPackResult: string[],
  packageRoot: string,
): Array<{ matches?: string[]; pattern?: string | string[]; message: string }> {
  const packageJsonPath = join(packageRoot, 'package.json');
  if (!existsSync(packageJsonPath)) {
    return [];
  }
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as PackageJson;
  if (!packageJson.fluentuiCatalog) {
    return [];
  }

  const issues: Array<{ matches?: string[]; pattern?: string | string[]; message: string }> = [];
  if (packageJson.fluentuiCatalog !== './metadata.json') {
    issues.push({ message: 'fluentuiCatalog must point to the public ./metadata.json export' });
  }
  if (packageJson.exports?.['./metadata.json'] !== './dist/metadata/index.json') {
    issues.push({ message: 'exports ./metadata.json from dist/metadata/index.json' });
  }
  if (!packageJson.files?.includes('dist/metadata')) {
    issues.push({ message: 'includes dist/metadata in published files' });
  }

  try {
    const index = assertValidPackageIndex(
      JSON.parse(readFileSync(join(packageRoot, 'dist/metadata/index.json'), 'utf8')),
    );
    const records = index.records.map(descriptor =>
      assertValidApiRecord(JSON.parse(readFileSync(join(packageRoot, 'dist/metadata', descriptor.path), 'utf8'))),
    );
    const validation = validateCatalog(index, records);
    if (!validation.valid) {
      issues.push({
        message: `ships valid metadata records: ${validation.diagnostics
          .map(diagnostic => `${diagnostic.path}: ${diagnostic.message}`)
          .join('; ')}`,
      });
    }
    if (index.package.name !== packageJson.name || index.package.version !== packageJson.version) {
      issues.push({ message: 'metadata package identity matches the packed package.json' });
    }

    for (const input of index.declarationInputs) {
      const declaration = readFileSync(join(packageRoot, input.path));
      const fingerprint = createHash('sha256').update(declaration).digest('hex');
      if (fingerprint !== input.fingerprint.value) {
        issues.push({ message: `metadata declaration fingerprint matches ${input.path}` });
      }
    }

    const expectedFiles = [
      'dist/metadata/index.json',
      ...index.records.map(record => `dist/metadata/${record.path}`),
    ].sort();
    const packedFiles = micromatch(npmPackResult, 'dist/metadata/**').sort();
    if (JSON.stringify(packedFiles) !== JSON.stringify(expectedFiles)) {
      issues.push({
        matches: packedFiles,
        message: `ships exactly the indexed metadata files (${expectedFiles.join(', ')})`,
      });
    }
  } catch (error) {
    issues.push({
      message: `ships readable, valid metadata: ${error instanceof Error ? error.message : String(error)}`,
    });
  }

  return issues;
}

function assertions(
  npmPackResult: string[],
  options: NormalizedOptions,
  tags: Set<string>,
): Array<{ matches: string[]; message: string }> {
  const { alwaysPublishedFiles, nonProdAssets, rootConfigFiles } = options.filePatterns;

  const isV8package = tags.has('v8');
  const isV9package = tags.has('vNext');
  const shipsAMD = isV8package || tags.has('ships-amd');
  const shipsBundle = tags.has('ships-bundle');
  const shipsUmd = tags.has('ships-umd');
  const platform = { web: tags.has('platform:web'), node: tags.has('platform:node') };

  // shared assertions
  const issues = [
    assertEmpty(npmPackResult, alwaysPublishedFiles, `npm always shipped files`),
    assertNotEmpty(npmPackResult, nonProdAssets, `wont ship non production code related folders/files`),
    assertEmpty(npmPackResult, 'CHANGELOG.md', 'ships changelog markdown file'),
    assertEmpty(npmPackResult, 'dist/*', 'ships rolluped dts'),
    assertEmpty(npmPackResult, 'lib-commonjs/**/*.(js|map)', 'ships cjs'),
    assertNotEmpty(npmPackResult, 'src/*', `wont ship source code from "/src"`),
  ];

  if (!isV8package) {
    issues.push(assertNotEmpty(npmPackResult, rootConfigFiles, `wont ship configuration files`));
  }

  if (!platform.node) {
    issues.push(assertEmpty(npmPackResult, 'lib/**/*.(js|map)', 'ships esm'));
  }

  if (isV9package) {
    issues.push(
      assertNotEmpty(npmPackResult, 'config/*', `wont ship config folder`),
      assertNotEmpty(npmPackResult, 'etc/*', `wont ship etc folder"`),
    );
  }

  // apply only for non cross domain v8 packages (eg: react-migration-* is v9/v8)
  if (isV8package && !isV9package) {
    issues.push(assertEmpty(npmPackResult, '(lib|lib-commonjs)/**/*.d.ts', `ships dts`));

    if (options.isProduction && shipsBundle) {
      issues.push(
        assertEmpty(npmPackResult, 'dist/*.js', `ships bundle`),
        assertEmpty(npmPackResult, 'dist/*.min.js', `ships minified bundle`),
      );
    }
    if (options.isProduction && shipsUmd) {
      issues.push(assertEmpty(npmPackResult, 'dist/*.umd.js', `ships umd`));
    }
  }

  // @FIXME `amd` is created only on release pipeline where `--production` flag is used on build commands which triggers it
  // we should enable this also on PR pipelines - need to verify time execution impact
  if (options.isProduction && shipsAMD) {
    issues.push(assertEmpty(npmPackResult, 'lib-amd/**/*.(js|map)', 'ships amd'));
  }

  return issues.filter(Boolean) as Array<{ matches: string[]; message: string }>;

  // =====

  function assertEmpty(result: string[], pattern: string | string[], message: string) {
    const matches = micromatch(result, pattern);
    if (matches.length > 0) {
      return null;
    }

    return {
      pattern,
      message,
    };
  }

  function assertNotEmpty(result: string[], pattern: string | string[], message: string) {
    const matches = micromatch(result, pattern);
    if (matches.length === 0) {
      return null;
    }

    return {
      matches,
      message,
    };
  }
}
