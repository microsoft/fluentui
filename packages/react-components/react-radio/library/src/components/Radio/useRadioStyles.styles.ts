import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
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

const useRootBaseClassName = makeResetStyles({
  display: 'inline-flex',
  position: 'relative',
  ...createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
});

const useRootStyles = makeStyles({
  vertical: {
    flexDirection: 'column',
    alignItems: 'center',
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

  ':enabled': {
    cursor: 'pointer',
    [`& ~ .${radioClassNames.label}`]: {
      cursor: 'pointer',
    },
  },

  // Colors for the unchecked state
  ':enabled:not(:checked)': {
    [`& ~ .${radioClassNames.label}`]: {
      color: `var(--1507, var(--1508, ${tokens.colorNeutralForeground3}))`,
    },
    [`& ~ .${radioClassNames.indicator}`]: {
      borderColor: `var(--1509, var(--1510, ${tokens.colorNeutralStrokeAccessible}))`,
      '@media (forced-colors: active)': {
        borderColor: 'ButtonBorder',
      },
    },

    ':hover': {
      [`& ~ .${radioClassNames.label}`]: {
        color: `var(--1511, var(--1512, ${tokens.colorNeutralForeground2}))`,
      },
      [`& ~ .${radioClassNames.indicator}`]: {
        borderColor: `var(--1513, var(--1514, ${tokens.colorNeutralStrokeAccessibleHover}))`,
      },
    },

    ':hover:active': {
      [`& ~ .${radioClassNames.label}`]: {
        color: `var(--1515, var(--1516, ${tokens.colorNeutralForeground1}))`,
      },
      [`& ~ .${radioClassNames.indicator}`]: {
        borderColor: `var(--1517, var(--1518, ${tokens.colorNeutralStrokeAccessiblePressed}))`,
      },
    },
  },

  // Colors for the checked state
  ':enabled:checked': {
    [`& ~ .${radioClassNames.label}`]: {
      color: `var(--1519, var(--1520, ${tokens.colorNeutralForeground1}))`,
    },
    [`& ~ .${radioClassNames.indicator}`]: {
      borderColor: `var(--1521, var(--1522, ${tokens.colorCompoundBrandStroke}))`,
      color: `var(--1523, var(--1524, ${tokens.colorCompoundBrandForeground1}))`,
      '@media (forced-colors: active)': {
        borderColor: 'Highlight',
        color: 'Highlight',
        '::after': {
          backgroundColor: 'Highlight',
        },
      },
    },

    ':hover': {
      [`& ~ .${radioClassNames.indicator}`]: {
        borderColor: `var(--1525, var(--1526, ${tokens.colorCompoundBrandStrokeHover}))`,
        color: `var(--1527, var(--1528, ${tokens.colorCompoundBrandForeground1Hover}))`,
      },
    },

    ':hover:active': {
      [`& ~ .${radioClassNames.indicator}`]: {
        borderColor: `var(--1529, var(--1530, ${tokens.colorCompoundBrandStrokePressed}))`,
        color: `var(--1531, var(--1532, ${tokens.colorCompoundBrandForeground1Pressed}))`,
      },
    },
  },

  // Colors for the disabled state
  ':disabled': {
    [`& ~ .${radioClassNames.label}`]: {
      color: `var(--1533, var(--1534, ${tokens.colorNeutralForegroundDisabled}))`,
      cursor: 'default',
      '@media (forced-colors: active)': {
        color: 'GrayText',
      },
    },
    [`& ~ .${radioClassNames.indicator}`]: {
      borderColor: `var(--1535, var(--1536, ${tokens.colorNeutralStrokeDisabled}))`,
      color: `var(--1537, var(--1538, ${tokens.colorNeutralForegroundDisabled}))`,
      '@media (forced-colors: active)': {
        borderColor: 'GrayText',
        color: 'GrayText',
        '::after': {
          backgroundColor: 'GrayText',
        },
      },
    },
  },
});

const useInputStyles = makeStyles({
  below: {
    width: '100%',
    height: `calc(${indicatorSize} + 2 * ${tokens.spacingVerticalS})`,
  },

  // If the indicator has no children, use the ::after pseudo-element for the checked state
  defaultIndicator: {
    [`:checked ~ .${radioClassNames.indicator}::after`]: {
      content: '""',
    },
  },

  // If the indicator has a child, hide it until the radio is checked
  customIndicator: {
    [`:not(:checked) ~ .${radioClassNames.indicator} > *`]: {
      opacity: '0',
    },
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

  border: tokens.strokeWidthThin + ' solid',
  borderRadius: `var(--1539, var(--1540, ${tokens.borderRadiusCircular}))`,
  margin: tokens.spacingVerticalS + ' ' + tokens.spacingHorizontalS,
  fill: 'currentColor',
  pointerEvents: 'none',

  '::after': {
    position: 'absolute',
    width: indicatorSize,
    height: indicatorSize,
    borderRadius: `var(--1541, var(--1542, ${tokens.borderRadiusCircular}))`,
    // Use a transform to avoid pixel rounding errors at 125% DPI
    // https://github.com/microsoft/fluentui/issues/30025
    transform: 'scale(0.625)',
    backgroundColor: 'currentColor',
  },
});

// Can't use makeResetStyles here because Label is a component that may itself use makeResetStyles.
const useLabelStyles = makeStyles({
  base: {
    alignSelf: 'center',
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
  },

  after: {
    paddingLeft: `var(--1543, var(--1544, ${tokens.spacingHorizontalXS}))`,

    // Use a (negative) margin to account for the difference between the indicator's height and the label's line height.
    // This prevents the label from expanding the height of the Radio, but preserves line height if the label wraps.
    marginTop: `calc((${indicatorSize} - ${tokens.lineHeightBase300}) / 2)`,
    marginBottom: `calc((${indicatorSize} - ${tokens.lineHeightBase300}) / 2)`,
  },

  below: {
    paddingTop: `var(--1545, var(--1546, ${tokens.spacingVerticalXS}))`,
    textAlign: 'center',
  },
});

/**
 * Apply styling to the Radio slots based on the state
 */
export const useRadioStyles_unstable = (state: RadioState): RadioState => {
  'use no memo';

  const { labelPosition } = state;

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();
  state.root.className = mergeClasses(
    radioClassNames.root,
    rootBaseClassName,
    labelPosition === 'below' && rootStyles.vertical,
    state.root.className,
  );

  const inputBaseClassName = useInputBaseClassName();
  const inputStyles = useInputStyles();
  state.input.className = mergeClasses(
    radioClassNames.input,
    inputBaseClassName,
    labelPosition === 'below' && inputStyles.below,
    state.indicator.children ? inputStyles.customIndicator : inputStyles.defaultIndicator,
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

  return state;
};
