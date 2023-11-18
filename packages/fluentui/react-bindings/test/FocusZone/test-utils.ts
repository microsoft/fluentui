/**
 * Creates a dummy container to be passed as an `attachTo` option into enzyme's `mount` function.
 * Enables actual JSDOM introspection.
 * Make sure you call `removeTestContainer` at the end of your test to clean up after yourself.
 */
export function createTestContainer() {
  const testContainer = document.createElement('div');
  document.body.appendChild(testContainer);

  const removeTestContainer = () => {
    if (testContainer && testContainer.parentNode) {
      testContainer.parentNode.removeChild(testContainer);
    }
  };

  return { removeTestContainer, testContainer };
}
