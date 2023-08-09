# RFC: Appearance migration

[@petr-duda](https://github.com/petr-duda)

## Summary

Fluent V9 changes the default appearance of input components (`Dropdown`, `Input`, `TextArea`). V0 input components default background color is grey-ish, whereas in V9 the background color is white.

## Background

Partners could change the background color to match the previous version of Fluent by passing a prop `appearance` with value `filled-darker`, but this solution does not scale well for partners when migrating to the new version and is error prone.

## Problem statement

This RFC explores potential solutions for partners, so they could migrate input components to V9 without the extra work of adding an additional prop to input components.

Partners should also easily revert the decision to the default appearance value if they decide so, without changing inputs individually.

👎 Cons of adding appearance to achieve the same design as V0:

- Not scalable, partners would have to add the prop to every component
- If they decide to revert back to default appearance in future, they would have to go through the same pain again by removing the prop
- Is error prone

## Detailed Design or Proposal

### Use React context

Another option is to use React Context to override `appearance` defaults in `FluentProvider`.

#### Example

```tsx
function App() {
  return (
    <FluentProvider appearance="filled-darker">
      <Input /> {/* has "filled-darker" */}
      <Input appearance="underline" /> {/* has "underline" */}
    </FluentProvider>
  )
}

👍 more universal solution than a custom token - can be used to override different concepts, not only tokens - props, icons, etc.

👎 new concept
👎 one-off just for the Input background (although it would be used in multiple input components)
```

## Discarded Solutions

### Compose components on application side

Partners could create a new composed component on application side. and modify the props in their preferred way. If the partner would like to keep the original color, they could create the composed component and have the default component without the appearance prop renders as `filled-darker`.

#### Example

```ts
export const Input: ForwardRefComponent<InputProps> = React.forwardRef((props, ref) => {
  const state = useInput_unstable({ appearance: 'filled-darker', ...props }, ref);

  useInputStyles_unstable(state);
  return renderInput_unstable(state);
});
```

👍 Pros:

- Is relatively safe

👎 Cons:

- Creating new composed component for each input `Dropdown`, `Input`, `TextArea` and `DatePicker`
- Composed component apperance prop wouldn't match our Fluent V9 documentation
- Does not work if repos have dependencies of another project with Fluent V9 input components (Nova)
- Composition approach is currently marked as unstable in v9

### Wrap the library components on application side

Partners could a new component wrapper that will wrap input components and modify the appearance prop on the application side.

#### Example

```tsx
export const Input: ForwardRefComponent<InputProps> = React.forwardRef((props, ref) => {
  return <BaseInput appearance="filled-darker" {...props} ref={ref} />;
});
```

👍 Pros:

- Is safe and stable

👎 Cons:

- Creating new composed component for each input `Dropdown`, `Input`, `TextArea` and `DatePicker`
- Wrapper components in React's i.e. bigger React tree
- Wrapper component apperance wouldn't match our Fluent V9 documentation
- Would work in iframes only within the TMP repository
- Does not work if repos have dependencies of another project with Fluent V9 input components (Nova)

### Global css selector

Targeting all input selectors from a partner app and change the color with global css.

Example: https://codesandbox.io/s/rfc-inputs-ew821q?file=/app.tsx

👍 Pros:

- Relatively easy and fast to do
- Scalable
- Would work for dependencies such as Nova (but depending where we inject the CSS rule and if they have their own `FluentProvider`)

👎 Cons:

- Difficult to validate

### New token alias to theme

Adding a new alias color token (let's say `colorInputBackground`) and use it for all inputs.

👍 Pros:

- Easy to do and would work for all inputs

👎 Cons:

- Negative impact on performance by increasing variables (as read here: [fluentui/theme-shared-colors.md at d5d510bf1ffcc1a4ed2067e9eb009c84e7beb351 · microsoft/fluentui (github.com)](https://github.com/microsoft/fluentui/blob/d5d510bf1ffcc1a4ed2067e9eb009c84e7beb351/rfcs/react-components/convergence/theme-shared-colors.md))
- Divergence themes from the original

### New optional token with fallback to a theme token

Another option is to add a possibility to override the background using a CSS variable:
We can use `backgroundColor: var(--inputBackgroundOverride, ${tokens.colorNeutralBackground1})` without setting the `--inputBackgroundOverride` anywhere. Then an application can set that variable if it needs to override the background.

👍 no additional tokens unless needed

👎 new concept
👎 one-off just for the Input background (although it would be used in multiple input components)

### Unify design

Discuss with designers to unify V0 and V9 design, setting the appearance to filled-dark by default.

👍 Props:

- Will make migration easier for partners who already uses V0
- Would work with iframes (if all the teams have the unified design)

👎 Cons:

- Inherits design from old V0 package that does not meet our needs/goals
- According to the design team, this is currently a no-go
