import { makeStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import type { SplitButtonState } from './SplitButton.types';

export const splitButtonClassName = 'fui-SplitButton';

const SplitButtonClassNames = {
  primaryActionButton: `${splitButtonClassName}-primaryActionButton`,
  menuButton: `${splitButtonClassName}-menuButton`,
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
  base: {
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
  },

  // Block rootStyles
  block: {
    width: '100%',
  },

  // Appearance variations
  outline: {
    /* No rootStyles */
  },
  primary: {
    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${SplitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: tokens.colorNeutralForegroundInverted,
    },

    ':hover': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralForegroundInverted,
      },
    },

    ':active': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralForegroundInverted,
      },
    },
  },
  subtle: {
    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${SplitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: tokens.colorNeutralStroke1Hover,
    },

    ':hover': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStroke1Hover,
      },
    },

    ':active': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStroke1Hover,
      },
    },
  },
  transparent: {
    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${SplitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: tokens.colorNeutralStroke1Hover,
    },

    ':hover': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStroke1Hover,
      },
    },

    ':active': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStroke1Hover,
      },
    },
  },

  // Shape variations
  circular: {},
  rounded: {},
  square: {},

  // Disabled rootStyles
  disabled: {
    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${SplitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: tokens.colorNeutralStrokeDisabled,
    },

    ':hover': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStrokeDisabled,
      },
    },

    ':active': {
      [`& .${SplitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStrokeDisabled,
      },
    },
  },
});

export const useSplitButtonStyles_unstable = (state: SplitButtonState): SplitButtonState => {
  const rootStyles = useRootStyles();
  const focusStyles = useFocusStyles();

  const { appearance, block, disabled, disabledFocusable } = state;

  state.root.className = mergeClasses(
    splitButtonClassName,
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
