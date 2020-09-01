/**
 * The Webpack Context for doc examples.
 */
export const examplesContext = require.context('../examples/', true, /(\w+Example(\w|\.)*|\w+.perf|\w+.bsize)\.tsx$/);
