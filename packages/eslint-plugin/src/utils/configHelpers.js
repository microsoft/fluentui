// @ts-check

const fs = require('fs');
const path = require('path');
const jju = require('jju');

const testFiles = [
  '**/*{.,-}test.{ts,tsx}',
  '**/*.stories.tsx',
  '**/{test,tests,stories}/**',
  '**/testUtilities.{ts,tsx}',
  '**/common/isConformant.{ts,tsx}',
];

const docsFiles = ['**/*Page.tsx', '**/{docs,demo}/**', '**/*.doc.{ts,tsx}'];

const configFiles = [
  './just.config.ts',
  './gulpfile.ts',
  './*.js',
  './.*.js',
  './config/**',
  './scripts/**',
  './tasks/**',
];

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

module.exports = {
  /** Test-related files */
  testFiles,

  /** Doc-related files, not including examples */
  docsFiles,

  /** Files for build configuration */
  configFiles,

  /** Files which may reference devDependencies: tests, docs (excluding examples), config/build */
  devDependenciesFiles: [...testFiles, ...docsFiles, ...configFiles],

  /**
   * Whether linting is running in context of lint-staged (which should disable rules requiring
   * type info due to their significant perf penalty).
   */
  isLintStaged,

  /**
   * Returns a rule configuration for [`@typescript-eslint/naming-convention`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md).
   * This provides the ability to override *only* the interface rule without having to repeat or
   * lose the rest of the (very complicated) config.
   * @param {boolean} prefixWithI - Whether to prefix interfaces with I
   * @returns {import("eslint").Linter.RulesRecord}
   */
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

  /**
   * Rules requiring type information should be defined in the `overrides` section since they must
   * only run on TS files included in a tsconfig.json (generally those files under `src`), and they
   * require some extra configuration. They should be disabled entirely when running lint-staged
   * due to their significant perf penalty. (Any violations checked in will be caught in CI.)
   * @param {import("eslint").Linter.RulesRecord} rules - Rules to enable for TS files
   * @param {string} [tsconfigPath] - Path to tsconfig, default `path.join(process.cwd()), 'tsconfig.json')`
   * @returns {import("eslint").Linter.ConfigOverride[]} A single-entry array with a config for TS files if
   * *not* running lint-staged (or empty array for lint-staged)
   */
  getTypeInfoRuleOverrides: (rules, tsconfigPath) => {
    if (isLintStaged) {
      return [];
    }

    // Type info-dependent rules must only apply to TS files included in a project.
    // Usually this is files under src, but check the tsconfig to verify.
    const tsGlob = '**/*.{ts,tsx}';
    let tsFiles = [`src/${tsGlob}`];
    tsconfigPath = tsconfigPath || path.join(process.cwd(), 'tsconfig.json');

    if (!fs.existsSync(tsconfigPath)) {
      return [];
    }

    /**
       * Note that this way of reading tsconfig does not account for extends, but that's okay since
       * typically include will not be specified that way
       *
       * @type {{
          extends: string[];
          include: string[];
          excludes: string[];
          compilerOptions: Record<string,unknown>;
          references?: Array<{path:string}>
          }}
       */
    const tsconfig = jju.parse(fs.readFileSync(tsconfigPath).toString());

    // if project is using solution TS style config (process references)
    if (tsconfig.references) {
      return [
        {
          files: [tsGlob],
          parserOptions: {
            project: tsconfig.references.map(refConfig => path.join(process.cwd(), refConfig.path)),
          },
          rules,
        },
      ];
    }

    if (tsconfig.include) {
      tsFiles = /** @type {string[]} */ (tsconfig.include).map(
        includePath => `${includePath.replace(/\*.*/, '')}/${tsGlob}`,
      );
    } else if (tsconfig.compilerOptions && tsconfig.compilerOptions.rootDir) {
      tsFiles = [`${tsconfig.compilerOptions.rootDir}/${tsGlob}`];
    }

    // properly resolve invalid slashes in path and preserve initial relative `./` used in tsconfigs
    tsFiles = tsFiles.map(fileGlob => {
      const isRelativePath = !path.isAbsolute(fileGlob);
      const normalized = path.normalize(fileGlob);

      if (isRelativePath) {
        return './' + normalized;
      }

      return normalized;
    });

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

  /** Finds the root folder of the git repo */
  findGitRoot: () => {
    let cwd = process.cwd();
    const root = path.parse(cwd).root;
    while (cwd !== root) {
      // .git is usually a folder, but it's a file in worktrees
      if (fs.existsSync(path.join(cwd, '.git'))) {
        break;
      }
      cwd = path.dirname(cwd);
    }
    return cwd;
  },
};
