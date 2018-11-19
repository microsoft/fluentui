const importKeywordRegex = /^import/gm;
const importStatementGlobalRegex = /^import [{} a-zA-Z0-9_,*\r?\n ]*(?:from )?['"]{1}([.\/a-zA-Z0-9_@\-]+)['"]{1};.*$/gm;
const importStatementRegex = /^import [{} a-zA-Z0-9_,*\r?\n ]*(?:from )?['"]{1}([.\/a-zA-Z0-9_@\-]+)['"]{1};.*$/;
const pkgNameRegex = /^(@[a-z\-]+\/[a-z\-]+)\/|([a-z\-]+)\//;
module.exports = function(options) {
  const path = require('path');
  const fs = require('fs');
  const chalk = require('chalk');
  const sourcePath = path.resolve(process.cwd(), 'src');
  const nodeModulesPath = path.resolve(process.cwd(), 'node_modules');
  const rushJsonPath = findRushJson(process.cwd());
  const rootFolder = path.dirname(rushJsonPath);
  if (!rushJsonPath) {
    throw new Error('lint-import: unable to find rush.json');
  }

  const rush = JSON.parse(fs.readFileSync(rushJsonPath, 'utf8'));
  const rushPackages = rush.projects.map(project => project.packageName);

  const currentRushPackage = rush.projects.find(project => {
    return path.normalize(project.projectFolder) === path.normalize(path.relative(rootFolder, process.cwd()));
  }).packageName;
  // TestCode
  return lintSource();

  function findRushJson(curDir) {
    const potentialRushPath = path.resolve(curDir, 'rush.json');
    if (fs.existsSync(potentialRushPath)) {
      return potentialRushPath;
    }
    const parentFolder = path.dirname(curDir);
    if (parentFolder === curDir) return undefined;
    return findRushJson(parentFolder);
  }

  function lintSource() {
    const files = _getFiles(sourcePath, /\.(ts|tsx)$/i);
    const importErrors = {
      totalImportKeywords: 0,
      totalImportStatements: 0,
      pathInvalid: {
        count: 0,
        matches: {}
      }
    };

    for (const file of files) {
      _evaluateFile(file, importErrors);
    }

    // If you're here for this error check out commented out code in _evaluateFile for troubleshooting.
    if (importErrors.totalImportKeywords !== importErrors.totalImportStatements) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log('WARNING: Potential missed import statements.');
      console.log(`Import keywords found: ${importErrors.totalImportKeywords}`);
      console.log(`Import statements found: ${importErrors.totalImportStatements}`);
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!');
    }

    if (reportFilePathErrors(importErrors.pathInvalid)) {
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

  function _evaluateFile(filePath, importErrors) {
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
          _evaluateImport(filePath, parts[1], importErrors);
        }
      });
    }
  }

  function _evaluateImport(filePath, importPath, importErrors) {
    let fullImportPath;
    if (importPath.indexOf('.') === 0) {
      // import is a file path. is this a file?
      fullImportPath = _evaluateImportPath(path.dirname(filePath), importPath);
    } else {
      const pkgNameMatch = importPath.match(pkgNameRegex);
      if (pkgNameMatch === null) {
        // This means the import does not adhere to what we are looking for (usually import * from 'react';, which
        // we would skipping linting for.
        return;
      }

      const pkgName = pkgNameMatch[1] || pkgNameMatch[2];

      // we don't evaluate imports of non rush packages
      if (rushPackages.indexOf(pkgName) === -1) return;

      if (pkgName === currentRushPackage) {
        const importPathWithoutPkgName = importPath.substring(pkgName.length + 1 /* 1 is for '/' */);
        fullImportPath = _evaluateImportPath(process.cwd(), './' + importPathWithoutPkgName);
      } else {
        fullImportPath = _evaluateImportPath(nodeModulesPath, './' + importPath);
      }
    }

    if (!fullImportPath || fs.statSync(fullImportPath).isDirectory()) {
      const pathInvalid = importErrors.pathInvalid;
      const relativePath = path.relative(sourcePath, filePath);
      pathInvalid.count++;
      pathInvalid.matches[relativePath] = importPath;
    }
  }

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

  function reportFilePathErrors(pathInvalid) {
    if (pathInvalid.count) {
      console.log(
        `${chalk.red('ERROR')}: ${
          pathInvalid.count
        } import path(s) do not reference physical files. This can break AMD imports. Please ensure the following imports reference physical files:`
      );
      console.log('-------------------------------------');
      for (const filePath in pathInvalid.matches) {
        console.log(`  ${filePath}: ${chalk.inverse(pathInvalid.matches[filePath])}`);
      }

      return true;
    }

    return false;
  }
};
