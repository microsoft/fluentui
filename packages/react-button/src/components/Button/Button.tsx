import * as React from 'react';
import { useButton } from './useButton';
import type { ButtonProps } from './Button.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Buttons give people a way to trigger an action.
 */
export const Button: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  const [state, render] = useButton(props, ref);

  return render(state);
  // Casting is required due to lack of distributive union to support unions on @types/react
}) as ForwardRefComponent<ButtonProps>;

Button.displayName = 'Button';

/**
TODO: add possible alternative for individual hook exposure
Pros:
Upgrade problem goes away, we still control number of hooks and order
User can still add/remove/replace before/after any hook

Cons:
Not tree shakable if user wants to remove hook, only can remove functionality
More objects in memory, are we also suggesting anon fns?

Unstyled Package:
The style hook is likely the only hook a partner would potentially want to remove from the bundle.
We could/should ship an unstyled version of our components if that need arises.
Else, the consumer needs to rewrite the entire library with hooks, just omitting the style hook.

const [state, render] = useButton(props, ref, {
 styles: (hook, args) => {},
 state: (hook, args) => {},
 ARIA: (hook, args) => {
   // before
   hook(args);
   // after
 },
 context: (hook, args) => {},
});
---------------------------------------------------------
const useStyles = makeStyles({
  fooS: {},
  barS: {},
});

const WiseButton = (props: ButtonProps & { foo: boolean; bar: boolean }) => {
  const classes = useStyles();
  const { state, render } = useButton(props, ref);

  // add some styles for foo
  state.slots.root.className = mergeClasses(state.slots.root.className, foo && classes.foo);

  // add some styles for bar
  render(state);
};

 -------------------------------------
 use array instead of object
 react claims perf improvement, also naming

 add context to proposed solution

 Add cons, increases api surface by abstracting over other hooks with useComponent

 Add use case code samples:

 Justin make single hook unstable.

 Leave useComponent:
 Add unstable prefix to granular hooks?
 Don't export individual hooks?

 [ ] Check with partner use cases

 [ ] make new file
 [ ] check react spectrum for ideas also
 */
