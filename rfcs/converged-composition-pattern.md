## Summary

We use functions and hooks to author our components. This makes it possible to break our components down into their essence (state, style, a11y, and template.) This allows our consumers to add, remove, or modify any aspect of any component.

Currently, there are several patterns consumers need to guess at in order to compose a component. This RFC update will propose a pattern that normalizes usage of hooks for converged components.

#### Goals

- Simplify component composition
- Make upgrades more manageable
- Easily customize state and/or style
- Start simple, iterate based on user needs

#### Out of scope:

- Remove styling hook (we can ship an unstyled package)
- Remove a single part of state creation, like aria props

## Current Capabilities

Maybe you want to:

- remove an `aria-*` prop or add a `className`
- change what icon component is rendered within an accordion
- replace our CSS in JS for something else
- reorder the render template or wrap a specific element with something else

You can do any one of these things **_without losing the functionality_** of any other part of the component. If you remove the CSS in JS functionality, you still get the state, a11y, and template for free.

We've separated the logic of these concerns into discrete functions internally and wired them together with a single state interface.

<details>
<summary>Why? (Historical Problem)</summary>

React popularized the idea of UI is a function of state:

```jsx
UI = F(S);
```

In component driven development, the unit of `UI` is a Component `C`:

```jsx
C = F(S);
```

In idiomatic React, a Component is a blackbox that receives `props` and returns JSX. Props are great for selecting one of the foreseen and supported usage patterns offered by the component.

What happens when your consumer needs to:

- alter `F` in some way beyond what the `props` offer?
- remove some functionality or weight from the component?

They are forced to rewrite `F` to implement the `C` they need. This is highly undesirable as they likely only _need_ to change some small percentage of the underlying code.

In the real world, these functions can be quite complex and even have legal ramifications (as in the case of accessible UI) if not done correctly.
The consumer almost never needs to rewrite the entire `F`, they just need to add, remove, or modify a single aspect of the `C`s essence.

The reason the consumer must rewrite the entire `F` is because it is not modular. It is monolithic.

</details>

<details>
<summary>How? (Conceptual Solution)</summary>

A simple and powerful idea :lightbulb:, break `F` into modular state modifications.

Modularizing component functionality means parts of the component logic can be altered, added, or removed while preserving the rest of the component's logic.

What is `F` actually calculating?

- State
- Style
- A11y (Keyboard handling and ARIA)
- Template

These concerns are identified by looking at the purpose of each line of code in a component. These are also the areas that a consumer may likely want to tweak. It would be ideal to allow tweaking of any one concern without affecting the others.

This is possible if components:

1. Introduce a state interface contract
2. Allow this state to define all data for rendering a component
3. Encapsulate all logic into functions for each concern
</details>

## Current Implementation

First we calculate the `state` for a component then we add styles and render it.

```tsx
export const Component: ForwardRefComponent<ComponentProps> = React.forwardRef((props, ref) => {
  const state = useComponent(props, ref);

  useComponentStyles(state);

  return renderComponent(state);
});
```

