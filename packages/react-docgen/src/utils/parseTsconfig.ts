import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

/**
 * Helper to perform the weirdly complicated task of parsing a tsconfig file accounting for `extends`.
 */
export function parseTsconfig(tsconfigPath: string): ts.CompilerOptions {
  const { config, error } = ts.readConfigFile(tsconfigPath, filename => fs.readFileSync(filename, 'utf8'));

  if (error) {
    throw new Error(
      `Cannot load custom tsconfig.json from provided path: ${tsconfigPath}, ` +
        `with error code: ${error.code}, message: ${error.messageText}`,
    );
  }

  let basePath = path.dirname(tsconfigPath);
  if (config.compilerOptions?.baseUrl) {
    basePath = path.resolve(basePath, config.compilerOptions.baseUrl);
  }
  const { options, errors } = ts.parseJsonConfigFileContent(config, ts.sys, basePath, {}, tsconfigPath);

  if (errors && errors.length) {
    throw errors[0];
  }

  return options;
}
