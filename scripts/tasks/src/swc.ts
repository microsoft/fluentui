import fs from 'fs';
import path from 'path';

import { transform } from '@swc/core';
import type { Options as SwcOptions } from '@swc/core';
import glob from 'glob';
import * as match from 'micromatch';

type Options = SwcOptions & { module: { type: 'es6' | 'commonjs' | 'amd' } };

async function swcTransform(options: Options) {
  const { outputPath, module } = options;
  let sourceFiles: string[] = [];

  if (module.type === 'es6') {
    sourceFiles = glob.sync('src/**/*.{ts,tsx}');
  }

  if (module.type === 'commonjs' || module.type === 'amd') {
    sourceFiles = glob.sync('lib/**/*.js');
  }

  const swcConfig = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), '.swcrc'), 'utf-8'));

  for (const fileName of sourceFiles) {
    const srcFilePath = path.resolve(process.cwd(), fileName);
    const isFileExcluded = match.isMatch(srcFilePath, swcConfig.exclude, { contains: true });

    if (isFileExcluded) {
      continue;
    }

    const sourceCode = fs.readFileSync(srcFilePath, 'utf-8');

    const result = await transform(sourceCode, {
      filename: fileName,
      module: { type: module.type },
      sourceFileName: path.basename(fileName),
      outputPath,
    });

    const compiledFilePath = path.resolve(
      process.cwd(),
      fileName.replace(`${module.type === 'es6' ? 'src' : 'lib'}`, outputPath!),
    );

    //Create directory folder for new compiled file(s) to live in.
    await fs.promises.mkdir(compiledFilePath.replace(path.basename(compiledFilePath), ''), { recursive: true });

    const compiledFilePathJS = `${compiledFilePath.replace(/\.(tsx|ts)$/, '.js')}`;

    await fs.promises.writeFile(compiledFilePathJS, result.code);
    if (result.map) {
      await fs.promises.writeFile(`${compiledFilePathJS}.map`, result.map);
    }
  }
}

export const swc = {
  commonjs: () => {
    const options: Options = {
      configFile: true,
      outputPath: 'lib-commonjs',
      module: { type: 'commonjs' },
    };

    return swcTransform(options);
  },
  esm: () => {
    const options: Options = {
      configFile: true,
      outputPath: 'lib',
      module: { type: 'es6' },
    };

    return swcTransform(options);
  },
  amd: () => {
    const options: Options = {
      configFile: true,
      outputPath: 'lib-amd',
      module: { type: 'amd' },
    };

    return swcTransform(options);
  },
};
