'use client';

import { GriffelStyle, makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { CheckboxSlots, CheckboxState } from './Checkbox.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const checkboxClassNames: SlotClassNames<CheckboxSlots> = {
  root: 'fui-Checkbox',
  label: 'fui-Checkbox__label',
  input: 'fui-Checkbox__input',
  indicator: 'fui-Checkbox__indicator',
  checkmarkIcon: 'fui-Checkbox__checkmarkIcon',
};

// CSS variables used internally in Checkbox's styles
const vars = {
  indicatorColor: '--fui-Checkbox__indicator--color',
  indicatorBorderColor: '--fui-Checkbox__indicator--borderColor',
  indicatorBackgroundColor: '--fui-Checkbox__indicator--backgroundColor',
  indicatorTransform: '--fui-Checkbox__indicator--scale',
  checkmarkIconOpacity: '--fui-Checkbox__checkmarkIcon--opacity',
  checkmarkIconTransform: '--fui-Checkbox__checkmarkIcon--transform',
} as const;

// The indicator size is used by the indicator and label styles
const indicatorSizeMedium = '16px';
const indicatorSizeLarge = '20px';

const useRootBaseClassName = makeResetStyles({
  position: 'relative',
  display: 'inline-flex',
  cursor: 'pointer',
  maxWidth: 'fit-content',
  verticalAlign: 'middle',
  color: tokens.colorNeutralForeground3,
  ...createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
});

const disabledStyles: GriffelStyle = {
  cursor: 'default',

  color: tokens.colorNeutralForegroundDisabled,
  [vars.indicatorBackgroundColor]: tokens.colorNeutralForegroundDisabled,
  [vars.indicatorBorderColor]: tokens.colorNeutralStrokeDisabled,
  [vars.indicatorColor]: tokens.colorNeutralForegroundDisabled,
};

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
    ...disabledStyles,
    ':hover': disabledStyles,
    ':active': disabledStyles,
    '@media (forced-colors: active)': {
      color: 'GrayText',
      [vars.indicatorColor]: 'GrayText',
    },
  },
});

const useMotionColorStyles = makeStyles({
  default: {
    ':active': {
      [vars.indicatorColor]: tokens.colorNeutralForegroundInverted,
      [vars.indicatorBackgroundColor]: tokens.colorCompoundBrandBackground,
    },
  },

  unchecked: {},

  checked: {
    [vars.indicatorColor]: tokens.colorNeutralForegroundInverted,
  },

  mixed: {
    [vars.indicatorColor]: tokens.colorNeutralForegroundInverted,
    [vars.indicatorBackgroundColor]: tokens.colorCompoundBrandBackground,
  },
});

const useMotionScaleStyles = makeStyles({
  default: {
    ':active': {
      [vars.indicatorTransform]: 'scale(0.66) translateZ(0)',
      [vars.checkmarkIconOpacity]: '1',
      [vars.checkmarkIconTransform]: 'scale(0.66) translateZ(0)',
    },
  },

  unchecked: {
    [vars.indicatorTransform]: 'scale(0) translateZ(0)',
    [vars.checkmarkIconOpacity]: '0',
    [vars.checkmarkIconTransform]: 'scale(0) translateZ(0)',
  },

  checked: {
    [vars.indicatorTransform]: 'scale(1) translateZ(0)',
    [vars.checkmarkIconOpacity]: '1',
    [vars.checkmarkIconTransform]: 'scale(1) translateZ(0)',
  },

  mixed: {
    [vars.indicatorTransform]: 'scale(0.57) translateZ(0)',
    [vars.checkmarkIconOpacity]: '0',
    [vars.checkmarkIconTransform]: 'scale(0) translateZ(0)',
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
  position: 'relative',

  borderColor: `var(${vars.indicatorBorderColor}, ${tokens.colorNeutralStrokeAccessible})`,
  borderWidth: tokens.strokeWidthThin,
  borderStyle: 'solid',
  borderRadius: tokens.borderRadiusSmall,
  margin: tokens.spacingVerticalS + ' ' + tokens.spacingHorizontalS,
  pointerEvents: 'none',

  transitionProperty: 'border-color, color',
  transitionDuration: tokens.durationFaster,
  transitionTimingFunction: tokens.curveEasyEase,

  color: `var(${vars.indicatorColor})`,
  fontSize: '12px',
  height: indicatorSizeMedium,
  width: indicatorSizeMedium,

  '&::after': {
    position: 'absolute',
    inset: 0,
    zIndex: tokens.zIndexBackground,
    content: "''",
    backgroundColor: `var(${vars.indicatorBackgroundColor})`,
    transform: `var(${vars.indicatorTransform})`,
    fill: 'currentColor',
    transitionProperty: 'transform, background-color, fill',
    transitionDuration: tokens.durationFaster,
    transitionTimingFunction: tokens.curveEasyEase,
  },
});

const useIndicatorStyles = makeStyles({
  mixedIndicator: {
    '::after': {
      borderRadius: tokens.borderRadiusSmall,
    },
  },

  large: {
    fontSize: '16px',
    height: indicatorSizeLarge,
    width: indicatorSizeLarge,
  },

  circular: {
    borderRadius: tokens.borderRadiusCircular,

    '::after': {
      borderRadius: 'inherit',
    },
  },
});

const useCheckmarkStyles = makeResetStyles({
  position: 'relative',
  zIndex: tokens.zIndexContent,
  opacity: `var(${vars.checkmarkIconOpacity})`,
  transform: `var(${vars.checkmarkIconTransform})`,
  transitionProperty: 'transform, opacity',
  transitionDuration: tokens.durationNormal,
  transitionTimingFunction: tokens.curveDecelerateMin,
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
  const motionColorStyles = useMotionColorStyles();
  const motionScaleStyles = useMotionScaleStyles();

  state.root.className = mergeClasses(
    checkboxClassNames.root,
    rootBaseClassName,
    checked === 'mixed' ? rootStyles.mixed : checked ? rootStyles.checked : rootStyles.unchecked,
    checked === 'mixed' ? motionScaleStyles.mixed : checked ? motionScaleStyles.checked : motionScaleStyles.unchecked,
    !disabled &&
      (checked === 'mixed'
        ? motionColorStyles.mixed
        : checked
        ? motionColorStyles.checked
        : motionColorStyles.unchecked),
    disabled && rootStyles.disabled,
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
      checked === 'mixed' && indicatorStyles.mixedIndicator,
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

  const checkmarkStyles = useCheckmarkStyles();
  if (state.checkmarkIcon) {
    state.checkmarkIcon.className = mergeClasses(
      checkboxClassNames.checkmarkIcon,
      checkmarkStyles,
      state.checkmarkIcon.className,
    );
  }

  return state;
};
