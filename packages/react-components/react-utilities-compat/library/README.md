# @fluentui/react-utilities-compat

**React compatibility utilities for [Fluent UI React](https://react.fluentui.dev/)**

This package contains utility functions ported from Fluent UI React v8.
This allows developers with high usage of v8 utility functions to migrate to v9.

The utility functions are ported as-is with no improvements. Internal dependencies on v8 are ported into the internals folder and are only exported from the package if the utility function signature includes them.

Utility functions that will not be available in future major versions of Fluent UI React are marked as deprecated. We encourage developers to move off of ported utility functions whether they are deprecated or not. Developers should consider using utility functions available from javascript, node, or from open-source libraries; bringing the utility function into their own repository; or rewriting code to not use the utility function.

Any utility functions that exist in v8 and already exist in v9 will be exported from their respective v9 component or the v9 react-utilities package.

If a v8 utility is not exported from this package that you require, please contact the Fluent team.

