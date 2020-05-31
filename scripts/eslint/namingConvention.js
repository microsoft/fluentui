/**
 * Returns the configuration for `@typescript-eslint/naming-convention`.
 * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
 * @param {boolean} prefixWithI Whether to prefix interfaces with I
 */
function getNamingConventionConfig(prefixWithI) {
  return [
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
  ];
}

module.exports = { getNamingConventionConfig };
