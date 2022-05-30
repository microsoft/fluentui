# RFC: "No action" / default property value standardization

---

_@andrefcdias @Hotell_

## Summary

This RFC aims to standardize what values we use in our components for cases where a prop value results in no action, i.e. defaults that apply no styles.

## Background

Currently, the approach we follow for all components is to use a string value like 'off', 'none' or 'default' for default values of a prop.

## Problem statement

There is no standardization for the naming, resulting in our users needing to read documentation to figure out what to use and requiring specific component knowledge as they can't reuse this information for other components. Given that we use TypeScript's `Required` to enforce these attributes to be non-nullable, a user will have to read through all the docs of said component to figure out what to use, when consuming a `useComponentStyles_unstable` hook. For a user that wants to consume the `useTextStyles` to apply only bold, they would need to write:

```ts
useTextStyles_unstable({
  align: 'start',
  block: false,
  font: 'base',
  italic: false,
  size: 300,
  strikethrough: false,
  truncate: false,
  underline: false,
  weight: 'semibold', // Only change from defaults
  wrap: true,
});
```

## Detailed Design or Proposal

This RFC proposes that we leverage the standard JavaScript default, `undefined`, for attributes instead of a string.
For this, we should stop using `Required` for all props in the `State` and decide case by case if something should / should not be optional.

Cases where our component should have a default value, we would apply the state that should be the default value.
i.e. `Card` component's `appearance` prop, should have a default appearance, as we don't want a card without a pre-defined appearance as that's detrimental to the usage.

Cases where nothing is done in our hooks as a default, we would leverage `undefined`.
i.e. `Card` component's `focusMode` prop should be nullable instead of using an `off` string value, as that reflects the fact that nothing is applied to the component.

### Pros and Cons

#### Pros

- Follows JavaScript standards
- Intuitive to the user because of the above pro - no need to read documentation
- Consistency across our product - enables ease of use

#### Cons

- New style map approach would require changes
  ```ts
  const alignMap = {
    none: undefined,
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
    justify: styles.alignJustify,
  } as const;
  ```
- Users who dynamically set a property value would need to do something like:
  ```tsx
  <Text align={isItFriday ? 'center' : undefined} />
  ```

## Discarded Solutions

### Standardizing the string label used for default values

Using a specific keyword for all possible scenarios would be difficult as there isn't a word that is neutral and appropriate for all the different cases.

- `none` can be confused with CSS's `none`
- `off` does not fit cases like an `align` property
- `default` is ambiguous and does not convey the fact that nothing happens

Even if we can get a word that fits all the cases, the user would still need to add every single property when consuming a styles hook, like the example shown in the [Problem Statement](##Problem_statement).
