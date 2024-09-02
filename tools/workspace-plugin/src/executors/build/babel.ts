import { writeFile, readFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

import { type BabelFileResult, transformAsync } from '@babel/core';
import { globSync } from 'fast-glob';
import { logger } from '@nx/devkit';

import { type NormalizedOptions } from './executor';

const EOL_REGEX = /\r?\n/g;

function addSourceMappingUrl(code: string, loc: string): string {
  // Babel keeps stripping this comment, even when correct option is set. Adding manually.
  return code + '\n//# sourceMappingURL=' + basename(loc);
}

export function hasStylesFilesToProcess(normalizedOptions: NormalizedOptions) {
  const files = globSync('**/*.styles.ts', { cwd: normalizedOptions.absoluteSourceRoot });
  return files.length > 0;
}

export async function babel(
  esmModuleOutput: NormalizedOptions['moduleOutput'][number],
  normalizedOptions: NormalizedOptions,
) {
  const filesRoot = join(normalizedOptions.absoluteProjectRoot, esmModuleOutput.outputPath);
  const files = globSync('**/*.styles.js', { cwd: filesRoot });

  if (files.length === 0) {
    return;
  }

  logger.log(`processing griffel AOT with babel: ${files.length} files`);

  for (const filename of files) {
    const filePath = join(filesRoot, filename);

    const codeBuffer = await readFile(filePath);
    const sourceCode = codeBuffer.toString().replace(EOL_REGEX, '\n');

    const result = (await transformAsync(sourceCode, {
      ast: false,
      sourceMaps: true,

      babelrc: true,
      // to avoid leaking of global configs
      babelrcRoots: [normalizedOptions.project.root],

      caller: { name: '@fluentui/workspace-plugin:build' },
      filename: filePath,

      sourceFileName: basename(filename),
    })) /* Bad `transformAsync` types. it can be null only if 2nd param is null(config)*/ as NonNullableRecord<BabelFileResult>;
    const resultCode = addSourceMappingUrl(result.code, basename(filename) + '.map');

    if (resultCode === sourceCode) {
      logger.verbose(`babel: skipped ${filePath}`);
      continue;
    } else {
      logger.verbose(`babel: transformed ${filePath}`);
    }

    const sourceMapFile = filePath + '.map';

    await writeFile(filePath, resultCode);
    await writeFile(sourceMapFile, JSON.stringify(result.map));
  }
}

type NonNullableRecord<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};
