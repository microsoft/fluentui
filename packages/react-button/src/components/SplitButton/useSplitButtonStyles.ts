import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { SplitButtonState } from './SplitButton.types';

export const splitButtonClassName = 'fui-SplitButton';
export const splitButtonPrimaryActionButtonClassName = `${splitButtonClassName}-primaryActionButton`;
export const splitButtonMenuButtonClassName = `${splitButtonClassName}-menuButton`;

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
    [`& .${splitButtonPrimaryActionButtonClassName}`]: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },

    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${splitButtonMenuButtonClassName}`]: {
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
    [`& .${splitButtonPrimaryActionButtonClassName}`]: {
      borderRightColor: theme.colorNeutralForegroundInverted,
    },

    ':hover': {
      [`& .${splitButtonPrimaryActionButtonClassName}`]: {
        borderRightColor: theme.colorNeutralForegroundInverted,
      },
    },

    ':active': {
      [`& .${splitButtonPrimaryActionButtonClassName}`]: {
        borderRightColor: theme.colorNeutralForegroundInverted,
      },
    },
  }),
  subtle: theme => ({
    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${splitButtonPrimaryActionButtonClassName}`]: {
      borderRightColor: theme.colorNeutralStroke1Hover,
    },

    ':hover': {
      [`& .${splitButtonPrimaryActionButtonClassName}`]: {
        borderRightColor: theme.colorNeutralStroke1Hover,
      },
    },

    ':active': {
      [`& .${splitButtonPrimaryActionButtonClassName}`]: {
        borderRightColor: theme.colorNeutralStroke1Hover,
      },
    },
  }),
  transparent: theme => ({
    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${splitButtonPrimaryActionButtonClassName}`]: {
      borderRightColor: theme.colorNeutralStroke1Hover,
    },

    ':hover': {
      [`& .${splitButtonPrimaryActionButtonClassName}`]: {
        borderRightColor: theme.colorNeutralStroke1Hover,
      },
    },

    ':active': {
      [`& .${splitButtonPrimaryActionButtonClassName}`]: {
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
    [`& .${splitButtonPrimaryActionButtonClassName}`]: {
      borderRightColor: theme.colorNeutralStrokeDisabled,
    },

    ':hover': {
      [`& .${splitButtonPrimaryActionButtonClassName}`]: {
        borderRightColor: theme.colorNeutralStrokeDisabled,
      },
    },

    ':active': {
      [`& .${splitButtonPrimaryActionButtonClassName}`]: {
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
    splitButtonClassName,
    rootStyles.base,
    block && rootStyles.block,
    appearance && rootStyles[appearance],
    (disabled || disabledFocusable) && rootStyles.disabled,
    state.root.className,
  );

  if (state.menuButton) {
    state.menuButton.className = mergeClasses(
      splitButtonMenuButtonClassName,
      focusStyles.menuButton,
      state.menuButton.className,
    );
  }

  if (state.primaryActionButton) {
    state.primaryActionButton.className = mergeClasses(
      splitButtonPrimaryActionButtonClassName,
      focusStyles.primaryActionButton,
      state.primaryActionButton.className,
    );
  }

  return state;
};
