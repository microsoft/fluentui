/**
 * A function to be used by the consumers of the loader to have a recommended list of components
 * to be asynchronously loaded
 *
 * @param input Webpack loader include function provides the request as input
 */
export = (input: string) =>
  input.match(/@fluentui[\\/]react[\\/]lib[\\/]components[\\/]ContextualMenu[\\/]ContextualMenu.js/) ||
  input.match(/@fluentui[\\/]react[\\/]lib[\\/]components[\\/]Callout[\\/]Callout.js/);
