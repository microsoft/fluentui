> 💡 This component is considered **low-level** and should be used when there is a need for more **customization** and
> support for **non-standard features**. Please check out the **DataGrid component**
> if you don't need lots of customization and rely on common features. There is less work involved and you will benefit
> from first class Microsoft design and accessibility support.

A Table displays sets of two-dimensional data. The primitive components can be fully customized to support different
feature sets. The library provides a default `useTableFeatures` hook that handles the business logic and state management of common
features. There is no obligation to use our hook with these components, we've created it for convenience.

The `useTableFeatures` hook was designed with feature composition in mind. This means that they are composed using
plugins hooks such as `useTableSort` and `useTableSelection` as a part of `useTableFeatures`. This means
that as the feature set expands, users will not need to pay the bundle size price for features that they do not intend
to use. Please consult the usage examples below for more details.

> ⚠️ Once there is any kind of keyboard navigation on the component it must follow the
> [aria role="grid" pattern](https://www.w3.org/WAI/ARIA/apg/example-index/grid/dataGrids)
