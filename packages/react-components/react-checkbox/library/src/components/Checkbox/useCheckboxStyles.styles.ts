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
  color: `var(--ctrl-token-Checkbox-791, var(--semantic-token-Checkbox-792, ${tokens.colorNeutralForeground3}))`,
  ...createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
});

const useRootStyles = makeStyles({
  unchecked: {
    ':hover': {
      color: `var(--ctrl-token-Checkbox-793, var(--semantic-token-Checkbox-794, ${tokens.colorNeutralForeground2}))`,
      [vars.indicatorBorderColor]: `var(--ctrl-token-Checkbox-795, var(--semantic-token-Checkbox-796, ${tokens.colorNeutralStrokeAccessibleHover}))`,
    },

    ':active': {
      color: `var(--ctrl-token-Checkbox-797, var(--semantic-token-Checkbox-798, ${tokens.colorNeutralForeground1}))`,
      [vars.indicatorBorderColor]: `var(--ctrl-token-Checkbox-799, var(--semantic-token-Checkbox-800, ${tokens.colorNeutralStrokeAccessiblePressed}))`,
    },
  },

  checked: {
    color: `var(--ctrl-token-Checkbox-801, var(--semantic-token-Checkbox-802, ${tokens.colorNeutralForeground1}))`,
    [vars.indicatorBackgroundColor]: `var(--ctrl-token-Checkbox-803, var(--semantic-token-Checkbox-804, ${tokens.colorCompoundBrandBackground}))`,
    [vars.indicatorColor]: `var(--ctrl-token-Checkbox-805, var(--semantic-token-Checkbox-806, ${tokens.colorNeutralForegroundInverted}))`,
    [vars.indicatorBorderColor]: `var(--ctrl-token-Checkbox-807, var(--semantic-token-Checkbox-808, ${tokens.colorCompoundBrandBackground}))`,

    ':hover': {
      [vars.indicatorBackgroundColor]: `var(--ctrl-token-Checkbox-809, var(--semantic-token-Checkbox-810, ${tokens.colorCompoundBrandBackgroundHover}))`,
      [vars.indicatorBorderColor]: `var(--ctrl-token-Checkbox-811, var(--semantic-token-Checkbox-812, ${tokens.colorCompoundBrandBackgroundHover}))`,
    },

    ':active': {
      [vars.indicatorBackgroundColor]: `var(--ctrl-token-Checkbox-813, var(--semantic-token-Checkbox-814, ${tokens.colorCompoundBrandBackgroundPressed}))`,
      [vars.indicatorBorderColor]: `var(--ctrl-token-Checkbox-815, var(--semantic-token-Checkbox-816, ${tokens.colorCompoundBrandBackgroundPressed}))`,
    },
  },

  mixed: {
    color: `var(--ctrl-token-Checkbox-817, var(--semantic-token-Checkbox-818, ${tokens.colorNeutralForeground1}))`,
    [vars.indicatorBorderColor]: `var(--ctrl-token-Checkbox-819, var(--semantic-token-Checkbox-820, ${tokens.colorCompoundBrandStroke}))`,
    [vars.indicatorColor]: `var(--ctrl-token-Checkbox-821, var(--semantic-token-Checkbox-822, ${tokens.colorCompoundBrandForeground1}))`,

    ':hover': {
      [vars.indicatorBorderColor]: `var(--ctrl-token-Checkbox-823, var(--semantic-token-Checkbox-824, ${tokens.colorCompoundBrandStrokeHover}))`,
      [vars.indicatorColor]: `var(--ctrl-token-Checkbox-825, var(--semantic-token-Checkbox-826, ${tokens.colorCompoundBrandForeground1Hover}))`,
    },

    ':active': {
      [vars.indicatorBorderColor]: `var(--ctrl-token-Checkbox-827, var(--semantic-token-Checkbox-828, ${tokens.colorCompoundBrandStrokePressed}))`,
      [vars.indicatorColor]: `var(--ctrl-token-Checkbox-829, var(--semantic-token-Checkbox-830, ${tokens.colorCompoundBrandForeground1Pressed}))`,
    },
  },

  disabled: {
    cursor: 'default',

    color: `var(--ctrl-token-Checkbox-831, var(--semantic-token-Checkbox-832, ${tokens.colorNeutralForegroundDisabled}))`,
    [vars.indicatorBorderColor]: `var(--ctrl-token-Checkbox-833, var(--semantic-token-Checkbox-834, ${tokens.colorNeutralStrokeDisabled}))`,
    [vars.indicatorColor]: `var(--ctrl-token-Checkbox-835, var(--semantic-token-Checkbox-836, ${tokens.colorNeutralForegroundDisabled}))`,

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
  borderWidth: `var(--ctrl-token-Checkbox-837, var(--semantic-token-Checkbox-838, ${tokens.strokeWidthThin}))`,
  borderRadius: `var(--ctrl-token-Checkbox-839, var(--semantic-token-Checkbox-840, ${tokens.borderRadiusSmall}))`,
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

  circular: { borderRadius: `var(--ctrl-token-Checkbox-841, var(--semantic-token-Checkbox-842, ${tokens.borderRadiusCircular}))` },
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
    paddingRight: `var(--ctrl-token-Checkbox-843, var(--semantic-token-Checkbox-844, ${tokens.spacingHorizontalXS}))`,
  },
  after: {
    paddingLeft: `var(--ctrl-token-Checkbox-845, var(--semantic-token-Checkbox-846, ${tokens.spacingHorizontalXS}))`,
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
