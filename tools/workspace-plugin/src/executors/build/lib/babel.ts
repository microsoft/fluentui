/**
 *
 * TODO: remove this module and its usage once we will be able to remove griffel AOT from our build output -> https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/shared/build-system/stop-styles-transforms.md
 */

import { writeFile, readFile, copyFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

import { type BabelFileResult, transformAsync } from '@babel/core';
import { globSync } from 'fast-glob';
import { logger } from '@nx/devkit';

import { processAsyncQueue, type NormalizedOptions } from './shared';
import { compileSwc } from './swc';

const EOL_REGEX = /\r?\n/g;

function addSourceMappingUrl(code: string, sourceMapLocation: string): string {
  // Babel keeps stripping this comment, even when correct option is set. Adding manually.
  return code + '\n//# sourceMappingURL=' + sourceMapLocation;
}

export function hasStylesFilesToProcess(normalizedOptions: NormalizedOptions) {
  const files = globSync('**/*.styles.ts', { cwd: normalizedOptions.absoluteSourceRoot });
  return files.length > 0;
}

export async function compileWithGriffelStylesAOT(options: NormalizedOptions) {
  const { esmConfig, restOfConfigs } = options.moduleOutput.reduce<{
    esmConfig: NormalizedOptions['moduleOutput'][number] | null;
    restOfConfigs: NormalizedOptions['moduleOutput'];
  }>(
    (acc, outputConfig) => {
      if (outputConfig.module === 'es6') {
        acc.esmConfig = outputConfig;
        return acc;
      }

      acc.restOfConfigs.push(outputConfig);
      return acc;
    },
    { esmConfig: null, restOfConfigs: [] },
  );

  if (!esmConfig) {
    logger.warn('es6 module output not specified. Skipping griffel AOT...');
    const compilationQueue = restOfConfigs.map(outputConfig => {
      return compileSwc(outputConfig, options);
    });
    return processAsyncQueue(compilationQueue);
  }

  const transforms = [];
  if (options.enableGriffelRawStyles) {
    logger.log('💅 Griffel RAW styles output enabled');
    transforms.push(createStyleRawOutput);
  }
  await compileSwc(esmConfig, options, transforms);
  await babel(esmConfig, options);

  const compilationQueue = restOfConfigs.map(outputConfig => {
    const overriddenSourceRoot = join(options.workspaceRoot, options.project.root);
    // we need to override source root to the output path of transpiled ESM+Griffel AOT, because griffel is unable to handle SWC commonjs output
    // so instead of transpiling TS(ESM) -> JS(COMMONJS), we transpile JS(ESM + griffel AOT) -> JS(COMMONJS)
    const overriddenAbsoluteSourceRoot = join(overriddenSourceRoot, esmConfig.outputPath);

    return compileSwc(outputConfig, {
      ...options,
      absoluteSourceRoot: overriddenAbsoluteSourceRoot,
    });
  });

  return processAsyncQueue(compilationQueue);
}

async function babel(esmModuleOutput: NormalizedOptions['moduleOutput'][number], normalizedOptions: NormalizedOptions) {
  const filesRoot = join(normalizedOptions.absoluteProjectRoot, esmModuleOutput.outputPath);
  const files = globSync('**/*.styles.js', { cwd: filesRoot });

  if (files.length === 0) {
    return;
  }

  logger.log(`Processing griffel AOT with babel: ${files.length} files`);

  for (const filename of files) {
    const filePath = join(filesRoot, filename);

    const codeBuffer = await readFile(filePath);
    const sourceCode = codeBuffer.toString().replace(EOL_REGEX, '\n');

    const result = (await transformAsync(sourceCode, {
      cwd: normalizedOptions.absoluteProjectRoot,
      ast: false,
      sourceMaps: true,

      babelrc: true,
      // to avoid leaking of global configs
      babelrcRoots: [normalizedOptions.absoluteProjectRoot],

      caller: { name: '@fluentui/workspace-plugin:build' },
      filename: filePath,

      sourceFileName: basename(filename),
    })) /* Bad `transformAsync` types. it can be null only if 2nd param is null(config)*/ as NonNullableRecord<BabelFileResult>;

    // FIXME:
    // - NOTE: needs to be fixed primarily in {@link 'file://./swc.ts'} as well
    // - swc does not add source mapping url when using @swc/core imperative APIs (unlike @swc/cli) (//# sourceMappingURL=) !
    // - we ship transpiled files without proper source mapping since - Wed, 31 May 2023 (the swithc from swc/cli to programatic api useage)
    // - @swc/cli does add source mapping because besides invoking swc/core programatically it also contains custom logic to add source mapping url https://github.com/swc-project/pkgs/blob/main/packages/cli/src/swc/compile.ts#L42-L44
    // const resultCode = addSourceMappingUrl(result.code, basename(filename) + '.map');

    const resultCode = result.code;

    if (resultCode === sourceCode) {
      logger.verbose(`babel: skipped ${filePath}`);
      continue;
    }
    logger.verbose(`babel: transformed ${filePath}`);

    const sourceMapFile = filePath + '.map';

    await writeFile(filePath, resultCode);
    await writeFile(sourceMapFile, JSON.stringify(result.map));
  }
}

/**
 *
 * Creates a raw styles output file if the original file is a Griffel styles file and the enableGriffelRawStyles option is true.
 * The raw styles file is created by copying the original file and renaming it with a .raw suffix.
 */
async function createStyleRawOutput(filePath: string): Promise<void> {
  if (!filePath.includes('.styles.')) {
    return;
  }
  const rawFilePath = filePath.replace('.styles.', '.styles.raw.');
  await copyFile(filePath, rawFilePath);
  logger.verbose(`raw-style: created ${rawFilePath}`);
}

type NonNullableRecord<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};
