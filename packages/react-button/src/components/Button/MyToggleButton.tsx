import * as React from 'react';
import type { ButtonProps } from './Button.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useButton } from '@fluentui/react-button';
import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';

export type MyToggleButtonProps = ButtonProps;

const useStyles = makeStyles({
  root: theme => ({
    ':hover': {
      color: theme.colorPaletteDarkGreenForeground1,
      background: theme.colorPaletteDarkGreenBackground1,
    },
    ':active': {
      color: theme.colorPaletteDarkGreenForeground2,
      background: theme.colorPaletteDarkGreenBackground2,
    },
  }),

  isActive: theme => ({
    color: theme.colorPaletteDarkGreenForeground2,
    background: theme.colorPaletteDarkGreenBackground2,
    ':hover': {
      color: theme.colorPaletteDarkGreenForeground2,
      background: theme.colorPaletteDarkGreenBackground2,
    },
  }),
});

/** Example of a user's ToggleButton implementation. */
export const MyToggleButton: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  const [isActive, setIsActive] = React.useState(false);
  const [state, render] = useButton(props, ref);
  const classes = useStyles();

  const originalOnClick: ButtonProps['onClick'] = state.root.onClick;
  state.root.onClick = React.useCallback(
    e => {
      setIsActive(!isActive);
      if (originalOnClick) {
        originalOnClick(e);
      }
    },
    [isActive, originalOnClick],
  );

  state.root.className = mergeClasses(state.root.className, classes.root, isActive && classes.isActive);

  return render(state);
}) as ForwardRefComponent<ButtonProps>;

MyToggleButton.displayName = 'MyToggleButton';
