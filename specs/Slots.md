# Slots API specification

## Slots definition

Fluent UI components are often composed internally with different subparts to help with layouts. These pre-defined layouts can be configured via the Slots API. Slots are named areas in a component that can receive props for styling and layout.

For example, `Button` component contains `content`, `loader` and `icon` slots in its layout:

```jsx
// ⚠️ not a real JSX/DOM markup
<slots.root>
  <slots.loader />
  <slots.children />
  <slots.icon />
</slots.root>
```

Slots define the complex layouts required by many components according to accessibility and design requirements automatically. Slots can be configured through props, allowing the caller pass in a variety of inputs for a given slot.

## Slots components

Each slot is represented by a React component or a primitive, for example: `slots.loader` can be a `Loader` component and `slots.icon` can be a `span`:

```jsx
// ⚠️ not a real JSX/DOM markup
<>
  {/* renders a <button /> element */}
  <slots.root>
    {/* renders a <Loader /> element */}
    <slots.loader />
    {/* renders a <span /> element */}
    <slots.icon />
  </slots.root>
</>
```

Slots are rendered as `div` elements by default. However, all rendering aspects of a slot can be manually configured and overridden.

## Slots usage

Slots can be configured with different types and shapes of values, but result should not change - slots will produce a correct layout inside a component.

### An object as a value

This behavior can be considered as declaring a JSX element with a javascript object. In an example below, props will be passed to an `icon` slot:

```jsx
<Button icon={{ children: <FooIcon />, className: 'an-awesome-slot', id: '#button-icon' }} />
```

```html
<!-- 💡 Simplified DOM output -->
<button class="ms-Button">
  <!-- 👇 An additional class and id have been added to markup -->
  <span class="ms-Button-icon an-awesome-slot" id="#button-icon">
    <!-- 👇 An icon will be rendered inside a slot as it is passed as children -->
    <span class="ms-Icon"><svg /></span>
  </span>
</button>
```

Any props which are valid for a component can be passed to a slot, i.e. ARIA, `data-*` attributes and event handlers.

```jsx
<Button
  icon={{
    children: <FooIcon />,

    // ⚠ ARIA attributes should be tweaked carefully, they are used there only for example
    'aria-disabled': true,
    'data-test-id': 'button-foo-icon',

    onClick: () => {
      console.log('A click on an icon slot!');
    },
  }}
/>
```

```html
<!-- 💡 Simplified DOM output -->
<button class="ms-Button">
  <!-- 👇 Additional attributes will be passed to DOM -->
  <span class="ms-Button-icon" aria-disabled="true" data-test-id="button-foo-icon">
    <span class="ms-Icon"><svg /></span>
  </span>
</button>
```

Our components will prevent passing invalid props to DOM (check `getNativeElementProps()` for more details):

```jsx
<Button foo={true} icon={{ bar: true }} />
```

```html
<!-- 💡 Simplified DOM output -->
<button class="ms-Button">
  <span class="ms-Button-icon"></span>
</button>
```

### Primitives as a value

We consider JSX elements as primitive values that will be passed to a meaningful prop, by default to `children` (but this can be configured in the component's implementation):

```jsx
<>
  <Button icon={{ children: <FooIcon /> }} />
  {/* 💡 will produce the same JSX/HTML markup, as will be expanded to { children: <FooIcon /> } */}
  <Button icon={<FooIcon />} />
</>
```

Such usage of slots is called shorthands, similarly to [CSS shorthand properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties). The same behavior is applicable strings and numbers:

```jsx
<>
  <Button icon={{ children: 'text instead of icon' }} />
  {/* 💡 will produce the same JSX/HTML markup */}
  <Button icon="text instead of icon" />
</>
```

To disable slot rendering you can use `null` as a value:

```jsx
// 💡 A loader slot will be hidden
<Button loading loader={null} />
```

### Renders props via `children` function

Slots can be deeply customized without ignoring the original content by using `children` as a function that behave similarly to [Render Props pattern](https://reactjs.org/docs/render-props.html) in React:

```jsx
<Button
  icon={{
    // 💡 "Component" is an original element type for slot, for example, it can be a "span"
    //    "props" are defaults that are provided to a slot by a host component, for example, may contain "onClick"
    //    handler
    children: (Component, props) => (
      <div id="icon-wrapper">
        {/* 💡 "props" can be modified here to override component's behavior */}
        <Component {...props} id="icon-slot">
          <FooIcon />
        </Component>
      </div>
    ),
  }}
/>
```

```html
<!-- 💡 Simplified DOM output -->
<button class="ms-Button">
  <!-- 👇 An additional element was added to markup -->
  <div id="icon-wrapper">
    <span class="ms-Button-icon" id="icon-slot">
      <span class="ms-Icon"><svg /></span>
    </span>
  </div>
</button>
```

⚠️An important note is that `children` function replaces the whole slot, not its contents.

## Slot for collections

Besides slots for single (scalar) values, v0/Northstar also supports slots for collections (array of items in `Menu` component).

Converged components will **not** support slots for collections but will rather use Children API in these cases.
