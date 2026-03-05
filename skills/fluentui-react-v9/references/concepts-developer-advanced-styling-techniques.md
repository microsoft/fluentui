## Advanced styling techniques

Theming, applying style changes at scale, is a really important part of any design system. Teams should look to tokens and variables first when considering how to change the look and feel of an app. Sometimes more powerful tools are required to accomplish a goal or handle edge cases. This document explains how to leverage the custom style hooks built into Fluent UI React V9.

Most of the Fluent UI React v9 components are structured using the hooks approach:

The pertinent lines are where styles are calculated:

The default styles are defined by `useButtonStyles_unstable` and are packaged with every component. `useCustomStyleHook_unstable` reaches into a `CustomStyleHooksProvider` (if it exists) and calculates any styles that match the component type.

> 💡See RFC [microsoft/fluentui#25333](https://github.com/microsoft/fluentui/pull/25333) for a detailed explanation.

For example, an `App.tsx` might look like:

A little scaffolding is required to get here first. Define a `useFancyButtonStyles.ts`, and calculate the style similar to how you would for any other Fluent component.

> ⚠️ Custom style hooks must also append the slot's original className prop as returned by `getSlotClassNameProp_unstable`, after the custom styles. This ensures that the className prop added by the user will take precedence over custom styles. See [microsoft/fluentui#34166](https://github.com/microsoft/fluentui/pull/34166) for a detailed explanation.

Define the value for `CustomStyleHooksProvider_unstable` in `FancyAppCustomStyleHooksValue.ts` that consumes custom style hooks:

Finally use the `CustomStyleHooksProvider_unstable` in your app:

### Nesting and merging custom style hooks

One caveat is that `CustomStyleHooksProvider` does not automatically merge contexts' values. In an app with 'Smart' styles for example:

Applications should make the best decisions for their styles, determining when and how to apply them. If apps have their own custom style hooks and want to adopt others, they can gracefully merge them:

And finally the App code can be simplified:

This way, apps can adopt the styles they need at scale while maintaining their own style preferences.
