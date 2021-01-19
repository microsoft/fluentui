# Slots API specification

Fluent UI components almost always contain sub parts and these pre-defined layouts can be configured via Slots API. Slots are named areas in a component that can receive props and provide styling and layout for them.

## Slots definition

For example, `Button` component contains `content`, `loader` and `icon` slots in its layout:

```jsx
<root>
  <loader />
  <content />
  <icon />
</root>
```

## Slots usage

Slots can be configured through props, which lets the caller pass in a variety of inputs for a given slot. There are several forms of values that can be provided, but all of them share one common thing - they will produce a proper JSX layout inside a component.

### An object as a value

If you will pass an object to component props we will handle it as props for a slot. In an example below, props will be passed to an `icon` slot:

```jsx
<Button icon={{ children: <FooIcon />, id: '#button-icon' }} />
```

### Primitives as a value

We consider JSX elements, strings and numbers as primitive values that will be passed to a meaningful prop, usually to `children`:

```jsx
<>
  <Button icon={<FooIcon />} />
  {/* 💡 has identical effect to the previous one */}
  <Button icon={{ children: <FooIcon /> }} />
</>
```

To disable slot rendering you can use falsy values:

```jsx
// 💡 A loader slot will be hidden
<Button loading loader={null} />
```

### Children function

Slots can be deeply customized via `children` function that behave similarly to [Render Props](https://reactjs.org/docs/render-props.html):

```jsx
<Button
  icon={{
    // - Component is an original element type for slot
    // - props are defaults that are provided to a slot
    children: (Component, props) => (
      <div>
        <Component {...props} />
      </div>
    ),
  }}
/>
```
