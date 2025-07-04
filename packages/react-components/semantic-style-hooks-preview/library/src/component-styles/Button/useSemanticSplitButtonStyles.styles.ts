import { makeStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { tokens } from '@fluentui/react-theme';
import { splitButtonClassNames, type SplitButtonState } from '@fluentui/react-button';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

// WCAG minimum target size for pointer targets that are immediately adjacent to other targets:
// https://w3c.github.io/wcag/guidelines/22/#target-size-minimum
const MIN_TARGET_SIZE = '24px';

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
      minWidth: MIN_TARGET_SIZE,
    },
  },

  // Appearance variations
  outline: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: semanticTokens.strokeCtrlDividerOnOutline,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: semanticTokens.strokeCtrlDividerOnOutline,
      },

      [`& .${splitButtonClassNames.menuButton}`]: { borderLeftWidth: 0 },
    },

    ':hover:active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: semanticTokens.strokeCtrlDividerOnOutline,
      },
      [`& .${splitButtonClassNames.menuButton}`]: { borderLeftWidth: 0 },
    },
  },
  primary: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: semanticTokens.strokeCtrlDividerOnBrand,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: semanticTokens.strokeCtrlDividerOnBrand,
      },
    },

    ':hover:active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: semanticTokens.strokeCtrlDividerOnBrand,
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
      borderRightColor: semanticTokens.strokeCtrlDividerOnSubtle,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: semanticTokens.strokeCtrlDividerOnSubtle,
      },
    },

    ':hover:active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: semanticTokens.strokeCtrlDividerOnSubtle,
      },
    },
  },
  transparent: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: tokens.colorTransparentBackground,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorTransparentBackgroundHover,
      },
    },

    ':hover:active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: tokens.colorTransparentBackgroundPressed,
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
      borderRightColor: semanticTokens.strokeCtrlOnNeutralDisabled,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: semanticTokens.strokeCtrlOnNeutralDisabled,
      },
    },

    ':hover:active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: semanticTokens.strokeCtrlOnNeutralDisabled,
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

export const useSemanticSplitButtonStyles = (_state: unknown): SplitButtonState => {
  'use no memo';

  const state = _state as SplitButtonState;

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
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.menuButton) {
    state.menuButton.className = mergeClasses(
      splitButtonClassNames.menuButton,
      focusStyles.menuButton,
      state.menuButton.className,
      getSlotClassNameProp_unstable(state.menuButton),
    );
  }

  if (state.primaryActionButton) {
    state.primaryActionButton.className = mergeClasses(
      splitButtonClassNames.primaryActionButton,
      focusStyles.primaryActionButton,
      state.primaryActionButton.className,
      getSlotClassNameProp_unstable(state.primaryActionButton),
    );
  }

  return state;
};
