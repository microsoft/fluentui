import type { PresetConfig } from './types';

type WebpackFinalFn = NonNullable<import('@storybook/react-webpack5').StorybookConfig['webpackFinal']>;
export type WebpackFinalConfig = Parameters<WebpackFinalFn>[0];
export type WebpackFinalOptions = Parameters<WebpackFinalFn>[1];

export function webpack(config: WebpackFinalConfig, options: WebpackFinalOptions): WebpackFinalConfig {
  const addonPresetConfig = getAddonOptions(options);

  registerRules({
    config: config as import('webpack').Configuration,
    rules: [createBabelLoaderRule(addonPresetConfig)],
  });

  return config;
}

const identity = <T extends unknown>(value: T) => value;
/**
 * Matches the preset entry inside `options.presetsList`.
 *
 * The separator class is `[\\/]`, not a bare `/`: in development the preset is registered by
 * `loadWorkspaceAddon` (scripts/storybook/src/utils.js), which hands storybook a NATIVE
 * absolute path — `path.join(packageRoot, 'temp', 'preset.ts')`. On Windows every separator in
 * that string is a backslash, so a POSIX-only pattern never matched and `getAddonOptions` fell
 * back to bare defaults, silently discarding `importMappings`, `webpackRule` and `cssModules`
 * (DECISIONS.md D8). Production registrations use POSIX `node_modules/...` paths, which the
 * same class still matches.
 */
const addonFilePattern = /react-storybook-addon-export-to-sandbox[\\/][a-z0-9\\/-]+\.[jt]s$/;
const defaultOptions = {
  webpackRule: {},
  babelLoaderOptionsUpdater: identity,
  cssModules: false,
};

const PLUGIN_PATH =
  process.env.BABEL_PRESET_FULL_SOURCE_DEV === 'true'
    ? '@fluentui/babel-preset-storybook-full-source/__dev'
    : '@fluentui/babel-preset-storybook-full-source';

function createBabelLoaderRule(config: Required<PresetConfig>): import('webpack').RuleSetRule {
  const { babelLoaderOptionsUpdater, importMappings, webpackRule, cssModules } = config;

  const plugin = [require.resolve(PLUGIN_PATH), { importMappings, cssModules }];

  return {
    test: /\.stories\.(jsx?$|tsx?$)/,
    ...webpackRule,
    /**
     * Run before transpilers so this loader receives the original story source and does not depend on
     * the format of sourcemaps emitted by subsequent loaders.
     */
    enforce: 'pre',
    use: {
      loader: require.resolve('babel-loader'),
      options: babelLoaderOptionsUpdater({
        /**
         * This pass exists ONLY to run the full-source plugin; transpilation is the job of the
         * `enforce: 'pre'`-follower (swc). Without these two flags babel-loader loads the repo's
         * root `babel.config.js` (and, via `babelrcRoots`, package `.babelrc.json` files), which
         * spreads `@fluentui/scripts-babel` → a bare `'@babel/preset-react'` → `runtime: 'classic'`,
         * which in turn *sets* `pragma`/`pragmaFrag`. Story files carrying a leading
         * `@jsxRuntime automatic` docblock pragma then hard-fail the whole build with
         * "pragma and pragmaFrag cannot be set when runtime is automatic" (react-motion ×6,
         * react-tree ×1 — the docsite's INFRA-1c blocker). The presets were never wanted here:
         * `parserOpts` already grants the TS/JSX syntax this pass needs, and `customize`
         * (scripts/storybook custom-loader) existed only to subtract leaked presets one by one.
         */
        configFile: false,
        babelrc: false,
        parserOpts: { plugins: ['typescript', 'jsx'] },
        plugins: [plugin],
      }),
    },
  };
}

/**
 *
 * register custom Webpack Rules to webpack config
 */
function registerRules(options: { rules: import('webpack').RuleSetRule[]; config: import('webpack').Configuration }) {
  const { config, rules } = options;
  config.module = config.module ?? {};
  config.module.rules = config.module.rules ?? [];
  config.module.rules.push(...rules);

  return config;
}

function getAddonOptions(options: WebpackFinalOptions): Required<PresetConfig> {
  const presetRegistration = options.presetsList?.find(preset => {
    return addonFilePattern.test(preset.name);
  });

  const addonOptions = presetRegistration?.options ?? {};

  return { ...defaultOptions, ...addonOptions };
}
