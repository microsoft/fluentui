import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { buttonClassNames, type ToggleButtonState, toggleButtonClassNames } from '@fluentui/react-button';
import { useSemanticButtonStyles } from './useSemanticButtonStyles.styles';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useRootCheckedStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnNeutralRest),
    color: tokens.colorNeutralForeground1Selected,
    ...shorthands.borderWidth(semanticTokens.strokeWidthDefault),

    [`& .${iconFilledClassName}`]: {
      display: 'inline',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },

    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlNeutralHover,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnNeutralHover),
      color: semanticTokens.foregroundCtrlNeutralPrimaryHover,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.backgroundCtrlNeutralPressed,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnNeutralPressed),
      color: semanticTokens.foregroundCtrlNeutralPrimaryPressed,
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
    backgroundColor: tokens.colorTransparentBackgroundSelected,
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnOutlineRest),
    ...shorthands.borderWidth(semanticTokens.strokeWidthCtrlOutlineSelected),

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
      ...shorthands.borderWidth(semanticTokens.strokeWidthCtrlOutlineSelected),
    },

    ':hover:active': {
      ...shorthands.borderColor(tokens.colorNeutralStroke1Selected),
      ...shorthands.borderWidth(semanticTokens.strokeWidthCtrlOutlineSelected),
      backgroundColor: tokens.colorTransparentBackgroundPressed,
    },

    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnNeutralRest),
    }),
  },
  primary: {
    backgroundColor: tokens.colorBrandBackgroundSelected,
    ...shorthands.borderColor('transparent'),
    color: tokens.colorNeutralForegroundOnBrand,

    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForegroundOnBrand,
    },

    ':hover:active': {
      backgroundColor: tokens.colorBrandBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,
    ...shorthands.borderColor('transparent'),
    color: tokens.colorNeutralForeground2Selected,

    [`& .${buttonClassNames.icon}`]: {
      color: tokens.colorNeutralForeground2BrandSelected,
    },

    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2Hover,
    },

    ':hover:active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2Pressed,
    },
  },
  transparent: {
    backgroundColor: tokens.colorTransparentBackgroundSelected,
    ...shorthands.borderColor('transparent'),
    color: tokens.colorNeutralForeground2BrandSelected,

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2BrandHover,
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2BrandPressed,
    },
  },
});

const useRootDisabledStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: semanticTokens.backgroundCtrlNeutralDisabled,
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnNeutralDisabled),
    color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,

    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlNeutralDisabled,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnNeutralDisabled),
      color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
    },

    ':hover:active': {
      backgroundColor: semanticTokens.backgroundCtrlNeutralDisabled,
      ...shorthands.borderColor(semanticTokens.strokeCtrlOnNeutralDisabled),
      color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
    },
  },

  // Appearance variations
  outline: {
    /* No styles */
  },
  primary: {
    ...shorthands.borderColor('transparent'),

    ':hover': {
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      ...shorthands.borderColor('transparent'),
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    backgroundColor: semanticTokens.backgroundCtrlSubtleDisabled,
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlSubtleDisabled,
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      backgroundColor: semanticTokens.backgroundCtrlSubtleDisabled,
      ...shorthands.borderColor('transparent'),
    },
  },
  transparent: {
    backgroundColor: tokens.colorTransparentBackground,
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
      ...shorthands.borderColor('transparent'),
    },

    ':hover:active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      ...shorthands.borderColor('transparent'),
    },
  },
});

const useIconCheckedStyles = makeStyles({
  // Appearance variations
  subtleOrTransparent: {
    color: tokens.colorNeutralForeground2BrandSelected,
  },
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
      checked && (appearance === 'subtle' || appearance === 'transparent') && iconCheckedStyles.subtleOrTransparent,
      iconCheckedStyles.highContrast,
      getSlotClassNameProp_unstable(state.icon),
    );
  }

  useSemanticButtonStyles(state);

  return state;
};
