// @ts-check

const fs = require('fs-extra');
const path = require('path');
const jju = require('jju');

// eslint-disable-next-line import/no-extraneous-dependencies
const { FsTree } = require('nx/src/generators/tree');
// eslint-disable-next-line import/no-extraneous-dependencies
const { readProjectConfiguration } = require('@nx/devkit');

/**
 *  @typedef {{root: string, name: string}} Options
 *  @typedef {{name: string, version: string, dependencies: {[key: string]: string}}} PackageJson
 *  @typedef {import("@nx/devkit").WorkspaceJsonConfiguration} WorkspaceJsonConfiguration
 */

// FIXME: this is not ok (to depend on nx packages within this plugin - redo)
/**
 * Gets project metadata from monorepo source of truth which is `project.json` per project
 * @param {Options} options
 * @returns {import('@nx/devkit').ProjectConfiguration}
 */
function getProjectMetadata(options) {
  /**
   * @type {import('@nx/devkit').Tree}
   */
  const tree = new FsTree(options.root, false);

  return readProjectConfiguration(tree, options.name);
}

const testFiles = [
  '**/*{.,-}{test,spec,e2e,cy}.{ts,tsx}',
  '**/{test,tests}/**',
  '**/testUtilities.{ts,tsx}',
  '**/common/{isConformant,snapshotSerializers}.{ts,tsx}',
  './e2e/**',
];

const docsFiles = ['**/*Page.tsx', '**/{docs,demo}/**', '**/*.doc.{ts,tsx}'];
const storyFiles = ['**/*.stories.tsx', '**/*.stories.ts'];

const configFiles = [
  './just.config.ts',
  './cypress.config.ts',
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
const pascalCase = '[A-Z][a-zA-Z\\d]*'; // must start with uppercase letter
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

  /**
   * Files which may reference `devDependencies`:
   * - tests
   * - docs (excluding v8 examples)
   * - config/build
   * - stories, for now
   *   - may need to reconsider for converged components depending on website approach
   *   - the stories suffix is also used for storywright stories in `vr-tests`
   */
  devDependenciesFiles: [...testFiles, ...docsFiles, ...configFiles, ...storyFiles],

  /**
   * Whether linting is running in context of lint-staged (which should disable rules requiring
   * type info due to their significant perf penalty).
   */
  isLintStaged,

  /**
   * Returns a rule configuration for [`@typescript-eslint/naming-convention`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md).
   * This provides the ability to override *only* the interface rule without having to repeat or
   * lose the rest of the (very complicated) config.
   * @param {{prefixInterface: boolean}} config - Whether to prefix interfaces with I
   * @returns {import("eslint").Linter.RulesRecord}
   */
  getNamingConventionRule: (config = { prefixInterface: false }) => ({
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
      {
        selector: ['function', 'variable'],
        modifiers: ['exported'],
        format: null,
        // Allow the _unstable suffix for exported hooks
        filter: { regex: `^(use|render)${pascalCase}_unstable$`, match: true },
      },
      { selector: 'typeLike', format: ['PascalCase'], leadingUnderscore: 'forbid' },
      {
        selector: 'interface',
        format: ['PascalCase'],
        ...(config.prefixInterface ? { prefix: ['I'] } : { custom: { regex: '^I[A-Z]', match: false } }),
      },
      // Ignore properties that require quotes - https://typescript-eslint.io/rules/naming-convention/#ignore-properties-that-require-quotes
      {
        selector: [
          'classProperty',
          'objectLiteralProperty',
          'typeProperty',
          'classMethod',
          'objectLiteralMethod',
          'typeMethod',
          'accessor',
          'enumMember',
        ],
        format: null,
        modifiers: ['requiresQuotes'],
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
  getTypeInfoRuleOverrides: (rules, tsconfigPath = path.join(process.cwd(), 'tsconfig.json')) => {
    if (isLintStaged) {
      return [];
    }

    // Type info-dependent rules must only apply to TS files included in a project.
    // Usually this is files under src, but check the tsconfig to verify.
    const tsGlob = '**/*.{ts,tsx}';

    if (!fs.existsSync(tsconfigPath)) {
      return [];
    }

    /**
       * Note that this approach only accounts for a single level of extends.
       * - JJU is used for tsconfig parsing because Typescript configs support JS comments (JSON5 "standard")
       *
       * @type {{
          extends: string;
          include: string[];
          exclude: string[];
          compilerOptions: Record<string,unknown>;
          references?: Array<{path:string}>
          }}
       */
    const tsconfig = jju.parse(fs.readFileSync(tsconfigPath).toString());

    // vNext setup - if project is using solution TS style config (process references)
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

    // v8.v0 setup

    let tsFiles = [`src/${tsGlob}`];
    if (tsconfig.include) {
      tsFiles = tsconfig.include.map(includePath => `${includePath.replace(/\*.*/, '')}/${tsGlob}`);
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
        excludedFiles: tsconfig.exclude,
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

  /**
   * Gets package.json of provided package name.
   * @param {Options} options Takes provided root folder of git repo and package name.
   * @returns {PackageJson} package.json file of the provided package name.
   */
  getPackageJson: (/** @type {Options} */ options) => {
    const projectMetaData = getProjectMetadata(options);
    const packagePath = path.join(options.root, projectMetaData.root);

    /** @type {PackageJson} */
    const packageJson = fs.readJSONSync(path.join(packagePath, 'package.json'));

    return packageJson;
  },

  /**
   * Gets a set of v9 packages that are currently being exported as unstable from @fluentui/react-components.
   * @param {string} root folder of git repo.
   * @returns {Set<string>} Returns a set of v9 packages that are currently unstable.
   */
  getV9UnstablePackages: (/** @type {string} */ root) => {
    const v9ProjectMetaData = getProjectMetadata({ root, name: '@fluentui/react-components' });
    const v9PackagePath = path.join(root, v9ProjectMetaData.sourceRoot ?? '', 'unstable', 'index.ts');
    const unstableV9Packages = new Set();
    fs.readFileSync(v9PackagePath)
      .toString()
      .split(' ')
      .forEach(str => {
        if (str.includes('@fluentui')) {
          const pkgName = str.split(';')[0].slice(1, -1);
          unstableV9Packages.add(pkgName);
        }
      });

    return unstableV9Packages;
  },
};
