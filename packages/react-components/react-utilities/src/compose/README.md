A library of utilities for composing Fluent UI components.

## A basic component walkthrough

Building a re-composable component requires that we create building blocks; we put them together, but we can reconfigure
and add to parts as needed.

Here's what's needed:

- **State hook** - A hook which takes in props/ref for the component and returns a mutable state object.
- **Style hook** - hooks which can mix the appropriate classnames on the mutable state.
- **Context values hook** _(optional)_ - hooks that creates values for `.Provider` components in [React Context](https://reactjs.org/docs/context.html)
- **Render function** - a function which takes in state of the component and returns JSX. (e.g. `renderButton_unstable`)

With these building blocks, you can compose or recompose the component in numerous ways.

### Simple example

A hook which can produce mutable state of the component (defining accessibility and behaviors):

```jsx
const useButton_unstable = (props, ref) => {
  const state = {
    // Default props
    role: 'button',
    // User props
    ...props,
    // Overrides
    ref,
  };

  // Apply button behaviors.
  if (state.as !== 'button' && state.as !== 'a') {
    state.tabIndex = 0;
  }

  return state;
};
```

The `Button` is designed using `React.forwardRef` to ensure the ref is forwarded to the root element:

```jsx
const Button = React.forwardRef((props, ref) => {
  const state = useButton_unstable(props, ref);

  // Apply styling here. (e.g. add className to state.)

  return renderButton_unstable(state);
});
```

A button can now be easily scaffolded, along with your choice of styling system:

```jsx
import { renderButton_unstable, useButton_unstable, useButtonClasses } from '@fluentui/react-button';

const Button = React.forwardRef((props, ref) => {
  const state = useButton_unstable(props, ref);

  // Inject classNames as needed.
  useButtonStyles_unstable(state);

  // Return the rendered result.
  return renderButton_unstable(state);
});
```

We can now use these building blocks to scaffold other types of buttons. For example, building a toggle button simply
means we start with base and handle the additional input:

```jsx
const useToggleButton_unstable = (props, ref) => {
  const state = useButton_unstable(props, ref);

  // Hand a "checked" and "defaultChecked" state, onClicks to toggle the value,
  // and appropriate a11y attributes.
  useChecked(state);
};

const ToggleButton = React.forwardRef((props, ref) => {
  const state = useToggleButton_unstable(props, ref);

  // Inject classNames as needed.
  state.className = mergeClasses(state.className, styles.root, state.checked && styles.checked);

  return renderButton_unstable(state);
});
```

### Details

#### Supporting shorthand props

Fluent UI components almost always contain sub parts, and these sub parts should be configurable. We allow them to be
configured through "shorthand props", which lets the caller pass in a variety of inputs for a given slot. Take a
`Button`'s "icon" slot:

```jsx
<>
  {/* The icon can be a string */}
  <Button icon="X" />
  {/* The icon can be JSX */}
  <Button icon={<FooIcon />} />
  {/* The icon can be an object */}
  <Button icon={{ as: 'i', children: getCode('Add') }} />
  {/* The icon can be a children function (which receives the original slot and props)  */}
  <Button
    icon={{
      children: (Component, props) => (
        <>
          <Component {...props} />
          {/* other things */}
        </>
      ),
    }}
  />
</>
```

Supporting this dynamic props input requires some helpers:

1. A helper `resolveShorthand` to simplify the user's input into an object for props merging
2. The `getSlots` helper to parse the slots out

Here's how this looks:

The factory function, which deep clones the props, would need to simplify the shorthand first:

```jsx
const useButton_unstable = (props, ref) => {
  const state = {
    // Default props
    as: 'button',
    // User props
    ...props,
    // Overrides
    ref,
    icon: resolveShorthand(props.icon, { as: 'span' }),
  };

  // Apply button behaviors.
  useButton_unstable(state);

  return { state, render };
};
```

...and the render function now can manage rendering the slot using getSlots:

```jsx
const renderButton_unstable = state => {
  const { slots, slotProps } = getSlots(state, ['icon']);

  return (
    <slots.root {...slotProps.root}>
      <slots.icon {...slotProps.icon} />
      {state.children}
    </slots.root>
  );
};
```

#### Memoization of context values

There are cases when we need to pass some `props` or parts of `state` to child components, for this purpose we are using [React Context](https://reactjs.org/docs/context.html). To avoid unnecessary updates during components re-renders we are using either [context selector approach](https://github.com/dai-shi/use-context-selector) or [memoizing context value](https://reactjs.org/docs/context.html#contextprovider).

```tsx
// ⚠ not real code, an example of memoization approach

function Button(props) {
  const { inline, size } = state;
  const value = React.useMemo(() => ({ inline, open }), [inline, open]);

  // consumers of "SampleContext" will be notified only when "value" changes
  return <SampleContext.Provider value={value} />;
}
```

We propose to create a separate hook to handle this scenario and pass its result to a render function:

```tsx
function Button(props) {
  const state = useButtonState();
  const contextValues = useButtonContextValues();

  return renderButton_unstable(state, contextValues);
}

function useButtonContextValues(state) {
  const { foo } = state;
  const sample = React.useMemo(() => ({ foo }), [foo]);

  return { sample };
}

function renderButton_unstable(state, contextValues) {
  return <SampleContext.Provider value={contextValues.sample} />;
}
```

_See [RFC: Context values](../../../../rfcs/convergence/context-values.md) for details._

### Usage of context selectors

There are multiple cases when usage of [context selectors approach](https://github.com/dai-shi/use-context-selector) is
preferable.

#### list-like component scenario

A parent component handles state and it contains an "id" of active item, children components should be updated only
when they should.

```ts
// ❌ Will produce a re-renders always when a context value changes for *every* item
const open = React.useContext(ListContext).activeId === props.id;
// ✅ Will produce a re-render only when a result of selector changes for this item
const open = useContextSelector(ListContext, context => context.activeId === props.id);
```

#### trigger-like component scenario

A parent component handles state and it passes down properties for `trigger` and some other components, as these
properties are independent from each they ideally should have separate conditions for update.

```ts
// ❌ Will produce a re-renders always when a context value changes for subscriber
const open = React.useContext(MenuContext).open;
// ✅ Will produce a re-render only when a result of selector changes for this component
const open = useContextSelector(ListContext, context => context.open);
```

_This could be also solved via multiple React contexts: a separate one for `trigger` and a separate for other components._

Memoization of context values is not required with context selectors, but it still recommended to follow `useContext*Values()` pattern:

```tsx
function Menu(props) {
  const state = useMenuState();
  const contextValues = useMenuContextValues_unstable();

  return renderButton_unstable(state, contextValues);
}

function useMenuContextValues_unstable(state) {
  const { foo } = state;
  // Memoization of context values is not required with context selectors
  const sample = { foo };

  return { sample };
}

function renderMenu_unstable(state, contextValues) {
  return <SampleContext.Provider value={contextValues.sample} />;
}
```

## API reference

### getSlots(state: Record<string, any>, slotNames: string[])

The `getSlots` function takes in a state object and a list of slot keys with the state, and returns
`slots` and `slotProps` to be used in rendering the component.

Example:

```jsx
const Button = props => {
  const { slots, slotProps } = getSlots(props, ['foo', 'bar']);

  return (
    <slots.root {...slotProps.root}>
      <slots.foo {...slotProps.foo} />
      <slots.bar {...slotProps.foo} />
    </slots.root>
  );
};
```

### resolveShorthand<Props>(value: ShorthandProps<Props>, defaultProps?: Props): ComponentSlotProps<Props>

Ensures that the given slots are represented using object syntax. This ensures that
the object can be merged along with other objects.

Example:

```jsx
const icon = resolveShorthandProps(<span />); // ➡ { chidlren: <span /> }
const button = resolveShorthandProps('Hello world!'); // ➡ { children: 'Hello world!' }
const image = resolveShorthandProps({ src: './image.jpg' }); // ➡ { src: './image.jpg' }
```
