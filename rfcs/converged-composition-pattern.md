## Summary

We use functions and hooks to author our components. This makes it possible to break our components down into their essence (state, style, a11y, and template.) This allows our consumers to add, remove, or modify any aspect of any component.

Currently, there are several patterns consumers need to guess at in order to compose a component. This RFC update will propose a pattern that normalizes usage of hooks for converged components.

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

First we calculate the `state` for a component then we add styles and render it. Button example:

```tsx
export const Component: ForwardRefComponent<ComponentProps> = React.forwardRef((props, ref) => {
  const state = useComponent(props, ref);

  useComponentStyles(state);

  return renderComponent(state);
}) as ForwardRefComponent<ButtonProps>;
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

Since the pattern is consistent, there is no way for the consumer to know what they need to import to create a component.
They will need to consult the docs for each component.

### 3. `useFoo` is not usable on its own

The name implies I am using the full component, yet, without styles it is not truly unusable.

It is also not intuitive as to why the `state` calculated by `useFoo` includes all props, but the `className` prop is handled separately in `useFooStyles`. Especially since there are other calls inside `useFoo` for resolving shorthand, calculating aria, and adding event listeners.

### 4. Not learn-once

Ideally, the overall story for our composition would be learn-once-apply-everywhere. Currently, many implementations have just a small difference from others.

## Proposed Solution

Prioritizing a learn-once approach and simplification, we can consider this API:

```tsx
const [state, render] = useComponent();

// modify state

return render(state);
```

Problems solved:

1. **Inconsistent** - All components will have the same API since all components have `state` and `render`.
2. **Complex Imports** - There is one import per component, named `useComponent`, opposed to 3-4 imports.
3. **useFoo not usable** - "Using" a component returns a fully usable yet customizable component API.
4. **Not learn-once** - Since this is consistent, and abstracts over all components, it is learn-once-apply-everywhere.

### How is `useComponent` implemented?

```tsx
export const Component: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  const { state, render } = useButton(props, ref);

  return render(state);
}) as ForwardRefComponent<ButtonProps>;
```

The `useComponent` function would call all other state functions and return the state and the renderer:

`useComponent`

- `useComponentState`
- `useComponentStyle`
- `useComponentARIA`
- return `[state, renderCompoonent]`

## FAQ

### How to update `state` before styles are calculated?

If there is a use case where the consumer needs to get in between the state hooks, they can drop down a level and compose each hook together individually.
