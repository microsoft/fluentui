import fs from 'fs';
import path from 'path';

import { transform } from '@swc/core';
import glob from 'glob';
import * as micromatch from 'micromatch';

import { Options } from './types';
import { postprocessOutput } from './utils';

async function swcTransform(options: Options) {
  const { outputPath, module, root: packageRoot = process.cwd() } = options;

  const moduleType = module.type;
  const sourceRootDirName = moduleType === 'es6' ? 'src' : 'lib';

  let sourceFiles: string[] = [];

  if (moduleType === 'es6') {
    sourceFiles = glob.sync(`${sourceRootDirName}/**/*.{ts,tsx}`);
  }

  if (moduleType === 'commonjs' || moduleType === 'amd') {
    sourceFiles = glob.sync(`${sourceRootDirName}/**/*.js`);
  }

  const swcConfig = JSON.parse(fs.readFileSync(path.resolve(packageRoot, '.swcrc'), 'utf-8'));
  const enableResolveFully = Boolean(swcConfig.jsc.baseUrl);
  const tsFileExtensionRegex = /\.(tsx|ts)$/;

  for (const fileName of sourceFiles) {
    const srcFilePath = path.resolve(packageRoot, fileName);
    const isFileExcluded = micromatch.isMatch(srcFilePath, swcConfig.exclude, { contains: true });

    if (isFileExcluded) {
      continue;
    }

    const sourceCode = fs.readFileSync(srcFilePath, 'utf-8');

    const result = await transform(sourceCode, {
      filename: fileName,
      module: { type: moduleType, resolveFully: enableResolveFully },
      sourceFileName: path.basename(fileName),
      outputPath,
    });

    const resultCode = postprocessOutput(result.code, {
      addExplicitJsExtensionToImports: enableResolveFully,
      moduleType,
    });

    const compiledFilePath = path.resolve(packageRoot, fileName.replace(`${sourceRootDirName}`, outputPath));

    // Create directory folder for new compiled file(s) to live in.
    await fs.promises.mkdir(compiledFilePath.replace(path.basename(compiledFilePath), ''), { recursive: true });

    const compiledFilePathJS = `${compiledFilePath.replace(tsFileExtensionRegex, '.js')}`;

    await fs.promises.writeFile(compiledFilePathJS, resultCode);
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
