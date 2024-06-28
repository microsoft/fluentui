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

The last task is to add our new styling opinions. Pay special note to the location of `useDividerStyles`. We need to generate the base styles, but must add them _after_ merging the Nav specific styles such that the Nav styling opinions can 'win' and don't get overwritten by the base styles in the event of a collision as there is with `flexGrow`. The classes passed in from consumers via state will also be respected.

```
// useNavDividerStyles.ts
import { makeStyles, mergeClasses } from '@griffel/react';
import { useDividerStyles_unstable, type DividerSlots } from '@fluentui/react-divider';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { NavDividerState } from './NavDivider.types';

export const navDividerClassNames: SlotClassNames<DividerSlots> = {
  root: 'fui-NavDivider',
  wrapper: 'fui-NavDivider__wrapper', // This will need to be added to match the slots of the divider
};

const useStyles = makeStyles({
  root: {
    flexGrow: 0,
    marginTop: '4px',
    marginBottom: '4px',
  },
});

/**
 * Apply styling to the NavDivider slots based on the state
 */
export const useNavDividerStyles_unstable = (state: NavDividerState): NavDividerState => {
  'use no memo';

  const styles = useStyles();

  state.root.className = mergeClasses(navDividerClassNames.root, styles.root, state.root.className);
  state.wrapper.className = mergeClasses(navDividerClassNames.wrapper, state.wrapper.className);

  useDividerStyles_unstable(state);
  return state;
};
```

And that's it! You may need to update some snapshot tests and index files to handle how things have changed, but that's the basic pattern. 🍻
