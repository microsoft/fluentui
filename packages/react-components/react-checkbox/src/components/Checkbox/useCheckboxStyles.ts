import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { CheckboxSlots, CheckboxState } from './Checkbox.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @deprecated Use `checkboxClassNames.root` instead.
 */
export const checkboxClassName = 'fui-Checkbox';
export const checkboxClassNames: SlotClassNames<CheckboxSlots> = {
  root: 'fui-Checkbox',
  label: 'fui-Checkbox__label',
  input: 'fui-Checkbox__input',
  indicator: 'fui-Checkbox__indicator',
};

// The indicator size is used by the indicator and label styles
const indicatorSizeMedium = '16px';
const indicatorSizeLarge = '20px';

const useRootStyles = makeStyles({
  base: {
    position: 'relative',
    display: 'inline-flex',
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
    ...createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
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
    cursor: 'pointer',

    // When unchecked, hide the the checkmark icon (child of the indicator slot)
    [`:not(:checked):not(:indeterminate) ~ .${checkboxClassNames.indicator} > *`]: {
      opacity: 0,
    },

    // Colors for the unchecked state
    ':enabled:not(:checked):not(:indeterminate)': {
      [`& ~ .${checkboxClassNames.label}`]: {
        color: tokens.colorNeutralForeground3,
      },
      [`& ~ .${checkboxClassNames.indicator}`]: {
        ...shorthands.borderColor(tokens.colorNeutralStrokeAccessible),
      },

      ':hover': {
        [`& ~ .${checkboxClassNames.label}`]: {
          color: tokens.colorNeutralForeground2,
        },
        [`& ~ .${checkboxClassNames.indicator}`]: {
          ...shorthands.borderColor(tokens.colorNeutralStrokeAccessibleHover),
        },
      },

      ':active:hover': {
        [`& ~ .${checkboxClassNames.label}`]: {
          color: tokens.colorNeutralForeground1,
        },
        [`& ~ .${checkboxClassNames.indicator}`]: {
          ...shorthands.borderColor(tokens.colorNeutralStrokeAccessiblePressed),
        },
      },
    },

    // Colors for the checked state
    ':enabled:checked:not(:indeterminate)': {
      [`& ~ .${checkboxClassNames.label}`]: {
        color: tokens.colorNeutralForeground1,
      },
      [`& ~ .${checkboxClassNames.indicator}`]: {
        backgroundColor: tokens.colorCompoundBrandBackground,
        color: tokens.colorNeutralForegroundOnBrand,
        ...shorthands.borderColor(tokens.colorCompoundBrandBackground),
      },

      ':hover': {
        [`& ~ .${checkboxClassNames.indicator}`]: {
          backgroundColor: tokens.colorCompoundBrandBackgroundHover,
          ...shorthands.borderColor(tokens.colorCompoundBrandBackgroundHover),
        },
      },

      ':active:hover': {
        [`& ~ .${checkboxClassNames.indicator}`]: {
          backgroundColor: tokens.colorCompoundBrandBackgroundPressed,
          ...shorthands.borderColor(tokens.colorCompoundBrandBackgroundPressed),
        },
      },
    },

    // Colors for the mixed state
    ':enabled:indeterminate': {
      [`& ~ .${checkboxClassNames.label}`]: {
        color: tokens.colorNeutralForeground1,
      },
      [`& ~ .${checkboxClassNames.indicator}`]: {
        ...shorthands.borderColor(tokens.colorCompoundBrandStroke),
        color: tokens.colorCompoundBrandForeground1,
      },

      ':hover': {
        [`& ~ .${checkboxClassNames.indicator}`]: {
          ...shorthands.borderColor(tokens.colorCompoundBrandStrokeHover),
          color: tokens.colorCompoundBrandForeground1Hover,
        },
      },

      ':active:hover': {
        [`& ~ .${checkboxClassNames.indicator}`]: {
          ...shorthands.borderColor(tokens.colorCompoundBrandStrokePressed),
          color: tokens.colorCompoundBrandForeground1Pressed,
        },
      },
    },

    ':disabled': {
      cursor: 'default',

      [`& ~ .${checkboxClassNames.label}`]: {
        color: tokens.colorNeutralForegroundDisabled,
        '@media (forced-colors: active)': {
          color: 'GrayText',
        },
      },
      [`& ~ .${checkboxClassNames.indicator}`]: {
        ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
        color: tokens.colorNeutralForegroundDisabled,
        '@media (forced-colors: active)': {
          color: 'GrayText',
        },
      },
      [`& ~ .${checkboxClassNames.indicator} svg`]: {
        '@media (forced-colors: active)': {
          color: 'GrayText',
        },
      },
    },
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
    pointerEvents: 'none',
  },

  medium: {
    width: indicatorSizeMedium,
    height: indicatorSizeMedium,
    fontSize: '12px',
  },

  large: {
    width: indicatorSizeLarge,
    height: indicatorSizeLarge,
    fontSize: '16px',
  },

  circular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
});

const useLabelStyles = makeStyles({
  base: {
    alignSelf: 'center',
    userSelect: 'none',
    cursor: 'inherit',
    color: 'inherit',
  },

  before: {
    marginRight: tokens.spacingHorizontalM,
  },
  after: {
    marginLeft: tokens.spacingHorizontalM,
  },

  // Use a (negative) margin to account for the difference between the indicator's height and the label's line height.
  // This prevents the label from expanding the height of the Checkbox, but preserves line height if the label wraps.
  medium: {
    marginTop: `calc((${indicatorSizeMedium} - ${tokens.lineHeightBase300}) / 2)`,
    marginBottom: `calc((${indicatorSizeMedium} - ${tokens.lineHeightBase300}) / 2)`,
  },
  large: {
    marginTop: `calc((${indicatorSizeLarge} - ${tokens.lineHeightBase300}) / 2)`,
    marginBottom: `calc((${indicatorSizeLarge} - ${tokens.lineHeightBase300}) / 2)`,
  },
});

/**
 * Apply styling to the Checkbox slots based on the state
 */
export const useCheckboxStyles_unstable = (state: CheckboxState): CheckboxState => {
  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(checkboxClassNames.root, rootStyles.base, state.root.className);

  const inputStyles = useInputStyles();
  state.input.className = mergeClasses(checkboxClassNames.input, inputStyles.base, state.input.className);

  const indicatorStyles = useIndicatorStyles();
  if (state.indicator) {
    state.indicator.className = mergeClasses(
      checkboxClassNames.indicator,
      indicatorStyles.base,
      indicatorStyles[state.size],
      state.shape === 'circular' && indicatorStyles.circular,
      state.indicator.className,
    );
  }

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      checkboxClassNames.label,
      labelStyles.base,
      labelStyles[state.size],
      labelStyles[state.labelPosition],
      state.label.className,
    );
  }

  return state;
};
