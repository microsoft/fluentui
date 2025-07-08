# @fluentui/semantic-style-hooks-preview

**Semantic Style Hooks components for [Fluent UI React](https://react.fluentui.dev/)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

** Semantic Token Migration Guide **

This package exports custom style hooks (see https://react.fluentui.dev/?path=/docs/concepts-developer-advanced-styling-techniques--docs) that enable semantic tokens (@fluentui/semantic-tokens) usage in Fluent core component styles.

The SEMANTIC_STYLE_HOOKS object can be directly passed in to the FluentProvider:

```
import { SEMANTIC_STYLE_HOOKS } from '@fluentui/semantic-style-hooks-preview';

  <FluentProvider theme={theme} customStyleHooks_unstable={SEMANTIC_STYLE_HOOKS}>
    {// app code}
  </FluentProvider>
```

If no FluentProvider is present, the CustomStyleHooksProvider can be used directly:

```
import { CustomStyleHooksProvider_unstable as CustomStyleHooksProvider } from '@fluentui/react-shared-contexts';
import { SEMANTIC_STYLE_HOOKS } from '@fluentui/semantic-style-hooks-preview';

  <CustomStyleHooksProvider value={SEMANTIC_STYLE_HOOKS}>
    {// app code}
  </CustomStyleHooksProvider>
```

You can also opt in to specific component semantic styles via the flat exports for further scoping - if you use custom style hooks in your app already, we recommend calling these functions at the top of existing style hooks instead.

Legacy themes and tokens will continue to work once enabled thanks to the CSSVar fallback system - feel free to continue using existing token themes and optionally add semantic token values as we build out more tooling to assist with the generation of semantic token themes in the future.

** Bundle Size **

Please note, that the bundle size of these style hooks has not yet been optimized, as this package serves as an intermediate step until semantic tokens are stabilized and can be merged in the underlying styles files of each component.

** Deprecation Plan **

Once semantic tokens have been tested, stabilized, and confirmed backwards compatible, they will be optimized and enabled in the base component packages by default. At this point, the semantic style hooks package will be deprecated - please use this package to test and raise any issues prior to enable a smooth transition.
