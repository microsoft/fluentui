import { SourceFile, JsxExpression, JsxOpeningElement, JsxSelfClosingElement } from 'ts-morph';
import { Result } from '../helpers/result';

export interface ModResult {
  logs: string[];
}

export type NoOp = {
  logs: string[];
};

export type ModError = {
  error: Error | string;
};

export type ModFunctionResult<T> = Result<T, NoOp | ModError>;

export type CodeModResult = Result<ModResult, NoOp | ModError>;
export interface CodeMod<T = SourceFile> {
  /**
   * Each type of codemod can have multiple versions which work on different versions of its targeted package.
   * Must be valid semver.
   * TODO: Currently version is not being checked. Implement this fully or remove.
   */
  version?: string;
  /**
   * A string to help identify the codemod.
   */
  name: string;
  /**
   * The actual function that should be run on any given file.
   * TODO, is there a possibility of codemods that would need to execute over mutiple files?
   */
  run: (file: T) => CodeModResult;
  /**
   * If not enabled, then this mod will not be conisdered to run. Only enable it once it's ready
   * to be applied in real world scenarios
   */
  enabled?: boolean;
}

/**
 * Generic map used if developers need to convert values dynamically
 * rather than statically -- if prop values have a well-defined domain
 * of values, the developer can provide a mapping of old-to-new values to
 * fine-tune upgradess. */
export type ValueMap<T> = {
  [key: string]: T;
};

/**
 * Generic function provided by the utility caller that executes a
 * transform for a prop's value. This transform takes a node in
 * the AST and replaces it with a new node, giving the most control
 * to the developer.
 * TODO -- Can we limit the damage a dev can potentially do given a malformed transform?
 */
export type PropTransform = (
  node: JsxExpression | JsxOpeningElement | JsxSelfClosingElement,
  toRename: string,
  replacementName: string,
) => Result<string, NoOp>;

/**
 * Enum that defines the cases by which this codemod can
 * handle a prop in a spread operator. Called on a variable
 * statement that contains the identified spread prop.
 * Cases are
 * SpreadPropLeft: if the desired spread prop exists on the left side of the deconstruction with '...' before it.
 * PropLeft: if the desired prop exists on the left side of the deconstruction with no '...'.
 * PropRight: if the desired prop exists on the right side of the variable statement.
 * NotFound: if the variable statement does not match one of these cases, mark it as incompatible with the mod.
 */
export enum SpreadPropInStatement {
  SpreadPropLeft,
  PropLeft,
  PropRight,
  NotFound,
}

/* Type definition for the mod type - mod function dictionary used
   in configMod.ts. */
export type CodeModMapType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (mod: any) => (file: SourceFile) => CodeModResult;
};

/* Type definition for a CodeMod object representing a renameProp mod. */
export type RenamePropModType = {
  name: string;
  type: 'renameProp';
  version?: string;
  options: {
    from: {
      importName: string;
      toRename: string;
    };
    to: {
      replacementName: string;
      replacementValue?: string;
    };
  };
};

/* Type definition for a CodeMod object representing a repathImport mod. */
export type RepathImportModType = {
  name: string;
  type: 'repathImport';
  version?: string;
  options: {
    from: {
      searchString: string | RegExp;
      isRegex: boolean;
    };
    to: {
      replacementValue: string;
    };
  };
};

/* Type definition for a CodeMod object representing a renameImport mod. */
export type RenameImportType = {
  name: string;
  type: 'renameImport';
  version?: string;
  options: {
    from: {
      originalImport: string;
    };
    to: {
      renamedImport: string;
    };
  };
};

/* upgrades.json internal mods are of this type: a union of supported types. */
export type ModTypes = RenamePropModType | RepathImportModType | RenameImportType;

/* Type of the upgrades.json object */
export type UpgradeJSONType = {
  name: string;
  upgrades: ModTypes[];
};

/* Type storing codemod metadata. */
export type ModOptions = {
  name: string;
  version: string;
};

/* A configuration type for running codemods, stored in modConfig.json.
   Users can specify either string or regex filters to specify which mods
   they want to run. They can also specify whether they want their selected
   mods to be included OR excluded when running mods. */
export type ModRunnerConfigType = {
  stringFilters: string[];
  regexFilters: string[];
  includeMods: boolean;
};
