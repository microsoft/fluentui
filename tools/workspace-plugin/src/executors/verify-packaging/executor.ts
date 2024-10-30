import { type ExecutorContext, type PromiseExecutor, logger, serializeJson } from '@nx/devkit';
import { spawnSync } from 'node:child_process';

import micromatch from 'micromatch';

import { type VerifyPackagingExecutorSchema } from './schema';
import { join } from 'node:path';
import { measureEnd, measureStart } from '../../utils';

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

  const issues = assertions(packOutput, options, tags);

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
    '.eslintrc.(js|json)',
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
  const npmPackResult = spawnSync('npm', ['pack', '--dry-run'], { cwd: join(context.root, options.project.root) });

  const processedResult = npmPackResult.output
    .toString()
    .replace(/\bnpm notice\b\s+[\d.]+[MkB]+\s+/gi, '')
    .replace(/[ ]+/g, '');
  return processedResult.split('\n');
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
