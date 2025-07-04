import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SwitchSlots, SwitchState } from './Switch.types';

export const switchClassNames: SlotClassNames<SwitchSlots> = {
  root: 'fui-Switch',
  indicator: 'fui-Switch__indicator',
  input: 'fui-Switch__input',
  label: 'fui-Switch__label',
};

/**
 * @deprecated Use `switchClassNames.root` instead.
 */
export const switchClassName = switchClassNames.root;

// Thumb and track sizes used by the component.
const spaceBetweenThumbAndTrack = 2;
const trackHeight = 20;
const trackWidth = 40;
const thumbSize = trackHeight - spaceBetweenThumbAndTrack;

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
  borderRadius: tokens.borderRadiusCircular,
  border: '1px solid',
  lineHeight: 0,
  boxSizing: 'border-box',
  fill: 'currentColor',
  flexShrink: 0,
  fontSize: `${thumbSize}px`,
  height: `${trackHeight}px`,
  margin: tokens.spacingVerticalS + ' ' + tokens.spacingHorizontalS,
  pointerEvents: 'none',
  transitionDuration: tokens.durationNormal,
  transitionTimingFunction: tokens.curveEasyEase,
  transitionProperty: 'background, border, color',
  width: `${trackWidth}px`,

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
  width: `calc(${trackWidth}px + 2 * ${tokens.spacingHorizontalS})`,

  // Checked (both enabled and disabled)
  ':checked': {
    [`& ~ .${switchClassNames.indicator}`]: {
      '> *': {
        transform: `translateX(${trackWidth - thumbSize - spaceBetweenThumbAndTrack}px)`,
      },
    },
  },

  // Disabled (both checked and unchecked)
  ':disabled': {
    cursor: 'default',

    [`& ~ .${switchClassNames.indicator}`]: {
      color: tokens.colorNeutralForegroundDisabled,
    },

    [`& ~ .${switchClassNames.label}`]: {
      cursor: 'default',
      color: tokens.colorNeutralForegroundDisabled,
    },
  },

  // Enabled and unchecked
  ':enabled:not(:checked)': {
    [`& ~ .${switchClassNames.indicator}`]: {
      color: tokens.colorNeutralStrokeAccessible,
      borderColor: tokens.colorNeutralStrokeAccessible,
    },

    [`& ~ .${switchClassNames.label}`]: {
      color: tokens.colorNeutralForeground1,
    },

    ':hover': {
      [`& ~ .${switchClassNames.indicator}`]: {
        color: tokens.colorNeutralStrokeAccessibleHover,
        borderColor: tokens.colorNeutralStrokeAccessibleHover,
      },
    },

    ':hover:active': {
      [`& ~ .${switchClassNames.indicator}`]: {
        color: tokens.colorNeutralStrokeAccessiblePressed,
        borderColor: tokens.colorNeutralStrokeAccessiblePressed,
      },
    },
  },

  // Enabled and checked
  ':enabled:checked': {
    [`& ~ .${switchClassNames.indicator}`]: {
      backgroundColor: tokens.colorCompoundBrandBackground,
      color: tokens.colorNeutralForegroundInverted,
      borderColor: tokens.colorTransparentStroke,
    },

    ':hover': {
      [`& ~ .${switchClassNames.indicator}`]: {
        backgroundColor: tokens.colorCompoundBrandBackgroundHover,
        borderColor: tokens.colorTransparentStrokeInteractive,
      },
    },

    ':hover:active': {
      [`& ~ .${switchClassNames.indicator}`]: {
        backgroundColor: tokens.colorCompoundBrandBackgroundPressed,
        borderColor: tokens.colorTransparentStrokeInteractive,
      },
    },
  },

  // Disabled and unchecked
  ':disabled:not(:checked)': {
    [`& ~ .${switchClassNames.indicator}`]: {
      borderColor: tokens.colorNeutralStrokeDisabled,
    },
  },

  // Disabled and checked
  ':disabled:checked': {
    [`& ~ .${switchClassNames.indicator}`]: {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      borderColor: tokens.colorTransparentStrokeDisabled,
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
    height: `calc(${trackHeight}px + ${tokens.spacingVerticalS})`,
    width: '100%',
  },
});

// Can't use makeResetStyles here because Label is a component that may itself use makeResetStyles.
const useLabelStyles = makeStyles({
  base: {
    cursor: 'pointer',

    // Use a (negative) margin to account for the difference between the track's height and the label's line height.
    // This prevents the label from expanding the height of the switch, but preserves line height if the label wraps.
    marginBottom: `calc((${trackHeight}px - ${tokens.lineHeightBase300}) / 2)`,
    marginTop: `calc((${trackHeight}px - ${tokens.lineHeightBase300}) / 2)`,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
  },
  above: {
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    width: '100%',
  },
  after: {
    paddingLeft: tokens.spacingHorizontalXS,
  },
  before: {
    paddingRight: tokens.spacingHorizontalXS,
  },
});

/**
 * Apply styling to the Switch slots based on the state
 */
export const useSwitchStyles_unstable = (state: SwitchState): SwitchState => {
  'use no memo';

  const rootBaseClassName = useRootBaseClassName();
  const rootStyles = useRootStyles();
  const indicatorBaseClassName = useIndicatorBaseClassName();
  const indicatorStyles = useIndicatorStyles();
  const inputBaseClassName = useInputBaseClassName();
  const inputStyles = useInputStyles();
  const labelStyles = useLabelStyles();

  const { label, labelPosition } = state;

  state.root.className = mergeClasses(
    switchClassNames.root,
    rootBaseClassName,
    labelPosition === 'above' && rootStyles.vertical,
    state.root.className,
  );

  state.indicator.className = mergeClasses(
    switchClassNames.indicator,
    indicatorBaseClassName,
    label && labelPosition === 'above' && indicatorStyles.labelAbove,
    state.indicator.className,
  );

  state.input.className = mergeClasses(
    switchClassNames.input,
    inputBaseClassName,
    label && inputStyles[labelPosition],
    state.input.className,
  );

  if (state.label) {
    state.label.className = mergeClasses(
      switchClassNames.label,
      labelStyles.base,
      labelStyles[labelPosition],
      state.label.className,
    );
  }

  return state;
};
