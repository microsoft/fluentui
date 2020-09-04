// @ts-check

const fs = require('fs');
const path = require('path');
const jju = require('jju');

const testFiles = [
  '**/*{.,-}test.{ts,tsx}',
  '**/*.stories.tsx',
  '**/{test,tests,stories}/**',
  '**/testUtilities.{ts,tsx}',
];

const docsFiles = ['**/*Page.tsx', '**/{docs,demo}/**', '**/*.doc.{ts,tsx}'];

const configFiles = ['/just.config.ts', '/gulpfile.ts', '/*.js', '/.*.js', '/config', '/scripts', '/tasks'];

/**
 * Whether linting is running in context of lint-staged (which should disable rules requiring
 * type info due to their significant perf penalty).
 */
const isLintStaged = /pre-commit|lint-staged/.test(process.argv[1]);

// Regular expression parts for the naming convention rule
const camelCase = '[a-z][a-zA-Z\\d]*'; // must start with lowercase letter
const camelOrPascalCase = '[a-zA-Z][a-zA-Z\\d]*'; // must start with letter
const upperCase = '[A-Z][A-Z\\d]*(_[A-Z\\d]*)*'; // must start with letter, no consecutive underscores
const camelOrPascalOrUpperCase = `(${camelOrPascalCase}|${upperCase})`;
const builtins = '^(any|Number|number|String|string|Boolean|boolean|Undefined|undefined)$';

// See the types file (or hover over members) for docs.
// This helps ensure the docs stay in sync.
/** @type {import("./configHelpers.d").ConfigHelpers} */
module.exports = {
  extensions: ['.ts', '.tsx', '.js', '.jsx'],

  testFiles,

  docsFiles,

  devDependenciesFiles: [...testFiles, ...docsFiles, ...configFiles],

  isLintStaged,

  getNamingConventionRule: prefixWithI => ({
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'function', format: ['camelCase'], leadingUnderscore: 'allow' },
      { selector: 'method', modifiers: ['private'], format: ['camelCase'], leadingUnderscore: 'require' },
      { selector: 'method', modifiers: ['protected'], format: ['camelCase'], leadingUnderscore: 'allow' },
      // This will also pick up default-visibility methods and methods on plain objects,
      // which is not really what we want, but there's not a good way around it.
      {
        selector: 'method',
        modifiers: ['public'],
        format: null,
        // camelCase, optional UNSAFE_ prefix to handle deprecated React methods
        custom: { regex: `^(UNSAFE_)?${camelCase}$`, match: true },
      },
      { selector: 'typeLike', format: ['PascalCase'], leadingUnderscore: 'forbid' },
      {
        selector: 'interface',
        format: ['PascalCase'],
        ...(prefixWithI ? { prefix: ['I'] } : { custom: { regex: '^I[A-Z]', match: false } }),
      },
      {
        selector: 'default',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        // Allow leading and optional trailing __
        // (the rest of the regex just enforces the same casing constraint listed above)
        filter: { regex: `^__${camelOrPascalOrUpperCase}(__)?$`, match: false },
        // Ban names overlapping with built-in types.
        custom: { regex: builtins, match: false },
        // An alternative way to set up this rule is set `format: null` and pass a single custom
        // regex which matches absolutely everything. However, this leads to unhelpful error messages:
        //   "Variable name `whatever` must match the RegExp: /someAbsurdlyLongUnreadableRegex/"
        // For reference in case we ever want this anyway:
        // format: null,
        // custom: {
        //   regex: `(?!${builtins})^(_?${camelOrPascalOrUpperCase}|__${camelOrPascalOrUpperCase}(__)?)$`,
        //   match: true
        // }
      },
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