Some render functions take an additional context values parameter.
See the [context-values RFC](https://github.com/microsoft/fluentui/blob/master/rfcs/convergence/context-values.md)
for background.

```ts
export const renderComponent =
  (state: ComponentState, contextValues: ComponentContextValues) => { ... }
```

The component must acquire the context values and pass it to the render function.

```tsx
export const Component: ForwardRefComponent<ComponentProps> = React.forwardRef((props, ref) => {
  const state = useComponent(props, ref);
  const contextValues = useComponentContextValues(state);

  useComponentStyles(state);

  return renderComponent(state, contextValues);
});
```

## Current Problems

There are several areas for potential improvement with the current approach.

### 1. Inconsistent implementation

Not all components use this pattern of `useFoo` > `useFooStyles` > `renderFoo`:

| Component | useFoo | useFooContextValues | useFooStyles | renderFoo |
| --------- | :----: | :-----------------: | :----------: | :-------: |
| Accordion |   ✅   |         ✅          |      ✅      |    ✅     |
| Menu      |   ✅   |         ✅          |      ❌      |    ✅     |
| Button    |   ✅   |         ❌          |      ✅      |    ✅     |
| Popover   |   ✅   |         ❌          |      ❌      |    ✅     |

We do see all components have `state` and `render`. However, `styles` and/or `context` are sometimes added or omitted. Knowing which components use which pattern is not clear or documented.

### 2. Complex imports

Each `use*` function must be imported separately and assembled in the proper order. This makes a confusing user experience trying to recompose your own components.

```tsx
import { useFoo, useFooStyles, useFooContextValues, renderFoo } from '@fluentui/react-components';
```

Since the pattern is inconsistent, there is no way for the consumer to know what they need to import to create a component.
They will need to consult the docs for each component.

### 3. `useFoo` is not usable on its own

The name implies I am using the full component, yet, without styles it is not truly unusable.

It is also not intuitive as to why the `state` calculated by `useFoo` includes all props, but the `className` prop is handled separately in `useFooStyles`. Especially since there are other calls inside `useFoo` for resolving shorthand, calculating aria, and adding event listeners.

### 4. Components should not be aware of context values

It is an unnecessary burden to require the caller to get the context values back just to pass it to render.
Context values are not designed to be modified between useComponent and render.
If the caller does need to modify them, it should be done where the values are set on React context, not where
the values are consumed.

Since not all components will use context values. Conditionally returning context values from useComponent would re-introduce inconsistency.

### 5. Not learn-once

Ideally, the overall story for our composition would be learn-once-apply-everywhere. Currently, many implementations have just a small difference from others.

## Proposed Solution

Prioritizing a learn-once approach and simplification, we can consider this API:

```tsx
const [state, render, context] = useComponent(props, ref);

// modify state

return render(state, context);
```

### useComponent implementation

The useComponent is implemented by sequencing individual hooks to build up state and then returning the state and render function.

```tsx
export const useComponent = (
  props: ComponentProps,
  ref: React.Ref<HTMLButtonElement>,
): [ComponentState, RenderComponent] => {
  const state = useComponentState(props);
  const contextValues = useComponentContextValues(state);
  useComponentARIA(state, props, ref);
  useComponentStyles(state);

  return [state, renderComponent, contextValues];
};
```

## Use case examples

### Customizing styles

Outside the composition pattern, styles can be customized with the className property available on each component.
This supports the most common cases of customization, but does not handle customizations based on state.

```tsx
const useCustomStyles = makeStyles({
  root: theme => ({
    // custom CSS here
  }),
});

const customStyles = useCustomStyles();

<Component className={customStyles.root} />;
```

Styles changes made based on state can be done between the useComponent and render calls.

```tsx
const useCustomStyles = makeStyles({
  root: theme => ({
    // custom CSS here
  }),
});
export const Component: ForwardRefComponent<ComponentProps> = React.forwardRef((props, ref) => {
  const [state, render] = useComponent(props, ref);

  const customStyles = useCustomStyles();

  // apply custom styles
  // passing the existing class name first allows layering customStyles on top of those set by useComponent.
  // to replace styles with custom styles, omit state.root.className from the mergeClasses call.
  state.root.className = mergeClasses(state.root.className, customStyles.root);

  return render(state);
});
```

### Customizing props

Prop changes can be done before the call to useComponent.

```tsx
export const Component: ForwardRefComponent<ComponentProps> = React.forwardRef((props, ref) => {
  const { removeProp, ...rest } = props;

  const updatedProps = {
    ...rest,
    addedProp: 'some value',
    replacedProp: 'some value',
  };

  const [state, render] = useComponent(props, ref);
  return render(state);
});
```

### Customizing slot components

Slot components are in state and resolved as part of the render implmentation (through a call to getSlots).
This means they can be changed between useComponent and render.

```tsx
export const Component: ForwardRefComponent<ComponentProps> = React.forwardRef((props, ref) => {
  const [state, render] = useComponent(props, ref);

  // the default element type for a slot can be replaced
  state.components.icon = 'div';

  // alternatively, the entire slot can also be replace
  state.icon = resolveShorthand(state.components.icon, { required: true });

  // apply custom styles
  // passing the existing class name first allows layering customStyles on top of those set by useComponent.
  // to replace styles with custom styles, omit state.root.className from the mergeClasses call.
  state.root.className = mergeClasses(state.root.className, customStyles.root);

  return render(state);
});
```

### Customizing render template

The call to the render method can be replaced to change the template.

```tsx
const customRender = (state: ComponentState) => {
  const { slots, slotProps } = getSlots<ComponentSlots>(state, ['root', 'icon']);

  // Assume the icon normally renders before the children
  // This custom render would put the icon after the children
  return (
    <slots.root {...slotProps.root}>
      {state.root.children}
      <slots.icon {...slotProps.icon} />
    </slots.root>
  );
};

export const Component: ForwardRefComponent<ComponentProps> = React.forwardRef((props, ref) => {
  const [state] = useComponent(props, ref);
  return customRender(state);
});
```

Sometimes a component uses `context` which requires passing it along to the `Provider`.

```tsx
const customRender = (state: ComponentState, context: ComponentContext) => {
  const { slots, slotProps } = getSlots<ComponentSlots>(state, ['root', 'icon']);

  // Assume the icon normally renders before the children
  // This custom render would put the icon after the children
  return (
    <slots.root {...slotProps.root}>
      <ComponentContext.Provider value={context}>
        {state.root.children}
        <slots.icon {...slotProps.icon} />
      </ComponentContext.Provider>
    </slots.root>
  );
};

export const Component: ForwardRefComponent<ComponentProps> = React.forwardRef((props, ref) => {
  const [state, unusedRender, context] = useComponent(props, ref);
  return customRender(state, context);
});
```

### Modifying order and injecting hooks

The useComponent call can be replaced with calls to individual hooks to get between hooks within useComponent. This should generally be done by writing a new hook similar to useComponent.

> **TODO** Need to find a case where this is absolutely required because the state cannot be modified post useComponent,
> the dev effort is impractical, or it causes a performance problem.

```tsx
export const useCustomComponent = (
  props: ComponentProps,
  ref: React.Ref<HTMLButtonElement>,
): [ComponentState, RenderComponent] => {
  const state = useComponentState(props);
  useComponentARIA(state, props, ref);

  // modify state between props->state and styles
  state.iconOnly = true;

  useComponentStyles(state);

  return [state, renderComponent];
};

export const Component: ForwardRefComponent<ComponentProps> = React.forwardRef((props, ref) => {
  const [state, render] = useCustomComponent(props, ref);
  return render(state);
});
```

### Implementing ToggleButton

Fluent UI React provides a `ToggleButton`, however, for extensibility reasons includes more code than a consumer implementation would. This implementation shows how a consumer would create a toggle button using the proposed pattern. There is a working implementation in the storybook as well.

```jsx
import * as React from 'react';
import type { ButtonProps } from './Button.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useButton } from '@fluentui/react-button';
import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  isActive: {
    /* ... */
  },
});

export const MyToggleButton: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  const [isActive, setIsActive] = React.useState(false);
  const [state, render] = useButton(props, ref);
  const classes = useStyles();

  // add toggle handler
  const originalOnClick = state.root.onClick;
  state.root.onClick = React.useCallback(
    e => {
      setIsActive(!isActive);
      if (originalOnClick) {
        originalOnClick(e);
      }
    },
    [isActive, originalOnClick],
  );

  // add toggle classes
  state.root.className = mergeClasses(state.root.className, isActive && classes.isActive);

  return render(state);
});
```

## Pros & Cons

✅ **Consistency**
All components will have the same API since all components have `state` and `render`.

✅ **Simplified Imports**
There is one import per component, named `useComponent`, opposed to 3-4 imports.

✅ **useFoo not usable**
"Using" a component returns a fully usable yet customizable component API.

✅ **Learn-once**
Since this is consistent, and abstracts over all components, it is learn-once-apply-everywhere.

❌ **Limits hook tree-shaking**
A single useComponent doesn't allow tree shaking out other hooks, like useComponentStyles. However, we can ship a style-less package if needed.

❌ **Increased exported API surface**
Increases API surface by abstracting over other hooks with useComponent.

## Discarded Solutions

### Encapsulating context

The useComponent method should curry the render function to encapsulate knowledge of context within the hook

```ts
return [state, state => renderComponent(state, contextValues)];
```

### Expose individual hooks

The proposed solution removes the ability to get between individual hooks, like state and styles. One alternative is to expose the hooks for modification without exporting them:

```jsx
const [state, render] = useButton(props, ref, {
  styles: (hook, args) => {},
  state: (hook, args) => {},
  aria: (hook, args) => {
    // before
    hook(args);
    // after
  },
  context: (hook, args) => {},
});
```

#### Pros & Cons:

- ✅ Upgrade problem goes away, we still control number of hooks and order
- ✅ User can still add/remove/replace before/after any hook
- ✅ User doesn't need to "wire" the hooks together
- ❌ Not tree shakable if user wants to remove hook, can only skip functionality
- ❌ More objects in memory
- ❓ Anonymous functions?

### Unstyled Package

The style hook is likely the only hook a partner would potentially want to remove from the bundle. We could/should ship an unstyled version of our components if that need arises. Else, the consumer needs to rewrite the entire library with hooks, just omitting the style hook.
