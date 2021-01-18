import { transformAsync } from '@babel/core';
import * as glob from 'glob';
import fs from 'fs';
import path from 'path';
import { EOL } from 'os';

const OEL_REGEX = new RegExp(EOL, 'g');

function addSourceMappingUrl(code: string, loc: string): string {
  return code + '\n//# sourceMappingURL=' + path.basename(loc);
}

export async function babel() {
  const files = glob.sync('{lib,lib-commonjs}/**/*.js');

  for (const filename of files) {
    const filePath = path.resolve(process.cwd(), filename);

    const codeBuffer = await fs.promises.readFile(filePath);
    const sourceCode = codeBuffer.toString().replace(OEL_REGEX, '\n');

    const result = await transformAsync(sourceCode, {
      ast: false,
      sourceMaps: true,

      caller: { name: 'just-scripts' },
      filename: filePath,

      sourceFileName: path.basename(filename),

      babelrc: false,
      plugins: [require('@fluentui/babel-make-styles')],
    });
    const resultCode = addSourceMappingUrl(result.code, path.basename(filename) + '.map');

    if (resultCode === sourceCode) {
      continue;
    }

    const sourceMapFile = filePath + '.map';

    await fs.promises.writeFile(filePath, resultCode);
    await fs.promises.writeFile(sourceMapFile, JSON.stringify(result.map));
  }
}
