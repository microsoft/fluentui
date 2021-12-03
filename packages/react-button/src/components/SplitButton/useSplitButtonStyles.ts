import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import type { SplitButtonState } from './SplitButton.types';

export const splitButtonClassName = 'fui-SplitButton';
const sBClassName = 'fui-SplitButton';
const splitButtonPrimaryActionButtonClassName = `${sBClassName}-primaryActionButton`;
const splitButtonMenuButtonClassName = `${sBClassName}-menuButton`;

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
    [`& .${splitButtonPrimaryActionButtonClassName}`]: {
      borderRightColor: tokens.colorNeutralForegroundInverted,
    },

    ':hover': {
      [`& .${splitButtonPrimaryActionButtonClassName}`]: {
        borderRightColor: tokens.colorNeutralForegroundInverted,
      },
    },

    ':active': {
      [`& .${splitButtonPrimaryActionButtonClassName}`]: {
        borderRightColor: tokens.colorNeutralForegroundInverted,
      },
    },
  },
  subtle: {
    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${splitButtonPrimaryActionButtonClassName}`]: {
      borderRightColor: tokens.colorNeutralStroke1Hover,
    },

    ':hover': {
      [`& .${splitButtonPrimaryActionButtonClassName}`]: {
        borderRightColor: tokens.colorNeutralStroke1Hover,
      },
    },

    ':active': {
      [`& .${splitButtonPrimaryActionButtonClassName}`]: {
        borderRightColor: tokens.colorNeutralStroke1Hover,
      },
    },
  },
  transparent: {
    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${splitButtonPrimaryActionButtonClassName}`]: {
      borderRightColor: tokens.colorNeutralStroke1Hover,
    },

    ':hover': {
      [`& .${splitButtonPrimaryActionButtonClassName}`]: {
        borderRightColor: tokens.colorNeutralStroke1Hover,
      },
    },

    ':active': {
      [`& .${splitButtonPrimaryActionButtonClassName}`]: {
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
    [`& .${splitButtonPrimaryActionButtonClassName}`]: {
      borderRightColor: tokens.colorNeutralStrokeDisabled,
    },

    ':hover': {
      [`& .${splitButtonPrimaryActionButtonClassName}`]: {
        borderRightColor: tokens.colorNeutralStrokeDisabled,
      },
    },

    ':active': {
      [`& .${splitButtonPrimaryActionButtonClassName}`]: {
        borderRightColor: tokens.colorNeutralStrokeDisabled,
      },
    },
  },
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
