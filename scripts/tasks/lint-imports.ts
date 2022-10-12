import { getAllPackageInfo, findGitRoot } from '../monorepo';
import { readConfig } from '../read-config';
import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs';
import chalk from 'chalk';

interface ImportErrorGroup {
  count: number;
  matches: { [filePath: string]: { importPath: string; alternative?: string }[] };
}

interface ImportErrors {
  pathAbsolute: ImportErrorGroup;
  pathNotFile: ImportErrorGroup;
  pathRelative: ImportErrorGroup;
  pathDeep: ImportErrorGroup;
  pathReExported: ImportErrorGroup;
  importStar: ImportErrorGroup;
  exportMulti: ImportErrorGroup;
  exportDefault: ImportErrorGroup;
}

export function lintImports() {
  const gitRoot = findGitRoot();
  const sourcePath = path.join(process.cwd(), 'src');
  const cwdNodeModulesPath = path.join(process.cwd(), 'node_modules');
  const nodeModulesPath = path.join(gitRoot, 'node_modules');

  if (!fs.existsSync(sourcePath)) {
    return;
  }

  const allowedDeepImports = [
    // This is a temporary measure until we figure out what root file these should be exported from.
    // TODO: Ideally these would eventually be removed.
    '@fluentui/react-examples/lib/react-experiments/TilesList/ExampleHelpers',
    '@fluentui/react-examples/lib/react-experiments/CollapsibleSection/CollapsibleSection.Recursive.Example',
    '@fluentui/react-examples/lib/react/Keytip/KeytipSetup',
    '@fluentui/react-charting/lib/types/IDataPoint',
    '@fluentui/react-experiments/lib/utilities/scrolling/ScrollContainer',
    // Once the components using this data are promoted, the data should go into @fluentui/example-data
    '@fluentui/react-experiments/lib/common/TestImages',
    // Only used in experimental examples. Will need a different approach for this to work with the editor.
    '@fluentui/foundation-legacy/lib/next/composed',
    // Imported by theming examples. Need to find a different approach.
  ];
  const allowedReexportedImports = ['@fluentui/foundation-legacy/lib/next/composed'];
  const reExportedPackages = {
    '@fluentui/foundation-legacy': 'Foundation',
    '@fluentui/font-icons-mdl2': 'Icons',
    '@fluentui/merge-styles': 'Styling',
    '@fluentui/style-utilities': 'Styling',
    '@fluentui/utilities': 'Utilities',
    '@fluentui/date-time-utilities': 'DateTimeUtilities',
  };

  const packagesInfo = getAllPackageInfo();

  const currentPackageJson = readConfig('package.json');
  const currentMonorepoPackage = currentPackageJson.name;

  return lintSource();

  function lintSource() {
    const files = glob.sync(path.join(sourcePath, '**/*.{ts,tsx}'));
    const importErrors: ImportErrors = {
      pathAbsolute: { count: 0, matches: {} },
      pathNotFile: { count: 0, matches: {} },
      pathRelative: { count: 0, matches: {} },
      pathDeep: { count: 0, matches: {} },
      pathReExported: { count: 0, matches: {} },
      importStar: { count: 0, matches: {} },
      exportMulti: { count: 0, matches: {} },
      exportDefault: { count: 0, matches: {} },
    };

    for (const file of files) {
      const isExample = file.includes('.Example.') && !file.includes('.scss');

      if (!file.includes('.test.ts')) {
        _evaluateFile(file, importErrors, isExample);
      }
    }

    if (reportFilePathErrors(importErrors)) {
      return Promise.reject('Errors in imports were found!');
    }

    return Promise.resolve();
  }

  function _evaluateFile(filePath: string, importErrors: ImportErrors, isExample: boolean) {
    // !! be careful !! changing the regex can affect matched parts below.
    const importStatementRegex = /^(import|export) [^'"]*(?:from )?['"]([^'"]+)['"];.*$/;

    const fileContent = fs.readFileSync(filePath, 'utf8');

    const importStatements = fileContent.match(new RegExp(importStatementRegex, 'gm'));

    if (importStatements) {
      importStatements.forEach(statement => {
        const parts = importStatementRegex.exec(statement);

        if (parts) {
          _evaluateImport(filePath, parts, importErrors, isExample);
        }
      });
    }

    if (isExample) {
      // borrowing this script to also check for some problematic export patterns in examples
      const relativePath = path.relative(sourcePath, filePath);

      // Check for multiple exported things that might be components (if this happens, the example editor
      // and export to codepen won't know what to render)
      const exportRegex = /^export (const|class) (\w+)/;
      const exportStatements = fileContent.match(new RegExp(exportRegex, 'gm'));
      if (!exportStatements) {
        _addError(importErrors.exportMulti, relativePath, 'no exported class or const');
      } else if (exportStatements.length > 1) {
        const exports = exportStatements.map(exp => (exp.match(exportRegex) as RegExpMatchArray)[2]);
        _addError(importErrors.exportMulti, relativePath, 'choose one of ' + exports.join(', '));
      }

      // Check for default exports
      const defaultExport = fileContent.match(/^export default (class |const )?(\w+)/m);
      if (defaultExport) {
        _addError(importErrors.exportDefault, relativePath, defaultExport[2]);
      }
    }
  }

  /**
   * @param importMatch - Result of running `importStatementRegex` against a single import
   * (`[1]` will be the import path)
   */
  function _evaluateImport(
    filePath: string,
    importMatch: RegExpMatchArray,
    importErrors: ImportErrors,
    isExample?: boolean,
  ) {
    const importPath = importMatch[2];
    const packageRootPath = importPath.split('/')[0];
    const relativePath = path.relative(sourcePath, filePath);
    let fullImportPath: string | undefined;
    let pathIsRelative = false;
    let pathIsDeep = false;
    let pkgName: string | undefined = undefined;

    if (importPath[0] === '.') {
      // import is a file path. is this a file?
      fullImportPath = _evaluateImportPath(path.dirname(filePath), importPath);
      pathIsRelative = true;
    } else if (packagesInfo[importPath] || packagesInfo[packageRootPath]) {
      // skip the full import of packages within the monorepo
      // filters out file paths that contain "examples", ".doc.", "exampleData"
      const filterOut = /(examples)|(\.doc\.)|(exampleData)/gm;
      const isAcceptedPath = filePath.match(filterOut) === null;
      const isntAtPath = importPath[0] !== '@';
      // checks if the import root directory is the same as the current working directory
      const isSameDirectory = process.cwd().match(new RegExp(`(${packageRootPath})$`, 'gm'));

      if (!isExample && isntAtPath && isAcceptedPath && isSameDirectory) {
        _addError(importErrors.pathAbsolute, relativePath, importPath);
      }
      return;
    } else {
      const pkgNameMatch = importPath.match(/^(@[\w-]+\/[\w-]+|[\w-]+)/);
      if (pkgNameMatch === null) {
        // This means the import does not adhere to what we are looking for, so skip linting.
        return;
      }

      pkgName = pkgNameMatch[1];

      // we don't evaluate imports of non monorepo packages
      if (!Object.keys(packagesInfo).includes(pkgName)) {
        return;
      }

      if (pkgName === currentMonorepoPackage) {
        const importPathWithoutPkgName = importPath.substring(pkgName.length + 1 /* 1 is for '/' */);
        fullImportPath = _evaluateImportPath(process.cwd(), './' + importPathWithoutPkgName);
      } else {
        fullImportPath =
          _evaluateImportPath(nodeModulesPath, './' + importPath) ||
          _evaluateImportPath(cwdNodeModulesPath, './' + importPath);
      }

      // A "deep" path is anything that goes further into the package than <pkg>/lib/<file>
      let allowedSegments = pkgName[0] === '@' ? 4 : 3;
      const isCompatImport = importPath.match(/\/compat/g);
      allowedSegments = isCompatImport ? allowedSegments + 1 : allowedSegments;
      pathIsDeep = importPath.split(/\//g).length > allowedSegments;
    }

    if (!fullImportPath || fs.statSync(fullImportPath).isDirectory()) {
      _addError(importErrors.pathNotFile, relativePath, importPath);
    }

    if (isExample) {
      const isScss = importPath.endsWith('.scss');

      if (pathIsRelative && !isScss) {
        _addError(importErrors.pathRelative, relativePath, importPath);
      }

      if (pathIsDeep && !isScss && !allowedDeepImports.includes(importPath)) {
        _addError(importErrors.pathDeep, relativePath, importPath);
      }

      if (
        reExportedPackages[pkgName as keyof typeof reExportedPackages] &&
        !allowedReexportedImports.includes(importPath)
      ) {
        _addError(
          importErrors.pathReExported,
          relativePath,
          importPath,
          '@fluentui/react/lib/' + reExportedPackages[pkgName as keyof typeof reExportedPackages],
        );
      }

      if (importMatch[0].startsWith('import * from') && !isScss) {
        _addError(importErrors.importStar, relativePath, importPath);
      }
    }
  }

  function _evaluateImportPath(filePath: string, importPath: string) {
    const fullImportPath = path.resolve(filePath, importPath);
    const extensions = ['.ts', '.tsx', '.js', ''];

    for (const ext of extensions) {
      const match = fullImportPath + ext;

      if (fs.existsSync(match)) {
        return match;
      }
    }

    return;
  }

  function _addError(errorGroup: ImportErrorGroup, relativePath: string, importPath: string, alternative?: string) {
    errorGroup.count++;
    errorGroup.matches[relativePath] = errorGroup.matches[relativePath] || [];
    errorGroup.matches[relativePath].push({ importPath, alternative });
  }

  function reportFilePathErrors(importErrors: ImportErrors) {
    const errorMessages: { [k in keyof ImportErrors]: string } = {
      pathAbsolute:
        'files are using absolute imports. Please update the following imports to use relative paths instead:',
      pathNotFile:
        'import path(s) do not reference physical files. This can break AMD imports. ' +
        'Please ensure the following imports reference physical files:',
      pathRelative:
        'example files are using relative imports. For example portability, please ensure that the following imports are absolute:',
      pathDeep:
        'example files are using deep imports. To promote best practices, ' +
        `please only import from root-level files ('<package-name>' or '<package-name>/lib/<file>').`,
      pathReExported:
        'example files are directly importing from packages that @fluentui/react re-exports. ' +
        'Please change the following imports to reference @fluentui/react instead:',
      importStar:
        'example files are using "import *" which causes problems with the website example editor. Please import things by name instead.',
      exportMulti:
        'example files are exporting multiple classes/consts (or none). Please export exactly one component per example.',
      exportDefault: 'example files are using a default export. Please use only named exports.',
    };

    let hasError = false;
    for (const groupName of Object.keys(importErrors) as Array<keyof ImportErrors>) {
      const errorGroup: ImportErrorGroup = importErrors[groupName];
      if (errorGroup.count) {
        hasError = true;
        console.error(`${chalk.red('ERROR')}: ${errorGroup.count} ${errorMessages[groupName]}`);
        console.error('-------------------------------------');
        for (const filePath in errorGroup.matches) {
          console.error(`  ${filePath}:`);
          for (const { importPath, alternative } of errorGroup.matches[filePath]) {
            console.error(`    ${chalk.inverse(importPath)}`);
            if (alternative) {
              console.error(`        (use instead: '${alternative}')`);
            }
          }
        }
      }
    }
    return hasError;
  }
}

// @ts-ignore
if (require.main === module) {
  lintImports();
}
