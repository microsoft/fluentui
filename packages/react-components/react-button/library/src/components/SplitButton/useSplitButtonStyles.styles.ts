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
  // Base styles
  base: {
    display: 'inline-flex',
    justifyContent: 'stretch',
    position: 'relative',
    verticalAlign: 'middle',

    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },

    [`& .${splitButtonClassNames.menuButton}`]: {
      borderLeftWidth: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      minWidth: 0,
    },
  },

  // Appearance variations
  outline: {
    /* No styles */
  },
  primary: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: tokens.colorNeutralStrokeOnBrand,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStrokeOnBrand,
      },
    },

    ':hover:active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStrokeOnBrand,
      },
    },

    '@media (forced-colors: active)': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: 'HighlightText',
      },

      ':hover': {
        [`& .${splitButtonClassNames.primaryActionButton}`]: {
          borderRightColor: 'Highlight',
        },
      },

      ':hover:active': {
        [`& .${splitButtonClassNames.primaryActionButton}`]: {
          borderRightColor: 'Highlight',
        },
      },
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: tokens.colorNeutralStroke1,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStroke1Hover,
      },
    },

    ':hover:active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStroke1Pressed,
      },
    },
  },
  transparent: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: tokens.colorNeutralStroke1,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStroke1Hover,
      },
    },

    ':hover:active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStroke1Pressed,
      },
    },
  },

  // Shape variations
  circular: {},
  rounded: {},
  square: {},

  // Disabled styles
  disabled: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: tokens.colorNeutralStrokeDisabled,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStrokeDisabled,
      },
    },

    ':hover:active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorNeutralStrokeDisabled,
      },
    },
  },

  // Disabled high contrast styles
  disabledHighContrast: {
    '@media (forced-colors: active)': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: 'GrayText',
      },

      ':hover': {
        [`& .${splitButtonClassNames.primaryActionButton}`]: {
          borderRightColor: 'GrayText',
        },
      },

      ':hover:active': {
        [`& .${splitButtonClassNames.primaryActionButton}`]: {
          borderRightColor: 'GrayText',
        },
      },
    },
  },
});

export const useSplitButtonStyles_unstable = (state: SplitButtonState): SplitButtonState => {
  'use no memo';

  const rootStyles = useRootStyles();
  const focusStyles = useFocusStyles();

  const { appearance, disabled, disabledFocusable } = state;

  state.root.className = mergeClasses(
    splitButtonClassNames.root,
    rootStyles.base,
    appearance && rootStyles[appearance],
    (disabled || disabledFocusable) && rootStyles.disabled,
    (disabled || disabledFocusable) && rootStyles.disabledHighContrast,
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
