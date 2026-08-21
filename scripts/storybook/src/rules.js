const path = require('path');

/**
 * Shared with the package build (`postcss-modules` `generateScopedName`) and with jest — one
 * scheme, three pipelines. Required by relative path for the reasons in that file's header
 * (it must stay free of workspace requires).
 */
const globalizeGroupMarkers = require('../../css-modules/globalize-group-markers');
const { getLocalIdent } = require('../../css-modules/ident');

/**
 * @type {import("webpack").RuleSetRule}
 */
const tsRule = {
  test: [/\.tsx?$/],
  use: {
    loader: 'swc-loader',
    options: {
      jsc: {
        target: 'es2015',
        parser: {
          syntax: 'typescript',
          tsx: true,
          decorators: true,
          dynamicImport: true,
        },
        transform: {
          decoratorMetadata: true,
          legacyDecorator: true,
        },
        keepClassNames: true,
        externalHelpers: true,
        loose: true,
      },
    },
  },
};

/**
 * @type {import("webpack").RuleSetRule}
 */
const cssRule = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
};

/**
 * The one non-module stylesheet that must go through Tailwind: it emits the shared theme layer
 * once per storybook document (see the file's own header). Every storybook config in the repo
 * imports it from its `preview.js`, so it is a single shared file rather than one copy per app.
 *
 * Matched by SHAPE rather than by absolute path: `scripts/storybook` is consumed through a
 * workspace symlink (`node_modules/@fluentui/scripts-storybook`), and webpack's `resolve.symlinks`
 * vs. node's `__dirname` can disagree about which of the two spellings a module identity carries.
 * Exactly one file in the repo is named `tailwind-theme.css`, so the regexp is unambiguous, and it
 * is written to match both `/` and `\` so it holds on Windows.
 */
const TAILWIND_THEME_ENTRY = /[\\/]tailwind-theme\.css$/;

/** Canonical absolute path of that entry, for configs that would rather import it by path. */
const tailwindThemeEntry = path.resolve(__dirname, 'tailwind-theme.css');

/**
 * `@tailwindcss/postcss` is a *plugin creator*: it has to be invoked to produce the
 * PostCSS plugin object. postcss-loader@4's string/`[name, options]` plugin forms call
 * `require(name)` and return it UNINVOKED when options are empty (dist/utils.js
 * `loadPlugin`), so the instantiated object is passed directly instead.
 *
 * The `require` is wrapped because `@tailwindcss/postcss` publishes its types only through
 * `exports` (`dist/index.d.mts`), which this project's `moduleResolution` cannot follow — a
 * type-lookup failure only; the runtime resolution is fine. Keeping the suppression on its own
 * line confines it to the specifier instead of the whole plugin list.
 *
 * @type {import("webpack").RuleSetUseItem}
 */
const tailwindPostcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      // no postcss.config.* exists in this repo — skip cosmiconfig's upward search
      config: false,
      plugins: [
        // @ts-ignore -- types are behind `exports`; see the note above
        require('@tailwindcss/postcss')(),
        /**
         * MUST come after Tailwind and before css-loader's CSS-Modules pass. webpack runs
         * loaders right-to-left, so postcss-loader is already ahead of css-loader; within
         * this list Tailwind has to have emitted `.group\/fui-switch` first.
         *
         * Without it css-loader hashes the marker and every named-group rule compiles to a
         * selector the DOM never matches — silently, with VR still green. See
         * scripts/css-modules/globalize-group-markers.js and DECISIONS.md D15.
         */
        globalizeGroupMarkers(),
      ],
    },
  },
};

/**
 * Tailwind-flavoured CSS Modules for converted (Griffel-free) packages.
 *
 * Class names come from `getLocalIdent` rather than a `localIdentName` template, because the
 * scheme (`fuicm-<component>-<local>-<hex6>`, all lowercase) is not expressible as one: it
 * kebab-cases both the file token and the local, and it hashes the package name + the
 * source-relative path + the local rather than the file's contents. The identical function
 * drives `postcss-modules` in the package build, so every storybook and `dist/styles.css`
 * produce byte-identical class names for the same module — see scripts/css-modules/ident.js.
 *
 * The `fuicm-` prefix is a hard contract with the jest snapshot serializer, which strips
 * these exactly like Griffel's jest serializer stripped atomics
 * (migration/griffel-to-tailwind/reports/DECISIONS.md D9).
 *
 * @type {import("webpack").RuleSetRule}
 */
const cssModulesRule = {
  test: /\.module\.css$/,
  sideEffects: true,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: {
          getLocalIdent,
          namedExport: false,
        },
      },
    },
    tailwindPostcssLoader,
  ],
};

/**
 * @type {import("webpack").RuleSetRule}
 */
const tailwindThemeRule = {
  test: /\.css$/,
  include: [TAILWIND_THEME_ENTRY],
  sideEffects: true,
  use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, tailwindPostcssLoader],
};

