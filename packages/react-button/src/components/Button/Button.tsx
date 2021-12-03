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
