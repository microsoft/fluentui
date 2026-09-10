// @ts-check

const { collectTypings } = require('./collect-typings');

/**
 * Webpack loader that replaces the content of the processed file with a JSON map of
 * `virtual path -> declaration file content` for the playground dependency allowlist.
 * Meant to be combined with `type: 'asset/resource'` so the (large) JSON is fetched lazily at runtime.
 *
 * @this {import('webpack').LoaderContext<{ packageRoot: string, entries: string[], typescriptVersion: string }>}
 */
module.exports = function typingsLoader() {
  const options = this.getOptions();
  const result = collectTypings(options);

  result.sources.forEach(source => this.addDependency(source));

  if (result.missing.length > 0) {
    this.emitWarning(
      new Error(`Playground typings: could not resolve type declarations for: ${result.missing.join(', ')}`),
    );
  }

  return JSON.stringify(result.files);
};
