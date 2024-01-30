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

// The indicator size is used by the indicator and label styles
const indicatorSize = '16px';

// CSS variables used internally in Radio's styles
const vars = {
  indicatorBorderColor: '--fui-Radio__indicatorBorderColor',
  indicatorBorderColorChecked: '--fui-Radio__indicatorBorderColor--checked',
  indicatorColor: '--fui-Radio__indicatorColor',
  indicatorContent: '--fui-Radio__indicatorContent',
  indicatorOpacity: '--fui-Radio__indicatorOpacity',
  labelColor: '--fui-Radio__labelColor',
} as const;

const useRootBaseClassName = makeResetStyles({
  display: 'inline-flex',
  position: 'relative',
  cursor: 'pointer',

  ':hover': {
    [vars.indicatorBorderColor]: tokens.colorNeutralStrokeAccessibleHover,
    [vars.indicatorBorderColorChecked]: tokens.colorCompoundBrandStrokeHover,
    [vars.indicatorColor]: tokens.colorCompoundBrandForeground1Hover,
    [vars.labelColor]: tokens.colorNeutralForeground2,
  },
  ':active': {
    [vars.indicatorBorderColor]: tokens.colorNeutralStrokeAccessiblePressed,
    [vars.indicatorBorderColorChecked]: tokens.colorCompoundBrandStrokePressed,
    [vars.indicatorColor]: tokens.colorCompoundBrandForeground1Pressed,
    [vars.labelColor]: tokens.colorNeutralForeground1,
  },

  '@media (forced-colors: active)': {
    ':hover, :active': {
      [vars.indicatorColor]: 'Highlight',
    },
  },

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

  [`:checked ~ .${radioClassNames.indicator}`]: {
    [vars.indicatorBorderColor]: `var(${vars.indicatorBorderColorChecked}, ${tokens.colorCompoundBrandStroke})`,
    [vars.indicatorContent]: '""',
    [vars.indicatorOpacity]: 1,
    '@media (forced-colors: active)': {
      [vars.indicatorColor]: 'Highlight',
    },
  },
  [`:checked ~ .${radioClassNames.label}`]: {
    [vars.labelColor]: tokens.colorNeutralForeground1,
  },
});

const useInputStyles = makeStyles({
  below: {
    width: '100%',
    height: `calc(${indicatorSize} + 2 * ${tokens.spacingVerticalS})`,
  },
});

const useIndicatorBaseClassName = makeResetStyles({
  position: 'relative',
  width: indicatorSize,
  height: indicatorSize,
  fontSize: '12px',
  boxSizing: 'border-box',
  flexShrink: 0,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',

  color: `var(${vars.indicatorColor}, ${tokens.colorCompoundBrandForeground1})`,
  borderColor: `var(${vars.indicatorBorderColor}, ${tokens.colorNeutralStrokeAccessible})`,
  borderStyle: 'solid',
  borderWidth: tokens.strokeWidthThin,
  borderRadius: tokens.borderRadiusCircular,
  margin: tokens.spacingVerticalS + ' ' + tokens.spacingHorizontalS,
  fill: 'currentcolor',
  pointerEvents: 'none',

  '@media (forced-colors: active)': {
    color: `var(${vars.indicatorColor}, ButtonText)`,
  },

  '::after': {
    content: `var(${vars.indicatorContent})`,
    position: 'absolute',
    width: indicatorSize,
    height: indicatorSize,
    borderRadius: 'inherit',
    // Use a transform to avoid pixel rounding errors at 125% DPI
    // https://github.com/microsoft/fluentui/issues/30025
    transform: 'scale(0.625)',
    backgroundColor: 'currentcolor',
    forcedColorAdjust: 'none', // currentcolor inherits the correct forced colors
  },
});

const useIndicatorStyles = makeStyles({
  disabled: {
    ...shorthands.borderColor(tokens.colorNeutralForegroundDisabled),
    color: tokens.colorNeutralForegroundDisabled,
    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },

  customIcon: {
    '> *': {
      opacity: `var(${vars.indicatorOpacity}, 0)`,
    },
    '::after': {
      content: 'unset',
    },
  },
});

// Can't use makeResetStyles here because Label is a component that may itself use makeResetStyles.
const useLabelStyles = makeStyles({
  base: {
    alignSelf: 'center',
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
    cursor: 'inherit',
  },

  enabled: {
    color: `var(${vars.labelColor}, ${tokens.colorNeutralForeground3})`,
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
    state.input.disabled && rootStyles.disabled,
    labelPosition === 'below' && rootStyles.vertical,
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
  const indicatorStyles = useIndicatorStyles();
  state.indicator.className = mergeClasses(
    radioClassNames.indicator,
    indicatorBaseClassName,
    state.input.disabled && indicatorStyles.disabled,
    !!state.indicator.children && indicatorStyles.customIcon,
    state.indicator.className,
  );

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      radioClassNames.label,
      labelStyles.base,
      !state.input.disabled && labelStyles.enabled,
      labelStyles[labelPosition],
      state.label.className,
    );
  }
};
