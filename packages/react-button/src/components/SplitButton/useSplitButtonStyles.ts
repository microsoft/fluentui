import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { SplitButtonState } from './SplitButton.types';

const SplitButtonClassNames = {
  primaryActionButton: 'SplitButton-primaryActionButton',
  menuButton: 'SplitButton-menuButton',
};

const useFocusStyles = makeStyles({
  primaryActionButton: createCustomFocusIndicatorStyle({
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  }),

  menuButton: createCustomFocusIndicatorStyle({
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
      borderRightColor: theme.colorNeutralForegroundInverted,
    },

    ':hover': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: theme.colorNeutralForegroundInverted,
      },
    },

    ':active': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: theme.colorNeutralForegroundInverted,
      },
    },
  }),
  subtle: theme => ({
    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${SplitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: theme.colorNeutralStroke1Hover,
    },

    ':hover': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: theme.colorNeutralStroke1Hover,
      },
    },

    ':active': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: theme.colorNeutralStroke1Hover,
      },
    },
  }),
  transparent: theme => ({
    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${SplitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: theme.colorNeutralStroke1Hover,
    },

    ':hover': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: theme.colorNeutralStroke1Hover,
      },
    },

    ':active': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: theme.colorNeutralStroke1Hover,
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
      borderRightColor: theme.colorNeutralStrokeDisabled,
    },

    ':hover': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: theme.colorNeutralStrokeDisabled,
      },
    },

    ':active': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: theme.colorNeutralStrokeDisabled,
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
