import fs from 'fs';
import path from 'path';

import { transform } from '@swc/core';
import glob from 'glob';
import * as micromatch from 'micromatch';

import { Options } from './types';
import { addJsExtensionToImports } from './utils';

async function swcTransform(options: Options) {
  const { outputPath, module, root: packageRoot = process.cwd() } = options;

  const sourceRootDirName = module.type === 'es6' ? 'src' : 'lib';

  let sourceFiles: string[] = [];

  if (module.type === 'es6') {
    sourceFiles = glob.sync(`${sourceRootDirName}/**/*.{ts,tsx}`);
  }

  if (module.type === 'commonjs' || module.type === 'amd') {
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
      module: { type: module.type, resolveFully: enableResolveFully },
      sourceFileName: path.basename(fileName),
      outputPath,
    });

    // Strip @jsx comments, see https://github.com/microsoft/fluentui/issues/29126
    let resultCode = result.code
      .replace('/** @jsxRuntime automatic */', '')
      .replace('/** @jsxImportSource @fluentui/react-jsx-runtime */', '');

    // Remove after swc implement proper js extension addition https://github.com/microsoft/fluentui/issues/30634
    resultCode = enableResolveFully ? addJsExtensionToImports(resultCode, module.type) : resultCode;

    const compiledFilePath = path.resolve(packageRoot, fileName.replace(`${sourceRootDirName}`, outputPath));

    //Create directory folder for new compiled file(s) to live in.
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
