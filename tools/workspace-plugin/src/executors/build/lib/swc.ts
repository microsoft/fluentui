import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import { globSync } from 'fast-glob';
import { isMatch } from 'micromatch';
import { transformFile, type Config } from '@swc/core';
import { logger, readJsonFile } from '@nx/devkit';

import { type NormalizedOptions } from './shared';

// extend @swc/core types by missing apis
declare module '@swc/core' {
  interface BaseModuleConfig {
    resolveFully?: boolean;
  }
}

interface Options {
  module: 'es6' | 'commonjs' | 'amd';
  outputPath: string;
}

export async function compileSwc(options: Options, normalizedOptions: NormalizedOptions) {
  const { outputPath, module } = options;
  const absoluteOutputPath = join(normalizedOptions.absoluteProjectRoot, outputPath);

  logger.log(`Compiling with SWC for module:${options.module}...`);

  const sourceFiles = globSync(`**/*.{js,ts,tsx}`, { cwd: normalizedOptions.absoluteSourceRoot });

  // TODO: make this configurable via schema
  const swcConfigPath = join(normalizedOptions.absoluteProjectRoot, '.swcrc');
  const swcConfig = readJsonFile<Config>(swcConfigPath);
  const tsFileExtensionRegex = /\.(tsx|ts)$/;

  for (const fileName of sourceFiles) {
    const srcFilePath = join(normalizedOptions.absoluteSourceRoot, fileName);
    const isFileExcluded = swcConfig.exclude ? isMatch(srcFilePath, swcConfig.exclude, { contains: true }) : false;

    if (isFileExcluded) {
      continue;
    }

    const result = await transformFile(srcFilePath, {
      module: { type: module, resolveFully: Boolean(swcConfig.jsc?.baseUrl) },
      // srcFilePath is absolute path so outputPath needs to be as well in order to properly emit relative path within .map (eg: `"sources":["../src/utils/createDarkTheme.ts"]`)
      outputPath: join(normalizedOptions.absoluteProjectRoot, outputPath),
    });

    // Strip @jsx comments, see https://github.com/microsoft/fluentui/issues/29126
    const resultCode = result.code
      .replace('/** @jsxRuntime automatic */', '')
      .replace('/** @jsxImportSource @fluentui/react-jsx-runtime */', '');

    const jsFileName = fileName.replace(tsFileExtensionRegex, '.js');
    const compiledFilePath = join(absoluteOutputPath, jsFileName);

    // Create directory folder for new compiled file(s) to live in.
    await mkdir(dirname(compiledFilePath), { recursive: true });

    await writeFile(compiledFilePath, resultCode);

    if (result.map) {
      await writeFile(`${compiledFilePath}.map`, result.map);
    }
  }
}
