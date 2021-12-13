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
 */
