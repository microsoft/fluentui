'use client';

import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { buttonClassNames, type ToggleButtonState, toggleButtonClassNames } from '@fluentui/react-button';
import { useSemanticButtonStyles } from './useSemanticButtonStyles.styles';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useRootCheckedStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: semanticTokens.groupButtonNeutralBackgroundSelected,
    ...shorthands.borderColor(semanticTokens.groupButtonNeutralStrokeSelected),
    color: semanticTokens.groupButtonNeutralForegroundSelected,
    ...shorthands.borderWidth(semanticTokens.groupButtonStrokewidth),
    fontWeight: semanticTokens.groupButtonFontweightSelected,
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonNeutralIconForegroundSelected,
    },

    [`& .${iconFilledClassName}`]: {
      display: 'inline',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },
  },

  // High contrast styles
  highContrast: {
    '@media (forced-colors: active)': {
      backgroundColor: 'Highlight',
      ...shorthands.borderColor('Highlight'),
      color: 'HighlightText',
      forcedColorAdjust: 'none',

      ':hover': {
        backgroundColor: 'HighlightText',
        ...shorthands.borderColor('Highlight'),
        color: 'Highlight',
      },

      ':hover:active': {
        backgroundColor: 'HighlightText',
        ...shorthands.borderColor('Highlight'),
        color: 'Highlight',
      },

      ':focus': {
        border: '1px solid HighlightText',
        outlineColor: 'Highlight',
      },
    },
  },
  // Appearance variations
  outline: {
    backgroundColor: semanticTokens.groupButtonOutlineBackgroundSelected,
    color: semanticTokens.groupButtonOutlineForegroundSelected,
    ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokeSelected),
    ...shorthands.borderWidth(semanticTokens.groupButtonOutlineStrokewidthSelected),
    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokeSelected),
      ...shorthands.borderWidth(semanticTokens.groupButtonOutlineStrokewidthSelected),
    }),
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonOutlineIconForegroundSelected,
    },

    ':hover': {
      backgroundColor: semanticTokens.groupButtonOutlineBackgroundSelectedHover,
      ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokeSelected),
      ...shorthands.borderWidth(semanticTokens.groupButtonOutlineStrokewidthSelected),
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonOutlineBackgroundSelectedPressed,
      ...shorthands.borderWidth(semanticTokens.groupButtonOutlineStrokewidthSelected),
      ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokeSelected),
    },
  },
  primary: {
    backgroundColor: semanticTokens.groupButtonPrimaryBackgroundSelected,
    ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStrokeSelected),
    color: semanticTokens.groupButtonPrimaryForegroundSelected,

    ':hover': {
      backgroundColor: semanticTokens.groupButtonPrimaryBackgroundSelectedHover,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonPrimaryBackgroundSelectedPressed,
    },

    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonPrimaryIconForegroundSelected,
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
    ':hover': {
      backgroundColor: semanticTokens.groupButtonNeutralBackgroundSelectedHover,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonNeutralBackgroundSelectedPressed,
    },
  },
  subtle: {
    backgroundColor: semanticTokens.groupButtonSubtleBackgroundSelected,
    ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokeSelected),
    color: semanticTokens.groupButtonSubtleForegroundSelected,

    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonSubtleIconForegroundSelected,
    },

    ':hover': {
      ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokeSelected),
      color: semanticTokens.groupButtonSubtleForegroundSelected,
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.groupButtonSubtleIconForegroundSelectedHover,
      },
    },

    ':hover:active': {
      ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokeSelected),
      color: semanticTokens.groupButtonSubtleForegroundSelected,
      [`& .${buttonClassNames.icon}`]: {
        color: semanticTokens.groupButtonSubtleIconForegroundSelectedPressed,
      },
    },
  },
  transparent: {
    color: semanticTokens.groupButtonTransparentForegroundSelected,
    ...shorthands.borderColor('transparent'),
    backgroundColor: semanticTokens.backgroundNeutralTransparent,
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonTransparentForegroundSelected,
    },

    ':hover': {
      ...shorthands.borderColor('transparent'),
      backgroundColor: semanticTokens.backgroundNeutralTransparentSelectedHover,
    },

    ':hover:active': {
      ...shorthands.borderColor('transparent'),
      backgroundColor: semanticTokens.backgroundNeutralTransparentSelectedPressed,
    },
  },
});

const useRootDisabledStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: semanticTokens.groupButtonNeutralBackgroundDisabled,
    ...shorthands.borderColor(semanticTokens.groupButtonNeutralStrokeDisabled),
    color: semanticTokens.groupButtonNeutralForegroundDisabled,

    ':hover': {
      backgroundColor: semanticTokens.groupButtonNeutralBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonNeutralStrokeDisabled),
      color: semanticTokens.groupButtonNeutralForegroundDisabled,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonNeutralBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonNeutralStrokeDisabled),
      color: semanticTokens.groupButtonNeutralForegroundDisabled,
    },
  },

  // Appearance variations
  outline: {
    backgroundColor: semanticTokens.groupButtonOutlineBackgroundDisabled,
    ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokeDisabled),

    ':hover': {
      backgroundColor: semanticTokens.groupButtonOutlineBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokeDisabled),
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonOutlineBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokeDisabled),
    },
  },
  primary: {
    backgroundColor: semanticTokens.groupButtonPrimaryBackgroundDisabled,
    ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStrokeDisabled),

    ':hover': {
      backgroundColor: semanticTokens.groupButtonPrimaryBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStrokeDisabled),
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonPrimaryBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStrokeDisabled),
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    backgroundColor: semanticTokens.groupButtonSubtleBackgroundDisabled,
    ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokeDisabled),

    ':hover': {
      backgroundColor: semanticTokens.groupButtonSubtleBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokeDisabled),
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonSubtleBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokeDisabled),
    },
  },
  transparent: {
    backgroundColor: semanticTokens.groupButtonSubtleBackgroundDisabled,
    ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokeDisabled),

    ':hover': {
      backgroundColor: semanticTokens.groupButtonSubtleBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokeDisabled),
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonSubtleBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokeDisabled),
    },
  },
});

const useIconCheckedStyles = makeStyles({
  // High contrast styles
  highContrast: {
    '@media (forced-colors: active)': {
      forcedColorAdjust: 'auto',
    },
  },
});

const usePrimaryHighContrastStyles = makeStyles({
  // Do not use primary variant high contrast styles for toggle buttons
  // otherwise there isn't enough difference between on/off states
  base: {
    '@media (forced-colors: active)': {
      backgroundColor: 'ButtonFace',
      ...shorthands.borderColor('ButtonBorder'),
      color: 'ButtonText',
      forcedColorAdjust: 'auto',
    },
  },

  disabled: {
    '@media (forced-colors: active)': {
      ...shorthands.borderColor('GrayText'),
      color: 'GrayText',

      ':focus': {
        ...shorthands.borderColor('GrayText'),
      },
    },
  },
});

export const useSemanticToggleButtonStyles = (_state: unknown): ToggleButtonState => {
  'use no memo';

  const state = _state as ToggleButtonState;

  const rootCheckedStyles = useRootCheckedStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const iconCheckedStyles = useIconCheckedStyles();
  const primaryHighContrastStyles = usePrimaryHighContrastStyles();

  const { appearance, checked, disabled, disabledFocusable } = state;

  // Apply base styles
  useSemanticButtonStyles(state);

  state.root.className = mergeClasses(
    state.root.className,
    toggleButtonClassNames.root,

    // Primary high contrast styles
    appearance === 'primary' && primaryHighContrastStyles.base,
    appearance === 'primary' && (disabled || disabledFocusable) && primaryHighContrastStyles.disabled,

    // Checked styles
    checked && rootCheckedStyles.base,
    checked && rootCheckedStyles.highContrast,
    appearance && checked && rootCheckedStyles[appearance],

    // Disabled styles
    (disabled || disabledFocusable) && rootDisabledStyles.base,
    appearance && (disabled || disabledFocusable) && rootDisabledStyles[appearance],

    getSlotClassNameProp_unstable(state.root),
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      toggleButtonClassNames.icon,
      iconCheckedStyles.highContrast,
      getSlotClassNameProp_unstable(state.icon),
    );
  }

  return state;
};
