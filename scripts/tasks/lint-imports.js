// @ts-check

/**
 * @typedef {{
 *   count: number;
 *   matches: { [filePath: string]: { importPath: string; alternative?: string; }[] };
 * }} ImportErrorGroup
 *
 * @typedef {{
 *   pathAbsolute: ImportErrorGroup;
 *   pathNotFile: ImportErrorGroup;
 *   pathRelative: ImportErrorGroup;
 *   pathDeep: ImportErrorGroup;
 *   pathReExported: ImportErrorGroup;
 *   importStar: ImportErrorGroup;
 *   exportMulti: ImportErrorGroup;
 *   exportDefault: ImportErrorGroup;
 * }} ImportErrors
 *
 * @typedef {{
 *   totalImportKeywords: number;
 *   totalImportStatements: number;
 * }} ImportStats
 */

const getAllPackageInfo = require('../monorepo/getAllPackageInfo');
const findConfig = require('../find-config');
const { readConfig } = require('../read-config');

function lintImports() {
  const path = require('path');
  const fs = require('fs');
  const chalk = require('chalk').default;
  const findGitRoot = require('../monorepo/findGitRoot');

  const gitRoot = findGitRoot();
  const sourcePath = path.resolve(process.cwd(), 'src');
  const cwdNodeModulesPath = path.resolve(process.cwd(), 'node_modules');
  const nodeModulesPath = path.resolve(gitRoot, 'node_modules');

  const allowedDeepImports = [
    // This is a temporary measure until we figure out what root file these should be exported from.
    // TODO: Ideally these would eventually be removed.
    'office-ui-fabric-react/lib/components/Keytip/examples/KeytipSetup',
    'office-ui-fabric-react/lib/utilities/dateMath/DateMath',
    'office-ui-fabric-react/lib/utilities/keytips/index',
    'office-ui-fabric-react/lib/utilities/positioning',
    '@uifabric/charting/lib/types/IDataPoint',
    '@uifabric/date-time/lib/utilities/dateMath/DateMath',
    '@uifabric/experiments/lib/utilities/scrolling/ScrollContainer',
    // Once the components using this data are promoted, the data should go into @uifabric/example-data
    '@uifabric/experiments/lib/common/TestImages',
    '@uifabric/experiments/lib/components/TilesList/examples/ExampleHelpers',
    // Only used in experimental examples. Will need a different approach for this to work with the editor.
    '@uifabric/foundation/lib/next/composed',
    // Imported by theming examples. Need to find a different approach.
    '@uifabric/experiments/lib/components/CollapsibleSection/examples/CollapsibleSection.Recursive.Example'
  ];
  const allowedReexportedImports = ['@uifabric/foundation/lib/next/composed'];
  const reExportedPackages = {
    '@uifabric/foundation': 'Foundation',
    '@uifabric/icons': 'Icons',
    '@uifabric/merge-styles': 'Styling',
    '@uifabric/styling': 'Styling',
    '@uifabric/utilities': 'Utilities'
  };

  const packagesInfo = getAllPackageInfo();

  const currentPackageJson = readConfig(findConfig('package.json'));
  const currentMonorepoPackage = currentPackageJson.name;

  return lintSource();

  function lintSource() {
    const files = _getFiles(sourcePath, /\.(ts|tsx)$/i);
    /** @type {ImportErrors} */
    const importErrors = {
      pathAbsolute: { count: 0, matches: {} },
      pathNotFile: { count: 0, matches: {} },
      pathRelative: { count: 0, matches: {} },
      pathDeep: { count: 0, matches: {} },
      pathReExported: { count: 0, matches: {} },
      importStar: { count: 0, matches: {} },
      exportMulti: { count: 0, matches: {} },
      exportDefault: { count: 0, matches: {} }
    };
    /** @type {ImportStats} */
    const importStats = {
      totalImportKeywords: 0,
      totalImportStatements: 0
    };

    for (const file of files) {
      const isExample = file.includes('.Example.') && !file.includes('.scss');

      if (!file.includes('.test.ts')) {
        _evaluateFile(file, importErrors, importStats, isExample);
      }
    }

    // A mismatch here identifies a potential issue with the import regex properly matching all import statements.
    // If you're here for this error check out commented out code in _evaluateFile for troubleshooting.
    if (importStats.totalImportKeywords !== importStats.totalImportStatements) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('WARNING: Potential missed import statements.');
      console.log(`Import keywords found: ${importStats.totalImportKeywords}`);
      console.log(`Import statements found: ${importStats.totalImportStatements}`);
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!');
    }

    if (reportFilePathErrors(importErrors)) {
      return Promise.reject('Errors in imports were found!');
    }

    return Promise.resolve();
  }

  /**
   * Recurses through a given folder path and adds files to an array which
   * match the extension pattern. Returns array.
   *
   * @param {string} dir - starting folder path.
   * @param {RegExp} extentionPattern - extension regex to match.
   * @param {string[]} [fileList] - cumulative array of files
   * @returns array of matching files.
   */
  function _getFiles(dir, extentionPattern, fileList) {
    fileList = fileList || [];

    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const fullPath = path.join(dir, file);

      if (fs.statSync(fullPath).isDirectory()) {
        _getFiles(fullPath, extentionPattern, fileList);
      } else {
        if (extentionPattern.test(file)) {
          fileList.push(fullPath);
        }
      }
    });

    return fileList;
  }

  /**
   * @param {string} filePath
   * @param {ImportErrors} importErrors
   * @param {ImportStats} importStats
   * @param {boolean} isExample
   */
  function _evaluateFile(filePath, importErrors, importStats, isExample) {
    const importStatementRegex = /^import [^'"]*(?:from )?['"]([^'"]+)['"];.*$/;

    const fileContent = fs.readFileSync(filePath, 'utf8');

    const importKeywords = fileContent.match(/^import /gm);
    const importStatements = fileContent.match(new RegExp(importStatementRegex, 'gm'));

    importStats.totalImportKeywords += importKeywords ? importKeywords.length : 0;
    importStats.totalImportStatements += importStatements ? importStatements.length : 0;

    // This code is left here to help troubleshoot any instances of mismatch import keywords and statements.
    // if (importKeywords && (!importStatements || importKeywords.length !== importStatements.length)) {
    //   console.log(`\r\nCould not detect import in ${filePath}! ('${importKeywords.length} keywords vs. ${importStatements ? importStatements.length : 0})`);
    //   console.log(`importStatements: ${importStatements}`);
    // }

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
        const exports = exportStatements.map(exp => exp.match(exportRegex)[2]);
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
   * @param {string} filePath
   * @param {RegExpMatchArray} importMatch - Result of running `importStatementRegex` against a single import
   * (`[1]` will be the import path)
   * @param {ImportErrors} importErrors
   * @param {boolean} isExample
   */
  function _evaluateImport(filePath, importMatch, importErrors, isExample) {
    const importPath = importMatch[1];
    const packageRootPath = importPath.split('/')[0];
    const relativePath = path.relative(sourcePath, filePath);
    let fullImportPath;
    let pathIsRelative = false;
    let pathIsDeep = false;
    let pkgName;

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
          _evaluateImportPath(nodeModulesPath, './' + importPath) || _evaluateImportPath(cwdNodeModulesPath, './' + importPath);
      }

      // A "deep" path is anything that goes further into the package than <pkg>/lib/<file>
      const allowedSegments = pkgName[0] === '@' ? 4 : 3;
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

      if (pathIsDeep && !allowedDeepImports.includes(importPath)) {
        _addError(importErrors.pathDeep, relativePath, importPath);
      }

      if (reExportedPackages[pkgName] && !allowedReexportedImports.includes(importPath)) {
        _addError(importErrors.pathReExported, relativePath, importPath, 'office-ui-fabric-react/lib/' + reExportedPackages[pkgName]);
      }

      if (importMatch[0].startsWith('import * from') && !isScss) {
        _addError(importErrors.importStar, relativePath, importPath);
      }
    }
  }

  /**
   * @param {string} filePath
   * @param {string} importPath
   */
  function _evaluateImportPath(filePath, importPath) {
    const fullImportPath = path.resolve(filePath, importPath);
    const extensions = ['.ts', '.tsx', '.js', ''];

    for (const ext of extensions) {
      const match = fullImportPath + ext;

      if (fs.existsSync(match)) {
        return match;
      }
    }

    return undefined;
  }

  /**
   * @param {ImportErrorGroup} errorGroup
   * @param {string} relativePath
   * @param {string} importPath
   * @param {string} [alternative]
   */
  function _addError(errorGroup, relativePath, importPath, alternative) {
    errorGroup.count++;
    errorGroup.matches[relativePath] = errorGroup.matches[relativePath] || [];
    errorGroup.matches[relativePath].push({ importPath, alternative });
  }

  /**
   * @param {ImportErrors} importErrors
   */
  function reportFilePathErrors(importErrors) {
    /** @type {{ [k in keyof ImportErrors]: string }} */
    const errorMessages = {
      pathAbsolute: 'files are using absolute imports. Please update the following imports to use relative paths instead:',
      pathNotFile:
        '{count} import path(s) do not reference physical files. This can break AMD imports. ' +
        'Please ensure the following imports reference physical files:',
      pathRelative:
        'example files are using relative imports. For example portability, please ensure that the following imports are absolute:',
      pathDeep:
        'example files are using deep imports. ' +
        'To promote best practices, please only import from root-level files (<package-name> or <package-name>/lib/<file>).',
      pathReExported:
        'example files are directly importing from packages that office-ui-fabric-react re-exports. ' +
        'Please change the following imports to reference office-ui-fabric-react instead:',
      importStar:
        'example files are using "import *" which causes problems with the website example editor. Please import things by name instead.',
      exportMulti: 'example files are exporting multiple classes/consts (or none). Please export exactly one component per example.',
      exportDefault: 'example files are using a default export. Please use only named exports.'
    };

    let hasError = false;
    for (const groupName of Object.keys(importErrors)) {
      /** @type {ImportErrorGroup} */
      const errorGroup = importErrors[groupName];
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

module.exports = lintImports;

// @ts-ignore
if (require.main === module) {
  lintImports();
}
