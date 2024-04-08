import fs from 'fs';
import path from 'path';

import { transform } from '@wyw-in-js/transform';
import * as glob from 'glob';
import { logger } from 'just-scripts';

const EOL_REGEX = /\r?\n/g;

type PartialServices = Parameters<typeof transform>[0];
type AsyncResolve = Parameters<typeof transform>[2];

function addSourceMappingUrl(code: string, loc: string): string {
  // Babel keeps stripping this comment, even when correct option is set. Adding manually.
  return code + '\n//# sourceMappingURL=' + path.basename(loc);
}

export async function wyw() {
  const files = glob.sync('lib/**/*.styles.js');

  for (const filename of files) {
    const filePath = path.resolve(process.cwd(), filename);
    const sourceMapFilename = filename + '.map';

    const codeBuffer = await fs.promises.readFile(filePath);
    const sourceMapContent = await fs.promises.readFile(sourceMapFilename, 'utf8');
    const sourceCode = codeBuffer.toString().replace(EOL_REGEX, '\n');

    const transformServices: PartialServices = {
      options: {
        filename,
        inputSourceMap: JSON.parse(sourceMapContent),
        root: process.cwd(),
      },
    };

    const asyncResolve: AsyncResolve = async (what, importer, stack) => {
      return require.resolve(what, { paths: [importer] });
    };
    const result = await transform(transformServices, sourceCode, asyncResolve);
    const resultCode = addSourceMappingUrl(result.code, path.basename(filename) + '.map');

    if (result.code === sourceCode) {
      logger.verbose(`wyw: skipped ${filePath}`);
      continue;
    } else {
      logger.verbose(`wyw: transformed ${filePath}`);
    }

    await fs.promises.writeFile(filePath, resultCode);
    await fs.promises.writeFile(sourceMapFilename, JSON.stringify(result.sourceMap));
  }
}
