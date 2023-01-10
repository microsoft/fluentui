import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { CheckboxSlots, CheckboxState } from './Checkbox.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const checkboxClassNames: SlotClassNames<CheckboxSlots> = {
  root: 'fui-Checkbox',
  label: 'fui-Checkbox__label',
  input: 'fui-Checkbox__input',
  indicator: 'fui-Checkbox__indicator',
};

const vars = {
  labelColor: '--UNSTABLE__fui-Checkbox__label--color',
  indicatorBackgroundColor: '--UNSTABLE__fui-Checkbox__indicator--backgroundColor',
  indicatorBorderColor: '--UNSTABLE__fui-Checkbox__indicator--borderColor',
  indicatorColor: '--UNSTABLE__fui-Checkbox__indicator--color',
  indicatorSize: '--UNSTABLE__fui-Checkbox__indicator--size',
} as const;

const values = {
  labelColor: `var(${vars.labelColor}, ${tokens.colorNeutralForeground3})`,
  indicatorBackgroundColor: `var(${vars.indicatorBackgroundColor})`,
  indicatorBorderColor: `var(${vars.indicatorBorderColor}, ${tokens.colorNeutralStrokeAccessible})`,
  indicatorColor: `var(${vars.indicatorColor}, transparent)`,
  indicatorSize: `var(${vars.indicatorSize}, 16px)`,
} as const;

const useRootBaseClassName = makeResetStyles({
  position: 'relative',
  display: 'inline-flex',
  cursor: 'pointer',
  ...createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
});

const useRootStyles = makeStyles({
  large: {
    [vars.indicatorSize]: '20px',
  },
  disabled: {
    cursor: 'default',
  },
});

const useInputBaseClassName = makeResetStyles({
  boxSizing: 'border-box',
  cursor: 'inherit',
  height: '100%',
  margin: 0,
  opacity: 0,
  position: 'absolute',
  top: 0,
  // Calculate the width of the hidden input by taking into account the size of the indicator + the padding around it.
  // This is done so that clicking on that "empty space" still toggles the checkbox.
  width: `calc(${values.indicatorSize} + 2 * ${tokens.spacingHorizontalS})`,

  // Colors for the unchecked state
  ':enabled:not(:checked):not(:indeterminate)': {
    [`& ~ .${checkboxClassNames.label}`]: {
      [vars.labelColor]: tokens.colorNeutralForeground3,
    },
    [`& ~ .${checkboxClassNames.indicator}`]: {
      [vars.indicatorBorderColor]: tokens.colorNeutralStrokeAccessible,
    },

    ':hover': {
      [`& ~ .${checkboxClassNames.label}`]: {
        [vars.labelColor]: tokens.colorNeutralForeground2,
      },
      [`& ~ .${checkboxClassNames.indicator}`]: {
        [vars.indicatorBorderColor]: tokens.colorNeutralStrokeAccessibleHover,
      },
    },

    ':active:hover': {
      [`& ~ .${checkboxClassNames.label}`]: {
        [vars.labelColor]: tokens.colorNeutralForeground1,
      },
      [`& ~ .${checkboxClassNames.indicator}`]: {
        [vars.indicatorBorderColor]: tokens.colorNeutralStrokeAccessiblePressed,
      },
    },
  },

  // Colors for the checked state
  ':enabled:checked:not(:indeterminate)': {
    [`& ~ .${checkboxClassNames.label}`]: {
      [vars.labelColor]: tokens.colorNeutralForeground1,
    },
    [`& ~ .${checkboxClassNames.indicator}`]: {
      [vars.indicatorBackgroundColor]: tokens.colorCompoundBrandBackground,
      [vars.indicatorColor]: tokens.colorNeutralForegroundInverted,
      [vars.indicatorBorderColor]: tokens.colorCompoundBrandBackground,
    },

    ':hover': {
      [`& ~ .${checkboxClassNames.indicator}`]: {
        [vars.indicatorBackgroundColor]: tokens.colorCompoundBrandBackgroundHover,
        [vars.indicatorBorderColor]: tokens.colorCompoundBrandBackgroundHover,
      },
    },

    ':active:hover': {
      [`& ~ .${checkboxClassNames.indicator}`]: {
        [vars.indicatorBackgroundColor]: tokens.colorCompoundBrandBackgroundPressed,
        [vars.indicatorBorderColor]: tokens.colorCompoundBrandBackgroundPressed,
      },
    },
  },

  // Colors for the mixed state
  ':enabled:indeterminate': {
    [`& ~ .${checkboxClassNames.label}`]: {
      [vars.labelColor]: tokens.colorNeutralForeground1,
    },
    [`& ~ .${checkboxClassNames.indicator}`]: {
      [vars.indicatorBorderColor]: tokens.colorCompoundBrandStroke,
      [vars.indicatorColor]: tokens.colorCompoundBrandForeground1,
    },

    ':hover': {
      [`& ~ .${checkboxClassNames.indicator}`]: {
        [vars.indicatorBorderColor]: tokens.colorCompoundBrandStrokeHover,
        [vars.indicatorColor]: tokens.colorCompoundBrandForeground1Hover,
      },
    },

    ':active:hover': {
      [`& ~ .${checkboxClassNames.indicator}`]: {
        [vars.indicatorBorderColor]: tokens.colorCompoundBrandStrokePressed,
        [vars.indicatorColor]: tokens.colorCompoundBrandForeground1Pressed,
      },
    },
  },

  ':disabled': {
    [`& ~ .${checkboxClassNames.label}`]: {
      [vars.labelColor]: tokens.colorNeutralForegroundDisabled,
      '@media (forced-colors: active)': {
        [vars.labelColor]: 'GrayText',
      },
    },
    [`& ~ .${checkboxClassNames.indicator}`]: {
      [vars.indicatorBorderColor]: tokens.colorNeutralStrokeDisabled,
      [vars.indicatorColor]: tokens.colorNeutralForegroundDisabled,
      '@media (forced-colors: active)': {
        [vars.indicatorColor]: 'GrayText',
      },
    },
  },
});

