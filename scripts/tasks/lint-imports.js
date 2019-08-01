// @ts-check

const getAllPackageInfo = require('../monorepo/getAllPackageInfo');
const findConfig = require('../find-config');
const { readConfig } = require('../read-config');
const importStatementGlobalRegex = /^import [{} a-zA-Z0-9_,*\r?\n ]*(?:from )?['"]{1}([.\/a-zA-Z0-9_@\-]+)['"]{1};.*$/gm;
const importStatementRegex = /^import [{} a-zA-Z0-9_,*\r?\n ]*(?:from )?['"]{1}([.\/a-zA-Z0-9_@\-]+)['"]{1};.*$/;
const pkgNameRegex = /^(@[a-z\-]+\/[a-z\-]+)|([a-z\-]+)/;

/**
 * @typedef {{
 *   count: number;
 *   matches: { [key: string]: string }
 * }} ImportErrorGroup
 *
 * @typedef {{
 *   totalImportKeywords: number;
 *   totalImportStatements: number;
 *   pathNotFile: ImportErrorGroup;
 *   pathRelative: ImportErrorGroup;
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
  const rootFolder = gitRoot;

  const allowRelativeImportExamples = [
    // These were added to reduce the initial ramifications of disabling relative imports across all examples,
    // the primary goal being to eliminate usage of relative imports going forward.
    // TODO: Ideally these would eventually be removed.
    'ActivityItem.Compact.Example.tsx',
    'ActivityItem.Persona.Example.tsx',
    'Button.CustomSplit.Example.tsx',
    'Button.Keytips.Example.tsx',
    'Button.Toggle.Example.tsx',
    'Button.Variants.Example.tsx',
    'Chiclet.Basic.Example.tsx',
    'ChoiceGroup.Image.Example.tsx',
    'DocumentCard.Basic.Example.tsx',
    'DocumentCard.Compact.Example.tsx',
    'DocumentCard.Complete.Example.tsx',
    'DocumentCard.Conversation.Example.tsx',
    'DocumentCard.Image.Example.tsx',
    'ExtendedPeoplePicker.Basic.Example.tsx',
    'ExtendedPeoplePicker.Controlled.Example.tsx',
    'Facepile.AddFace.Example.tsx',
    'Facepile.Basic.Example.tsx',
    'Facepile.Overflow.Example.tsx',
    'FacepileExampleData.ts',
    'FloatingPeoplePicker.Basic.Example.tsx',
    'Icon.ImageSheet.Example.tsx',
    'Keytips.Basic.Example.tsx',
    'Keytips.Button.Example.tsx',
    'Keytips.CommandBar.Example.tsx',
    'Keytips.Overflow.Example.tsx',
    'Nav.Basic.Example.tsx',
    'Nav.CustomGroupHeaders.Example.tsx',
    'Nav.FabricDemoApp.Example.tsx',
    'Nav.Nested.Example.tsx',
    'PeoplePicker.Types.Example.tsx',
    'PeoplePickerExampleData.ts',
    'Persona.Alternate.Example.tsx',
    'Persona.Basic.Example.tsx',
    'Persona.CustomCoinRender.Example.tsx',
    'Persona.CustomRender.Example.tsx',
    'Persona.UnknownPersona.Example.tsx',
    'Persona.Presence.Example.tsx',
    'Picker.CustomResult.Example.tsx',
    'Pivot.Fabric.Example.tsx',
    'SelectedPeopleList.Basic.Example.tsx',
    'SelectedPeopleList.Controlled.Example.tsx',
    'SelectedPeopleList.WithContextMenu.Example.tsx',
    'SelectedPeopleList.WithEdit.Example.tsx',
    'SelectedPeopleList.WithEditInContextMenu.Example.tsx',
    'SelectedPeopleList.WithGroupExpand.Example.tsx',
    'Stack.Horizontal.Basic.Example.tsx',
    'Stack.Horizontal.Configure.Example.tsx',
    'Stack.Horizontal.Grow.Example.tsx',
    'Stack.Horizontal.HorizontalAlign.Example.tsx',
    'Stack.Horizontal.Reversed.Example.tsx',
    'Stack.Horizontal.Shrink.Example.tsx',
    'Stack.Horizontal.Spacing.Example.tsx',
    'Stack.Horizontal.VerticalAlign.Example.tsx',
    'Stack.Horizontal.Wrap.Example.tsx',
    'Stack.Horizontal.WrapAdvanced.Example.tsx',
    'Stack.Horizontal.WrapNested.Example.tsx',
    'Stack.Vertical.Basic.Example.tsx',
    'Stack.Vertical.Configure.Example.tsx',
    'Stack.Vertical.Grow.Example.tsx',
    'Stack.Vertical.HorizontalAlign.Example.tsx',
    'Stack.Vertical.Reversed.Example.tsx',
    'Stack.Vertical.Shrink.Example.tsx',
    'Stack.Vertical.Spacing.Example.tsx',
    'Stack.Vertical.VerticalAlign.Example.tsx',
    'Stack.Vertical.Wrap.Example.tsx',
    'Stack.Vertical.WrapAdvanced.Example.tsx',
    'Stack.Vertical.WrapNested.Example.tsx',
    'TilesList.Document.Example.tsx',
    'TilesList.Media.Example.tsx'
  ];

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
      pathNotFile: {
        count: 0,
        matches: {}
      },
      pathRelative: {
        count: 0,
        matches: {}
      }
    };

    for (const file of files) {
      const filename = file
        .split('\\')
        .pop()
        .split('/')
        .pop();

      // Do not allow relative imports in example files.
      const allowRelativeImports = file.indexOf('.Example.') === -1 || allowRelativeImportExamples.includes(filename);

      _evaluateFile(file, importErrors, allowRelativeImports);
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

    if (reportFilePathErrors(importErrors.pathNotFile, importErrors.pathRelative)) {
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
   * @param {boolean} allowRelativeImports
   */
  function _evaluateFile(filePath, importErrors, allowRelativeImports) {
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
          _evaluateImport(filePath, parts[1], importErrors, allowRelativeImports);
        }
      });
    }
  }

  /**
   * @param {string} filePath
   * @param {string} importPath
   * @param {ImportErrors} importErrors
   * @param {boolean} allowRelativeImports
   */
  function _evaluateImport(filePath, importPath, importErrors, allowRelativeImports) {
    let fullImportPath;
    let pathIsRelative = false;

    if (importPath.indexOf('.') === 0) {
      // import is a file path. is this a file?
      fullImportPath = _evaluateImportPath(path.dirname(filePath), importPath);
      pathIsRelative = true;
    } else if (packagesInfo[importPath]) {
      // skip the full import of packages within the monorepo
      return;
    } else {
      const pkgNameMatch = importPath.match(pkgNameRegex);
      if (pkgNameMatch === null) {
        // This means the import does not adhere to what we are looking for (usually import * from 'react';, which
        // we would skipping linting for.
        return;
      }

      const pkgName = pkgNameMatch[1] || pkgNameMatch[2];

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
    }

    if (!fullImportPath || fs.statSync(fullImportPath).isDirectory()) {
      const pathNotFile = importErrors.pathNotFile;
      const relativePath = path.relative(sourcePath, filePath);
      pathNotFile.count++;
      pathNotFile.matches[relativePath] = importPath;
    }

    if (!allowRelativeImports && pathIsRelative && importPath.indexOf('.scss') === -1) {
      const pathRelative = importErrors.pathRelative;
      const relativePath = path.relative(sourcePath, filePath);
      pathRelative.count++;
      pathRelative.matches[relativePath] = importPath;
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
   * @param {ImportErrorGroup} pathNotFile
   * @param {ImportErrorGroup} pathRelative
   */
  function reportFilePathErrors(pathNotFile, pathRelative) {
    if (pathNotFile.count) {
      console.error(
        `${chalk.red('ERROR')}: ${
          pathNotFile.count
        } import path(s) do not reference physical files. This can break AMD imports. Please ensure the following imports reference physical files:`
      );
      console.error('-------------------------------------');
      for (const filePath in pathNotFile.matches) {
        console.error(`  ${filePath}: ${chalk.inverse(pathNotFile.matches[filePath])}`);
      }
    }

    if (pathRelative.count) {
      console.error(
        `${chalk.red('ERROR')}: ${
          pathRelative.count
        } Example files are using relative imports. For example portability, please ensure that the following imports are absolute:`
      );
      console.error('-------------------------------------');
      for (const filePath in pathRelative.matches) {
        console.error(`  ${filePath}: ${chalk.inverse(pathRelative.matches[filePath])}`);
      }
    }

    return pathNotFile.count > 0 || pathRelative.count > 0;
  }
}

module.exports = lintImports;
