import { Linter, Rule } from 'eslint';

export declare const configs: {
  node: Linter.Config;
  'node--legacy': Linter.Config;
  react: Linter.Config;
  'react--legacy': Linter.Config;
  'react-northstar': Linter.Config;
};

export declare const rules: {
  'ban-imports': Rule.RuleModule;
  'deprecated-keyboard-event-props': Rule.RuleModule;
  'jsx-ban-props': Rule.RuleModule;
  'no-visibility-modifiers': Rule.RuleModule;
};

export declare const configHelpers: {
  /** File extensions to lint (with leading .) */
  extensions: string[];

  /** Test-related files */
  testFiles: string[];

  /** Doc-related files, not including examples */
  docsFiles: string[];

  /** Files which may reference devDependencies: tests, docs (excluding examples), config/build */
  devDependenciesFiles: string[];

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
