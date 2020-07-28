# @fluentui/react-compose

Each Fluent UI React component is built from small building blocks, composed together in a way that is easy to customize and extend.

Components are comprised of:

- Default props
- State/accessibility hooks
- Styling hooks which provide class names for the parts of a component.
- Render function: function which consumes the final state and styling and returns markup.

The `compose` helper is a simple utility which lets us glue these parts together in a way that allows them to be easily extended.

## How compose works

Example usage:

```jsx
// compose a Foo component.
const Foo = compose(
  (state) => {
    return <foo/>;
  }, {
  // Component has a name.
  displayName: 'Foo',

  // Component manages some state, behaviors, styling.
  useHooks: [ (draftState) => newState | undefined ],

  // Component has some default props.
  defaultProps: { ... }
});
```

Compose handles these concerns:

1. draftState is created based on defaultProps and user input. Draft state allows you to directly manipulate a copy of the state without worrying about immutability mistakes or performance overhead of object spreading.
2. Each hook is executed with draft state.
3. Final state is passed to render function and result is returned.

Additionally it allows the result to be extended through an attached `extend` helper:

```jsx
const AnotherComponent = MyComponent.extend({
  useHooks: [ ...more hooks ],
  defaultProps: { ...new defaults }
})
```

The extend call creates a new component with new settings merged on top of the base settings. Doing this avoids extra wrapper component layers, while still reusing the component.

### But why is extend important?

Fluent UI components should have 2 separate layers; base components which are unstyled, and styled versions of those components. This gives developers 2 layers to use; use the styled component when building M365 experiences. Extend the unstyled component (e.g. `ButtonBase`) to use a different styling approach, or build a new, slightly augmented component extending the styled version (e.g. `Button`).

## Getting started writing components

### Write and review a spec

Know what you're building. Do the research on the following:

- What is the right component name? Consult guidance in Open UI.
- What props are accepted? Are there standards in Open UI
- What slots should be configurable?
- How does customized styling work?

### Build a base component

A base component defines the render dom heirarchy, state management, and accessible behaviors. It does not provide styling. It does not attach dependencies. These are done in a separate layer, so that customers can always fall back to extending the base, should they wish to provide their own styling or subcomponent dependencies.

Use `compose` to create the extendable base component. It takes in a render function and options:

```jsx
const MyComponentBase = compose<TProps, TState>(
  (state, options) => {
    return <div />;
  }, {
    displayName: 'MyComponentBase',
    // ...
  });
```

## Supporting component slots

The root element should always be configurable by the customer using the `as` prop.

Additionally components often have more than a root element; these additional subcomponents should be configurable by the customer as well. We customize these using slot props.

Use the `getSlots` helper to parse out `as` prop, slots and native props. By default, it will return a `root` slot for you.

```
const MyComponentBase = compose((state, options) => {
  const { slots, slotProps } = getSlots(state, options);

  return <slots.root {...slotProps.root} />;
}, {
  displayName: 'MyComponentBase',
  defaultProps: {
    as: 'div',
    icon: { as: FooComponent }
  }
]});
```

Add an `icon` slot:

```jsx
const MyComponentBase = compose(
  (state, options) => {
    const { slots, slotProps } = getSlots(state, options);

    return (
      <slots.root {...slotProps.root}>
        <slots.icon {...slotProps.icon} />
      </slots.root>
    );
  },
  {
    // Instruct merging on which props are shorthand.
    shorthandProps: ['icon'],

    defaultProps: {
      // Define the default props for the icon.
      icon: { as: 'span' },
    },
  },
);
```

Note: the `shorthandProps` array option is required for compose to apply shorthand normalization logic for proper default props merging. (Because a shorthand prop can be a string, object, or JSX, you need to apply custom merge logic for these.)

## Adding state hooks

The `compose` options can provide a `useHooks` array to provide a way for components to inject hooks to preprocess state after receiving user props and before rendering the component.

