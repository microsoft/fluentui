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
    color: semanticTokens.groupButtonNeutralTextForegroundSelected,
    ...shorthands.borderWidth(semanticTokens.groupButtonStrokewidth),
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonNeutralIconForegroundSelected,
    },

    [`& .${iconFilledClassName}`]: {
      display: 'inline',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },

    ':hover': {
      backgroundColor: semanticTokens.groupButtonNeutralBackgroundHoverSelected,
      ...shorthands.borderColor(semanticTokens.groupButtonNeutralStrokeHoverSelected),
      color: semanticTokens.groupButtonNeutralTextForegroundHover,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonNeutralBackgroundPressedSelected,
      ...shorthands.borderColor(semanticTokens.groupButtonNeutralStrokePressedSelected),
      color: semanticTokens.groupButtonNeutralTextForegroundPressed,
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
    color: semanticTokens.groupButtonOutlineTextForegroundSelected,
    ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokeSelected),
    ...shorthands.borderWidth(semanticTokens.groupButtonOutlineStrokewidthSelected),
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonOutlineIconForegroundSelected,
    },

    ':hover': {
      backgroundColor: semanticTokens.groupButtonOutlineBackgroundHoverSelected,
      ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokeHoverSelected),
      ...shorthands.borderWidth(semanticTokens.groupButtonOutlineStrokewidthSelected),
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonOutlineBackgroundPressedSelected,
      ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokePressedSelected),
      ...shorthands.borderWidth(semanticTokens.groupButtonOutlineStrokewidthSelected),
    },

    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokeSelected),
    }),
  },
  primary: {
    backgroundColor: semanticTokens.groupButtonPrimaryBackgroundSelected,
    ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStrokeSelected),
    color: semanticTokens.groupButtonPrimaryTextForegroundSelected,
    boxShadow: semanticTokens.groupButtonPrimaryShadowSelected,

    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonPrimaryIconForegroundSelected,
    },

    ':hover': {
      backgroundColor: semanticTokens.groupButtonPrimaryBackgroundHoverSelected,
      ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStrokeHoverSelected),
      color: semanticTokens.groupButtonPrimaryTextForegroundSelected,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonPrimaryBackgroundPressedSelected,
      ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStrokePressedSelected),
      color: semanticTokens.groupButtonPrimaryTextForegroundSelected,
    },
  },
  secondary: {
    boxShadow: semanticTokens.groupButtonNeutralShadowSelected,
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    backgroundColor: semanticTokens.groupButtonSubtleBackgroundSelected,
    ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokeSelected),
    color: semanticTokens.groupButtonSubtleTextForegroundSelected,

    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonSubtleIconForegroundSelected,
    },

    ':hover': {
      backgroundColor: semanticTokens.groupButtonSubtleBackgroundHoverSelected,
      ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokeHoverSelected),
      color: semanticTokens.groupButtonSubtleTextForegroundHover,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonSubtleBackgroundPressedSelected,
      ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokePressedSelected),
      color: semanticTokens.groupButtonSubtleTextForegroundPressed,
    },
  },
  transparent: {
    backgroundColor: semanticTokens.groupButtonTransparentBackgroundSelected,
    ...shorthands.borderColor(semanticTokens.groupButtonTransparentStrokeSelected),
    color: semanticTokens.groupButtonTransparentTextForegroundSelected,
    [`& .${buttonClassNames.icon}`]: {
      color: semanticTokens.groupButtonTransparentIconForegroundSelected,
    },

    ':hover': {
      backgroundColor: semanticTokens.groupButtonTransparentBackgroundHoverSelected,
      ...shorthands.borderColor(semanticTokens.groupButtonTransparentStrokeHoverSelected),
      color: semanticTokens.groupButtonTransparentTextForegroundHover,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonTransparentBackgroundPressedSelected,
      ...shorthands.borderColor(semanticTokens.groupButtonTransparentStrokePressedSelected),
      color: semanticTokens.groupButtonTransparentTextForegroundPressed,
    },
  },
});

const useRootDisabledStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: semanticTokens.groupButtonNeutralBackgroundDisabled,
    ...shorthands.borderColor(semanticTokens.groupButtonNeutralStrokeDisabled),
    color: semanticTokens.groupButtonNeutralTextForegroundDisabled,

    ':hover': {
      backgroundColor: semanticTokens.groupButtonNeutralBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonNeutralStrokeDisabled),
      color: semanticTokens.groupButtonNeutralTextForegroundDisabled,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonNeutralBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonNeutralStrokeDisabled),
      color: semanticTokens.groupButtonNeutralTextForegroundDisabled,
    },
  },

  // Appearance variations
  outline: {
    backgroundColor: semanticTokens.groupButtonOutlineBackgroundDisabled,
    ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokeDisabled),
    color: semanticTokens.groupButtonOutlineTextForegroundDisabled,

    ':hover': {
      backgroundColor: semanticTokens.groupButtonOutlineBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokeDisabled),
      color: semanticTokens.groupButtonOutlineTextForegroundDisabled,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonOutlineBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonOutlineStrokeDisabled),
      color: semanticTokens.groupButtonOutlineTextForegroundDisabled,
    },
  },
  primary: {
    backgroundColor: semanticTokens.groupButtonPrimaryBackgroundDisabled,
    ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStrokeDisabled),
    color: semanticTokens.groupButtonPrimaryTextForegroundDisabled,

    ':hover': {
      backgroundColor: semanticTokens.groupButtonPrimaryBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStrokeDisabled),
      color: semanticTokens.groupButtonPrimaryTextForegroundDisabled,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonPrimaryBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonPrimaryStrokeDisabled),
      color: semanticTokens.groupButtonPrimaryTextForegroundDisabled,
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    backgroundColor: semanticTokens.groupButtonSubtleBackgroundDisabled,
    ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokeDisabled),
    color: semanticTokens.groupButtonSubtleTextForegroundDisabled,

    ':hover': {
      backgroundColor: semanticTokens.groupButtonSubtleBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokeDisabled),
      color: semanticTokens.groupButtonSubtleTextForegroundDisabled,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonSubtleBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonSubtleStrokeDisabled),
      color: semanticTokens.groupButtonSubtleTextForegroundDisabled,
    },
  },
  transparent: {
    backgroundColor: semanticTokens.groupButtonTransparentBackgroundDisabled,
    ...shorthands.borderColor(semanticTokens.groupButtonTransparentStrokeDisabled),
    color: semanticTokens.groupButtonTransparentTextForegroundDisabled,

    ':hover': {
      backgroundColor: semanticTokens.groupButtonTransparentBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonTransparentStrokeDisabled),
      color: semanticTokens.groupButtonTransparentTextForegroundDisabled,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.groupButtonTransparentBackgroundDisabled,
      ...shorthands.borderColor(semanticTokens.groupButtonTransparentStrokeDisabled),
      color: semanticTokens.groupButtonTransparentTextForegroundDisabled,
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
