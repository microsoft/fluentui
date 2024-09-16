/**
 * The Webpack Context for doc examples.
 */
//                          It's required for a hot reload
// eslint-disable-next-line import/no-mutable-exports
export let examplesContext = require.context('../examples/', true, /(\w+Example(\w|\.)*|\w+.perf|\w+.bsize)\.tsx$/);

// ----------------------------------------
// HMR
// ----------------------------------------

if (__DEV__) {
  // When the application source code changes, re-render the whole thing.
  if (module.hot) {
    // We need this to catch cases unhandled by RHL
    // https://github.com/webpack/webpack/issues/834#issuecomment-76590576
    module.hot.accept(examplesContext.id as string, () => {
      examplesContext = require.context('../examples/', true, /(\w+Example(\w|\.)*|\w+.perf|\w+.bsize)\.tsx$/);
    });
  }
}
