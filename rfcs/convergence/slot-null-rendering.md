# RFC: Slot null rendering refactoring

---

_@bsunderhus @ling1726 @khmakoto @ecraig12345 @layershifter_

## Summary

`null rendering` is the process of making a `slot` render nothing. This term will be used thoroughly in this RFC.

This RFC proposes a solution for a recurring problem involving slots with no `children` property into 2 steps:

1. `getSlots` should stop verifying null rendering (verifying if a slot should not be rendered) by the existence of the `children` property.
2. Since some slots have default props, verification must be done on shorthand declaration to ensure that those slots will be null rendered (or not) even when presented with default props.

The behavior for `null rendering` should be described as: receiving `null` should always make a slot `null render` (although in some cases this might even break the component), in the case of `undefined` that would only be true if the component is optional. The idea is to use `undefined` the same way as React does for props, where you can have a default case.

## Background

`shorthand` is what is passed by component properties, they are referred by the type `ShorthandProps` and eventually converted to `ObjectShorthandProps` by `resolveShorthand` method.

```tsx
export type ShorthandProps<Props = {}> =
  | React.ReactChild
  | React.ReactNodeArray
  | React.ReactPortal
  | number
  | null
  | undefined
  | ObjectShorthandProps<Props>;
```

`getSlots` is a method that iterates over `ObjectShorthandProps` (_shorthands_ that were converted during `resolveShorthand` method) declarations and converts them to something that can be rendered by React.

In the case where one _shorthand_ declares a native element (e.g: `"div"`, `"input"`) it will only be rendered if this element has `children` as a property.

This is done by `getSlots` method, which is invoked by the rendering function of a component.

```tsx
// react-utilities/src/compose/getSlots.ts

function getSlots(state, slotNames) {
  // ...
  if (typeof slot === 'string' && children === undefined) {
    slot = nullRender;
  }
  // ...
}
```

## Problem statement

The verification of only allowing native elements to be rendered if a `children` property is provided breaks in some edge cases.

### [Empty Elements]

