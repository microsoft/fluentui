# RFC: Use `as` instead of `children` for slot render function

Contributors: behowell

RFC Issue: https://github.com/microsoft/fluentui/pull/27353

## Summary

This proposes modifying the slot render function API to pass a render function via the slot's `as` prop instead of the `children` prop. This has several benefits, the primary of which is that it allows the user to write a render function for a slot without overriding the default children of a slot.

This is a complementary proposal to bsunderhus's [RFC #27164: slot children render function support](https://github.com/microsoft/fluentui/pull/27164). It provides an alternative way to avoid having a render function override a slot's default `children` prop. This RFC has no dependencies on it, and could be adopted separately if needed.

## Background

Slots accept render functions that allow them to override the component and/or props used when rendering the slot. For more background, see https://react.fluentui.dev/?path=/docs/concepts-developer-customizing-components-with-slots--page#replacing-the-entire-slot

The render function is passed in as the slot's `children` prop.

## Problem statement

This RFC seeks to solve some problems with render functions as they are today.

> ℹ️ NOTE: [RFC #27164: slot children render function support](https://github.com/microsoft/fluentui/pull/27164) solves _additional_ problems with slot render functions beyond what's listed here. The two RFCs complement each other; but don't solve all of the same issues.

1. Using `children` as the render function will override any default children provided by the component's internals. (This is listed as Problem 1 in [RFC #27164](https://github.com/microsoft/fluentui/pull/27164)).
2. The root slot's render function conflicts with the use of children as a render-props function.

   - For example, `Field`'s children can be a render function that is given props to spread on the child:
     ```jsx
     // Field uses a custom render-props style function as its children
     <Field>{props => <Input {...props} />}</Field>
     ```
   - However, that now makes it impossible to add a render function that _replaces_ the root slot, which would typically be done as:
     ```jsx
     // Label doesn't override the root slot's render function
     <Label>{(Component, props) => <MyLabelComponent {...props} />}</Label>
     ```
     See the Pros section (number 2) for an example of how this RFC enables a render function for the root slot.

3. It is confusing (IMO) that passing a render function as `children` would override the _whole slot_, and not just its children.

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

1. 👍 Allows us to pass the slot's default `children` to the render function, because it doesn't require overriding the default children.

   ```jsx
   <AvatarGroup
     overflowLabel={{
       as: (Component, props) => (
         <Component {...props}>
           {...props.children}
           <span>extra text</span>
         </Component>
       ),
     }}
   />
   ```

2. 👍 Allows the component to use children as a function if it needs to, without interfering with the ability for the user to write a slot render function for the root slot:

   ```jsx
   <Field as={(_, props) => <MyCustomRoot foo="bar" {...props} />}>
     {inputProps => (
       <div>
         <input {...inputProps} />
       </div>
     )}
   </Field>
   ```

3. 👍 The slot's `children` prop is no longer "special": it's treated the same as any other prop. This reduces the slot API to a single "special" prop: `as`.

4. 👍 Opinion: it's easier to understand the API. The `as` prop implies that the render function is rendering the whole slot. Whereas `children` implies that it's rendering just the children, which is not the case.

### Cons

1. 👎 Overloads the `as` prop, which may run into issues in implementation, if there are any other uses of `as` as a function. See "Appendix B" for an alternative proposal that uses a prop `render` instead of `as`.

2. 👎 Requires maintaining the deprecated codepath of supporting `children` as a render function until the next major release. This includes:
   - Types: `children` prop in the slot type definitions
   - Code: Handling the case where `children` is a render function in `getSlots`.

### Implementation

The `WithSlotRenderFunction` type would be expanded to apply the render function support to the `as` prop:

```ts
type WithSlotRenderFunction<Props> = Props & {
  as?: (Props extends { as?: string } ? Props['as'] : never) | SlotRenderFunction<Props>;

  // Existing [deprecated] support for a render function on children:
  children?: (Props extends { children?: unknown } ? Props['children'] : never) | SlotRenderFunction<Props>;
};
```

The `getSlot` function would support `as` being a function:

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

### Adoption Plan

A render function on the `as` prop is a new feature, and does not require any changes to existing code. We can add this feature without needing to change existing uses of `children` as a render function.

We will continue to support `children` as a render function, with a `console.warning` about deprecation. It will be removed in the next major release.

## Appendix A: [REJECTED] Change the order of arguments

> ❌ This Appendix was rejected due to the possibility of accidentally passing a FunctionComponent as the render function (which could break the rules of hooks).

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

## Appendix B: `render` prop instead of `as`

If we wanted to keep the `as` prop scoped to just the DOM element that a slot is rendered as, we could optionally add a new special prop `render`, which has a single purpose of being the render function.

If we do choose to go with a `render` prop, then I'd propse following the argument order from Appendix A: `(props, DefaultComponent)`. It would have the benefits listed in Appendix A, with a lower likelihood that someone would pass in a FunctionComponent by mistake, because the prop is named `render`.

### Pros

1. Doesn't overload the `as` prop with multiple purposes.

### Cons

1. Adds another "special" prop into the slots API.
2. If a slot's component itself has a `render` prop, then this will hide that prop.
