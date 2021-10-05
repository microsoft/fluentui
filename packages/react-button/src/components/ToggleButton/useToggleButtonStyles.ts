import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { useButtonStyles } from '../Button/useButtonStyles';
import type { ToggleButtonState } from './ToggleButton.types';

const useCheckedStyles = makeStyles({
  // Base styles
  base: theme => ({
    background: theme.colorNeutralBackground1Selected,
    borderColor: theme.colorNeutralStroke1,
    color: theme.colorNeutralForeground1,

    borderWidth: theme.strokeWidthThin,

    ':hover': {
      background: theme.colorNeutralBackground1Hover,
      borderColor: theme.colorNeutralStroke1Hover,
      color: theme.colorNeutralForeground1,
    },

    ':active': {
      background: theme.colorNeutralBackground1Pressed,
      borderColor: theme.colorNeutralStroke1Pressed,
      color: theme.colorNeutralForeground1,
    },
  }),

  // Appearance variations
  outline: theme => ({
    background: theme.colorTransparentBackgroundSelected,

    ':hover': {
      background: theme.colorTransparentBackgroundHover,
    },

    ':active': {
      background: theme.colorTransparentBackgroundPressed,
    },
  }),
  primary: theme => ({
    background: theme.colorBrandBackgroundSelected,
    borderColor: 'transparent',
    color: theme.colorNeutralForegroundOnBrand,

    ':hover': {
      background: theme.colorBrandBackgroundHover,
      borderColor: 'transparent',
      color: theme.colorNeutralForegroundOnBrand,
    },

    ':active': {
      background: theme.colorBrandBackgroundPressed,
      borderColor: 'transparent',
      color: theme.colorNeutralForegroundOnBrand,
    },
  }),
  subtle: theme => ({
    background: theme.colorSubtleBackgroundSelected,
    borderColor: 'transparent',
    color: theme.colorNeutralForeground2BrandSelected,

    ':hover': {
      background: theme.colorSubtleBackgroundHover,
      borderColor: 'transparent',
      color: theme.colorNeutralForeground2BrandHover,
    },

    ':active': {
      background: theme.colorSubtleBackgroundPressed,
      borderColor: 'transparent',
      color: theme.colorNeutralForeground2BrandPressed,
    },
  }),
  transparent: theme => ({
    background: theme.colorTransparentBackgroundSelected,
    borderColor: 'transparent',
    color: theme.colorNeutralForeground2BrandSelected,

    ':hover': {
      background: theme.colorTransparentBackgroundHover,
      borderColor: 'transparent',
      color: theme.colorNeutralForeground2BrandHover,
    },

    ':active': {
      background: theme.colorTransparentBackgroundPressed,
      borderColor: 'transparent',
      color: theme.colorNeutralForeground2BrandPressed,
    },
  }),
});

const useDisabledStyles = makeStyles({
  // Base styles
  base: theme => ({
    background: theme.colorNeutralBackgroundDisabled,
    borderColor: theme.colorNeutralStrokeDisabled,
    color: theme.colorNeutralForegroundDisabled,

    ':hover': {
      background: theme.colorNeutralBackgroundDisabled,
      borderColor: theme.colorNeutralStrokeDisabled,
      color: theme.colorNeutralForegroundDisabled,
    },

    ':active': {
      background: theme.colorNeutralBackgroundDisabled,
      borderColor: theme.colorNeutralStrokeDisabled,
      color: theme.colorNeutralForegroundDisabled,
    },
  }),

  // Appearance variations
  outline: {
    /* No styles */
  },
  primary: {
    borderColor: 'transparent',

    ':hover': {
      borderColor: 'transparent',
    },

    ':active': {
      borderColor: 'transparent',
    },
  },
  subtle: {
    background: 'none',
    borderColor: 'transparent',

    ':hover': {
      background: 'none',
      borderColor: 'transparent',
    },

    ':active': {
      background: 'none',
      borderColor: 'transparent',
    },
  },
  transparent: {
    background: 'none',
    borderColor: 'transparent',

    ':hover': {
      background: 'none',
      borderColor: 'transparent',
    },

    ':active': {
      background: 'none',
      borderColor: 'transparent',
    },
  },
});

export const useToggleButtonStyles = (state: ToggleButtonState): ToggleButtonState => {
  const checkedStyles = useCheckedStyles();
  const disabledStyles = useDisabledStyles();

  const { appearance, checked, disabled, disabledFocusable } = state;

  state.root.className = mergeClasses(
    // Checked styles
    checked && checkedStyles.base,
    appearance && checked && checkedStyles[appearance],

    // Disabled styles
    (disabled || disabledFocusable) && disabledStyles.base,
    appearance && (disabled || disabledFocusable) && disabledStyles[appearance],

    // User provided class name
    state.root.className,
  );

  useButtonStyles(state);

  return state;
};
