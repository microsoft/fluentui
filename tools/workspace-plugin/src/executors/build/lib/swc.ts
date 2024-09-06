import { readFileSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';

import { globSync } from 'fast-glob';
import { isMatch } from 'micromatch';
import { transform, type Config } from '@swc/core';
import { logger, readJsonFile } from '@nx/devkit';

import { type NormalizedOptions } from './shared';

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
  const swcConfig = readJsonFile<Config>(join(normalizedOptions.absoluteProjectRoot, '.swcrc'));
  const tsFileExtensionRegex = /\.(tsx|ts)$/;

  for (const fileName of sourceFiles) {
    const srcFilePath = join(normalizedOptions.absoluteSourceRoot, fileName);
    const isFileExcluded = swcConfig.exclude ? isMatch(srcFilePath, swcConfig.exclude, { contains: true }) : false;

    if (isFileExcluded) {
      continue;
    }

    const sourceCode = readFileSync(srcFilePath, 'utf-8');

    const result = await transform(sourceCode, {
      filename: fileName,
      sourceFileName: basename(fileName),
      module: { type: module },
      outputPath,
      sourceMaps: true,
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
