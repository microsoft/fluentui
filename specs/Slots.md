# Slots API specification

## Slots definition

Fluent UI components almost always contain sub parts and these pre-defined layouts can be configured via Slots API. Slots are named areas in a component that can receive props and provide styling and layout for them.

For example, `Button` component contains `content`, `loader` and `icon` slots in its layout:

```jsx
// ⚠️ not a real JSX/DOM markup
<root>
  <loader />
  <content />
  <icon />
</root>
```

Slots let define the complex layouts required by many components according to accessibility and design requirements automatically. Slots can be configured through props, which lets the caller pass in a variety of inputs for a given slot.

## Slots usage

There are several forms of values that can be provided, but all of them share one common thing - they will produce a proper layout inside a component.

### An object as a value

If you will pass an object to component props we will handle it as props for a slot, can be considered as declaring a JSX element with a javascript object. In an example below, props will be passed to an `icon` slot:

```jsx
<Button icon={{ children: <FooIcon />, id: '#button-icon' }} />
```

```html
<!-- ⚠ Simplified DOM output -->
<button class="ms-Button">
  <span class="ms-Button-icon" id="#button-icon">
    <span class="ms-Icon"><svg /></span>
  </span>
</button>
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

To disable slot rendering you can use falsy (`null`, `false`) values:

```jsx
// 💡 A loader slot will be hidden
<>
  <Button loading loader={null} />
  <Button loading loader={false} />
</>
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
