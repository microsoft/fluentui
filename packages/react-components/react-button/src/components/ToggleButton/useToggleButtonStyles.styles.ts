import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { useButtonStyles_unstable } from '../Button/useButtonStyles.styles';
import { buttonTokens } from '../Button/Button.tokens';
import { toggleButtonTokens } from './ToggleButton.tokens';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ButtonSlots } from '../Button/Button.types';
import type { ToggleButtonState } from './ToggleButton.types';

export const toggleButtonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-ToggleButton',
  icon: 'fui-ToggleButton__icon',
};

const useRootCheckedStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: toggleButtonTokens.ctrlButtonSecondaryBackgroundColorSelected,
    ...shorthands.borderColor(toggleButtonTokens.ctrlButtonSecondaryBorderColorSelected),
    color: toggleButtonTokens.ctrlButtonSecondaryForegroundColorSelected,

    ...shorthands.borderWidth(tokens.strokeWidthThin),

    [`& .${iconFilledClassName}`]: {
      display: 'inline',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },

    ':hover': {
      backgroundColor: buttonTokens.ctrlButtonSecondaryBackgroundColorHover,
      ...shorthands.borderColor(buttonTokens.ctrlButtonSecondaryBorderColorHover),
      color: buttonTokens.ctrlButtonSecondaryForegroundColorHover,
    },

    ':hover:active': {
      backgroundColor: buttonTokens.ctrlButtonSecondaryBackgroundColorPressed,
      ...shorthands.borderColor(buttonTokens.ctrlButtonSecondaryBorderColorPressed),
      color: buttonTokens.ctrlButtonSecondaryBackgroundColorPressed,
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
        ...shorthands.border('1px', 'solid', 'HighlightText'),
        outlineColor: 'Highlight',
      },
    },
  },

  // Appearance variations
  outline: {
    backgroundColor: toggleButtonTokens.ctrlButtonOutlineBackgroundColorSelected,
    ...shorthands.borderColor(toggleButtonTokens.ctrlButtonOutlineBorderColorSelected),
    ...shorthands.borderWidth(tokens.strokeWidthThicker),

    ':hover': {
      backgroundColor: buttonTokens.ctrlButtonOutlineBackgroundColorHover,
    },

    ':hover:active': {
      backgroundColor: buttonTokens.ctrlButtonOutlineBackgroundColorPressed,
    },

    ...createCustomFocusIndicatorStyle({
      ...shorthands.borderColor(tokens.colorNeutralStroke1),
    }),
  },
  primary: {
    backgroundColor: toggleButtonTokens.ctrlButtonPrimaryBackgroundColorSelected,
    ...shorthands.borderColor('transparent'),
    color: toggleButtonTokens.ctrlButtonPrimaryForegroundColorSelected,

    ':hover': {
      backgroundColor: buttonTokens.ctrlButtonPrimaryBackgroundColorHover,
      ...shorthands.borderColor('transparent'),
      color: buttonTokens.ctrlButtonPrimaryForegroundColorHover,
    },

    ':hover:active': {
      backgroundColor: buttonTokens.ctrlButtonPrimaryBackgroundColorPressed,
      ...shorthands.borderColor('transparent'),
      color: buttonTokens.ctrlButtonPrimaryForegroundColorPressed,
    },
  },
  secondary: {
    /* The secondary styles are exactly the same as the base styles. */
  },
  subtle: {
    backgroundColor: toggleButtonTokens.ctrlButtonSubtleBackgroundColorSelected,
    ...shorthands.borderColor('transparent'),
    color: toggleButtonTokens.ctrlButtonSubtleForegroundColorSelected,

    ':hover': {
      backgroundColor: buttonTokens.ctrlButtonSubtleBackgroundColorHover,
      ...shorthands.borderColor('transparent'),
      color: buttonTokens.ctrlButtonSubtleBackgroundColorHover,
    },

    ':hover:active': {
      backgroundColor: buttonTokens.ctrlButtonSubtleBackgroundColorPressed,
      ...shorthands.borderColor('transparent'),
      color: buttonTokens.ctrlButtonSubtleBackgroundColorPressed,
    },
  },
  transparent: {
    backgroundColor: toggleButtonTokens.ctrlButtonTransparentBackgroundColorSelected,
    ...shorthands.borderColor('transparent'),
    color: toggleButtonTokens.ctrlButtonTransparentForegroundColorSelected,

    ':hover': {
      backgroundColor: buttonTokens.ctrlButtonTransparentBackgroundColorHover,
      ...shorthands.borderColor('transparent'),
      color: buttonTokens.ctrlButtonTransparentBackgroundColorHover,
    },

    ':hover:active': {
      backgroundColor: buttonTokens.ctrlButtonTransparentBackgroundColorPressed,
      ...shorthands.borderColor('transparent'),
      color: buttonTokens.ctrlButtonTransparentBackgroundColorPressed,
    },
  },
});

const useRootDisabledStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: tokens.colorNeutralBackgroundDisabled,
    ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    color: tokens.colorNeutralForegroundDisabled,

    ':hover': {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: tokens.colorNeutralForegroundDisabled,
    },

    ':hover:active': {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: tokens.colorNeutralForegroundDisabled,
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

export const useToggleButtonStyles_unstable = (state: ToggleButtonState): ToggleButtonState => {
  const rootCheckedStyles = useRootCheckedStyles();
  const rootDisabledStyles = useRootDisabledStyles();
  const iconCheckedStyles = useIconCheckedStyles();
  const primaryHighContrastStyles = usePrimaryHighContrastStyles();

  const { appearance, checked, disabled, disabledFocusable } = state;

  state.root.className = mergeClasses(
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

    // User provided class name
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      toggleButtonClassNames.icon,
      (appearance === 'subtle' || appearance === 'transparent') && iconCheckedStyles.subtleOrTransparent,
      iconCheckedStyles.highContrast,
      state.icon.className,
    );
  }

  useButtonStyles_unstable(state);

  return state;
};
