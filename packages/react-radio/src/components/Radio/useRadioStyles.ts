import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import type { RadioState } from './Radio.types';

export const radioClassName = 'fui-Radio';
const indicatorClassName = 'fui-Radio__indicator';
const labelClassName = 'fui-Radio__label';

// TODO replace these spacing constants with theme values once they're on the theme
const spacingHorizontalS = '8px';
const spacingHorizontalM = '12px';

// The indicator size is used by the indicator and label styles
const indicatorSize = '16px';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  base: {
    display: 'inline-flex',
    position: 'relative',
    columnGap: spacingHorizontalM,
    ...shorthands.padding(spacingHorizontalS),
  },

  vertical: {
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: spacingHorizontalM,
  },

  focusIndicator: createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
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

    // When unchecked, hide the circle icon (child of the indicator)
    [`:not(:checked) ~ .${indicatorClassName} > *`]: {
      opacity: '0',
    },

    // Colors for the unchecked state
    ':enabled:not(:checked)': {
      [`& ~ .${labelClassName}`]: {
        color: tokens.colorNeutralForeground3,
      },
      [`& ~ .${indicatorClassName}`]: {
        ...shorthands.borderColor(tokens.colorNeutralStrokeAccessible),
      },

      ':hover': {
        [`& ~ .${labelClassName}`]: {
          color: tokens.colorNeutralForeground2,
        },
        [`& ~ .${indicatorClassName}`]: {
          ...shorthands.borderColor(tokens.colorNeutralStrokeAccessibleHover),
        },
      },

      ':hover:active': {
        [`& ~ .${labelClassName}`]: {
          color: tokens.colorNeutralForeground1,
        },
        [`& ~ .${indicatorClassName}`]: {
          ...shorthands.borderColor(tokens.colorNeutralStrokeAccessiblePressed),
        },
      },
    },

    // Colors for the checked state
    ':enabled:checked': {
      [`& ~ .${labelClassName}`]: {
        color: tokens.colorNeutralForeground1,
      },
      [`& ~ .${indicatorClassName}`]: {
        ...shorthands.borderColor(tokens.colorCompoundBrandStroke),
        color: tokens.colorCompoundBrandForeground1,
      },

      ':hover': {
        [`& ~ .${indicatorClassName}`]: {
          ...shorthands.borderColor(tokens.colorCompoundBrandStrokeHover),
          color: tokens.colorCompoundBrandForeground1Hover,
        },
      },

      ':hover:active': {
        [`& ~ .${indicatorClassName}`]: {
          ...shorthands.borderColor(tokens.colorCompoundBrandStrokePressed),
          color: tokens.colorCompoundBrandForeground1Pressed,
        },
      },
    },

    // Colors for the disabled state
    ':disabled': {
      cursor: 'default',

      [`& ~ .${labelClassName}`]: {
        color: tokens.colorNeutralForegroundDisabled,
      },
      [`& ~ .${indicatorClassName}`]: {
        ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
        color: tokens.colorNeutralForegroundDisabled,
      },
    },
  },
});

const useIndicatorStyles = makeStyles({
  base: {
    width: indicatorSize,
    height: indicatorSize,
    fontSize: '12px',
    boxSizing: 'border-box',
    flexShrink: 0,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...shorthands.overflow('hidden'),

    ...shorthands.border(tokens.strokeWidthThin, 'solid'),
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    fill: 'currentColor',
    pointerEvents: 'none',
  },
});

const useLabelStyles = makeStyles({
  base: {
    alignSelf: 'center',
    userSelect: 'none',
    cursor: 'inherit',
    color: 'inherit',

    // Use a (negative) margin to account for the difference between the indicator's height and the label's line height.
    // This prevents the label from expanding the height of the Radio, but preserves line height if the label wraps.
    ...shorthands.margin(`calc((${indicatorSize} - ${tokens.lineHeightBase300}) / 2)`, 0),
  },

  below: {
    textAlign: 'center',
  },
});

/**
 * Apply styling to the Radio slots based on the state
 */
export const useRadioStyles_unstable = (state: RadioState) => {
  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    radioClassName,
    rootStyles.base,
    rootStyles.focusIndicator,
    state.labelPosition === 'below' && rootStyles.vertical,
    state.root.className,
  );

  const inputStyles = useInputStyles();
  state.input.className = mergeClasses(inputStyles.base, state.input.className);

  const indicatorStyles = useIndicatorStyles();
  if (state.indicator) {
    state.indicator.className = mergeClasses(indicatorClassName, indicatorStyles.base, state.indicator.className);
  }

  const labelStyles = useLabelStyles();
  if (state.label) {
    state.label.className = mergeClasses(
      labelClassName,
      labelStyles.base,
      state.labelPosition === 'below' && labelStyles.below,
      state.label.className,
    );
  }
};
