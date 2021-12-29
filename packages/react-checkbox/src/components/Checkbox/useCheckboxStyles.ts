import { shorthands, makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { CheckboxState } from './Checkbox.types';

export const checkboxClassName = 'fui-Checkbox';
const indicatorClassName = 'fui-Checkbox-indicator';

// TODO replace these spacing constants with theme values once they're on the theme
const spacingHorizontalS = '8px';
const spacingHorizontalM = '12px';

// The indicator size is used by the indicator and label styles
const indicatorSizeMedium = '16px';
const indicatorSizeLarge = '20px';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'row',
    cursor: 'pointer',
    columnGap: spacingHorizontalM,
    ...shorthands.padding(spacingHorizontalS),
  },

  disabled: {
    cursor: 'default',
  },

  focusIndicator: theme => createFocusOutlineStyle(theme, { style: {}, selector: 'focus-within' }),

  // These `__Colors` styles are mutually exclusive: exactly one should be applied at any time
  uncheckedColors: theme => ({
    color: theme.colorNeutralForeground3,
    [`& .${indicatorClassName}`]: {
      borderColor: theme.colorNeutralStrokeAccessible,
    },

    ':hover': {
      color: theme.colorNeutralForeground2,
      [`& .${indicatorClassName}`]: {
        borderColor: theme.colorNeutralStrokeAccessibleHover,
      },
    },

    ':active:hover': {
      color: theme.colorNeutralForeground1,
      [`& .${indicatorClassName}`]: {
        borderColor: theme.colorNeutralStrokeAccessiblePressed,
      },
    },
  }),

  checkedColors: theme => ({
    color: theme.colorNeutralForeground1,
    [`& .${indicatorClassName}`]: {
      backgroundColor: theme.colorCompoundBrandBackground,
      color: theme.colorNeutralForegroundOnBrand,
      borderColor: theme.colorCompoundBrandBackground,
    },

    ':hover': {
      [`& .${indicatorClassName}`]: {
        backgroundColor: theme.colorCompoundBrandBackgroundHover,
        borderColor: theme.colorCompoundBrandBackgroundHover,
      },
    },

    ':active:hover': {
      [`& .${indicatorClassName}`]: {
        backgroundColor: theme.colorCompoundBrandBackgroundPressed,
        borderColor: theme.colorCompoundBrandBackgroundPressed,
      },
    },
  }),

  mixedColors: theme => ({
    color: theme.colorNeutralForeground1,
    [`& .${indicatorClassName}`]: {
      borderColor: theme.colorCompoundBrandStroke,
      color: theme.colorCompoundBrandForeground1,
    },

    ':hover': {
      [`& .${indicatorClassName}`]: {
        borderColor: theme.colorCompoundBrandStrokeHover,
        color: theme.colorCompoundBrandForeground1Hover,
      },
    },

    ':active:hover': {
      [`& .${indicatorClassName}`]: {
        borderColor: theme.colorCompoundBrandStrokePressed,
        color: theme.colorCompoundBrandForeground1Pressed,
      },
    },
  }),

  disabledColors: theme => ({
    color: theme.colorNeutralForegroundDisabled,
    [`& .${indicatorClassName}`]: {
      borderColor: theme.colorNeutralStrokeDisabled,
      color: theme.colorNeutralForegroundDisabled,
    },
  }),
});

const useInputStyles = makeStyles({
  base: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    ...shorthands.margin(0),
    opacity: 0,
    cursor: 'inherit',
  },
});

const useIndicatorStyles = makeStyles({
  base: theme => ({
    alignSelf: 'flex-start',
    boxSizing: 'border-box',
    flexShrink: 0,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...shorthands.overflow('hidden'),

    ...shorthands.border(theme.strokeWidthThin, 'solid'),
    ...shorthands.borderRadius(theme.borderRadiusSmall),
    fill: 'currentColor',
    cursor: 'inherit',
  }),

  medium: {
    width: indicatorSizeMedium,
    height: indicatorSizeMedium,
  },

  large: {
    width: indicatorSizeLarge,
    height: indicatorSizeLarge,
  },

  circular: theme => ({
    ...shorthands.borderRadius(theme.borderRadiusCircular),
  }),

  unchecked: {
    '& > *': {
      opacity: 0,
    },
  },
});

const useLabelStyles = makeStyles({
  base: {
    alignSelf: 'center',
    userSelect: 'none',
    cursor: 'inherit',
    color: 'inherit',
  },

  // Use a (negative) margin to account for the difference between the indicator's height and the label's line height.
  // This prevents the label from expanding the height of the Checkbox, but preserves line height if the label wraps.
  medium: theme => ({
    ...shorthands.margin(`calc((${indicatorSizeMedium} - ${theme.lineHeightBase300}) / 2)`, 0),
  }),
  large: theme => ({
    ...shorthands.margin(`calc((${indicatorSizeLarge} - ${theme.lineHeightBase300}) / 2)`, 0),
  }),
});

/**
 * Apply styling to the Checkbox slots based on the state
 */
export const useCheckboxStyles = (state: CheckboxState): CheckboxState => {
  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    checkboxClassName,
    rootStyles.base,
    rootStyles.focusIndicator,
    state.input.disabled && rootStyles.disabled,
    // Pick exactly one of the color classes, based on `disabled` and `checked`
    state.input.disabled
      ? rootStyles.disabledColors
      : state.checked === 'mixed'
      ? rootStyles.mixedColors
      : state.checked
      ? rootStyles.checkedColors
      : rootStyles.uncheckedColors,
    state.root.className,
  );

  const inputStyles = useInputStyles();
  state.input.className = mergeClasses(inputStyles.base, state.input.className);

  const indicatorStyles = useIndicatorStyles();
  state.indicator.className = mergeClasses(
    indicatorClassName,
    indicatorStyles.base,
    indicatorStyles[state.size],
    state.circular && indicatorStyles.circular,
    !state.checked && indicatorStyles.unchecked,
    state.indicator.className,
  );

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(labelStyles.base, labelStyles[state.size], state.label.className);
  }

  return state;
};
