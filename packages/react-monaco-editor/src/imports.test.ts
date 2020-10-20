describe('monaco imports', () => {
  // The 2nd test is meant to verify that Monaco hasn't been included somewhere it shouldn't be,
  // since that would cause a significant bundle size impact to consumers.
  // The 1st test verifies that the 2nd test's methodology is still valid.

  // These tests take advantage of the fact that Monaco's JS files use ES module format, which Jest
  // doesn't support--so it should throw an exception when importing anything besides types from Monaco.
  /* eslint-disable @fluentui/max-len */

  it('test can detect monaco imports', () => {
    try {
      require('./Editor');
    } catch (ex) {
      // Test passes!
      return;
    }
    throw new Error(
      "Importing Monaco no longer causes Jest to error! This probably means you're upgrading Jest to a version which (finally) has ES module support. You will need to find another way to check for problematic Monaco imports.",
    );
  });

  it('does not import monaco in certain basic files', () => {
    try {
      require('./index');
    } catch (ex) {
      throw new Error(`
Error importing index.ts in test! This probably means that either:

1. You added a reference to a new package
    => Solution: add mapping for package in jest.config.js

2. You added a root import of @fluentui/monaco-editor in a file which shouldn't reference Monaco.
    => Solution: If you need types from Monaco in a file referenced by index.ts, import from:
          @fluentui/monaco-editor/esm/vs/editor/editor.api
       For imports besides types, please restructure your code.

Original error:
${ex.stack}
`);
    }
  });
});
