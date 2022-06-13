import * as Babel from '@babel/core';
import * as fs from 'fs';
import * as path from 'path';

type StoryImport = {
  local: string;
  imported: string;
  path: string;
};

// TODO: Once will be solved, can be simplified https://github.com/microsoft/fluentui/issues/23393
function getImportPrefix(filename: string): string {
  const importPrefixByFile = path.basename(filename).split('.')[0];

  if (importPrefixByFile === 'index') {
    return path.basename(path.dirname(filename));
  }

  return importPrefixByFile;
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

        imports.push({
          local: importName,
          imported: importPrefix + importName,
          path: path.relative(distDir, path.resolve(path.dirname(filename), sourcePath.node.value)),
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
