## Basic Recomposition

Fluent UI React V9 leans into recomposition as one of its primary methods of customization. That is, reassemble parts of components to inherit most behaviors but also change some. We will go through an example where we implemented this with the `NavDivider` component below:

1.  Change the default appearance prop to 'strong'
    - The default Divider appearance happens to be the same color as the NavDrawer
2.  Change some default styles
    - FlexGrow needs to be changed from 1 to 0
    - Add 4 pixels of top and bottom margin

Assuming you've [scaffolded out the component](https://github.com/microsoft/fluentui/blob/8a3aa5f6200012d58ed80a833d8690d77935a48b/docs/react-v9/contributing/command-cheat-sheet.md?plain=1#L8), the best place to start is in the type definition.
We want to inherit as much as we can from Divider, it simply becomes:

```
// NavDividerTypes.ts
import type { DividerProps, DividerState } from '@fluentui/react-divider';

// Remove the NavDivider slot type definition

/**
 * NavDivider Props
 */
export type NavDividerProps = DividerProps;

/**
 * State used in rendering NavDivider
 */
export type NavDividerState = DividerState;
```

We can also delete the `renderNavDivider.ts` file all together and update our wrapper component to call the base `renderDivider` function.

```
// NavDivider.tsx
import * as React from 'react';
import { useNavDivider_unstable } from './useNavDivider';
import { useNavDividerStyles_unstable } from './useNavDividerStyles.styles';
import { renderDivider_unstable } from '@fluentui/react-divider';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavDividerProps } from './NavDivider.types';

/**
 * NavDivider component
 */
export const NavDivider: ForwardRefComponent<NavDividerProps> = React.forwardRef((props, ref) => {
  const state = useNavDivider_unstable(props, ref);

  useNavDividerStyles_unstable(state);

  return renderDivider_unstable(state); // Rather than render*Nav*Divider
});

NavDivider.displayName = 'NavDivider';
```

Now that the scaffolding has been updated, lets assign our new prop opinions in the use hook. We can remove most of the boiler plate code because we're just going to call the base `useDivider` hook:

```
// useNavDivider.ts
import * as React from 'react';
import type { NavDividerProps, NavDividerState } from './NavDivider.types';
import { useDivider_unstable } from '@fluentui/react-divider';

/**
 * Create the state required to render NavDivider.
 *
 * The returned state can be modified with hooks such as useNavDividerStyles_unstable,
 * before being passed to renderNavDivider_unstable.
 *
 * @param props - props from this instance of NavDivider
 * @param ref - reference to root HTMLDivElement of NavDivider
 */
export const useNavDivider_unstable = (props: NavDividerProps, ref: React.Ref<HTMLElement>): NavDividerState => {
  return useDivider_unstable({ appearance: 'strong', ...props }, ref);
};
```

The last task is to add our new styling opinions.

This is where recomposition differs most from the pre-CSS-Modules era. Call order used to decide the
winner, so `useDividerStyles_unstable` had to run in a particular position relative to the Nav-specific
merge. It no longer does: class names are inert identifiers joined by `clsx`, and every property
collision — `flex-grow` here — is settled by the **cascade layer** the two rules live in.

NavDivider styles another component's output, which is exactly what `fui.components.l2` is for. Divider's
own rules are in `fui.components.l1`, so NavDivider's `l2` rules win without any ordering care, and a
consumer's unlayered `className` still beats both.

```css
/* NavDivider.module.css */
@reference '#theme';

@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;

/* l2 — this component is styling Divider's output, not its own base cascade. */
@layer fui.components.l2 {
  .root {
    flex-grow: 0;
    margin-top: 4px;
    margin-bottom: 4px;
  }
}
```

```tsx
// useNavDividerStyles.styles.ts
import { clsx } from 'clsx';
import { useDividerStyles_unstable } from '@fluentui/react-divider';
import type { NavDividerState } from './NavDivider.types';

import styles from './NavDivider.module.css';

/**
 * The component's public identity class — a named group marker. There is no handle for the
 * `wrapper` slot, or for any other internal: the BEM statics were removed, and the module's own
 * class names are hashed and not addressable from outside this file. Consumers reach internals
 * through the slot `className` props.
 */
export const navDividerClassNames: { root: string } = {
  root: 'group/fui-nav-divider',
};

/**
 * Apply styling to the NavDivider slots based on the state
 */
export const useNavDividerStyles_unstable = (state: NavDividerState): NavDividerState => {
  'use no memo';

  // Delegate to the base component first, then compose our own classes onto what it returned.
  // The hook returns new state rather than mutating the argument.
  const based = useDividerStyles_unstable(state);

  return {
    ...based,
    root: {
      ...based.root,
      // Unconditional module class first — the `group/fui-*` marker must never be classList[0].
      className: clsx(styles.root, 'group/fui-nav-divider', based.root.className),
    },
  };
};
```

Note what the argument order to `clsx` does and does not mean: it decides the order of tokens in the
rendered `class` attribute, and nothing else. `state.root.className` goes last by convention so the
attribute reads sensibly — not because the last argument wins.

And that's it! You may need to update some snapshot tests and index files to handle how things have changed, but that's the basic pattern. 🍻
