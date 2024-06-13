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
      borderRightColor: `var(--ctrl-token-SplitButton-93, var(--semantic-token-SplitButton-94, ${tokens.colorNeutralStrokeOnBrand}))`,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: `var(--ctrl-token-SplitButton-95, var(--semantic-token-SplitButton-96, ${tokens.colorNeutralStrokeOnBrand}))`,
      },
    },

    ':hover:active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: `var(--ctrl-token-SplitButton-97, var(--semantic-token-SplitButton-98, ${tokens.colorNeutralStrokeOnBrand}))`,
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
      borderRightColor: `var(--ctrl-token-SplitButton-99, var(--semantic-token-SplitButton-100, ${tokens.colorNeutralStroke1}))`,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: `var(--ctrl-token-SplitButton-101, var(--semantic-token-SplitButton-102, ${tokens.colorNeutralStroke1Hover}))`,
      },
    },

    ':hover:active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: `var(--ctrl-token-SplitButton-103, var(--semantic-token-SplitButton-104, ${tokens.colorNeutralStroke1Pressed}))`,
      },
    },
  },
  transparent: {
    [`& .${splitButtonClassNames.primaryActionButton}`]: {
      borderRightColor: `var(--ctrl-token-SplitButton-105, var(--semantic-token-SplitButton-106, ${tokens.colorNeutralStroke1}))`,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: `var(--ctrl-token-SplitButton-107, var(--semantic-token-SplitButton-108, ${tokens.colorNeutralStroke1Hover}))`,
      },
    },

    ':hover:active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: `var(--ctrl-token-SplitButton-109, var(--semantic-token-SplitButton-110, ${tokens.colorNeutralStroke1Pressed}))`,
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
      borderRightColor: `var(--ctrl-token-SplitButton-111, var(--semantic-token-SplitButton-112, ${tokens.colorNeutralStrokeDisabled}))`,
    },

    ':hover': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: `var(--ctrl-token-SplitButton-113, var(--semantic-token-SplitButton-114, ${tokens.colorNeutralStrokeDisabled}))`,
      },
    },

    ':hover:active': {
      [`& .${splitButtonClassNames.primaryActionButton}`]: {
        borderRightColor: `var(--ctrl-token-SplitButton-115, var(--semantic-token-SplitButton-116, ${tokens.colorNeutralStrokeDisabled}))`,
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
