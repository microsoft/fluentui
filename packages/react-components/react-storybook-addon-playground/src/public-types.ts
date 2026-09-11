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

export interface ParametersExtension {
  playground?: PlaygroundParameters;
}
