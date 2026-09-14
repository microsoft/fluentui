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

export interface PresetConfig {
  /**
   * Maps imports available in playground source to requests resolved by the consumer's Storybook Webpack build.
   */
  modules: Record<string, string>;

  /**
   * Optional setup module that exports playground branding, themes and render behavior.
   */
  setup?: string;

  /**
   * Additional package entries whose declarations should be loaded into Monaco.
   */
  typings?: string[];
}

export interface ParametersExtension {
  playground?: PlaygroundParameters;
}
