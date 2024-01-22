import * as fs from 'fs';
import * as path from 'path';

import * as Babel from '@babel/core';

export type StoryImport = {
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

export async function getExportFromFile(distDir: string, filename: string): Promise<StoryImport | null> {
  const importPrefix = getImportPrefix(filename);
  const sourceCode = await fs.promises.readFile(filename, { encoding: 'utf8' });

  let storyImport: StoryImport | null = null;

  // A Babel plugin that parses imports in the index file of stories and returns them as a structure that contains
  // normalized paths and import names.
  const babelPlugin: Babel.PluginObj = {
    visitor: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ExportNamedDeclaration(exportPath) {
        if (exportPath.get('specifiers').length >= 1) {
          throw exportPath.buildCodeFrameError(
            'Specifiers for exports are not supported. Please report an issue if it ever happens',
          );
        }

        const declarationPath = exportPath.get('declaration');

        if (!declarationPath.isVariableDeclaration()) {
          throw declarationPath.buildCodeFrameError(
            'An export should have a variable declaration. Please report an issue if it ever happens',
          );
        }

        if (declarationPath.get('declarations').length !== 1) {
          throw declarationPath.buildCodeFrameError(
            'Exports of multiple variables are not supported. Please report an issue if it ever happens',
          );
        }

        const variableDeclarationPath = declarationPath.get('declarations.0') as Babel.NodePath;

        if (!variableDeclarationPath.isVariableDeclarator()) {
          throw declarationPath.buildCodeFrameError(
            'A declaration should be "VariableDeclarator". Please report an issue if it ever happens',
          );
        }

        const idPath = variableDeclarationPath.get('id');

        if (!idPath.isIdentifier()) {
          throw declarationPath.buildCodeFrameError(
            'A id should be "Identifier". Please report an issue if it ever happens',
          );
        }

        const importName = idPath.node.name;
        // These paths should be always POSIX-like as backslashes are not valid to be used in imports
        const importPath = path.relative(distDir, filename).split(path.sep).join(path.posix.sep);

        if (storyImport) {
          throw new Error('Multiple exports from a single file are not supported');
        }

        storyImport = {
          filepath: filename,
          local: importName,
          imported: importPrefix + importName,
          path: importPath,
        };
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

    presets: ['@babel/preset-typescript'],
    plugins: ['@babel/plugin-syntax-jsx', babelPlugin],
  });

  return storyImport;
}
