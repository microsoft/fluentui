'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import * as semanticTokens from '@fluentui/semantic-tokens';
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
      borderRightWidth: semanticTokens.groupButtonDividerStrokewidth,
      borderRightColor: semanticTokens.groupButtonNeutralDividerStroke,
      ':hover': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightWidth: semanticTokens.groupButtonDividerStrokewidth,
        borderRightColor: semanticTokens.groupButtonNeutralDividerStroke,
      },
      ':hover:active': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightWidth: semanticTokens.groupButtonDividerStrokewidth,
        borderRightColor: semanticTokens.groupButtonNeutralDividerStroke,
      },
    },

    [`& .${splitButtonClassNames.menuButton}`]: {
      borderLeftWidth: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      minWidth: MIN_TARGET_SIZE,
      ':hover': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      ':hover:active': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
  },

  // Appearance variations
  outline: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: semanticTokens.groupButtonOutlineDividerStroke,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: semanticTokens.groupButtonOutlineDividerStroke,
      },

      [`& .${splitButtonClassNames.menuButton}`]: { borderLeftWidth: 0 },
    },

    ':hover:active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: semanticTokens.groupButtonOutlineDividerStroke,
      },
      [`& .${splitButtonClassNames.menuButton}`]: { borderLeftWidth: 0 },
    },
  },
  primary: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: semanticTokens.groupButtonPrimaryDividerStroke,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: semanticTokens.groupButtonPrimaryDividerStroke,
      },
    },

    ':hover:active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: semanticTokens.groupButtonPrimaryDividerStroke,
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
      borderRightColor: semanticTokens.groupButtonSubtleDividerStroke,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: semanticTokens.groupButtonSubtleDividerStroke,
      },
    },

    ':hover:active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: semanticTokens.groupButtonSubtleDividerStroke,
      },
    },
  },
  transparent: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: semanticTokens.groupButtonTransparentDividerStroke,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: semanticTokens.groupButtonTransparentDividerStroke,
      },
    },

    ':hover:active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: semanticTokens.groupButtonTransparentDividerStroke,
      },
    },
  },

  // Shape variations
  circular: {},
  rounded: {},
  square: {},

  // Disabled styles
  disabled: {
    // Disabled divider shares neutral state in all appearances
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: semanticTokens.groupButtonNeutralStrokeDisabled,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: semanticTokens.groupButtonNeutralStrokeDisabled,
      },
    },

    ':hover:active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: semanticTokens.groupButtonNeutralStrokeDisabled,
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
    state.root.className,
    splitButtonClassNames.root,
    rootStyles.base,
    appearance && rootStyles[appearance],
    (disabled || disabledFocusable) && rootStyles.disabled,
    (disabled || disabledFocusable) && rootStyles.disabledHighContrast,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.menuButton) {
    state.menuButton.className = mergeClasses(
      state.menuButton.className,
      splitButtonClassNames.menuButton,
      focusStyles.menuButton,
      getSlotClassNameProp_unstable(state.menuButton),
    );
  }

  if (state.primaryActionButton) {
    state.primaryActionButton.className = mergeClasses(
      state.primaryActionButton.className,
      splitButtonClassNames.primaryActionButton,
      focusStyles.primaryActionButton,
      getSlotClassNameProp_unstable(state.primaryActionButton),
    );
  }

  return state;
};
