import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
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

  focusIndicator: createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),

  // These `__Colors` styles are mutually exclusive: exactly one should be applied at any time
  uncheckedColors: {
    color: tokens.colorNeutralForeground3,
    [`& .${indicatorClassName}`]: {
      ...shorthands.borderColor(tokens.colorNeutralStrokeAccessible),
    },

    ':hover': {
      color: tokens.colorNeutralForeground2,
      [`& .${indicatorClassName}`]: {
        ...shorthands.borderColor(tokens.colorNeutralStrokeAccessibleHover),
      },
    },

    ':active:hover': {
      color: tokens.colorNeutralForeground1,
      [`& .${indicatorClassName}`]: {
        ...shorthands.borderColor(tokens.colorNeutralStrokeAccessiblePressed),
      },
    },
  },

  checkedColors: {
    color: tokens.colorNeutralForeground1,
    [`& .${indicatorClassName}`]: {
      backgroundColor: tokens.colorCompoundBrandBackground,
      color: tokens.colorNeutralForegroundOnBrand,
      ...shorthands.borderColor(tokens.colorCompoundBrandBackground),
    },

    ':hover': {
      [`& .${indicatorClassName}`]: {
        backgroundColor: tokens.colorCompoundBrandBackgroundHover,
        ...shorthands.borderColor(tokens.colorCompoundBrandBackgroundHover),
      },
    },

    ':active:hover': {
      [`& .${indicatorClassName}`]: {
        backgroundColor: tokens.colorCompoundBrandBackgroundPressed,
        ...shorthands.borderColor(tokens.colorCompoundBrandBackgroundPressed),
      },
    },
  },

  mixedColors: {
    color: tokens.colorNeutralForeground1,
    [`& .${indicatorClassName}`]: {
      ...shorthands.borderColor(tokens.colorCompoundBrandStroke),
      color: tokens.colorCompoundBrandForeground1,
    },

    ':hover': {
      [`& .${indicatorClassName}`]: {
        ...shorthands.borderColor(tokens.colorCompoundBrandStrokeHover),
        color: tokens.colorCompoundBrandForeground1Hover,
      },
    },

    ':active:hover': {
      [`& .${indicatorClassName}`]: {
        ...shorthands.borderColor(tokens.colorCompoundBrandStrokePressed),
        color: tokens.colorCompoundBrandForeground1Pressed,
      },
    },
  },

  disabledColors: {
    color: tokens.colorNeutralForegroundDisabled,
    [`& .${indicatorClassName}`]: {
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
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
  base: {
    alignSelf: 'flex-start',
    boxSizing: 'border-box',
    flexShrink: 0,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...shorthands.overflow('hidden'),

    ...shorthands.border(tokens.strokeWidthThin, 'solid'),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    fill: 'currentColor',
    cursor: 'inherit',
  },

  medium: {
    width: indicatorSizeMedium,
    height: indicatorSizeMedium,
  },

  large: {
    width: indicatorSizeLarge,
    height: indicatorSizeLarge,
  },

  circular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },

  unchecked: {
    '& > *': {
      opacity: '0',
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
  medium: {
    ...shorthands.margin(`calc((${indicatorSizeMedium} - ${tokens.lineHeightBase300}) / 2)`, 0),
  },
  large: {
    ...shorthands.margin(`calc((${indicatorSizeLarge} - ${tokens.lineHeightBase300}) / 2)`, 0),
  },
});

/**
 * Apply styling to the Checkbox slots based on the state
 */
export const useCheckboxStyles_unstable = (state: CheckboxState): CheckboxState => {
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
  if (state.indicator) {
    state.indicator.className = mergeClasses(
      indicatorClassName,
      indicatorStyles.base,
      indicatorStyles[state.size],
      state.shape === 'circular' && indicatorStyles.circular,
      !state.checked && indicatorStyles.unchecked,
      state.indicator.className,
    );
  }

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(labelStyles.base, labelStyles[state.size], state.label.className);
  }

  return state;
};
