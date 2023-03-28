# RFC: Use `as` instead of `children` for slot render function

Contributors: behowell

## Summary

This proposes modifying the slot render function API to pass a render function via the slot's `as` prop instead of the `children` prop. This has several benefits, the primary of which is that it allows the user to write a render function for a slot without overriding the default children of a slot.

This is a complementary proposal to bsunderhus's [RFC #27164: slot children render function support](https://github.com/microsoft/fluentui/pull/27164). It provides an alternative way to avoid having a render function override a slot's default `children` prop. This RFC has no dependencies on it, and could be adopted separately if needed.

## Background

Slots accept render functions that allow them to override the component and/or props used when rendering the slot. For more background, see https://react.fluentui.dev/?path=/docs/concepts-developer-customizing-components-with-slots--page#replacing-the-entire-slot

The render function is passed in as the slot's `children` prop.

## Problem statement

A few problems with render functions as they are today:

1. Using `children` as the render function will override any default children provided by the component's internals.
2. It is confusing that passing a render function as `children` would override the _whole slot_, and not just its children.
3. The root slot's render function conflicts the use of children as a function, which certain components use for custom rendering of their children.
   - For example, Tooltip and Field both accept a function as a child of their root, in order to pass props to the children. However, this breaks the ability to use a slot render function for the root slot of those controls.
   - See: https://react.fluentui.dev/?path=/docs/preview-components-field--default#complex-content-in-a-field

And a less important issue that's addressed in Appendix A of this proposal:

4. The order of the arguments is `(Component, props)`, but one of the primary use cases is to replace the given slot component with something else, in which case you ignore the first argument. You'd rarely/never(?) want to ignore the second argument `props`.

## Proposal

The core proposal in this RFC is to use the `as` prop as the render function instead of `children`.

```jsx
<>
  {/* Existing behavior: unintentionally overwrites default children of the button slot. */}
  <AccordionHeader button={{ children: (Component, props) => <Component {...props} /> }} />

  {/* New behavior, use 'as' instead, and `props` includes the slot's default `children`. */}
  <AccordionHeader button={{ as: (Component, props) => <Component {...props} /> }} />
</>
```

You can still pass in a string to the `as` prop (e.g. `as="a"` to render an `<a>` tag), and it would work as it does today:

- If the slot's type is an intrinsic element like `'button'`, it replaces that element with the given one.
- If the slot's type is a component like `Button`, it forwards the `as` prop to the component.

> 🤔 What if you want to provide a render function _and_ override the component's `as` prop? Write a render function that adds your own `as` and spreads props:
>
> ```jsx
> <Checkbox label={{ children: 'Label text', as: (_ignored, props) => <MyLabel as="span" {...props} /> }} />
> ```

### Pros

1. It allows us to pass the slot's default `children` to the render function, because it doesn't require overriding the default children.

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

### Cons

1. It overloads the `as` prop, which may run into issues in implementation, if there are any other uses of `as` as a function.
   - One alternative would be to add a `render` prop instead, and leave the `as` prop unchanged.
     ```jsx
     <Avatar badge={{ status: 'busy', render: (_ignored, props) => <MyBadgeComponent {...props} /> }} />
     ```

### Implementation

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

## Appendix A: Change the order of arguments

As mentioned in the problem statement, the order of arguments to the render function could be swapped for improved ergonomics:

- Current: `(DefaultComponent, props)`
- Proposed: `(props, DefaultComponent)`

This makes it simpler to write a render function that ignores and replaces the component, since it can simply omit the second argument.

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
