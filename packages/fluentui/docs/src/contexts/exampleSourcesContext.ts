/**
 * The Webpack Context for doc site example sources.
 */
//                          It's required for a hot reload
// eslint-disable-next-line import/no-mutable-exports
export let exampleSourcesContext = require.context('../exampleSources/', true, /.source.json$/);

// ----------------------------------------
// HMR
// ----------------------------------------

if (__DEV__) {
  // When the application source code changes, re-render the whole thing.
  if (module.hot) {
    // We need this to catch cases unhandled by RHL
    // https://github.com/webpack/webpack/issues/834#issuecomment-76590576
    module.hot.accept(exampleSourcesContext.id as string, () => {
      exampleSourcesContext = require.context('../exampleSources/', true, /.source.json$/);
    });
  }
}
