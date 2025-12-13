import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { switchClassNames, type SwitchState } from '@fluentui/react-switch';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

/**
 * @deprecated Use `switchClassNames.root` instead.
 */
export const switchClassName = switchClassNames.root;

const thumbHeight = `calc(${semanticTokens.ctrlChoiceSwitchHeight} - (${semanticTokens.ctrlChoiceSwitchPaddingRest} * 2))`;

const useRootBaseClassName = makeResetStyles({
  alignItems: 'flex-start',
  boxSizing: 'border-box',
  display: 'inline-flex',
  position: 'relative',

  ...createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
});

const useRootStyles = makeStyles({
  vertical: {
    flexDirection: 'column',
  },
});

const useIndicatorBaseClassName = makeResetStyles({
  boxSizing: 'border-box',
  borderRadius: semanticTokens.ctrlChoiceSwitchCorner,
  borderStyle: 'solid',
  lineHeight: 0,
  fill: 'currentColor',
  flexShrink: 0,
  height: semanticTokens.ctrlChoiceSwitchHeight,
  margin: semanticTokens.ctrlChoicePaddingVertical + ' ' + semanticTokens.ctrlChoicePaddingHorizontal,
  pointerEvents: 'none',
  transitionDuration: tokens.durationNormal,
  transitionTimingFunction: tokens.curveEasyEase,
  transitionProperty: 'background, border, color',
  width: semanticTokens.ctrlChoiceSwitchWidth,

  '@media screen and (prefers-reduced-motion: reduce)': {
    transitionDuration: '0.01ms',
  },

  '@media (forced-colors: active)': {
    color: 'CanvasText',
    '> i': {
      forcedColorAdjust: 'none',
    },
  },

  '> *': {
    position: 'relative',
    height: thumbHeight,
    width: semanticTokens.ctrlChoiceSwitchThumbWidthRest,
    fontSize: thumbHeight,
    top: `calc(50% - ${thumbHeight} / 2)`,
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    transitionProperty: 'transform',

    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
    },
  },
});

const useIndicatorStyles = makeStyles({
  labelAbove: {
    marginTop: 0,
  },
});

const useInputBaseClassName = makeResetStyles({
  boxSizing: 'border-box',
  cursor: 'pointer',
  height: '100%',
  margin: 0,
  opacity: 0,
  position: 'absolute',

  // Calculate the width of the hidden input by taking into account the size of the indicator + the padding around it.
  // This is done so that clicking on that "empty space" still toggles the switch.
  width: `calc(${semanticTokens.ctrlChoiceSwitchWidth} + (2 * ${semanticTokens.ctrlChoicePaddingHorizontal}))`,

  // Checked (both enabled and disabled)
  ':checked': {
    [`& ~ .${switchClassNames.indicator}`]: {
      '> *': {
        transform: `translateX(calc(${semanticTokens.ctrlChoiceSwitchWidth} - ${semanticTokens.ctrlChoiceSwitchThumbWidthRest} - ${semanticTokens.ctrlChoiceSwitchPaddingRest}))`,
        ':dir(rtl)': {
          // Inverse animation for RTL (Griffel doesn't support flipping CSSVars)
          transform: `translateX(calc(-1 * (${semanticTokens.ctrlChoiceSwitchWidth} - ${semanticTokens.ctrlChoiceSwitchThumbWidthRest} - ${semanticTokens.ctrlChoiceSwitchPaddingRest})))`,
        },
      },
    },
  },

  // Disabled (both checked and unchecked)
  ':disabled': {
    cursor: 'default',

    [`& ~ .${switchClassNames.indicator}`]: {
      color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
    },

    [`& ~ .${switchClassNames.label}`]: {
      cursor: 'default',
      color: semanticTokens.foregroundCtrlNeutralPrimaryDisabled,
    },
  },

  // Enabled and unchecked
  ':enabled:not(:checked)': {
    [`& ~ .${switchClassNames.indicator}`]: {
      backgroundColor: semanticTokens.ctrlChoiceBaseBackgroundRest,
      borderColor: semanticTokens.ctrlChoiceBaseStrokeRest,
      borderWidth: semanticTokens.strokeWidthCtrlOutlineRest,
      color: semanticTokens.backgroundCtrlShapeSafeNeutralRest,
    },

    [`& ~ .${switchClassNames.label}`]: {
      color: semanticTokens.foregroundContentNeutralPrimary,
    },

    ':hover': {
      [`& ~ .${switchClassNames.indicator}`]: {
        backgroundColor: semanticTokens.ctrlChoiceBaseBackgroundHover,
        borderColor: semanticTokens.ctrlChoiceBaseStrokeHover,
        borderWidth: semanticTokens.strokeWidthCtrlOutlineHover,
        color: semanticTokens.backgroundCtrlShapeSafeNeutralHover,
      },
    },

    ':hover:active': {
      [`& ~ .${switchClassNames.indicator}`]: {
        backgroundColor: semanticTokens.ctrlChoiceBaseBackgroundPressed,
        borderColor: semanticTokens.ctrlChoiceBaseStrokePressed,
        borderWidth: semanticTokens.strokeWidthCtrlOutlinePressed,
        color: semanticTokens.backgroundCtrlShapeSafeNeutralPressed,
      },
    },
  },

  // Enabled and checked
  ':enabled:checked': {
    [`& ~ .${switchClassNames.indicator}`]: {
      backgroundColor: semanticTokens.backgroundCtrlActiveBrandRest,
      borderColor: semanticTokens.strokeCtrlOnBrandRest,
      borderWidth: semanticTokens.strokeWidthCtrlOutlineRest,
      color: semanticTokens.foregroundCtrlOnActiveBrandRest,
    },

    ':hover': {
      [`& ~ .${switchClassNames.indicator}`]: {
        backgroundColor: semanticTokens.backgroundCtrlActiveBrandHover,
        borderColor: semanticTokens._ctrlSwitchStrokeOnActiveBrandHover,
        borderWidth: semanticTokens.strokeWidthCtrlOutlineHover,
        color: semanticTokens.foregroundCtrlOnActiveBrandHover,
      },
    },

    ':hover:active': {
      [`& ~ .${switchClassNames.indicator}`]: {
        backgroundColor: semanticTokens.backgroundCtrlActiveBrandPressed,
        borderColor: semanticTokens.strokeCtrlOnActiveBrandPressed,
        borderWidth: semanticTokens.strokeWidthCtrlOutlinePressed,
        color: semanticTokens.foregroundCtrlOnActiveBrandPressed,
      },
    },
  },

  // Disabled and unchecked
  ':disabled:not(:checked)': {
    [`& ~ .${switchClassNames.indicator}`]: {
      backgroundColor: semanticTokens.ctrlChoiceBaseBackgroundDisabled,
      borderColor: semanticTokens.ctrlChoiceBaseStrokeDisabled,
      borderWidth: semanticTokens.strokeWidthCtrlOutlineRest,
      color: semanticTokens.backgroundCtrlShapeSafeNeutralDisabled,
    },
  },

  // Disabled and checked
  ':disabled:checked': {
    [`& ~ .${switchClassNames.indicator}`]: {
      backgroundColor: semanticTokens.backgroundCtrlActiveBrandDisabled,
      borderColor: semanticTokens.strokeCtrlOnActiveBrandDisabled,
      borderWidth: semanticTokens.strokeWidthDefault,
      color: semanticTokens.foregroundCtrlOnActiveBrandDisabled,
    },
  },

  '@media (forced-colors: active)': {
    ':disabled': {
      [`& ~ .${switchClassNames.indicator}`]: {
        color: 'GrayText',
        borderColor: 'GrayText',
      },

      [`& ~ .${switchClassNames.label}`]: {
        color: 'GrayText',
      },
    },
    ':hover': {
      color: 'CanvasText',
    },
    ':hover:active': {
      color: 'CanvasText',
    },
    ':enabled:checked': {
      ':hover': {
        [`& ~ .${switchClassNames.indicator}`]: {
          backgroundColor: 'Highlight',
          color: 'Canvas',
        },
      },
      ':hover:active': {
        [`& ~ .${switchClassNames.indicator}`]: {
          backgroundColor: 'Highlight',
          color: 'Canvas',
        },
      },
      [`& ~ .${switchClassNames.indicator}`]: {
        backgroundColor: 'Highlight',
        color: 'Canvas',
      },
    },
  },
});

