# RFC: Your proposal name here

Contributors: behowell

Follow-on to RFC https://github.com/microsoft/fluentui/pull/27164 by bsunderhus

## Summary

<!-- Explain the proposed change -->

## Background

Slots accept render functions that allow them to override the component and/or props used when rendering the slot. For more background, see https://react.fluentui.dev/?path=/docs/concepts-developer-customizing-components-with-slots--page#replacing-the-entire-slot

The render function is passed in as the slot's `children` prop. This has led to the following issue:

- https://github.com/microsoft/fluentui/issues/27089

This RFC is related to another RFC that also solves the above issue in a different way:

- https://github.com/microsoft/fluentui/pull/27164
- Either this RFC or the above RFC could be implemented independently to solve the issue; they don't have dependencies on each other.
- Or, they could both be implemented together, to gain the benefits described in both RFCs.

## Problem statement

A few problems with render functions as they are today:

1. Using `children` as the render function props overrides any default children provided by the component's internals.
   - This issue: https://github.com/microsoft/fluentui/issues/27089
2. It is confusing (IMO) that passing a render function as `children` would override the _whole slot_, and not just its children.
3. The root slot's render function conflicts the use of children as a function, which certain components use for custom rendering of their children.
   - For example, Tooltip and Field both accept a function as a child of their root, in order to pass props to the children. However, this breaks the ability to use a slot render function for the root slot of those controls.
   - See: https://react.fluentui.dev/?path=/docs/preview-components-field--default#complex-content-in-a-field

There are some secondary issues that are addressed in the Appendices of this proposal:

A. The order of the arguments is `(Component, props)`, but one of the primary use cases is to replace the given slot component with something else, in which case you ignore the first argument. You'd rarely/never(?) want to ignore the second argument `props`.
B. There is no way to pass a React component to the `as` prop.

## Proposal

The core proposal in this RFC is to use the `as` prop as the render function instead of `children`.

```jsx
<>
  {/* Existing behavior: */}
  <AccordionHeader button={{ children: (Component, props) => <Component {...props} /> }} />
  {/* New behavior, use 'as' instead, and `props` includes the slot's default `children`: */}
  <AccordionHeader button={{ as: (Component, props) => <Component {...props} /> }} />
</>
```

You can still pass in a string to the `as` prop (e.g. `as="a"` to render an `<a>` tag), and it would work as it does today:

- If the slot's type is an intrinsic element like `'button'`, it replaces that element with the given one.
- If the slot's type is a component like `Button`, it forwards the `as` prop to the component.

🤔 What if you want to provide a render function _and_ override the component's `as` prop? Write a render function that adds your own `as` and spreads props:

```jsx
<Checkbox label={{ children: 'Label text', as: (_ignored, props) => <MyLabel as="span" {...props} /> }} />
```

#### Implementation

The WithSlotRenderFunction type would be expanded to apply the render function support to the `as` prop:

```ts
type WithSlotRenderFunction<Props> = Props & {
  as?: (Props extends { as?: string } ? Props['as'] : never) | SlotRenderFunction<Props>;

  // Existing [deprecated] support for a render function on children:
  children?: (Props extends { children?: unknown } ? Props['children'] : never) | SlotRenderFunction<Props>;
};
```

The getSlot function would support `as` being a function:

```ts
if (typeof asProp === 'function') {
  const render = asProp as SlotRenderFunction<R[K]>;
  return [
    React.Fragment,
    {
      children: render(slot, propsWithoutAs),
    } as unknown as R[K],
  ];
}
```

All existing support for `children` as a render function would still be included, for backwards compatibility.

#### Pros

1. It allows us to pass the slot's default `children` to the render function, because it doesn't require overriding the default children. This fixes https://github.com/microsoft/fluentui/issues/27089.

   ```jsx
   <AccordionHeader
     button={{
       as: (Component, props) => (
         <Component {...props}>
           <div>extra child</div>
           {...props.children}
         </Component>
       ),
     }}
   />
   ```

2. It allows the component to use children as a function if it needs to, without interfering with the ability for the user to write a slot render function for the root slot:

   ```jsx
   <Field as={(_ignored, props) => <MyCustomRoot foo="bar" {...props} />}>
     {inputProps => (
       <div>
         <input {...inputProps} />
       </div>
     )}
   </Field>
   ```

#### Cons

1. It overloads the `as` prop, which may run into issues in implementation, if there are any other uses of `as` as a function.
   - One alternative would be to add a `render` prop instead, and leave the `as` prop unchanged.

```jsx
<Avatar badge={{ render: MyBadgeComponent, status: 'busy' }} />
```

## Appendix A: Change the order of arguments

As mentioned in the problem statement, the order of arguments to the render function could be swapped for improved ergonomics:

- Current: `(DefaultComponent, props)`
- Proposed: `(props, DefaultComponent)`

For example, before this RFC, a render function might look like:

```jsx
<Field
  label={{
    // Note the first argument being the component type, is being ignored here
    children: (_ignored: unknown, props: LabelProps) => (
      <InfoLabel {...props} info="Example info">
        Field with an info button
      </InfoLabel>
    ),
  }}
/>
```

With the proposal in this RFC, it would be:

```jsx
<Field
  label={{
    as: (props: LabelProps) => <InfoLabel {...props} info="Example info" />,
    children: 'Field with an info button',
  }}
/>
```

### Appendix B: Allowing React.Component for the as prop

A further refinement would be to allow `React.ComponentType<Props>` for the `as` prop. This would allow for swapping the component for a slot:

```jsx
<>
  <Button icon={{ as: SomeIcon }} />
  <Avatar badge={{ as: MyBadgeComponent, status: 'busy' }} />
</>
```

You can still pass in a string to the `as` prop, and it would work as it does today.

```jsx
<Checkbox label={{ as: 'span' }} /> // works the same as it does today: the label slot is rendered as a <span>
```

But now you could also use a component, which would effectively replace the component for the slot.

```jsx
<Checkbox label={{ as: MyLabel }} />
```

🤔 What if you want to provide a custom component to the slot _and_ override its `as` prop? Write a render function that adds your own `as` and spreads props:

```jsx
<Checkbox label={{ as: props => <MyLabel as="span" {...props} /> }} />
```

#### Implementation

The WithSlotRenderFunction type would be further expanded to allow a component for the `as` prop with `| React.ComponentType<Props>`:

```ts
type WithSlotRenderFunction<Props> = Props & {
  as?: (Props extends { as?: string } ? Props['as'] : never) | SlotRenderFunction<Props> | React.ComponentType<Props>;

  // Existing [deprecated] support for a render function on children:
  children?: (Props extends { children?: unknown } ? Props['children'] : never) | SlotRenderFunction<Props>;
};
```

The getSlot function would check if `as` was a component and render that:

```diff
if (typeof asProp === 'function') {
  // (as above)
}
else if (asProp && typeof asProp === 'object') {
  slot = asProp;
}
```
