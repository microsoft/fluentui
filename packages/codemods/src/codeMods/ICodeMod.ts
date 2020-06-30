import { SourceFile } from 'ts-morph';

export interface CodeModResult {
  success?: boolean;
}

export interface ICodeMod<T = SourceFile> {
  /**
   * The version before which the codemod should run.
   * Must be valid semver.
   * Currently has no impact. Maybe remove?
   */
  version: string;
  /**
   * A string to help identify the codemod.
   */
  name: string;
  /**
   * The actual function that should be run on any given file
   * TODO, is there a possibility of codemods that would need to execute over mutiple files?
   */
  run: (file: T) => CodeModResult;
  /**
   * If not enabled, then this mod will not be conisdered to run. Only enable it once it's ready for
   * the real world.
   */
  enabled?: boolean;
}
