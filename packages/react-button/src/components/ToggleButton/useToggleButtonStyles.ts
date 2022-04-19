import { shorthands, mergeClasses, makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { useButtonStyles_unstable } from '../Button/useButtonStyles';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ButtonSlots } from '../Button/Button.types';
import type { ToggleButtonState } from './ToggleButton.types';

export const toggleButtonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-ToggleButton',
  icon: 'fui-ToggleButton__icon',
};

/**
 * @deprecated Use `toggleButtonClassName.root` instead.
 */
export const toggleButtonClassName = toggleButtonClassNames.root;

const useCheckedStyles = makeStyles({
  // Base styles
  base: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
    ...shorthands.borderColor(tokens.colorNeutralStroke1),
    color: tokens.colorNeutralForeground1,

    ...shorthands.borderWidth(tokens.strokeWidthThin),

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Hover),
      color: tokens.colorNeutralForeground1,
    },

    ':active': {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      ...shorthands.borderColor(tokens.colorNeutralStroke1Pressed),
      color: tokens.colorNeutralForeground1,
    },
  },

  // Appearance variations
  outline: {
    backgroundColor: tokens.colorTransparentBackgroundSelected,

    ':hover': {
      backgroundColor: tokens.colorTransparentBackgroundHover,
    },

    ':active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
    },
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

    ':active': {
      backgroundColor: tokens.colorBrandBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },
  subtle: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,
    ...shorthands.borderColor('transparent'),
    color: tokens.colorNeutralForeground2BrandSelected,

    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2BrandHover,
    },

    ':active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2BrandPressed,
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

    ':active': {
      backgroundColor: tokens.colorTransparentBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: tokens.colorNeutralForeground2BrandPressed,
    },
  },
});

const useDisabledStyles = makeStyles({
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

    ':active': {
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

    ':active': {
      ...shorthands.borderColor('transparent'),
    },
  },
  subtle: {
    backgroundColor: 'transparent',
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: 'transparent',
      ...shorthands.borderColor('transparent'),
    },

    ':active': {
      backgroundColor: 'transparent',
      ...shorthands.borderColor('transparent'),
    },
  },
  transparent: {
    backgroundColor: 'transparent',
    ...shorthands.borderColor('transparent'),

    ':hover': {
      backgroundColor: 'transparent',
      ...shorthands.borderColor('transparent'),
    },

    ':active': {
      backgroundColor: 'transparent',
      ...shorthands.borderColor('transparent'),
    },
  },
});

export const useToggleButtonStyles_unstable = (state: ToggleButtonState): ToggleButtonState => {
  const checkedStyles = useCheckedStyles();
  const disabledStyles = useDisabledStyles();

  const { appearance, checked, disabled, disabledFocusable } = state;

  state.root.className = mergeClasses(
    toggleButtonClassNames.root,

    // Checked styles
    checked && checkedStyles.base,
    appearance && checked && checkedStyles[appearance],

    // Disabled styles
    (disabled || disabledFocusable) && disabledStyles.base,
    appearance && (disabled || disabledFocusable) && disabledStyles[appearance],

    // User provided class name
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(toggleButtonClassNames.icon, state.icon.className);
  }

  useButtonStyles_unstable(state);

  return state;
};
