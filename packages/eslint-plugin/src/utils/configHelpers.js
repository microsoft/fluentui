// @ts-check

const fs = require('fs');
const path = require('path');
const jju = require('jju');

const testFiles = ['**/*{.,-}test.{ts,tsx}', '**/*.stories.tsx', '**/{test,tests,stories}/**'];

const docsFiles = ['**/*Page.tsx', '**/{docs,demo}/**', '**/*.doc.{ts,tsx}'];

const configFiles = ['/just.config.ts', '/gulpfile.ts', '/*.js', '/.*.js', '/config', '/scripts', '/tasks'];

/**
 * Whether linting is running in context of lint-staged (which should disable rules requiring
 * type info due to their significant perf penalty).
 */
const isLintStaged = /pre-commit|lint-staged/.test(process.argv[1]);

// See the types file (or hover over members) for docs.
// This helps ensure the docs stay in sync.
/** @type {import("../index")["configHelpers"]} */
module.exports = {
  extensions: ['.ts', '.tsx', '.js', '.jsx'],

  testFiles,

  docsFiles,

  devDependenciesFiles: [...testFiles, ...docsFiles, ...configFiles],

  getNamingConventionRule: prefixWithI => ({
    '@typescript-eslint/naming-convention': [
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

  getTypeInfoRuleOverrides: (rules, tsconfigPath) => {
    if (isLintStaged) {
      return [];
    }

    // Type info-dependent rules must only apply to TS files included in a project.
    // Usually this is files under src, but check the tsconfig to verify.
    const tsGlob = '**/*.{ts,tsx}';
    let tsFiles = [`src/${tsGlob}`];
    tsconfigPath = tsconfigPath || path.join(process.cwd(), 'tsconfig.json');
    if (fs.existsSync(tsconfigPath)) {
      // Note that this way of reading tsconfig does not account for extends, but that's okay since
      // typically include will not be specified that way
      const tsconfig = jju.parse(fs.readFileSync(tsconfigPath).toString());
      if (tsconfig.include) {
        tsFiles = /** @type {string[]} */ (tsconfig.include).map(
          includePath => `${includePath.replace(/\*.*/, '')}/${tsGlob}`,
        );
      } else if (tsconfig.compilerOptions && tsconfig.compilerOptions.rootDir) {
        tsFiles = [`${tsconfig.compilerOptions.rootDir}/${tsGlob}`];
      }
    } else {
      throw new Error(`tsconfig file not found at ${tsconfigPath}`);
    }

    return [
      {
        files: tsFiles,
        parserOptions: {
          project: tsconfigPath,
        },
        rules,
      },
    ];
  },
};