/**
 * Storybook's builder appends an implicit `{ test: /\.css$/, use: [style-loader,
 * css-loader] }` rule (builder-webpack5 `createDefaultWebpackConfig`) with no `modules`
 * option — it would swallow `*.module.css` as global CSS and hand back an empty class
 * map, and it would emit the theme entry's `@import … source(none)` verbatim. Narrow it
 * instead of replacing it: unconverted packages still need plain CSS.
 *
 * Call this BEFORE `registerRules` — webpack applies every matching rule, so the builder's
 * rule has to stop matching before {@link cssModulesRule} / {@link tailwindThemeRule} are added.
 *
 * @param {import("webpack").Configuration} config
 */
function excludeTailwindCssFromDefaultCssRule(config) {
  const cssRuleTest = String(/\.css$/);
  const moduleRules = /** @type {import("webpack").RuleSetRule[]} */ (config.module?.rules ?? []);

  for (const rule of moduleRules) {
    if (!rule || typeof rule !== 'object' || String(rule.test) !== cssRuleTest) {
      continue;
    }

    // An `include` marks a rule that deliberately scopes itself to specific files — that is how
    // `tailwindThemeRule` guards itself, and it shares `test: /\.css$/`. Never narrow those.
    const isScopedRule = rule.include !== null && rule.include !== undefined;

    if (isScopedRule) {
      continue;
    }

    /**
     * The cast is what makes the spread below typecheck: webpack's `exclude` is a union whose
     * array member is `RuleSetConditionAbsolute[]`, and wrapping a possibly-`undefined` scalar
     * in `[rule.exclude]` widens the element type to include `undefined`. The `hasExcludes`
     * guard already rules that out.
     *
     * @type {import("webpack").RuleSetConditionAbsolute[]}
     */
    const existingExcludes =
      rule.exclude === null || rule.exclude === undefined
        ? []
        : /** @type {import("webpack").RuleSetConditionAbsolute[]} */ (
            Array.isArray(rule.exclude) ? rule.exclude : [rule.exclude]
          );

    rule.exclude = [...existingExcludes, /\.module\.css$/, TAILWIND_THEME_ENTRY];
  }
}

/**
 * v8 uses SCSS/CSS modules
 * @type {import("webpack").RuleSetRule}
 */
const scssRule = {
  test: /\.scss$/,
  enforce: 'pre',
  exclude: [/node_modules/],
  use: [
    {
      // creates style nodes from JS strings
      loader: '@microsoft/loader-load-themed-styles',
    },
    {
      // translates CSS into CommonJS
      loader: 'css-loader',
      options: {
        esModule: false,
        modules: true,
        importLoaders: 2,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    {
      loader: 'sass-loader',
    },
  ],
};

/**
 *
 * @type {import("webpack").RuleSetRule}
 */
const griffelRule = {
  test: /\.tsx?$/,
  exclude: [/node_modules/],
  enforce: 'post',
  use: [
    {
      loader: '@griffel/webpack-loader',
      options: {
        babelOptions: {
          presets: ['@babel/preset-typescript'],
        },
      },
    },
  ],
};

/**
 * @type {import("webpack").RuleSetRule}
 */
const swcRule = {
  test: /\.(ts|tsx)$/,
  exclude: ['/node_modules/'],
  use: [
    {
      loader: 'swc-loader',
      options: {
        jsc: {
          target: 'es2019',
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: true,
            dynamicImport: true,
          },
          transform: {
            decoratorMetadata: true,
            legacyDecorator: true,
          },
          keepClassNames: true,
          externalHelpers: true,
          loose: true,
          minify: {
            mangle: false,
          },
        },
      },
    },
  ],
};

/**
 * React Compiler webpack rules. Must run before SWC (enforce: 'pre') because the compiler needs JSX syntax intact.
 * Opt-in only — gate usage behind `process.env.REACT_COMPILER`.
 *
 * @type {import("webpack").RuleSetRule[]}
 */
const reactCompilerRule = [
  {
    test: /\.(ts|tsx)$/,
    include: [/packages\/react-components\//],
    exclude: [/node_modules/],
    enforce: 'pre',
    use: [
      {
        loader: require('react-compiler-webpack').reactCompilerLoader,
      },
    ],
  },
];

exports.tsRule = tsRule;
exports.scssRule = scssRule;
exports.cssRule = cssRule;
exports.cssModulesRule = cssModulesRule;
exports.tailwindThemeRule = tailwindThemeRule;
exports.tailwindThemeEntry = tailwindThemeEntry;
exports.excludeTailwindCssFromDefaultCssRule = excludeTailwindCssFromDefaultCssRule;
exports.griffelRule = griffelRule;
exports.swcRule = swcRule;
exports.reactCompilerRule = reactCompilerRule;
