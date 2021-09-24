import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { useButtonStyles } from '../Button/useButtonStyles';
import type { ToggleButtonState } from './ToggleButton.types';

const useCheckedStyles = makeStyles({
  // Base styles
  base: theme => ({
    background: theme.alias.color.neutral.neutralBackground1Selected,
    borderColor: theme.alias.color.neutral.neutralStroke1,
    color: theme.alias.color.neutral.neutralForeground1,

    borderWidth: theme.global.strokeWidth.thin,

    ':hover': {
      background: theme.alias.color.neutral.neutralBackground1Hover,
      borderColor: theme.alias.color.neutral.neutralStroke1Hover,
      color: theme.alias.color.neutral.neutralForeground1,
    },

    ':active': {
      background: theme.alias.color.neutral.neutralBackground1Pressed,
      borderColor: theme.alias.color.neutral.neutralStroke1Pressed,
      color: theme.alias.color.neutral.neutralForeground1,
    },
  }),

  // Appearance variations
  outline: theme => ({
    background: theme.alias.color.neutral.transparentBackgroundSelected,

    ':hover': {
      background: theme.alias.color.neutral.transparentBackgroundHover,
    },

    ':active': {
      background: theme.alias.color.neutral.transparentBackgroundPressed,
    },
  }),
  primary: theme => ({
    background: theme.alias.color.neutral.brandBackgroundSelected,
    borderColor: 'transparent',
    color: theme.alias.color.neutral.neutralForegroundOnBrand,

    ':hover': {
      background: theme.alias.color.neutral.brandBackgroundHover,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForegroundOnBrand,
    },

    ':active': {
      background: theme.alias.color.neutral.brandBackgroundPressed,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForegroundOnBrand,
    },
  }),
  subtle: theme => ({
    background: theme.alias.color.neutral.subtleBackgroundSelected,
    borderColor: 'transparent',
    color: theme.alias.color.neutral.neutralForeground2BrandSelected,

    ':hover': {
      background: theme.alias.color.neutral.subtleBackgroundHover,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForeground2BrandHover,
    },

    ':active': {
      background: theme.alias.color.neutral.subtleBackgroundPressed,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForeground2BrandPressed,
    },
  }),
  transparent: theme => ({
    background: theme.alias.color.neutral.transparentBackgroundSelected,
    borderColor: 'transparent',
    color: theme.alias.color.neutral.neutralForeground2BrandSelected,

    ':hover': {
      background: theme.alias.color.neutral.transparentBackgroundHover,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForeground2BrandHover,
    },

    ':active': {
      background: theme.alias.color.neutral.transparentBackgroundPressed,
      borderColor: 'transparent',
      color: theme.alias.color.neutral.neutralForeground2BrandPressed,
    },
  }),
});

const useDisabledStyles = makeStyles({
  // Base styles
  base: theme => ({
    background: theme.alias.color.neutral.neutralBackgroundDisabled,
    borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
    color: theme.alias.color.neutral.neutralForegroundDisabled,

    ':hover': {
      background: theme.alias.color.neutral.neutralBackgroundDisabled,
      borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
      color: theme.alias.color.neutral.neutralForegroundDisabled,
    },

    ':active': {
      background: theme.alias.color.neutral.neutralBackgroundDisabled,
      borderColor: theme.alias.color.neutral.neutralStrokeDisabled,
      color: theme.alias.color.neutral.neutralForegroundDisabled,
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
