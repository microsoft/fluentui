A library of utilities for composing Fluent UI components.

## A basic component walkthrough

Building a re-composable component requires that we create building blocks; we put them together, but we can reconfigure
and add to parts as needed.

Here's what's needed:

- **State hook** - A hook which takes in props/ref for the component and returns a mutable state object.
- **Style hook** - hooks which can mix the appropriate classnames on the mutable state.
- **Render function** - a function which takes in state of the component and returns JSX. (e.g. `renderButton`)

With these building blocks, you can compose or recompose the component in numerous ways.

### Simple example

A hook which can produce mutable state of the component (defining accessibility and behaviors):

```jsx
const useButton = (userProps, ref, defaultProps) => {
  const state = _.merge({}, defaultProps, userProps);

  // Apply button behaviors.
  if (state.as !== 'button' && state.as !== 'a') {
    state.tabIndex = 0;
  }

  return state;
};
```

The Button is designed using `React.forwardRef` to ensure the ref is forwarded to the root element:

```jsx
const Button = React.forwardRef((props, ref) => {
  const state = useButton(props, ref);

  // Apply styling here. (e.g. add className to state.)

  return renderButton(state);
});
```

A button can now be easily scaffolded, along with your choice of styling system:

```jsx
import { renderButton, useButton, useButtonClasses } from '@fluentui/react-button';

const Button = React.forwardRef((props, ref) => {
  const state = useButton(props, ref);

  // Inject classNames as needed.
  useButtonClasses(state);

  // Return the rendered result.
  return renderButton(state);
});
```

We can now use these building blocks to scaffold other types of buttons. For example, building a toggle button simply
means we start with base and handle the additional input:

```jsx
const useToggleButton = (props, ref) => {
  const state = useButton(props, ref);

  // Hand a "checked" and "defaultChecked" state, onClicks to toggle the value,
  // and appropriate a11y attributes.
  useChecked(state);
};

const ToggleButton = React.forwardRef((props, ref) => {
  const state = useToggleButton(props, ref);

  // Inject classNames as needed.
  state.className = css(
    state.className,
    styles.root,
    state.checked && styles.checked
  );

  return renderButton(state);
```

### Details

#### Creating mutable state with `mergeProps`

In the previous example, `_.merge` was used to deep clone the props into a state object. Creating a single clone and
using that to construct state simplifies hook development and usage; rather than trying to re-clone objects
unnecessarily on every small mutation, hooks can assume operating against a draft state. This creates more self
contained hooks, which can ensure they apply state updates correctly, avoiding accidents like stomping on existing event
handlers by blind object assigning the results.

However, deep merge overlooks many edge cases for component props:

- Deep merging classnames should append them, not replace
- Deep merging JSX, ref objects, or arrays should replace, not recurse/clone
- Deep merging an object on a string should replace

...which introduces the first utility: `mergeProps`. Merge props works like a deep merge, but takes care of classnames,
JSX, arrays, and object edge cases.

#### Supporting the `as` prop with `getSlots`

Fluent UI components take a common `as` prop. This allows the root element to be rendered with something other than the
default.

To support the `as` prop, the render function might look like this:

```jsx
const renderButton = state => {
  const root = state.as;

  return <root {...state} />;
};
```

Additionally, you will need to filter out native properties which apply to the root; otherwise you will end up mixing
any unexpected props into the element. To do this, we have a `getNativeElementProps` helper, which can be used for this
purpose:

```jsx
const renderButton = state => {
  const root = state.as;
  const rootProps = getNativeElementProps(root, state);

  return <root {...rootProps} />;
};
```

These steps have been abstracted in the `getSlots` helper:

```jsx
const renderButton = state => {
  const { slots, slotProps } = getSlots(state);

  return <slots.root {...slotProps.root} />;
};
```

#### Supporting shorthand props

Fluent UI components almost always contain sub parts, and these sub parts should be configurable. We allow them to be
configured through "shorthand props", which lets the caller pass in a variety of inputs for a given slot. Take a
Button's "icon" slot:

```jsx
// The icon can be a string
<Button icon="X" />

// The icon can be JSX
<Button icon={ <FooIcon/> }/>

// The icon can be an object
<Button icon={{ as: 'i', children: getCode('Add') } } />

// The icon can be a children function (which receives the original slot and props)
<Button icon={{
  children: (Component, props) =>
      <>
         <Component {...props} />
         //  other things
      </>
   }}
/>
```

Supporting this dynamic props input requires some helpers:

1. A helper `resolveShorthandProps` to simplify the user's input into an object for props merging
2. The `getSlots` helper to parse the slots out

Here's how this looks:

The factory function, which deep clones the props, would need to simplify the shorthand first:

```jsx
const useButton = (userProps, ref, defaultProps) => {
  const state = mergeProps(
    {
      // default props
      as: 'button',
      ref,
      icon: { as: 'span' },
    },
    defaultProps, // optional default props from the caller
    resolveShorthandProps(userProps, ['icon']), // simplify the user's props
  );

  // Apply button behaviors.
  useButton(state);

  return { state, render };
};
```

...and the render function now can manage rendering the slot using getSlots:

```jsx
const renderButton = state => {
  const { slots, slotProps } = getSlots(state, ['icon']);

  return (
    <slots.root {...slotProps.root}>
      <slots.icon {...slotProps.icon} />
      {state.children}
    </slots.root>
  );
};
```

## API reference

### mergeProps(target, ...rest)

The `mergeProps` function takes in state and compose options, and resolves slots and slotProps.
It's expected that the component will call `mergeProps(state, options)` from within
render; after resolving state and before rendering slots and slotProps.

Example:

```jsx
mergeProps(props, { ...etc }, { ...etc });
```

### getSlots(state: Record<string, any>, slotNames: string[])

The `getSlots` function takes in a state object and a list of slot keys with the state, and returns
`slots` and `slotProps` to be used in rendering the component.

In cases where the `as` prop of the slot represents a primitive element tag name, there are some additional behaviors:

- Props will be automatically filtered based on the element type. E.g. `href` will be passed to `a` tag slots, but not
  `button` slots.
- The slot will avoid rendering completely if children are undefined. This is to avoid requiring nearly every slot to be
  wrapped in a conditional to avoid rendering the parent. You can force rendering primitives without children by passing
  `null` in for the children. (E.g. `{ as: 'input', children: null }`).

Example:

```jsx
const Button = props => {
  const { slots, slotProps } = getSlots(props, ['foo', 'bar']);

  return (
    <slots.root { slotProps.root}>
      <slots.foo { slotProps.foo } />
      <slots.bar { slotProps.foo } />
    </slots.root>
  );
};
```

### resolveShorthandProps<TState>(state: TState, slotNames: (keyof TState)[]): TState

Ensures that the given slots are represented using object syntax. This ensures that
the object can be merged along with other objects.

Example:

```jsx
const foo = resolveShorthandProps(
  { a: <JSX/>, b: 'string', c: { ... }, d: 'unchanged' },
  [ 'a', 'b', 'c' ]
);
```

Results in objects which can be merged correctly:

```jsx
{
  a: { children: <JSX/> },
  b: { children: 'string' },
  c: { ... },
  d: 'unchanged'
}
```
