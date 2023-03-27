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
2. The order of the arguments is `(Component, props)`, but one of the primary use cases is to replace the given slot component with something else, in which case you ignore the first argument. You'd rarely/never(?) want to ignore the second argument `props`.
   - This prevents using a Function Component as a render function.
3. It is confusing (IMO) that passing a render function as `children` would override the _whole slot_, and not just its children.
4. The root slot's render function conflicts the use of children as a function, which certain components use for custom rendering of their children.
   - For example, Tooltip and Field both accept a function as a child of their root, in order to pass props to the children. However, this breaks the ability to use a slot render function for the root slot of those controls.
   - See: https://react.fluentui.dev/?path=/docs/preview-components-field--default#complex-content-in-a-field

## Detailed Design or Proposal

This RFC proposes the following change to slot render functions.

- Use the `as` prop as the render function instead of `children`.
- Pass the arguments as `(props, Component)`.
  - This is not a requirement to fix the primary issue (1. above), but it has the benefits listed below.
  - It would not be possible to make this change in a backwards-compatible way unless the render function were moved to a different prop, which is why it's included in this RFC.

For example, before this RFC, a render function might look like:

```jsx
<Field
  label={{
    children: (_: unknown, props: LabelProps) => (
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

#### Pros

1. It allows us to pass the slot's default `children` to the render function, because it doesn't require overriding the default children. This fixes https://github.com/microsoft/fluentui/issues/27089.

   ```jsx
   <AccordionHeader
     button={{
       as: (props, Component) => (
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
   <Field as={props => <MyCustomRootElementForField foo="bar" {...props} />}>
     {inputProps => (
       <div>
         <input {...inputProps} />
       </div>
     )}
   </Field>
   ```

### Detailed implementation

This would introduce a new type

### Backwards compatibility

- `children` prop: In order to avoid making a breaking change, we can continue to support `children` as a deprecated way to use a render function, and keep the existing order of params `(Component, props)` when children is a render function.
- `as` prop: Since the `as` prop can only be a string so far today, we can preserve the existing behavior of a string `as`, and only introduce new behavior if `as` is a function.

### Pros and Cons

<!-- Enumerate the pros and cons of the proposal. Make sure to think about and be clear on the cons or drawbacks of this propsoal. If there are multiple proposals include this for each. -->

### Alternative proposal

I haven't fully vetted the idea of overloading the `as` prop to be used as a slot render function. One alternative would be to add a `render` prop instead, and leave the `as` prop unchanged.

```jsx
<Avatar badge={{ render: MyBadgeComponent, status: 'busy' }} />
```

### Appendix A: Allowing React.Component for the as prop

This is not a core part of the proposal, but a seemingly simple extension to this change would be to also allow a `React.Component` as the

It allows the use of a function component with the `as` prop. This works since props are the first argument to the function:

```jsx
<>
  <Button icon={{ as: SomeIcon }} />
  <Avatar badge={{ as: MyBadgeComponent, status: 'busy' }} />
</>
```

You can still pass in a string to the `as` prop, and it would work as it does today:

- If the slot is an intrinsic element like `<label>`, it replaces that element with the given one.
- If the slot is a component like `<Label>`, it forwards the `as` prop to the component.

```jsx
<Checkbox label={{ as: 'span' }} />
```

But now you could also use a function component, which would be treated as a render function for the slot:

```jsx
<Checkbox label={{ as: MyLabel }} />
```

🤔 What if you want to provide a custom component to the slot _and_ override its `as` prop? Write a render function that adds your own `as` and spreads props:

```jsx
<Checkbox label={{ as: props => <MyLabel as="a" {...props} /> }} />
```
