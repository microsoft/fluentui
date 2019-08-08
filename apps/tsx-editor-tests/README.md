# @uifabric/tsx-editor-tests

Tests for the TSX live editor. They're in their own package (which builds after everything else) because to make Monaco work in Jest, we have to transpile its code from ESM to commonjs using Babel, which takes a long time.
