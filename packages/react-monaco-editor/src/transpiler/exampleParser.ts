import { _supportedPackageToGlobalMap } from './transpileHelpers';
import type { IBasicPackageGroup } from '../interfaces/index';

// Don't reference anything importing Monaco in this file to avoid pulling Monaco into the
// main bundle or breaking tests!

/**
 * Match an import from a TS file.
 * - Group 1: imported names or \* (empty if side effect-only import)
 * - Group 2: import path without quotes
 * @internal
 */
export const IMPORT_REGEX = /^import\s+(?:([^;'"]+?)\s+from\s+)?['"]([^'"]+?)['"];/;

/** Find the component name to render from a TS file (group 1) */
const COMPONENT_NAME_REGEX = /^export (?:class|const) (\w+)/m;
/** Given an import path, find the package name @internal */
const PACKAGE_NAME_REGEX = /^(@[\w-]+\/[\w-]+|[\w-]+)/;
/**
 * Match an individual imported item.
 * - Group 1: original item name or *
 * - Group 2: rename, if any
 */
const IMPORT_ITEM_REGEX = /([\w*]+)(?:\s+as\s+(\w+))?/g;

/** Matches the React import */
const REACT_REGEX = /^import \* as React from ['"]react['"];/m;

export interface IImportIdentifiers {
  /**
   * Original name of the imported class/interface/const/whatever.
   * Will be `default` for default imports and `*` for `import *`.
   */
  name: string;
  /** What it's imported as (if different) */
  as?: string;
}

/** Breakdown of an import statement */
export interface IImport {
  /** Full text of the import statement (including semicolon) */
  text: string;
  /** Full path from the import statement (no quotes) */
  path: string;
  /** Package name from the import, or empty string for relative imports */
  packageName: string;
  /** Individual imported identifiers */
  identifiers: IImportIdentifiers[];
}

export interface IExampleInfo {
  /** TS source code */
  tsCode: string;
  /** Imports from the source code */
  imports: IImport[];
  /** Component name to render */
  component: string;
}

/**
 * Determines whether an example is "valid" for purposes of the transform code: it conforms to the
 * expected structure and only contains imports from supported packages.
 *
 * NOTE: You should confirm that the code is syntactically valid before calling this function.
 * If the code is not syntactically valid, this function's behavior is undefined.
 *
 * @param example - Syntactically valid TS code for an example
 * @param supportedPackages - Supported packages for imports (React is implicitly supported)
 * @returns Whether the example is valid
 */
export function isExampleValid(example: string, supportedPackages: IBasicPackageGroup[]): boolean {
  return typeof tryParseExample(example, supportedPackages) !== 'string';
}

/**
 * Determines whether an example is editable and if so, returns the code and the component to render.
 * If it's not editable, returns an error message.
 *
 * NOTE: You should confirm that the code is syntactically valid before calling this function.
 * If the code is not syntactically valid, this function's behavior is undefined (it will likely
 * return incorrect/illogical output).
 *
 * @param example - Syntactically valid TS code for an example
 * @param supportedPackages - Supported packages for imports (React is implicitly supported)
 * @returns Example info if the example is valid, or an error message if not
 */
export function tryParseExample(example: string, supportedPackages: IBasicPackageGroup[]): IExampleInfo | string {
  try {
    return _tryParseExample(example, Object.keys(_supportedPackageToGlobalMap(supportedPackages)));
  } catch (ex) {
    return 'Caught error while processing example: ' + ex;
  }
}

/** @internal */
export function _tryParseExample(example: string, supportedPackages: string[]): IExampleInfo | string {
  // Use .source because IE 11 doesn't support creating a regex from a regex
  const possibleComponents = example.match(new RegExp(COMPONENT_NAME_REGEX.source, 'gm'));
  const imports = _getImports(example);

  if (!REACT_REGEX.test(example)) {
    return `The example must include "import * as React from 'react';"`;
  } else if (/^export default/m.test(example)) {
    return '"export default" is not supported by the editor.';
  } else if (!possibleComponents || possibleComponents.length > 1) {
    return (
      'The example must export a single class or const for the component to render ' +
      `(found: ${possibleComponents ? possibleComponents.length : 'none'}).`
    );
  } else if (/require(<.+?>)?\(/m.test(example)) {
    return '"require(...)" is not supported by the editor.';
  } else {
    for (const importInfo of imports) {
      const { path, packageName, identifiers: items, text } = importInfo;

      if (path === 'react') {
        if (!REACT_REGEX.test(text)) {
          return `Invalid React import format for the editor. Please only use "import * as React from 'react'".`;
        }
      } else if (path.indexOf('.scss') !== -1) {
        return 'Importing scss is not supported by the editor.';
      } else if (path[0] === '.') {
        return 'Relative imports are not supported by the editor.';
      } else if (!items.length) {
        return 'Importing a file for its side effects ("import \'path\'") is not supported by the editor.';
      } else if (items[0].name === '*') {
        return '"import *" is not supported by the editor (except from react).';
      } else if (!packageName) {
        return `Unrecognized import path: "${path}"`;
      } else if (supportedPackages.indexOf(packageName) === -1) {
        return `Importing from package "${packageName}" is not supported by the editor.`;
      } else if (items[0].name === 'default') {
        return 'Default imports are not supported by the editor.';
      } else if (path !== packageName) {
        const packageRelativePath = path.split(packageName + '/', 2)[1];
        if (packageRelativePath.split('/').length > 2) {
          return 'Importing from more than two levels below the package root is not supported by the editor.';
        }
      }
    }
  }

  return {
    tsCode: example,
    component: example.match(COMPONENT_NAME_REGEX)![1],
    imports,
  };
}

/** @internal */
export function _getImports(example: string): IImport[] {
  // Use .source because IE 11 doesn't support creating a regex from a regex
  const imports = example.match(new RegExp(IMPORT_REGEX.source, 'gm'));
  if (!imports) {
    return [];
  }
  return imports.map(importStatement => {
    const importMatch = importStatement.match(IMPORT_REGEX)!;
    const importPath = importMatch[2];

    return {
      text: importMatch[0],
      packageName: _getPackageName(importPath),
      path: importPath,
      identifiers: _getImportIdentifiers(importMatch[1]),
    };
  });
}

/** @internal */
export function _getPackageName(path: string): string {
  const packageNameMatch = path.match(PACKAGE_NAME_REGEX) || undefined;
  return (packageNameMatch && packageNameMatch[0]) || '';
}

/** @internal */
export function _getImportIdentifiers(contents: string | undefined): IImportIdentifiers[] {
  // This will be:
  // empty        for `import 'foo'`
  // * as Foo     for `import * as Foo from 'foo'`
  // Foo          for `import Foo from 'foo'`
  // { Foo, Bar } for `import { Foo, Bar } from 'foo'`
  const hadBracket = (contents || '').indexOf('{') !== -1;
  contents = (contents || '').replace('{', '').replace('}', '').trim();

  const items: IImportIdentifiers[] = [];
  IMPORT_ITEM_REGEX.lastIndex = 0;
  let itemMatch = IMPORT_ITEM_REGEX.exec(contents);
  if (itemMatch) {
    if (hadBracket) {
      // named imports
      do {
        items.push({ name: itemMatch[1], as: itemMatch[2] });
      } while ((itemMatch = IMPORT_ITEM_REGEX.exec(contents)));
    } else if (itemMatch[1] === '*') {
      // import *
      items.push({ name: '*', as: itemMatch[2] });
    } else {
      // default import
      items.push({ name: 'default', as: itemMatch[1] });
    }
  }
  return items;
}