const useInputStyles = makeStyles({
  before: {
    right: 0,
  },
  after: {
    left: 0,
  },
});

const useIndicatorBaseClassName = makeResetStyles({
  alignSelf: 'flex-start',
  boxSizing: 'border-box',
  flexShrink: 0,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',

  color: values.indicatorColor,
  backgroundColor: values.indicatorBackgroundColor,
  border: tokens.strokeWidthThin + ' solid ' + values.indicatorBorderColor,
  borderRadius: tokens.borderRadiusSmall,
  margin: tokens.spacingVerticalS + ' ' + tokens.spacingHorizontalS,
  fill: 'currentColor',
  pointerEvents: 'none',

  fontSize: `calc(${values.indicatorSize} - 4px)`,
  height: values.indicatorSize,
  width: values.indicatorSize,
});

const useIndicatorStyles = makeStyles({
  circular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
});

// Can't use makeResetStyles here because Label is a component that may itself use makeResetStyles.
const useLabelStyles = makeStyles({
  base: {
    alignSelf: 'center',
    color: values.labelColor,
    cursor: 'inherit',
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),

    // Use a (negative) margin to account for the difference between the indicator's height and the label's line height.
    // This prevents the label from expanding the height of the checkbox, but preserves line height if the label wraps.
    marginTop: `calc((${values.indicatorSize} - ${tokens.lineHeightBase300}) / 2)`,
    marginBottom: `calc((${values.indicatorSize} - ${tokens.lineHeightBase300}) / 2)`,
  },

  before: {
    paddingRight: tokens.spacingHorizontalXS,
  },
  after: {
    paddingLeft: tokens.spacingHorizontalXS,
  },
});

/**
 * Apply styling to the Checkbox slots based on the state
 */
export const useCheckboxStyles_unstable = (state: CheckboxState): CheckboxState => {
  const { labelPosition, shape, size } = state;

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    checkboxClassNames.root,
    rootBaseClassName,
    size === 'large' && rootStyles.large,
    state.input.disabled && rootStyles.disabled,
    state.root.className,
  );

  const inputBaseClassName = useInputBaseClassName();
  const inputStyles = useInputStyles();
  state.input.className = mergeClasses(
    checkboxClassNames.input,
    inputBaseClassName,
    inputStyles[labelPosition],
    state.input.className,
  );

  const indicatorBaseClassName = useIndicatorBaseClassName();
  const indicatorStyles = useIndicatorStyles();
  if (state.indicator) {
    state.indicator.className = mergeClasses(
      checkboxClassNames.indicator,
      indicatorBaseClassName,
      shape === 'circular' && indicatorStyles.circular,
      state.indicator.className,
    );
  }

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      checkboxClassNames.label,
      labelStyles.base,
      labelStyles[labelPosition],
      state.label.className,
    );
  }

  return state;
};
