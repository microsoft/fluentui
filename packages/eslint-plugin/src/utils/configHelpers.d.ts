import { Linter } from 'eslint';

export type ConfigHelpers = {
  /** File extensions to lint (with leading .) */
  extensions: string[];

  /** Test-related files */
  testFiles: string[];

  /** Doc-related files, not including examples */
  docsFiles: string[];

  /** Files which may reference devDependencies: tests, docs (excluding examples), config/build */
  devDependenciesFiles: string[];

  /**
   * Whether linting is running in context of lint-staged (which should disable rules requiring
   * type info due to their significant perf penalty).
   */
  isLintStaged: boolean;

  /**
   * Returns a rule configuration for [`@typescript-eslint/naming-convention`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md).
   * This provides the ability to override *only* the interface rule without having to repeat or
   * lose the rest of the (very complicated) config.
   * @param prefixWithI - Whether to prefix interfaces with I
   */
  getNamingConventionRule: (prefixWithI: boolean) => Linter.RulesRecord;

  /**
   * Rules requiring type information should be defined in the `overrides` section since they must
   * only run on TS files included in a tsconfig.json (generally those files under `src`), and they
   * require some extra configuration. They should be disabled entirely when running lint-staged
   * due to their significant perf penalty. (Any violations checked in will be caught in CI.)
   * @param rules - Rules to enable for TS files
   * @param tsconfigPath - Path to tsconfig, default `path.join(process.cwd()), 'tsconfig.json')`
   * @returns A single-entry array with a config for TS files if *not* running lint-staged
   * (or empty array for lint-staged)
   */
  getTypeInfoRuleOverrides: (rules: Linter.RulesRecord, tsconfigPath?: string) => Linter.ConfigOverride[];
};

declare const configHelpers: ConfigHelpers;

export = configHelpers;
