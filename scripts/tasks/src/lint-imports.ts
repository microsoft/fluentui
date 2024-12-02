import * as fs from 'fs';
import * as path from 'path';

import { findGitRoot, getAllPackageInfo } from '@fluentui/scripts-monorepo';
import { readConfig } from '@fluentui/scripts-utils';
import chalk from 'chalk';
import * as glob from 'glob';

function processArgs() {
  const argv = process.argv.slice(2);
  return {
    /**
     * This will throw errors only if amd import violations are present
     */
    checkAmd: argv.includes('--check-amd'),
  };
}

interface ImportErrorGroup {
  count: number;
  matches: { [filePath: string]: { importPath: string; alternative?: string }[] };
}

interface ImportErrors {
  /**
   * AMD = checkAmd
   * This check is only "helpful" when import is from a folder without specifying explicitly `index`
   *
   * @example
   * `from './folder'` - invalid (this resolves to 'index' only within NodeJS resolution. ESM spec nor AMD does not support loading folders  - TODO: migrate this to eslint rule and enable everywhere
   * `from './folder/index'` - valid
   */
  pathNotFile: ImportErrorGroup;
  pathAbsolute: ImportErrorGroup;
  /**
   * Examples related
   */
  pathRelative: ImportErrorGroup;
  /**
   * Examples related
   */
  pathDeep: ImportErrorGroup;
  /**
   * Examples related
   */
  pathReExported: ImportErrorGroup;
  /**
   * Examples related
   */
  importStar: ImportErrorGroup;
  /**
   * Examples related
   */
  exportMulti: ImportErrorGroup;
  /**
   * Examples related
   */
  exportDefault: ImportErrorGroup;
}

export function lintImportTaskAll() {
  return lintImports();
}
export function lintImportTaskAmdOnly() {
  return lintImports({ checkAmd: true });
}

function lintImports(
  options: {
    /**
     * This will throw errors only if amd import violations are present
     */
    checkAmd?: boolean;
  } = {},
) {
  const { checkAmd } = options;

  const gitRoot = findGitRoot();
  const sourcePath = path.join(process.cwd(), 'src');
  const cwdNodeModulesPath = path.join(process.cwd(), 'node_modules');
  const nodeModulesPath = path.join(gitRoot, 'node_modules');

  if (!fs.existsSync(sourcePath)) {
    console.log('no /src directory found. exiting...');
    return;
  }

  if (checkAmd) {
    console.log(
      'checkAmd enabled: validating if import path(s) reference physical files. violations can break AMD imports.',
    );
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

  // !! be careful !! changing the regex can affect matched parts below.
  const importStatementRegex = /^(import|export) [^'"]*(?:from )?['"]([^'"]+)['"];.*$/;
  const importStatementRegexGlobalMultiline = new RegExp(importStatementRegex, 'gm');

  return lintSource().catch(err => {
    console.error(err);
    process.exit(1);
  });

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
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('Errors in imports were found!');
    }

    return Promise.resolve();
  }

  function _evaluateFile(filePath: string, importErrors: ImportErrors, isExample: boolean) {
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const importStatements = fileContent.match(importStatementRegexGlobalMultiline);

    if (importStatements) {
      importStatements.forEach(statement => {
        const [importMatch, declarationType, importSpecifier] = importStatementRegex.exec(statement) ?? [];

        // import regex will include also invalid export declaration type that don't re-export thus we need to filter these in order to not get invalid results
        if (importMatch && importSpecifier && declarationType !== 'export') {
          _evaluateImport({ filePath, importSpecifier, importMatch, importErrors, isExample });
        }
      });
    }

    if (checkAmd) {
      return;
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

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function _evaluateImport(options: {
    filePath: string;
    importMatch: string;
    importSpecifier: string;
    importErrors: ImportErrors;
    isExample?: boolean;
  }) {
    const { filePath, importErrors, importMatch, importSpecifier: importPath, isExample } = options;
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

    if (checkAmd) {
      return;
    }

    if (isExample) {
      const isScss = importPath.endsWith('.scss');
      // Shadow DOM stories are just for manual review/testing
      // and not published to the doc site.
      const isShadowDomExample = filePath.includes('ShadowDOM/ShadowDOM.');

      const isExcluded = isScss || isShadowDomExample;

      if (pathIsRelative && !isExcluded) {
        _addError(importErrors.pathRelative, relativePath, importPath);
      }

      if (pathIsDeep && !isExcluded && !allowedDeepImports.includes(importPath)) {
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

      if (importMatch.startsWith('import * from') && !isExcluded) {
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
    let hasError = false;

    const errorMessages: { [k in keyof ImportErrors]: string } = {
      pathNotFile:
        'import path(s) do not reference physical files. This can break AMD imports. ' +
        'Please ensure the following imports reference physical files:',
      pathAbsolute:
        'files are using absolute imports. Please update the following imports to use relative paths instead:',
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

    const groupNames: Array<keyof ImportErrors> = checkAmd
      ? ['pathNotFile']
      : (Object.keys(importErrors) as Array<keyof ImportErrors>);

    for (const groupName of groupNames) {
      reportViolations(groupName);
    }

    function reportViolations(groupName: keyof ImportErrors) {
      const errorGroup: ImportErrorGroup = importErrors[groupName];
      if (errorGroup.count === 0) {
        return;
      }

      hasError = true;
      console.error(`${chalk.red('ERROR')}: ${errorGroup.count} ${errorMessages[groupName]}`);
      console.error('-------------------------------------');
      // eslint-disable-next-line guard-for-in
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

    return hasError;
  }
}

if (require.main === module) {
  const args = processArgs();
  lintImports(args);
}
