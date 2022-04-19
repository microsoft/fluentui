import { makeStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SplitButtonSlots, SplitButtonState } from './SplitButton.types';

export const splitButtonClassNames: SlotClassNames<SplitButtonSlots> = {
  root: 'fui-SplitButton',
  menuButton: 'fui-SplitButton__menuButton',
  primaryActionButton: 'fui-SplitButton__primaryActionButton',
};

/**
 * @deprecated Use `splitButtonClassName.root` instead.
 */
export const splitButtonClassName = splitButtonClassNames.root;

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
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },

    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${splitButtonClassNames.menuButton}`]: {
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
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: tokens.colorNeutralForegroundInverted,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralForegroundInverted,
      },
    },

    ':active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralForegroundInverted,
      },
    },
  },
  subtle: {
    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: tokens.colorNeutralStroke1Hover,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStroke1Hover,
      },
    },

    ':active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStroke1Hover,
      },
    },
  },
  transparent: {
    // Use classnames to increase specificy of rootStyles and avoid collisions.
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: tokens.colorNeutralStroke1Hover,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStroke1Hover,
      },
    },

    ':active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
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
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: tokens.colorNeutralStrokeDisabled,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStrokeDisabled,
      },
    },

    ':active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStrokeDisabled,
      },
    },
  },
});

export const useSplitButtonStyles_unstable = (state: SplitButtonState): SplitButtonState => {
  const rootStyles = useRootStyles();
  const focusStyles = useFocusStyles();

  const {
    appearance,
    // eslint-disable-next-line deprecation/deprecation
    block,
    disabled,
    disabledFocusable,
  } = state;

  state.root.className = mergeClasses(
    splitButtonClassNames.root,
    rootStyles.base,
    block && rootStyles.block,
    appearance && rootStyles[appearance],
    (disabled || disabledFocusable) && rootStyles.disabled,
    state.root.className,
  );

  if (state.menuButton) {
    state.menuButton.className = mergeClasses(
      splitButtonClassNames.menuButton,
      focusStyles.menuButton,
      state.menuButton.className,
    );
  }

  if (state.primaryActionButton) {
    state.primaryActionButton.className = mergeClasses(
      splitButtonClassNames.primaryActionButton,
      focusStyles.primaryActionButton,
      state.primaryActionButton.className,
    );
  }

  return state;
};
