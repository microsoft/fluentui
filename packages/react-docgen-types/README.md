# @fluentui/react-docgen-types

**Shared types for [`@fluentui/react-northstar`](https://aka.ms/fluent-ui) doc generation**

These types are used by `@fluentui/react-docgen`, `@fluentui/docs`, and `@uifabric/build` for a mix of build and browser code. Putting them in a separate package (instead of `@fluentui/react-docgen`) prevents a circular dependency and prevents `@fluentui/docs` from having to pull in and parse the build-related dependencies of `@fluentui/react-docgen`.
