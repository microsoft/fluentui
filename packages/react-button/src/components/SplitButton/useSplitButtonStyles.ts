import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import type { SplitButtonState } from './SplitButton.types';

const SplitButtonClassNames = {
  button: 'SplitButton-button',
  menuButton: 'SplitButton-menuButton',
};

const useStyles = makeStyles({
  root: theme => ({
    display: 'inline-flex',
    justifyContent: 'stretch',
    position: 'relative',

    // Use classnames to increase specificy of styles and avoid collisions.
    [`& .${SplitButtonClassNames.button}`]: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },

    // Use classnames to increase specificy of styles and avoid collisions.
    [`& .${SplitButtonClassNames.menuButton}`]: {
      borderLeftWidth: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  }),
  rootPrimary: theme => {
    return {
      // Use classnames to increase specificy of styles and avoid collisions.
      [`& .${SplitButtonClassNames.button}`]: {
        borderRightColor: theme.alias.color.neutral.neutralForegroundInverted,
      },

      ':hover': {
        [`& .${SplitButtonClassNames.button}`]: {
          borderRightColor: theme.alias.color.neutral.neutralForegroundInverted,
        },
      },

      ':active': {
        [`& .${SplitButtonClassNames.button}`]: {
          borderRightColor: theme.alias.color.neutral.neutralForegroundInverted,
        },
      },
    };
  },
  rootDisabledPrimary: theme => {
    return {
      // Use classnames to increase specificy of styles and avoid collisions.
      [`& .${SplitButtonClassNames.button}`]: {
        borderRightColor: theme.alias.color.neutral.neutralStrokeDisabled,
      },

      ':hover': {
        [`& .${SplitButtonClassNames.button}`]: {
          borderRightColor: theme.alias.color.neutral.neutralStrokeDisabled,
        },
      },

      ':active': {
        [`& .${SplitButtonClassNames.button}`]: {
          borderRightColor: theme.alias.color.neutral.neutralStrokeDisabled,
        },
      },
    };
  },
});

export const useSplitButtonStyles = (state: SplitButtonState): SplitButtonState => {
  const styles = useStyles();

  state.className = mergeClasses(
    styles.root,
    state.primary && styles.rootPrimary,
    state.disabled && state.primary && styles.rootDisabledPrimary,
    state.className,
  );

  if (state.button) {
    state.button.className = mergeClasses(SplitButtonClassNames.button, state.button.className);
  }

  if (state.menuButton) {
    state.menuButton.className = mergeClasses(SplitButtonClassNames.menuButton, state.menuButton.className);
  }

  return state;
};
