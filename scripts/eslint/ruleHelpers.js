// @ts-check

const path = require('path');
const { isLintStaged, tsFiles } = require('./constants');

module.exports = {
  /**
   * Rules for a package which runs in a Node (not browser) environment.
   * @returns {import("eslint").Linter.RulesRecord}
   */
  getNodePackageRules: () => ({
    'no-console': 'off',
  }),

  /**
   * Returns a rule configuration for [`@typescript-eslint/naming-convention`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md).
   * Note that the rule will be turned off if running lint-staged due to its significant perf penalty.
   * @param {boolean} prefixWithI - Whether to prefix interfaces with I
   * @returns {import("eslint").Linter.RulesRecord}
   */
  getNamingConventionRule: prefixWithI => ({
    '@typescript-eslint/naming-convention': isLintStaged
      ? ['off']
      : [
          'error',
          // TODO: Restore parity with old variable-name and function-name configs (new config is too loose)
          // Old "variable-name" config: "check-format", "allow-leading-underscore", "allow-pascal-case", "ban-keywords"
          // Old "function-name" config:
          //   'method-regex': '^[a-z][a-zA-Z\\d]+$',
          //   'private-method-regex': '^_[a-z][a-zA-Z\\d]+$',
          //   'protected-method-regex': '^_?[a-z][a-zA-Z\\d]+$',
          //   'static-method-regex': '^[a-z][a-zA-Z\\d]+$',
          {
            selector: 'default',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
            leadingUnderscore: 'forbid',
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
            ...(prefixWithI
              ? { prefix: ['I'] }
              : {
                  custom: {
                    regex: '^I[A-Z]',
                    match: false,
                  },
                }),
          },
          // TODO: memberLike includes plain object members too, which causes problems
          // {
          //   selector: 'memberLike',
          //   modifiers: ['private', 'protected'],
          //   format: ['camelCase'],
          //   leadingUnderscore: 'allow',
          // },
          // {
          //   selector: 'memberLike',
          //   modifiers: ['public'],
          //   format: ['camelCase'],
          //   leadingUnderscore: 'forbid',
          // },
        ],
  }),

  /**
   * Rules requiring type information should be defined in the `overrides` section since they must
   * only run on TS files included in a tsconfig.json (generally those files under `src`), and they
   * require some extra configuration. They should be disabled entirely when running lint-staged
   * due to their significant perf penalty. (Any violations checked in will be caught in CI.)
   * @param {import("eslint").Linter.RulesRecord} rules - Rules to enable for TS files
   * @returns {import("eslint").Linter.ConfigOverride[]} A single-entry array with a config for
   * TS files if *not* running lint-staged (or empty array for lint-staged)
   */
  getTypeInfoRuleOverrides: rules =>
    isLintStaged
      ? []
      : [
          {
            files: [...tsFiles],
            parserOptions: {
              project: path.join(process.cwd(), 'tsconfig.json'),
            },
            rules,
          },
        ],
};
