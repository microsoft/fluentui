# @uifabric/tsx-editor

Monaco-based TypeScript+React live editor used for examples on the Fabric website.

The editor component's API is **highly unstable**, so it **should not** be used outside the Fabric repo yet.

## Required editor configuration

Any project consuming `@uifabric/tsx-editor` should follow the Webpack and runtime configuration instructions from the [`@uifabric/monaco-editor` readme](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/monaco-editor/README.md).

Note that the helpers used arere-exported from this package for convenience:

- `addMonacoWebpackConfig`: import from `@uifabric/tsx-editor/scripts/addMonacoWebpackConfig`
- `configureEnvironment` and `IMonacoConfig`: import from `@uifabric/tsx-editor`
