import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { type CheckboxState, checkboxClassNames } from '@fluentui/react-checkbox';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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
  color: semanticTokens._ctrlCheckboxForegroundUnchecked,
  ...createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
});

const useRootStyles = makeStyles({
  unchecked: {
    ':hover': {
      color: semanticTokens._ctrlCheckboxForegroundUncheckedHover,
      [vars.indicatorBorderColor]: semanticTokens.ctrlChoiceBaseStrokeHover,
    },

    ':active': {
      color: semanticTokens.foregroundContentNeutralPrimary,
      [vars.indicatorBorderColor]: semanticTokens.ctrlChoiceBaseStrokePressed,
    },
  },

  checked: {
    color: semanticTokens.foregroundContentNeutralPrimary,
    [vars.indicatorBackgroundColor]: semanticTokens.backgroundCtrlActiveBrandRest,
    [vars.indicatorColor]: semanticTokens.foregroundCtrlOnActiveBrandRest,
    [vars.indicatorBorderColor]: semanticTokens._ctrlCheckboxBorderColorChecked,

    ':hover': {
      [vars.indicatorBackgroundColor]: semanticTokens.backgroundCtrlActiveBrandHover,
      [vars.indicatorBorderColor]: semanticTokens._ctrlCheckboxBorderColorCheckedHover,
    },

    ':active': {
      [vars.indicatorBackgroundColor]: semanticTokens.backgroundCtrlActiveBrandPressed,
      [vars.indicatorBorderColor]: semanticTokens._ctrlCheckboxIndicatorBorderColorCheckedPressed,
    },
  },

  mixed: {
    color: semanticTokens.foregroundContentNeutralPrimary,
    [vars.indicatorBorderColor]: semanticTokens._ctrlCheckboxIndicatorBorderColorMixed,
    [vars.indicatorColor]: semanticTokens._ctrlCheckboxIndicatorColorMixed,

    ':hover': {
      [vars.indicatorBorderColor]: semanticTokens._ctrlCheckboxIndicatorBorderColorMixedHover,
      [vars.indicatorColor]: semanticTokens._ctrlCheckboxIndicatorColorMixedHover,
    },

    ':active': {
      [vars.indicatorBorderColor]: semanticTokens._ctrlCheckboxIndicatorBorderColorMixedPressed,
      [vars.indicatorColor]: semanticTokens._ctrlCheckboxIndicatorColorMixedPressed,
    },
  },

  disabled: {
    cursor: 'default',

    color: semanticTokens.foregroundCtrlOnTransparentDisabled,
    [vars.indicatorBorderColor]: semanticTokens.ctrlChoiceBaseStrokeDisabled,
    [vars.indicatorColor]: semanticTokens.foregroundCtrlOnActiveBrandDisabled,

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
  borderColor: `var(${vars.indicatorBorderColor}, ${semanticTokens.ctrlChoiceBaseStrokeRest})`,
  borderStyle: 'solid',
  borderWidth: semanticTokens.strokeWidthDefault,
  borderRadius: semanticTokens.ctrlChoiceCheckboxCorner,
  margin: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
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

  circular: { borderRadius: semanticTokens.cornerCircular },
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
    marginTop: `calc((${indicatorSizeMedium} - ${semanticTokens.textRampItemBodyLineHeight}) / 2)`,
    marginBottom: `calc((${indicatorSizeMedium} - ${semanticTokens.textRampItemBodyLineHeight}) / 2)`,
  },
  large: {
    marginTop: `calc((${indicatorSizeLarge} - ${semanticTokens.textRampItemBodyLineHeight}) / 2)`,
    marginBottom: `calc((${indicatorSizeLarge} - ${semanticTokens.textRampItemBodyLineHeight}) / 2)`,
  },
});

/**
 * Apply styling to the Checkbox slots based on the state
 */
export const useSemanticCheckboxStyles = (_state: unknown): CheckboxState => {
  'use no memo';

  const state = _state as CheckboxState;

  const { checked, disabled, labelPosition, shape, size } = state;

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    state.root.className,
    checkboxClassNames.root,
    rootBaseClassName,
    disabled
      ? rootStyles.disabled
      : checked === 'mixed'
      ? rootStyles.mixed
      : checked
      ? rootStyles.checked
      : rootStyles.unchecked,
    getSlotClassNameProp_unstable(state.root),
  );

  const inputBaseClassName = useInputBaseClassName();
  const inputStyles = useInputStyles();
  state.input.className = mergeClasses(
    state.input.className,
    checkboxClassNames.input,
    inputBaseClassName,
    size === 'large' && inputStyles.large,
    inputStyles[labelPosition],
    getSlotClassNameProp_unstable(state.input),
  );

  const indicatorBaseClassName = useIndicatorBaseClassName();
  const indicatorStyles = useIndicatorStyles();
  if (state.indicator) {
    state.indicator.className = mergeClasses(
      state.indicator.className,
      checkboxClassNames.indicator,
      indicatorBaseClassName,
      size === 'large' && indicatorStyles.large,
      shape === 'circular' && indicatorStyles.circular,
      getSlotClassNameProp_unstable(state.indicator),
    );
  }

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      state.label.className,
      checkboxClassNames.label,
      labelStyles.base,
      labelStyles[size],
      labelStyles[labelPosition],
      getSlotClassNameProp_unstable(state.label),
    );
  }

  return state;
};
