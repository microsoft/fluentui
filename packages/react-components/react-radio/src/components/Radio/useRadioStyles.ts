import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { RadioSlots, RadioState } from './Radio.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const radioClassNames: SlotClassNames<RadioSlots> = {
  root: 'fui-Radio',
  indicator: 'fui-Radio__indicator',
  input: 'fui-Radio__input',
  label: 'fui-Radio__label',
};

const vars = {
  labelColor: '--UNSTABLE__fui-Radio__label--color',
  indicatorBorderColor: '--UNSTABLE__fui-Radio__indicator--borderColor',
  indicatorColor: '--UNSTABLE__fui-Radio__indicator--color',
  iconOpacity: '--UNSTABLE__fui-Radio__icon--opacity',
} as const;

const values = {
  labelColor: `var(${vars.labelColor}, ${tokens.colorNeutralForeground3})`,
  indicatorBorderColor: `var(${vars.indicatorBorderColor}, ${tokens.colorNeutralStrokeAccessible})`,
  indicatorColor: `var(${vars.indicatorColor}, transparent)`,
  iconOpacity: `var(${vars.iconOpacity})`,
} as const;

// The indicator size is used by the indicator and label styles
const indicatorSize = '16px';

const useRootBaseClassName = makeResetStyles({
  display: 'inline-flex',
  position: 'relative',
  cursor: 'pointer',
  ...createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
});

const useRootStyles = makeStyles({
  vertical: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  disabled: {
    cursor: 'default',
  },
});

const useInputBaseClassName = makeResetStyles({
  position: 'absolute',
  left: 0,
  top: 0,
  width: `calc(${indicatorSize} + 2 * ${tokens.spacingHorizontalS})`,
  height: '100%',
  boxSizing: 'border-box',
  margin: 0,
  opacity: 0,
  cursor: 'inherit',

  // When unchecked, hide the circle icon
  [`:not(:checked) ~ .${radioClassNames.indicator}`]: {
    [vars.iconOpacity]: 0,
  },

  // Colors for the unchecked state
  ':enabled:not(:checked)': {
    [`& ~ .${radioClassNames.label}`]: {
      [vars.labelColor]: tokens.colorNeutralForeground3,
    },
    [`& ~ .${radioClassNames.indicator}`]: {
      [vars.indicatorBorderColor]: tokens.colorNeutralStrokeAccessible,
    },

    ':hover': {
      [`& ~ .${radioClassNames.label}`]: {
        [vars.labelColor]: tokens.colorNeutralForeground2,
      },
      [`& ~ .${radioClassNames.indicator}`]: {
        [vars.indicatorBorderColor]: tokens.colorNeutralStrokeAccessibleHover,
      },
    },

    ':hover:active': {
      [`& ~ .${radioClassNames.label}`]: {
        [vars.labelColor]: tokens.colorNeutralForeground1,
      },
      [`& ~ .${radioClassNames.indicator}`]: {
        [vars.indicatorBorderColor]: tokens.colorNeutralStrokeAccessiblePressed,
      },
    },
  },

  // Colors for the checked state
  ':enabled:checked': {
    [`& ~ .${radioClassNames.label}`]: {
      [vars.labelColor]: tokens.colorNeutralForeground1,
    },
    [`& ~ .${radioClassNames.indicator}`]: {
      [vars.indicatorBorderColor]: tokens.colorCompoundBrandStroke,
      [vars.indicatorColor]: tokens.colorCompoundBrandForeground1,
    },

    ':hover': {
      [`& ~ .${radioClassNames.indicator}`]: {
        [vars.indicatorBorderColor]: tokens.colorCompoundBrandStrokeHover,
        [vars.indicatorColor]: tokens.colorCompoundBrandForeground1Hover,
      },
    },

    ':hover:active': {
      [`& ~ .${radioClassNames.indicator}`]: {
        [vars.indicatorBorderColor]: tokens.colorCompoundBrandStrokePressed,
        [vars.indicatorColor]: tokens.colorCompoundBrandForeground1Pressed,
      },
    },
  },

  // Colors for the disabled state
  ':disabled': {
    [`& ~ .${radioClassNames.label}`]: {
      [vars.labelColor]: tokens.colorNeutralForegroundDisabled,
      '@media (forced-colors: active)': {
        [vars.labelColor]: 'GrayText',
      },
    },
    [`& ~ .${radioClassNames.indicator}`]: {
      [vars.indicatorBorderColor]: tokens.colorNeutralStrokeDisabled,
      [vars.indicatorColor]: tokens.colorNeutralForegroundDisabled,
      '@media (forced-colors: active)': {
        [vars.indicatorColor]: 'GrayText',
      },
    },
  },
});

const useInputStyles = makeStyles({
  below: {
    width: '100%',
    height: `calc(${indicatorSize} + 2 * ${tokens.spacingVerticalS})`,
  },
});

const useIndicatorBaseClassName = makeResetStyles({
  width: indicatorSize,
  height: indicatorSize,
  fontSize: '12px',
  boxSizing: 'border-box',
  flexShrink: 0,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',

  color: values.indicatorColor,
  border: tokens.strokeWidthThin + ' solid ' + values.indicatorBorderColor,
  borderRadius: tokens.borderRadiusCircular,
  margin: tokens.spacingVerticalS + ' ' + tokens.spacingHorizontalS,
  fill: 'currentColor',
  pointerEvents: 'none',

  '> *': {
    opacity: values.iconOpacity,
  },
});

// Can't use makeResetStyles here because Label is a component that may itself use makeResetStyles.
const useLabelStyles = makeStyles({
  base: {
    alignSelf: 'center',
    color: values.labelColor,
    cursor: 'inherit',
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
  },

  after: {
    paddingLeft: tokens.spacingHorizontalXS,

    // Use a (negative) margin to account for the difference between the indicator's height and the label's line height.
    // This prevents the label from expanding the height of the Radio, but preserves line height if the label wraps.
    marginTop: `calc((${indicatorSize} - ${tokens.lineHeightBase300}) / 2)`,
    marginBottom: `calc((${indicatorSize} - ${tokens.lineHeightBase300}) / 2)`,
  },

  below: {
    paddingTop: tokens.spacingVerticalXS,
    textAlign: 'center',
  },
});

/**
 * Apply styling to the Radio slots based on the state
 */
export const useRadioStyles_unstable = (state: RadioState) => {
  const { labelPosition } = state;

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    radioClassNames.root,
    rootBaseClassName,
    labelPosition === 'below' && rootStyles.vertical,
    state.input.disabled && rootStyles.disabled,
    state.root.className,
  );

  const inputBaseClassName = useInputBaseClassName();
  const inputStyles = useInputStyles();
  state.input.className = mergeClasses(
    radioClassNames.input,
    inputBaseClassName,
    labelPosition === 'below' && inputStyles.below,
    state.input.className,
  );

  const indicatorBaseClassName = useIndicatorBaseClassName();
  state.indicator.className = mergeClasses(
    radioClassNames.indicator,
    indicatorBaseClassName,
    state.indicator.className,
  );

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      radioClassNames.label,
      labelStyles.base,
      labelStyles[labelPosition],
      state.label.className,
    );
  }
};
