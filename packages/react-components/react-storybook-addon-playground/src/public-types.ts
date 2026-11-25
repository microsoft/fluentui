/**
 * NOTE:
 * Don't import anything from source code in this file !!
 *
 * only pure API definitions of addon are allowed to live here, that are used both internal and for external storybook `Parameter` type extensions
 */

export interface PlaygroundParameters {
  /**
   * When `true`, the "Open in Playground" button is not rendered for the story.
   *
   * @default false
   */
  disable?: boolean;
}

/**
 * Options passed to the addon via Storybook's `addons` entry
 * (`{ name: '@fluentui/react-storybook-addon-playground', options }`).
 */
export interface PresetConfig {
  /**
   * Package imports available in playground source, resolved by the consumer's Storybook Webpack build.
   * Use an array when import names and package requests match, or a map to alias an import to a different request.
   * React runtime entries (`react`, `react/jsx-runtime`, `react-dom`, `react-dom/client`) are provided automatically.
   */
  modules: string[] | Record<string, string>;

  /**
   * Optional setup module that default-exports a value from `definePlaygroundSetup`
   * (branding, themes, default code, preview render).
   *
   * When omitted, the addon's Fluent UI default setup is used.
   */
  setup?: string;

  /**
   * Additional package entries whose declarations should be loaded into Monaco (declaration-only, not importable).
   */
  typings?: string[];

  /**
   * Explicit package roots for editor declarations, keyed by public Playground import name (or `typings` entry).
   * Each root must contain a package.json with declaration metadata. Relative paths use the Storybook config directory.
   * Use this when a runtime alias or local wrapper does not identify its declaration package unambiguously.
   * This does not change runtime resolution; the selected declarations must describe the configured runtime module.
   */
  typingsRoots?: Record<string, string>;

  /**
   * Inline the runtime's extracted CSS and its emitted font/image assets into the manifest, including lazy styles.
   * Use for private hosts with same-origin CORP or authenticated assets. Only assets emitted by this build are read;
   * unresolved CSS imports or resource URLs fail the build. Storybook's own CSS loading is unchanged.
   * All referenced styles and embedded assets transfer up front, and lazy styles affect the cascade before import.
   * Opt in only when this ordering and transfer cost are appropriate; this does not preserve lazy CSS loading.
   *
   * @default false
   */
  inlineStyles?: boolean;
}

export interface ParametersExtension {
  playground?: PlaygroundParameters;
}