const useInputStyles = makeStyles({
  before: {
    right: 0,
    top: 0,
  },
  after: {
    left: 0,
    top: 0,
  },
  above: {
    bottom: 0,
    height: `calc(${semanticTokens.ctrlChoiceSwitchHeight} + ${semanticTokens.ctrlChoicePaddingVertical})`,
    width: '100%',
  },
});

// Can't use makeResetStyles here because Label is a component that may itself use makeResetStyles.
const useLabelStyles = makeStyles({
  base: {
    cursor: 'pointer',

    // Use a (negative) margin to account for the difference between the track's height and the label's line height.
    // This prevents the label from expanding the height of the switch, but preserves line height if the label wraps.
    marginBottom: `calc((${semanticTokens.ctrlChoiceSwitchHeight} - ${semanticTokens.textGlobalBody3LineHeight}) / 2)`,
    marginTop: `calc((${semanticTokens.ctrlChoiceSwitchHeight} - ${semanticTokens.textGlobalBody3LineHeight}) / 2)`,
    padding: `${semanticTokens.ctrlChoicePaddingVertical} ${semanticTokens.ctrlChoicePaddingHorizontal}`,
  },
  above: {
    paddingTop: semanticTokens._ctrlSwitchPaddingTextTop,
    paddingBottom: semanticTokens._ctrlSwitchPaddingTextBottom,
    width: '100%',
  },
  after: {
    paddingLeft: semanticTokens.gapInsideCtrlSmDefault,
  },
  before: {
    paddingRight: semanticTokens.gapInsideCtrlSmDefault,
  },
});

/**
 * Apply styling to the Switch slots based on the state
 */
export const useSemanticSwitchStyles = (_state: unknown): SwitchState => {
  'use no memo';

  const state = _state as SwitchState;

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();
  const indicatorBaseClassName = useIndicatorBaseClassName();
  const indicatorStyles = useIndicatorStyles();
  const inputBaseClassName = useInputBaseClassName();
  const inputStyles = useInputStyles();
  const labelStyles = useLabelStyles();

  const { label, labelPosition } = state;

  state.root.className = mergeClasses(
    state.root.className,
    switchClassNames.root,
    rootBaseClassName,
    labelPosition === 'above' && rootStyles.vertical,
    getSlotClassNameProp_unstable(state.root),
  );

  state.indicator.className = mergeClasses(
    state.indicator.className,
    switchClassNames.indicator,
    indicatorBaseClassName,
    label && labelPosition === 'above' && indicatorStyles.labelAbove,
    getSlotClassNameProp_unstable(state.indicator),
  );

  state.input.className = mergeClasses(
    state.input.className,
    switchClassNames.input,
    inputBaseClassName,
    label && inputStyles[labelPosition],
    getSlotClassNameProp_unstable(state.input),
  );

  if (state.label) {
    state.label.className = mergeClasses(
      state.label.className,
      switchClassNames.label,
      labelStyles.base,
      labelStyles[labelPosition],
      getSlotClassNameProp_unstable(state.label),
    );
  }

  return state;
};
