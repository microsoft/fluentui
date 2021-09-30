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
    verticalAlign: 'middle',

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
  rootBlock: {
    width: '100%',
  },
  rootPrimary: theme => ({
    // Use classnames to increase specificy of styles and avoid collisions.
    [`& .${SplitButtonClassNames.button}`]: {
      borderRightColor: theme.colorNeutralForegroundInverted,
    },

    ':hover': {
      [`& .${SplitButtonClassNames.button}`]: {
        borderRightColor: theme.colorNeutralForegroundInverted,
      },
    },

    ':active': {
      [`& .${SplitButtonClassNames.button}`]: {
        borderRightColor: theme.colorNeutralForegroundInverted,
      },
    },
  }),
  rootSubtle: theme => ({
    // Use classnames to increase specificy of styles and avoid collisions.
    [`& .${SplitButtonClassNames.button}`]: {
      borderRightColor: theme.colorNeutralStroke1Hover,
    },

    ':hover': {
      [`& .${SplitButtonClassNames.button}`]: {
        borderRightColor: theme.colorNeutralStroke1Hover,
      },
    },

    ':active': {
      [`& .${SplitButtonClassNames.button}`]: {
        borderRightColor: theme.colorNeutralStroke1Hover,
      },
    },
  }),
  rootTransparent: theme => ({
    // Use classnames to increase specificy of styles and avoid collisions.
    [`& .${SplitButtonClassNames.button}`]: {
      borderRightColor: theme.colorNeutralStroke1Hover,
    },

    ':hover': {
      [`& .${SplitButtonClassNames.button}`]: {
        borderRightColor: theme.colorNeutralStroke1Hover,
      },
    },

    ':active': {
      [`& .${SplitButtonClassNames.button}`]: {
        borderRightColor: theme.colorNeutralStroke1Hover,
      },
    },
  }),
  rootDisabled: theme => ({
    // Use classnames to increase specificy of styles and avoid collisions.
    [`& .${SplitButtonClassNames.button}`]: {
      borderRightColor: theme.colorNeutralStrokeDisabled,
    },

    ':hover': {
      [`& .${SplitButtonClassNames.button}`]: {
        borderRightColor: theme.colorNeutralStrokeDisabled,
      },
    },

    ':active': {
      [`& .${SplitButtonClassNames.button}`]: {
        borderRightColor: theme.colorNeutralStrokeDisabled,
      },
    },
  }),
});

export const useSplitButtonStyles = (state: SplitButtonState): SplitButtonState => {
  const styles = useStyles();

  state.className = mergeClasses(
    styles.root,
    state.block && styles.rootBlock,
    state.appearance === 'primary' && styles.rootPrimary,
    state.appearance === 'subtle' && styles.rootSubtle,
    state.appearance === 'transparent' && styles.rootTransparent,
    state.disabled && styles.rootDisabled,
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