A draft state object will be created from userProps, allowing hooks to directly manipulate state without worrying about immutability and avoiding the overhead in recreating state objects.

![](https://i.imgur.com/cSiEAIV.png)

Example:

A hook which uses an interval to inject value:

```jsx
const useIncrementingValue = draftState => {
  const { step = 1 } = draftState; // get step from user.
  const setInterval = useSetInterval();
  const [value, setValue] = React.useState(0);

  setInterval(
    React.useCallback(() => {
      setValue(v => v + step);
    }, [step]),
    1000,
  );

  // Plumb the managed value into draft state.
  draftState.value = value;
};
```

Can be added to the base component:

```jsx
const MyComponentBase = compose(
  (state, options) => { ... },
  {
    useHooks: [
      useIncrementingValue
    ]
  }
});
```

Or as an example of extensibility, a user can also extend the component with the behavior without creating additional HOC layers:

```jsx
const MyComponent = MyComponentBase.extend({
  useHooks: [useIncrementingValue],
});
```

Some hooks should be created by a factory function so that inputs can be cached. For example, say the prop name and default incrementing step should be provided to a factory creating the hook. We use the `make` prefix to indicate a hook factory:

```jsx
const MyComponent = MyComponentBase.extend({
  useHooks: [makeIncrementingValue({ propName: 'value', step: 1 })],
});
```

## Create a styled component from the base

We use the `extend` static to create styled variations of the base component:

`MyComponent.scss`:

```scss
.root {
  background: red;
}
.icon {
  background: green;
}
```

`MyComponent.tsx`:

```jsx
import * as styles from './MyComponent.scss';
import { makeStyles } from '@fluentui/react-theme-provider';

const MyComponent = MyComponentBase.extend({
  useHooks: [
    // hook to inject stylesheet as needed
    makeStyles(styles),
  ],
});
```

The `makeStyles` helper injects styling on render as needed, in the correct window (respecting theme context.)

### Tokenizing the component

Tokens are simply css variables. They are replacement values in the stylesheet.

As users wish to customize the component, they will want to provide new tokens.

Your stylesheet needs to be adjusted respect the tokens:

```
.root {
  background: var(--MyComponent-background, red);
}
.root:hover {
  background: var(--MyComponent-hovered-background, pink);
}
```

The user could now apply these overrides inline:

```tsx
<MyComponent style={{ '--MyComponent-background': 'blue' }} />
```

This gives a lot of power to the user; they no longer have to guess selectors to override and can override complex things inline, but it is still a guessing game. There is no type safety.

To work through this, we want type safe tokens:

```jsx
<MyComponent tokens={{ background: 'blue', hoveredBackground: 'lightblue' }} />
```

There are a few helpers to make this easy:

> TODO

### Creating variants with tokens

Component styling is not static; you need modifiers and enum values to create variations of the component in different states.

Variants could be hardcoded in the styling, but they would not be easy to override in css due to specificity wars. We want variants to be easily overridable via the theme.

```jsx
export const MyComponentVariants = {
  base: {
    background: 'red',
  },
  primary: {
    background: 'green',
  },
};
```

```jsx
import * as styles from './MyComponent.scss';
import { makeStyles, makeVariants } from '@fluentui/react-theme-provider';

const MyComponent = MyComponentBase.extend({
  displayName: 'MyComponent',
  useHooks: [
    // hook to inject stylesheet as needed
    makeStyles(styles),
    // hook to inject style variants
    makeVariants(variants),
  ],
});
```

The makeVariants helper takes care of a lot of things for you so that you can't make a mistake:

- Creates class names for variants on demand, only when necessary
- Injects the correct classes to the root when matching state is provided
- Respects variants defined in the theme

```jsx
<MyComponent /> // red background
<MyComponent primary /> // green background

<ThemeProvider
  theme={{
  components: {
    MyComponent: {
      variants: {
        base: {
         background: 'yellow'
        }
      }
    }
  }
}}>
  <MyComponent /> // yellow background
</ThemeProvider>
```

### Processing inline tokens
