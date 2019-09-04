// @ts-check

const getAllPackageInfo = require('../monorepo/getAllPackageInfo');
const findConfig = require('../find-config');
const { readConfig } = require('../read-config');
const importStatementGlobalRegex = /^import [^'"]*(?:from )?['"]([^'"]+)['"];.*$/gm;
const importStatementRegex = /^import [^'"]*(?:from )?['"]([^'"]+)['"];.*$/;
const pkgNameRegex = /^(@[\w-]+\/[\w-]+|[\w-]+)/;

/**
 * @typedef {{
 *   count: number;
 *   matches: { [key: string]: { importPath: string; alternative?: string; } }
 * }} ImportErrorGroup
 *
 * @typedef {{
 *   totalImportKeywords: number;
 *   totalImportStatements: number;
 *   pathNotFile: ImportErrorGroup;
 *   pathRelative: ImportErrorGroup;
 *   pathDeep: ImportErrorGroup;
 *   pathReExported: ImportErrorGroup;
 * }} ImportErrors
 */

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
    '@uifabric/foundation/lib/next/composed'
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
      totalImportKeywords: 0,
      totalImportStatements: 0,
      pathNotFile: { count: 0, matches: {} },
      pathRelative: { count: 0, matches: {} },
      pathDeep: { count: 0, matches: {} },
      pathReExported: { count: 0, matches: {} }
    };

    for (const file of files) {
      const isExample = file.includes('/examples/') || file.includes('.Example.');

      _evaluateFile(file, importErrors, isExample);
    }

    // A mismatch here identifies a potential issue with the import regex properly matching all import statements.
    // If you're here for this error check out commented out code in _evaluateFile for troubleshooting.
    if (importErrors.totalImportKeywords !== importErrors.totalImportStatements) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('WARNING: Potential missed import statements.');
      console.log(`Import keywords found: ${importErrors.totalImportKeywords}`);
      console.log(`Import statements found: ${importErrors.totalImportStatements}`);
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
   * @param {boolean} isExample
   */
  function _evaluateFile(filePath, importErrors, isExample) {
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const importKeywords = fileContent.match(importStatementGlobalRegex);
    const importStatements = fileContent.match(importStatementGlobalRegex);

    importErrors.totalImportKeywords += importKeywords ? importKeywords.length : 0;
    importErrors.totalImportStatements += importStatements ? importStatements.length : 0;

    // This code is left here to help troubleshoot any instances of mismatch import keywords and statements.
    // if (importKeywords && (!importStatements || importKeywords.length !== importStatements.length)) {
    //   console.log(`\r\nCould not detect import in ${filePath}! ('${importKeywords.length} keywords vs. ${importStatements ? importStatements.length : 0})`);
    //   console.log(`importStatements: ${importStatements}`);
    // }

    if (importStatements) {
      importStatements.forEach(statement => {
        const parts = importStatementRegex.exec(statement);

        if (parts) {
          _evaluateImport(filePath, parts[1], importErrors, isExample);
        }
      });
    }
  }

  /**
   * @param {string} filePath
   * @param {string} importPath
   * @param {ImportErrors} importErrors
   * @param {boolean} isExample
   */
  function _evaluateImport(filePath, importPath, importErrors, isExample) {
    let fullImportPath;
    let pathIsRelative = false;
    let pathIsDeep = false;
    let pkgName;

    if (importPath[0] === '.') {
      // import is a file path. is this a file?
      fullImportPath = _evaluateImportPath(path.dirname(filePath), importPath);
      pathIsRelative = true;
    } else if (packagesInfo[importPath]) {
      // skip the full import of packages within the monorepo
      return;
    } else {
      const pkgNameMatch = importPath.match(pkgNameRegex);
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

    const relativePath = path.relative(sourcePath, filePath);

    if (!fullImportPath || fs.statSync(fullImportPath).isDirectory()) {
      importErrors.pathNotFile.count++;
      importErrors.pathNotFile.matches[relativePath] = { importPath };
    }

    if (isExample) {
      if (pathIsRelative && !importPath.includes('.scss')) {
        importErrors.pathRelative.count++;
        importErrors.pathRelative.matches[relativePath] = { importPath };
      }

      if (pathIsDeep && !allowedDeepImports.includes(importPath) && !/\.Example$/.test(importPath)) {
        importErrors.pathDeep.count++;
        importErrors.pathDeep.matches[relativePath] = { importPath };
      }

      if (reExportedPackages[pkgName] && !allowedReexportedImports.includes(importPath)) {
        importErrors.pathReExported.count++;
        importErrors.pathReExported.matches[relativePath] = {
          importPath,
          alternative: 'office-ui-fabric-react/lib/' + reExportedPackages[pkgName]
        };
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
   * @param {ImportErrors} importErrors
   */
  function reportFilePathErrors(importErrors) {
    const { pathNotFile, pathRelative, pathDeep, pathReExported } = importErrors;

    logErrors(
      pathNotFile,
      'import path(s) do not reference physical files. This can break AMD imports. Please ensure the following imports reference physical files:'
    );
    logErrors(
      pathRelative,
      'example files are using relative imports. For example portability, please ensure that the following imports are absolute:'
    );
    logErrors(
      pathDeep,
      'example files are using deep imports. ' +
        'To promote best practices, please only import from root-level files (<package-name> or <package-name>/lib/<file>):'
    );
    logErrors(
      pathReExported,
      'example files are directly importing from packages that office-ui-fabric-react re-exports. ' +
        'Please change the following imports to reference office-ui-fabric-react instead:'
    );

    return pathNotFile.count > 0 || pathRelative.count > 0 || pathDeep.count > 0;
  }

  /**
   * @param {ImportErrorGroup} errorGroup
   * @param {string} message
   */
  function logErrors(errorGroup, message) {
    if (errorGroup.count) {
      console.error(`${chalk.red('ERROR')}: ${errorGroup.count} ${message}`);
      console.error('-------------------------------------');
      for (const filePath in errorGroup.matches) {
        const { importPath, alternative } = errorGroup.matches[filePath];
        console.error(`  ${filePath}: ${chalk.inverse(importPath)}`);
        if (alternative) {
          console.error(`        (use instead: '${alternative}')`);
        }
      }
    }
  }
}

module.exports = lintImports;
