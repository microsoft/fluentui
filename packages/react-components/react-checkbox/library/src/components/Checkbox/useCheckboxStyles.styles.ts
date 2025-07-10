import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
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

// CSS variables used internally in Checkbox's styles
const vars = {
  indicatorColor: '--fui-Checkbox__indicator--color',
  indicatorBorderColor: '--fui-Checkbox__indicator--borderColor',
  indicatorBackgroundColor: '--fui-Checkbox__indicator--backgroundColor',
} as const;

// The indicator size is used by the indicator and label styles
const indicatorSizeMedium = '16px';
const indicatorSizeLarge = '20px';

const useRootBaseClassName = makeResetStyles({
  position: 'relative',
  display: 'inline-flex',
  cursor: 'pointer',
  verticalAlign: 'middle',
  color: tokens.colorNeutralForeground3,
  ...createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
});

const useRootStyles = makeStyles({
  unchecked: {
    ':hover': {
      color: tokens.colorNeutralForeground2,
      [vars.indicatorBorderColor]: tokens.colorNeutralStrokeAccessibleHover,
    },

    ':active': {
      color: tokens.colorNeutralForeground1,
      [vars.indicatorBorderColor]: tokens.colorNeutralStrokeAccessiblePressed,
    },
  },

  checked: {
    color: tokens.colorNeutralForeground1,
    [vars.indicatorBackgroundColor]: tokens.colorCompoundBrandBackground,
    [vars.indicatorColor]: tokens.colorNeutralForegroundInverted,
    [vars.indicatorBorderColor]: tokens.colorCompoundBrandBackground,

    ':hover': {
      [vars.indicatorBackgroundColor]: tokens.colorCompoundBrandBackgroundHover,
      [vars.indicatorBorderColor]: tokens.colorCompoundBrandBackgroundHover,
    },

    ':active': {
      [vars.indicatorBackgroundColor]: tokens.colorCompoundBrandBackgroundPressed,
      [vars.indicatorBorderColor]: tokens.colorCompoundBrandBackgroundPressed,
    },
  },

  mixed: {
    color: tokens.colorNeutralForeground1,
    [vars.indicatorBorderColor]: tokens.colorCompoundBrandStroke,
    [vars.indicatorColor]: tokens.colorCompoundBrandForeground1,

    ':hover': {
      [vars.indicatorBorderColor]: tokens.colorCompoundBrandStrokeHover,
      [vars.indicatorColor]: tokens.colorCompoundBrandForeground1Hover,
    },

    ':active': {
      [vars.indicatorBorderColor]: tokens.colorCompoundBrandStrokePressed,
      [vars.indicatorColor]: tokens.colorCompoundBrandForeground1Pressed,
    },
  },

  disabled: {
    cursor: 'default',

    color: tokens.colorNeutralForegroundDisabled,
    [vars.indicatorBorderColor]: tokens.colorNeutralStrokeDisabled,
    [vars.indicatorColor]: tokens.colorNeutralForegroundDisabled,

    '@media (forced-colors: active)': {
      color: 'GrayText',
      [vars.indicatorColor]: 'GrayText',
    },
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
  width: `calc(${indicatorSizeMedium} + 2 * ${tokens.spacingHorizontalS})`,
});

const useInputStyles = makeStyles({
  before: {
    right: 0,
  },
  after: {
    left: 0,
  },

  large: {
    width: `calc(${indicatorSizeLarge} + 2 * ${tokens.spacingHorizontalS})`,
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

  color: `var(${vars.indicatorColor})`,
  backgroundColor: `var(${vars.indicatorBackgroundColor})`,
  borderColor: `var(${vars.indicatorBorderColor}, ${tokens.colorNeutralStrokeAccessible})`,
  borderStyle: 'solid',
  borderWidth: tokens.strokeWidthThin,
  borderRadius: tokens.borderRadiusSmall,
  margin: tokens.spacingVerticalS + ' ' + tokens.spacingHorizontalS,
  fill: 'currentColor',
  pointerEvents: 'none',

  fontSize: '12px',
  height: indicatorSizeMedium,
  width: indicatorSizeMedium,
});

const useIndicatorStyles = makeStyles({
  large: {
    fontSize: '16px',
    height: indicatorSizeLarge,
    width: indicatorSizeLarge,
  },

  circular: { borderRadius: tokens.borderRadiusCircular },
});

// Can't use makeResetStyles here because Label is a component that may itself use makeResetStyles.
const useLabelStyles = makeStyles({
  base: {
    alignSelf: 'center',
    color: 'inherit',
    cursor: 'inherit',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
  },

  before: {
    paddingRight: tokens.spacingHorizontalXS,
  },
  after: {
    paddingLeft: tokens.spacingHorizontalXS,
  },

  // Use a (negative) margin to account for the difference between the indicator's height and the label's line height.
  // This prevents the label from expanding the height of the checkbox, but preserves line height if the label wraps.
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
  'use no memo';

  const { checked, disabled, labelPosition, shape, size } = state;

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    checkboxClassNames.root,
    rootBaseClassName,
    disabled
      ? rootStyles.disabled
      : checked === 'mixed'
      ? rootStyles.mixed
      : checked
      ? rootStyles.checked
      : rootStyles.unchecked,
    state.root.className,
  );

  const inputBaseClassName = useInputBaseClassName();
  const inputStyles = useInputStyles();
  state.input.className = mergeClasses(
    checkboxClassNames.input,
    inputBaseClassName,
    size === 'large' && inputStyles.large,
    inputStyles[labelPosition],
    state.input.className,
  );

  const indicatorBaseClassName = useIndicatorBaseClassName();
  const indicatorStyles = useIndicatorStyles();
  if (state.indicator) {
    state.indicator.className = mergeClasses(
      checkboxClassNames.indicator,
      indicatorBaseClassName,
      size === 'large' && indicatorStyles.large,
      shape === 'circular' && indicatorStyles.circular,
      state.indicator.className,
    );
  }

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      checkboxClassNames.label,
      labelStyles.base,
      labelStyles[size],
      labelStyles[labelPosition],
      state.label.className,
    );
  }

  return state;
};
