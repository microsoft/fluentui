import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { useButtonStyles } from '../Button/useButtonStyles';
import { ToggleButtonState } from './ToggleButton.types';

const useRootStyles = makeStyles({
  checked: theme => ({
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
  checkedOutline: theme => ({
    background: theme.alias.color.neutral.transparentBackgroundSelected,

    ':hover': {
      background: theme.alias.color.neutral.transparentBackgroundHover,
    },

    ':active': {
      background: theme.alias.color.neutral.transparentBackgroundPressed,
    },
  }),
  checkedPrimary: theme => ({
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
  checkedSubtle: theme => ({
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
  checkedTransparent: theme => ({
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
  disabled: theme => ({
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
    state.checked && state.outline && rootStyles.checkedOutline,
    state.checked && state.primary && rootStyles.checkedPrimary,
    state.checked && state.subtle && rootStyles.checkedSubtle,
    state.checked && state.transparent && rootStyles.checkedTransparent,
    (state.disabled || state.disabledFocusable) && rootStyles.disabled,
    (state.disabled || state.disabledFocusable) && state.primary && rootStyles.disabledPrimary,
    (state.disabled || state.disabledFocusable) && state.subtle && rootStyles.disabledSubtle,
    (state.disabled || state.disabledFocusable) && state.transparent && rootStyles.disabledTransparent,
    state.className,
  );

  useButtonStyles(state);

  return state;
};
