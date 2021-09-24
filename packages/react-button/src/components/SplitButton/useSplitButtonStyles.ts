import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusIndicatorStyleRule } from '@fluentui/react-tabster';
import type { SplitButtonState } from './SplitButton.types';

const SplitButtonClassNames = {
  primaryActionButton: 'SplitButton-primaryActionButton',
  menuButton: 'SplitButton-menuButton',
};

const useFocusStyles = makeStyles({
  primaryActionButton: createFocusIndicatorStyleRule({
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  }),

  menuButton: createFocusIndicatorStyleRule({
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  }),
});

const useRootStyles = makeStyles({
  // Base rootStyles
  base: theme => ({
    display: 'inline-flex',
    justifyContent: 'stretch',
    position: 'relative',
    verticalAlign: 'middle',

    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${SplitButtonClassNames.primaryActionButton}`]: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },

    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${SplitButtonClassNames.menuButton}`]: {
      borderLeftWidth: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
  }),

  // Block rootStyles
  block: {
    width: '100%',
  },

  // Appearance variations
  outline: {
    /* No rootStyles */
  },
  primary: theme => ({
    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${SplitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: theme.alias.color.neutral.neutralForegroundInverted,
    },

    ':hover': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: theme.alias.color.neutral.neutralForegroundInverted,
      },
    },

    ':active': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: theme.alias.color.neutral.neutralForegroundInverted,
      },
    },
  }),
  subtle: theme => ({
    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${SplitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: theme.alias.color.neutral.neutralStroke1Hover,
    },

    ':hover': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: theme.alias.color.neutral.neutralStroke1Hover,
      },
    },

    ':active': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: theme.alias.color.neutral.neutralStroke1Hover,
      },
    },
  }),
  transparent: theme => ({
    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${SplitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: theme.alias.color.neutral.neutralStroke1Hover,
    },

    ':hover': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: theme.alias.color.neutral.neutralStroke1Hover,
      },
    },

    ':active': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: theme.alias.color.neutral.neutralStroke1Hover,
      },
    },
  }),

  // Shape variations
  circular: {},
  rounded: {},
  square: {},

  // Disabled rootStyles
  disabled: theme => ({
    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${SplitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: theme.alias.color.neutral.neutralStrokeDisabled,
    },

    ':hover': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: theme.alias.color.neutral.neutralStrokeDisabled,
      },
    },

    ':active': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: theme.alias.color.neutral.neutralStrokeDisabled,
      },
    },
  }),
});

export const useSplitButtonStyles = (state: SplitButtonState): SplitButtonState => {
  const rootStyles = useRootStyles();
  const focusStyles = useFocusStyles();

  const { appearance, block, disabled, disabledFocusable } = state;

  state.root.className = mergeClasses(
    rootStyles.base,
    block && rootStyles.block,
    appearance && rootStyles[appearance],
    (disabled || disabledFocusable) && rootStyles.disabled,
    state.root.className,
  );

  if (state.menuButton) {
    state.menuButton.className = mergeClasses(
      SplitButtonClassNames.menuButton,
      focusStyles.menuButton,
      state.menuButton.className,
    );
  }

  if (state.primaryActionButton) {
    state.primaryActionButton.className = mergeClasses(
      SplitButtonClassNames.primaryActionButton,
      focusStyles.primaryActionButton,
      state.primaryActionButton.className,
    );
  }

  return state;
};
