/**
 * You don't have to add scenarios to this structure unless
 * you want their render types to differ from the default (mount only).
 *
 * Note:
 * You should not need to have re-render tests in most cases because mount test provides enough coverage.
 * It is mostly usefual for cases where component has memoization logics. And in case of re-rendering,
 * memoization logic help avoid certain code paths.
 */

const AllRenderTypes = ['mount', 'rerender'];
const DefaultRenderTypes = ['mount'];

const scenarioRenderTypes = {
  // TODO: uncomment to enable re-render tests
  // ThemeProvider: AllRenderTypes,
};

module.exports = {
  scenarioRenderTypes,
  DefaultRenderTypes,
};
