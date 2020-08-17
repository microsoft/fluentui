/**
 * The Webpack Context for doc site example groups.
 */
export const exampleIndexContext = require.context('../examples/', true, /index.tsx$/);

/**
 * The Webpack Context for doc examples.
 */
export const examplesContext = require.context('../examples/', true, /(\w+Example(\w|\.)*|\w+.perf|\w+.bsize)\.tsx$/);

/**
 * The Webpack Context for doc site example groups.
 */
export const exampleBestPracticesContext = require.context('../examples/', true, /BestPractices.tsx$/);

/**
 * The Webpack Context for component playgrounds.
 */
export const examplePlaygroundContext = require.context('../examples/', true, /Playground.tsx$/);

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
    module.hot.accept(exampleSourcesContext.id, () => {
      exampleSourcesContext = require.context('../exampleSources/', true, /.source.json$/);
    });
  }
}
