import * as Babel from '@babel/core';
import * as fs from 'fs';
import * as path from 'path';

type StoryImport = {
  local: string;
  imported: string;
  filepath: string;
  path: string;
};

function getImportPrefix(filename: string): string {
  const importPrefix = path.basename(path.dirname(filename));

  if (importPrefix === 'stories' || importPrefix[0].toLowerCase() === importPrefix[0]) {
    throw new Error(
      [
        `The file "${filename}" has an incorrect location a directory name.`,
        `All stories should be placed in "/src/stories/ComponentName" directory.`,
      ].join(' '),
    );
  }

  return importPrefix;
}

export async function getImportsFromIndexFile(distDir: string, filename: string): Promise<StoryImport[]> {
  const importPrefix = getImportPrefix(filename);
  const sourceCode = await fs.promises.readFile(filename, { encoding: 'utf8' });

  const imports: StoryImport[] = [];

  // A Babel plugin that parses imports in the index file of stories and returns them as a structure that contains
  // normalized paths and import names.
  const babelPlugin: Babel.PluginObj = {
    visitor: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ExportNamedDeclaration(exportPath) {
        const sourcePath = exportPath.get('source');
        const specifierPaths = exportPath.get('specifiers');

        if (!sourcePath.isStringLiteral()) {
          throw sourcePath.buildCodeFrameError(
            'A source is not a string literal. Please report an issue if it ever happens',
          );
        }

        if (specifierPaths.length > 1) {
          throw sourcePath.buildCodeFrameError('Multiple exports from a single file are not supported');
        }

        const specifierPath = exportPath.get('specifiers.0');

        if (Array.isArray(specifierPath)) {
          throw exportPath.buildCodeFrameError('A specifier is an array. Please report an issue if it ever happens');
        }

        if (!specifierPath.isExportSpecifier()) {
          throw specifierPath.buildCodeFrameError(
            'A specifier has the wrong kind. Please report an issue if it ever happens',
          );
        }

        const importName = specifierPath.get('local').node.name;
        // These paths should be always POSIX-like as backslashes are not valid to be used in imports

        const absolutePath = path.resolve(path.dirname(filename), sourcePath.node.value);
        const importPath = path.relative(distDir, absolutePath).split(path.sep).join(path.posix.sep);

        imports.push({
          filepath: absolutePath,
          local: importName,
          imported: importPrefix + importName,
          path: importPath,
        });
      },
    },
  };

  await Babel.transformAsync(sourceCode, {
    ast: false,
    code: false,

    // This instance of Babel should ignore all user's configs and apply only our plugin
    configFile: false, // https://babeljs.io/docs/en/options#configfile
    babelrc: false, // https://babeljs.io/docs/en/options#babelrc

    filename,

    presets: ['@babel/preset-react', '@babel/preset-typescript'],
    plugins: [babelPlugin],
  });

  return imports;
}
