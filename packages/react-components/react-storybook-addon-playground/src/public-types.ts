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
}

export interface ParametersExtension {
  playground?: PlaygroundParameters;
}
