/**
 * Creates a container element which is appended to `document.body` and can be used as a target
 * for `ReactDOM.render` or passed as an `attachTo` option into enzyme's `mount` function.
 * Enables actual JSDOM introspection.
 *
 * Make sure you call `testContainer.remove()` at the end of your test to clean up after yourself.
 */
export function createTestContainer() {
  const testContainer = document.createElement('div');
  document.body.appendChild(testContainer);
  return testContainer;
}
