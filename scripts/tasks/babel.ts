import { transformAsync } from '@babel/core';
import * as glob from 'glob';
import fs from 'fs';
import { logger } from 'just-task';
import path from 'path';

const EOL_REGEX = /\r?\n/g;

function addSourceMappingUrl(code: string, loc: string): string {
  // Babel keeps stripping this comment, even when correct option is set. Adding manually.
  return code + '\n//# sourceMappingURL=' + path.basename(loc);
}

export async function babel() {
  const files = glob.sync('{lib,lib-commonjs}/**/*.js');

  for (const filename of files) {
    const filePath = path.resolve(process.cwd(), filename);

    const codeBuffer = await fs.promises.readFile(filePath);
    const sourceCode = codeBuffer.toString().replace(EOL_REGEX, '\n');

    const result = await transformAsync(sourceCode, {
      ast: false,
      sourceMaps: true,

      babelrc: true,
      // to avoid leaking of global configs
      babelrcRoots: [process.cwd()],

      caller: { name: 'just-scripts' },
      filename: filePath,

      sourceFileName: path.basename(filename),
    });
    const resultCode = addSourceMappingUrl(result.code, path.basename(filename) + '.map');

    if (resultCode === sourceCode) {
      logger.verbose(`babel: skipped ${filePath}`);
      continue;
    } else {
      logger.verbose(`babel: transformed ${filePath}`);
    }

    const sourceMapFile = filePath + '.map';

    await fs.promises.writeFile(filePath, resultCode);
    await fs.promises.writeFile(sourceMapFile, JSON.stringify(result.map));
  }
}