The `Input` component is a good case example of that as [reported](https://github.com/microsoft/fluentui/pull/18642#issuecomment-871677964) by @ecraig12345, since the native element `input` is an [Empty Element], it cannot have any children, and still needs to be rendered.

Right now for input case this is the solution to avoid `children = undefined` problem:

```tsx
export function Input(props) {
  const state = {
    components: {
      input: 'input',
    },
    input: resolveShorthand(props.input, {
      children: React.Fragment, // 🚨 getSlots requires children
    }),
  };
  const { slots, slotProps } = getSlots(state, ['input']);
  delete slotProps.input.children; // 🚨 input can't have children

  return (
    <slots.root {...slotProps.root}>
      <slots.input {...slotProps.input} />
    </slots.root>
  );
}
```

[Live Example](https://stackblitz.com/edit/react-ts-wwguyp?file=Input.tsx)

### Slot as a parent for other slots

This edge case has been seen in different converged components ([`CompoundButton`](https://github.com/microsoft/fluentui/blob/master/packages/react-button/src/components/CompoundButton/renderCompoundButton.tsx#L18), [`AccordionHeader`](https://github.com/microsoft/fluentui/blob/master/packages/react-accordion/src/components/AccordionHeader/renderAccordionHeader.tsx#L15))

The problem is that using a slot as parent for other slots means overriding `children` props, so `children` is not declared in the moment `resolveShorthand` is invoked but in the moment that the slot will be rendered.

```tsx
export function Component(props) {
  const state = {
    components: {
      button: 'button',
      icon: 'i',
    },
    button: resolveShorthand(props.button, {
      children: React.Fragment, // 🚨 getSlots requires children
    }),
    icon: resolveShorthand(props.icon),
  };

  const { slots, slotProps } = getSlots(state, ['input']);

  return (
    <slots.root {...slotProps.root}>
      <slots.button {...slotProps.button}>
        <slots.icon {...slotProps.icon} />
      </slots.button>
    </slots.root>
  );
}
```

[Live Example](https://stackblitz.com/edit/react-ts-wwguyp?file=SlotAsParent.tsx)

### Native elements without children

e.g: An Icon that doesn't have children `<i class="icon"/>` (this case is hypothetical, but quite possible, as we cannot verify it in converged components).

## Detailed Design or Proposal

Both options here proposed by the end are equivalent, the only difference is the impact on `ObjectShorthandProps` interface

### Resolution: Make `shorthands` optional

This solves this problem by verifying if the shorthand is `undefined` or not.
By verifying if shorthand is `undefined` we can opt for null rendering without compromising the cases which native slots don't have children

- `getSlots` should stop verifying null rendering by the existence of the property `children`, instead depending on the existence of the shorthand itself

```tsx
// react-utilities/src/compose/getSlots.ts
function getSlots(state, slotNames) {
  // ...
  if (state[name] === undefined) {
    slots[name] = nullRender;
    continue;
  }
  // ...
}
```

- Since some slots may have default props, verification must be done on shorthand declaration to ensure that those slots will be null rendered even when presented with default props.

```diff
export function resolveShorthand(
  value,
  defaultProps,
+  {optional = true}
+) {
+  // verify if shorthand is undefined
+  if (value === null || (value === undefined && optional)) {
+    return undefined;
+  }
}
```

The problem with this approach is that the shorthand signature now will carry with it an `undefined` value, making overrides a little less elegant:

```ts
export const CustomAccordionHeader = React.forwardRef<HTMLElement, AccordionHeaderProps>((props, ref) => {
  const state = useAccordionHeader(props, ref);
  const iconName = React.useMemo(/* --- */);

  if (state.icon) {
    state.icon.onClick = () => {
      /**
       * this is an override,
       * if this was a hook than it would need
       * to be declared before the conditional
       **/
      // React hooks also cannot be used inside conditions
      state.icon.name = iconName;
    };
  }

  useAccordionHeaderStyles(state);
  return renderAccordionHeader(state);
});
```

In cases where we simply want to ensure that the slot should be rendered even when `shorthand` is `undefined` than `{optional: false}` should be provided

```ts
export const useState = (props, ref) => {
  return {
    ...props,
    slot1: resolveShorthand(props.slot1), // undefined
    slot2: resolveShorthand(props.slot2, {}, { optional: false }), // {}
  };
};
```

## Pros and Cons

### Pros

1. This takes the responsibility of deciding if a slot might be null rendered out of the inner implementation of `getSlot` and into the developers' hands, by providing an optional way of declaring it.

### Cons

1. This takes the responsibility of deciding if a slot might be null rendered out of inner implementation of `getSlot` into the developers hand, by providing a optional way of declaring it

[empty elements]: https://developer.mozilla.org/en-US/docs/Glossary/Empty_element
[empty element]: https://developer.mozilla.org/en-US/docs/Glossary/Empty_element

## Discarded Solutions

### Symbol for null rendering

This solves this problem by verifying if the shorthand has a special symbol or not.
By verifying this symbol we can opt for null rendering without compromising the cases in which native slots don't have children.
This is very similar to Option 1 approach but without the downside of having undefined as part of `ObjectShorthandProps` interface.

- `getSlots` should stop verifying null rendering by the existence of the property `children`, instead depending on the existence of the symbol

```tsx
// react-utilities/src/compose/getSlots.ts
function getSlots(state, slotNames) {
  // ...
  if (typedState[name][nullRenderSymbol]) {
    slots[name] = nullRender;
    continue;
  }
  // ...
}
```

- Since some slots may have default props, verification must be done on shorthand declaration to ensure that those slots will be null rendered even when presented with default props

```diff
export function resolveShorthand(
	value,
	defaultProps,
+   { optional = true },
+) {
+  if (value === null || (value === undefined && optional)) {
+    return { [nullRenderSymbol]: true };
+  }
```

The difference with this approach is that the shorthand signature will not carry with it an `undefined` value, making overrides easier:

```ts
export const CustomAccordionHeader = React.forwardRef<HTMLElement, AccordionHeaderProps>((props, ref) => {
  const state = useAccordionHeader(props, ref);
  state.icon.onClick = () => {
    /* ... */
  };
  useAccordionHeaderStyles(state);
  return renderAccordionHeader(state);
});
```

In cases where we simply want to ensure that the slot should be rendered even when `shorthand` is `undefined` then `{optional: false}` should be provided:

```ts
export const useState = (props, ref) => {
  return {
    ...props,
    slot1: resolveShorthand(props.slot1), // undefined
    slot2: resolveShorthand(props.slot2, {}, { optional: false }), // {}
  };
};
```
