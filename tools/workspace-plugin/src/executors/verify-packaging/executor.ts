import { type ExecutorContext, type PromiseExecutor, logger, serializeJson } from '@nx/devkit';
import { spawnSync } from 'node:child_process';

import micromatch from 'micromatch';

import { type VerifyPackagingExecutorSchema } from './schema';
import { join } from 'node:path';

const runExecutor: PromiseExecutor<VerifyPackagingExecutorSchema> = async (schema, context) => {
  const options = normalizeOptions(schema, context);

  const success = await runVerifyPackaging(options, context);

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

function verboseLog(message: string, kind: keyof typeof logger = 'info') {
  if (process.env.NX_VERBOSE_LOGGING === 'true') {
    logger[kind](message);
  }
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

  const issues = [
    assertEmpty(npmPackResult, alwaysPublishedFiles, `npm always shipped files`),
    assertNotEmpty(npmPackResult, nonProdAssets, `wont ship non production code related folders/files`),
    assertEmpty(npmPackResult, 'CHANGELOG.md', 'ships changelog markdown file'),
    assertEmpty(npmPackResult, 'dist/*', 'ships rolluped dts'),
    assertEmpty(npmPackResult, 'lib-commonjs/**/*.(js|map)', 'ships cjs'),
    assertNotEmpty(npmPackResult, 'src/*', `wont ship source code from "/src"`),
  ];

  // shared assertions
  // if (micromatch(npmPackResult, alwaysPublishedFiles).length === 0) {
  //   console.log(micromatch(npmPackResult, alwaysPublishedFiles));
  //   return { message: `npm always shipped files` };
  // }

  // if (micromatch(npmPackResult, nonProdAssets).length) {
  //   return { message: `wont ship non production code related folders/files` };
  // }
  // if (micromatch(npmPackResult, 'CHANGELOG.md').length === 0) {
  //   return { message: 'ships changelog markdown file' };
  // }
  // if (micromatch(npmPackResult, 'dist/*.d.ts').length === 0) {
  //   return { message: 'ships rolluped dts' };
  // }
  // if (micromatch(npmPackResult, 'lib-commonjs/**/*.(js|map)').length === 0) {
  //   return { message: 'ships cjs' };
  // }
  // if (micromatch(npmPackResult, 'src/*').length) {
  //   return { message: `wont ship source code from "/src"` };
  // }

  // assert.ok(micromatch(npmPackResult, 'dist/*.d.ts').length, 'ships rolluped dts');
  // assert.ok(micromatch(npmPackResult, 'lib-commonjs/**/*.(js|map)').length, 'ships cjs');
  // assert.equal(micromatch(npmPackResult, 'src/*').length, 0, `wont ship source code from "/src"`);

  if (!isV8package) {
    issues.push(assertNotEmpty(npmPackResult, rootConfigFiles, `wont ship configuration files`));
    // if (micromatch(npmPackResult, rootConfigFiles).length) {
    //   return { message: `wont ship configuration files` };
    // }
    // assert.equal(micromatch(npmPackResult, rootConfigFiles).length, 0, `wont ship configuration files`);
  }

  if (!platform.node) {
    issues.push(assertEmpty(npmPackResult, 'lib/**/*.(js|map)', 'ships esm'));
    // if (micromatch(npmPackResult, 'lib/**/*.(js|map)').length === 0) {
    //   return { message: 'ships esm' };
    // }
    // assert.ok(micromatch(npmPackResult, 'lib/**/*.(js|map)').length, 'ships esm');
  }

  if (isV9package) {
    issues.push(
      assertNotEmpty(npmPackResult, 'config/*', `wont ship config folder`),
      assertNotEmpty(npmPackResult, 'etc/*', `wont ship etc folder"`),
    );
    // if (micromatch(npmPackResult, 'config/*').length) {
    //   return { message: `wont ship config folder` };
    // }
    // if (micromatch(npmPackResult, 'etc/*').length) {
    //   return { message: `wont ship etc folder"` };
    // }
    // assert.equal(micromatch(npmPackResult, 'config/*').length, 0, `wont ship config folder`);
    // assert.equal(micromatch(npmPackResult, 'etc/*').length, 0, `wont ship etc folder"`);
  }

  if (isV8package) {
    issues.push(assertEmpty(npmPackResult, '(lib|lib-commonjs)/**/*.d.ts', `ships dts`));
    // if (micromatch(npmPackResult, '(lib|lib-commonjs)/**/*.d.ts').length === 0) {
    //   return { message: `ships dts` };
    // }
    // assert.ok(micromatch(npmPackResult, '(lib|lib-commonjs)/**/*.d.ts').length, `ships dts`);

    if (options.isProduction && shipsBundle) {
      issues.push(
        assertEmpty(npmPackResult, 'dist/*.js', `ships bundle`),
        assertEmpty(npmPackResult, 'dist/*.min.js', `ships minified bundle`),
      );
      // if (micromatch(npmPackResult, 'dist/*.js').length === 0) {
      //   return { message: `ships bundle` };
      // }
      // if (micromatch(npmPackResult, 'dist/*.min.js').length === 0) {
      //   return { message: `ships minified bundle` };
      // }
      // assert.ok(micromatch(npmPackResult, 'dist/*.js').length, `ships bundle`);
      // assert.ok(micromatch(npmPackResult, 'dist/*.min.js').length, `ships minified bundle`);
    }
    if (options.isProduction && shipsUmd) {
      issues.push(assertEmpty(npmPackResult, 'dist/*.umd.js', `ships umd`));
      // if (micromatch(npmPackResult, 'dist/*.umd.js').length === 0) {
      //   return { message: `ships umd` };
      // }
      // assert.ok(micromatch(npmPackResult, 'dist/*.umd.js').length, `ships umd`);
    }
  }

  // @FIXME `amd` is created only on release pipeline where `--production` flag is used on build commands which triggers it
  // we should enable this also on PR pipelines - need to verify time execution impact
  if (options.isProduction && shipsAMD) {
    issues.push(assertEmpty(npmPackResult, 'lib-amd/**/*.(js|map)', 'ships amd'));
    // if (micromatch(npmPackResult, 'lib-amd/**/*.(js|map)').length === 0) {
    //   return { message: 'ships amd' };
    // }
    // assert.ok(micromatch(npmPackResult, 'lib-amd/**/*.(js|map)').length, 'ships amd');
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
