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

Put simply, when a component has a default state/behavior, it SHOULD HAVE a default value.<br/>
Example: Card.appearance has `'filled' | 'filled-alternative' | 'outline' | 'subtle'` and is `'filled'` by default.

When a component does not have a default state/behavior, it SHOULD NOT HAVE a default value.<br/>
Anti-example (current state): Text.font has `'base' | 'monospace' | 'numeric'` and defaults to `'base'`, where `'base'` does not apply any styles<br/>
Example (proposal): Text.font has `'monospace' | 'numeric'` and has no defaults (i.e. `undefined`)

### Usage

#### With default

```tsx
// Card.types.ts
type CardProps = {
  appearance?: 'filled' | 'filled-alternative' | 'outline' | 'subtle';
};
type CardState = {
  // Required as we need a value for our hooks to work
  appearance: 'filled' | 'filled-alternative' | 'outline' | 'subtle';
};

// useCard.ts
const { appearance = 'filled' /* {...} */ } = props; // Default applied to enforce behavior

const state = {
  appearance,
  // {...}
};

// useCardStyles.ts
const appearanceLookup = {
  filled: styles.filled,
  'filled-alternative': styles.filledAlternative,
  outline: styles.outline,
  subtle: styles.subtle,
} as const;

state.root.className = mergeClasses(
  cardClassNames.root,
  styles.root,
  appearanceLookup[state.appearance],
  // {...}
  state.root.className,
);
```

#### Without default

```tsx
// Text.types.ts
type TextProps = {
  font?: 'monospace' | 'numeric';
};
type TextState = {
  // Also nullable as the default does not overwrite styles
  font?: 'monospace' | 'numeric';
};

// useText.ts
const { font /* {...} */ } = props; // We no longer set a default here

const state = {
  font,
  // {...}
};

// useTextStyles.ts
const { font } = state;

const fontLookup = {
  _default: undefined,
  base: styles.fontBase,
  monospace: styles.fontMonospace,
  numeric: styles.fontNumeric,
} as const;

state.root.className = mergeClasses(
  cardClassNames.root,
  styles.root,
  fontLookup[font ?? '_default'], // Applying a default to keep usage of a lookup
  // {...}
  state.root.className,
);
```

### Usage differences

#### Dynamically setting a prop value

```jsx
// Before
<Text font={isNumeric ? 'numeric' : 'base'}>

// After
<Text font={isNumeric ? 'numeric' : undefined}>
```

#### Consuming style hooks directly

```js
// Before
useTextStyles_unstable({
  // User has to check docs to double check what the default should be.
  align: 'start',
  block: false,
  font: 'monospace', // Only change from defaults
  italic: false,
  size: 300,
  strikethrough: false,
  truncate: false,
  underline: false,
  weight: 'regular',
  wrap: true,
});

// After
useTextStyles_unstable({
  font: 'monospace',
  // {...} - Required props
});
```

## Pros and Cons

### Pros

- Follows JavaScript standards
- Intuitive to the user because of the above pro - no need to read documentation
- Consistency across our product - enables ease of use
- Unified `Props` and `State` shape

### Cons

- Using the lookup object pattern for styling will require changes as `undefined` can't be used as an index type

  Proposal:

  ```js
  const state = { align: undefined } as const;

  const alignMap = {
    _default: undefined,
    start: styles.alignStart,
    center: styles.alignCenter,
    end: styles.alignEnd,
    justify: styles.alignJustify,
  } as const;

  const className = mergeClasses(
    classNames.root,
    styles.root,
    alignMap[props.align ?? '_default']
  );
  ```

- Dynamically setting a property value requires explicit usage of `undefined`:
  ```jsx
  <Text font={isNumeric ? 'numeric' : undefined}>
  ```

## Discarded Solutions

### Standardizing the string label used for default values

Using a specific keyword for all possible scenarios would be difficult as there isn't a word that is neutral and appropriate for all the different cases.

- `none` can be confused with CSS's `none`
- `off` does not fit cases like an `align` property
- `default` is ambiguous and does not convey the fact that nothing happens

Even if we can get a word that fits all the cases, the user would still need to add every single property when consuming a styles hook, like the example shown in the [Problem Statement](##Problem_statement).
