import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { RadioSlots, RadioState } from './Radio.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const radioClassNames: SlotClassNames<RadioSlots> = {
  root: 'fui-Radio',
  indicator: 'fui-Radio__indicator',
  input: 'fui-Radio__input',
  label: 'fui-Radio__label',
};

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
  width: `calc(${semanticTokens._ctrlRadioChoiceBaseSize} + 2 * ${semanticTokens.ctrlChoicePaddingHorizontal})`,
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
      color: semanticTokens._ctrlRadioForegroundContentNeutralRest,
    },
    [`& ~ .${radioClassNames.indicator}`]: {
      borderColor: semanticTokens.ctrlChoiceBaseStrokeRest,
      backgroundColor: semanticTokens.ctrlChoiceBaseBackgroundRest,
      '@media (forced-colors: active)': {
        borderColor: 'ButtonBorder',
      },
    },

    ':hover': {
      [`& ~ .${radioClassNames.label}`]: {
        color: semanticTokens._ctrlRadioForegroundContentNeutralHover,
      },
      [`& ~ .${radioClassNames.indicator}`]: {
        borderColor: semanticTokens.ctrlChoiceBaseStrokeHover,
        backgroundColor: semanticTokens._ctrlRadioBaseBackgroundHover,
      },
    },

    ':hover:active': {
      [`& ~ .${radioClassNames.label}`]: {
        color: semanticTokens.foregroundContentNeutralPrimary,
      },
      [`& ~ .${radioClassNames.indicator}`]: {
        borderColor: semanticTokens.ctrlChoiceBaseStrokePressed,
        backgroundColor: semanticTokens._ctrlRadioBaseBackgroundPressed,
      },
    },
  },

  // Colors for the checked state
  ':enabled:checked': {
    [`& ~ .${radioClassNames.label}`]: {
      color: semanticTokens.foregroundContentNeutralPrimary,
    },
    [`& ~ .${radioClassNames.indicator}`]: {
      borderColor: semanticTokens._ctrlRadioStrokeOnActiveBrandRest,
      color: semanticTokens._ctrlRadioForegroundOnActiveBrandRest,
      backgroundColor: semanticTokens._ctrlRadioBackgroundActiveBrandRest,
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
        borderColor: semanticTokens._ctrlRadioStrokeOnActiveBrandHover,
        color: semanticTokens._ctrlRadioForegroundOnActiveBrandHover,
        backgroundColor: semanticTokens._ctrlRadioBackgroundActiveBrandHover,
      },
    },

    ':hover:active': {
      [`& ~ .${radioClassNames.indicator}`]: {
        borderColor: semanticTokens._ctrlRadioStrokeOnActiveBrandPressed,
        color: semanticTokens._ctrlRadioForegroundOnActiveBrandPressed,
        backgroundColor: semanticTokens._ctrlRadioBackgroundActiveBrandPressed,
      },
    },
  },

  // Colors for the disabled state
  ':disabled': {
    [`& ~ .${radioClassNames.label}`]: {
      color: semanticTokens._ctrlRadioForegroundContentDisabled,
      cursor: 'default',
      '@media (forced-colors: active)': {
        color: 'GrayText',
      },
    },
    ':checked': {
      [`& ~ .${radioClassNames.indicator}`]: {
        backgroundColor: semanticTokens._ctrlRadioBackgroundActiveDisabled,
      },
    },
    ':not(:checked)': {
      [`& ~ .${radioClassNames.indicator}`]: {
        backgroundColor: semanticTokens._ctrlRadioBaseBackgroundDisabled,
      },
    },
    [`& ~ .${radioClassNames.indicator}`]: {
      borderColor: semanticTokens.ctrlChoiceBaseStrokeDisabled,
      color: semanticTokens._ctrlRadioForegroundOnActiveDisabled,
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
    height: `calc(${semanticTokens._ctrlRadioChoiceBaseSize} + 2 * ${semanticTokens.ctrlChoicePaddingVertical})`,
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
  width: semanticTokens._ctrlRadioChoiceBaseSize,
  height: semanticTokens._ctrlRadioChoiceBaseSize,
  fontSize: '12px',
  boxSizing: 'border-box',
  flexShrink: 0,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',

  border: `${semanticTokens.strokeWidthCtrlOutlineRest} solid`,
  borderRadius: semanticTokens.ctrlChoiceRadioCorner,
  margin: `${semanticTokens.ctrlChoicePaddingVertical} ${semanticTokens.ctrlChoicePaddingHorizontal}`,
  fill: 'currentColor',
  pointerEvents: 'none',

  '::after': {
    position: 'absolute',
    width: semanticTokens.ctrlChoiceRadioDotSizeRest,
    height: semanticTokens.ctrlChoiceRadioDotSizeRest,
    borderRadius: semanticTokens.ctrlChoiceRadioCorner,
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
    padding: `${semanticTokens._ctrlRadioPaddingVertical} ${tokens.spacingHorizontalS}`,
  },

  after: {
    paddingLeft: tokens.spacingHorizontalXS,

    // Use a (negative) margin to account for the difference between the indicator's height and the label's line height.
    // This prevents the label from expanding the height of the Radio, but preserves line height if the label wraps.
    marginTop: `calc((${semanticTokens._ctrlRadioChoiceBaseSize} - ${semanticTokens.textRampItemBodyLineHeight}) / 2)`,
    marginBottom: `calc((${semanticTokens._ctrlRadioChoiceBaseSize} - ${semanticTokens.textRampItemBodyLineHeight}) / 2)`,
  },

  below: {
    paddingTop: semanticTokens._ctrlRadioPaddingTextTop,
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
