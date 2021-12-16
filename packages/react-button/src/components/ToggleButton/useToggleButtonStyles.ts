import { shorthands, mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { useButtonStyles } from '../Button/useButtonStyles';
import type { ToggleButtonState } from './ToggleButton.types';

export const toggleButtonClassName = 'fui-ToggleButton';

const useCheckedStyles = makeStyles({
  // Base styles
  base: theme => ({
    backgroundColor: theme.colorNeutralBackground1Selected,
    ...shorthands.borderColor(theme.colorNeutralStroke1),
    color: theme.colorNeutralForeground1,

    ...shorthands.borderWidth(theme.strokeWidthThin),

    ':hover': {
      backgroundColor: theme.colorNeutralBackground1Hover,
      ...shorthands.borderColor(theme.colorNeutralStroke1Hover),
      color: theme.colorNeutralForeground1,
    },

    ':active': {
      backgroundColor: theme.colorNeutralBackground1Pressed,
      ...shorthands.borderColor(theme.colorNeutralStroke1Pressed),
      color: theme.colorNeutralForeground1,
    },
  }),

  // Appearance variations
  outline: theme => ({
    backgroundColor: theme.colorTransparentBackgroundSelected,

    ':hover': {
      backgroundColor: theme.colorTransparentBackgroundHover,
    },

    ':active': {
      backgroundColor: theme.colorTransparentBackgroundPressed,
    },
  }),
  primary: theme => ({
    backgroundColor: theme.colorBrandBackgroundSelected,
    ...shorthands.borderColor('transparent'),
    color: theme.colorNeutralForegroundOnBrand,

    ':hover': {
      backgroundColor: theme.colorBrandBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: theme.colorNeutralForegroundOnBrand,
    },

    ':active': {
      backgroundColor: theme.colorBrandBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: theme.colorNeutralForegroundOnBrand,
    },
  }),
  subtle: theme => ({
    backgroundColor: theme.colorSubtleBackgroundSelected,
    ...shorthands.borderColor('transparent'),
    color: theme.colorNeutralForeground2BrandSelected,

    ':hover': {
      backgroundColor: theme.colorSubtleBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: theme.colorNeutralForeground2BrandHover,
    },

    ':active': {
      backgroundColor: theme.colorSubtleBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: theme.colorNeutralForeground2BrandPressed,
    },
  }),
  transparent: theme => ({
    backgroundColor: theme.colorTransparentBackgroundSelected,
    ...shorthands.borderColor('transparent'),
    color: theme.colorNeutralForeground2BrandSelected,

    ':hover': {
      backgroundColor: theme.colorTransparentBackgroundHover,
      ...shorthands.borderColor('transparent'),
      color: theme.colorNeutralForeground2BrandHover,
    },

    ':active': {
      backgroundColor: theme.colorTransparentBackgroundPressed,
      ...shorthands.borderColor('transparent'),
      color: theme.colorNeutralForeground2BrandPressed,
    },
  }),
});

const useDisabledStyles = makeStyles({
  // Base styles
  base: theme => ({
    backgroundColor: theme.colorNeutralBackgroundDisabled,
    ...shorthands.borderColor(theme.colorNeutralStrokeDisabled),
    color: theme.colorNeutralForegroundDisabled,

    ':hover': {
      backgroundColor: theme.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(theme.colorNeutralStrokeDisabled),
      color: theme.colorNeutralForegroundDisabled,
    },

    ':active': {
      backgroundColor: theme.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(theme.colorNeutralStrokeDisabled),
      color: theme.colorNeutralForegroundDisabled,
    },
  }),

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

export const useToggleButtonStyles = (state: ToggleButtonState): ToggleButtonState => {
  const checkedStyles = useCheckedStyles();
  const disabledStyles = useDisabledStyles();

  const { appearance, checked, disabled, disabledFocusable } = state;

  state.root.className = mergeClasses(
    toggleButtonClassName,

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
