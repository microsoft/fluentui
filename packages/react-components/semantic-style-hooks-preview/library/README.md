# @fluentui/semantic-style-hooks-preview

**Semantic Style Hooks components for [Fluent UI React](https://react.fluentui.dev/)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

** Semantic Token Migration Guide **

The Semantic Style Hooks package will enable opt-in behavior for semantic token style overrides.

These hooks will encompass semantic styles for all underlying Fluent core components, while retaining legacy fallbacks if no semantic theme is present.

Please check the implementation of withFluentProvider for examples on how Semantic Hooks should be enabled in code:

```
import { CustomStyleHooksProvider_unstable as CustomStyleHooksProvider } from '@fluentui/react-shared-contexts';
import { SEMANTIC_STYLE_HOOKS } from '@fluentui/semantic-style-hooks-preview';

  <CustomStyleHooksProvider value={SEMANTIC_STYLE_HOOKS}>
    {// app code}
  </CustomStyleHooksProvider>
```

You can also opt in to specific component semantic styles via the flat exports for further scoping.

** Bundle Size **

Please note, that the bundle size has not yet been optimized, as this package serves as an intermediate step until semantic tokens are stabilized and can be merged in the underlying styles files of each component.

** Deprecation Plan **

Once semantic tokens have been tested and stabilized, this package will be deprecated and all style overrides will be provided in the base component packages, at this point, the Semantic Custom Style Hooks will be deprecated and semantic styles will be enforced as the new default - please use this package to test and raise any issues prior to enable a smooth transition.

Legacy themes and tokens will continue to work once migrated thanks to the semantic legacy fallback system - for now, feel free to continue using legacy token themes and add semantic tokens where nessecary as we build out more tooling to assist with the generation of full semantic themes in the future.
