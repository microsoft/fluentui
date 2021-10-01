import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { useButtonStyles } from '../Button/useButtonStyles';
import type { ToggleButtonState } from './ToggleButton.types';

const useRootStyles = makeStyles({
  checked: theme => ({
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
  checkedOutline: theme => ({
    background: theme.colorTransparentBackgroundSelected,

    ':hover': {
      background: theme.colorTransparentBackgroundHover,
    },

    ':active': {
      background: theme.colorTransparentBackgroundPressed,
    },
  }),
  checkedPrimary: theme => ({
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
  checkedSubtle: theme => ({
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
  checkedTransparent: theme => ({
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
  disabled: theme => ({
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
  disabledPrimary: {
    borderColor: 'transparent',

    ':hover': {
      borderColor: 'transparent',
    },

    ':active': {
      borderColor: 'transparent',
    },
  },
  disabledSubtle: {
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
  disabledTransparent: {
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
  const rootStyles = useRootStyles();

  state.className = mergeClasses(
    state.checked && rootStyles.checked,
    state.checked && state.appearance === 'outline' && rootStyles.checkedOutline,
    state.checked && state.appearance === 'primary' && rootStyles.checkedPrimary,
    state.checked && state.appearance === 'subtle' && rootStyles.checkedSubtle,
    state.checked && state.appearance === 'transparent' && rootStyles.checkedTransparent,
    (state.disabled || state.disabledFocusable) && rootStyles.disabled,
    (state.disabled || state.disabledFocusable) && state.appearance === 'primary' && rootStyles.disabledPrimary,
    (state.disabled || state.disabledFocusable) && state.appearance === 'subtle' && rootStyles.disabledSubtle,
    (state.disabled || state.disabledFocusable) && state.appearance === 'transparent' && rootStyles.disabledTransparent,
    state.className,
  );

  useButtonStyles(state);

  return state;
};
