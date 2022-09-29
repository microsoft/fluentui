import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
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

const useRootStyles = makeStyles({
  base: {
    alignItems: 'flex-start',
    boxSizing: 'border-box',
    display: 'inline-flex',
    position: 'relative',

    ...createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
  },

  vertical: {
    flexDirection: 'column',
    paddingTop: tokens.spacingVerticalXS,
  },
});

const useIndicatorStyles = makeStyles({
  base: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderWidth('1px'),
    boxSizing: 'border-box',
    fill: 'currentColor',
    flexShrink: 0,
    fontSize: `${thumbSize}px`,
    height: `${trackHeight}px`,
    ...shorthands.margin(tokens.spacingVerticalS, tokens.spacingHorizontalS),
    pointerEvents: 'none',
    transitionDuration: '200ms',
    transitionTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)',
    transitionProperty: 'background, border, color',
    width: `${trackWidth}px`,

    '@media screen and (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
    },

    '> *': {
      transitionDuration: '200ms',
      transitionTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)',
      transitionProperty: 'transform',

      '@media screen and (prefers-reduced-motion: reduce)': {
        transitionDuration: '0.01ms',
      },
    },
  },

  labelBefore: {
    marginLeft: 0,
  },
  labelAfter: {
    marginRight: 0,
  },
  labelAbove: {
    marginTop: 0,
  },
});

const useInputStyles = makeStyles({
  base: {
    boxSizing: 'border-box',
    cursor: 'pointer',
    height: '100%',
    ...shorthands.margin(0),
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
        color: tokens.colorNeutralForegroundDisabled,
      },
    },

    // Enabled and unchecked
    ':enabled:not(:checked)': {
      [`& ~ .${switchClassNames.indicator}`]: {
        color: tokens.colorNeutralStrokeAccessible,
        ...shorthands.borderColor(tokens.colorNeutralStrokeAccessible),
      },

      [`& ~ .${switchClassNames.label}`]: {
        color: tokens.colorNeutralForeground1,
      },

      ':hover': {
        [`& ~ .${switchClassNames.indicator}`]: {
          color: tokens.colorNeutralStrokeAccessibleHover,
          ...shorthands.borderColor(tokens.colorNeutralStrokeAccessibleHover),
        },
      },

      ':hover:active': {
        [`& ~ .${switchClassNames.indicator}`]: {
          color: tokens.colorNeutralStrokeAccessiblePressed,
          ...shorthands.borderColor(tokens.colorNeutralStrokeAccessiblePressed),
        },
      },
    },

    // Enabled and checked
    ':enabled:checked': {
      [`& ~ .${switchClassNames.indicator}`]: {
        backgroundColor: tokens.colorCompoundBrandBackground,
        color: tokens.colorNeutralForegroundInverted,
        ...shorthands.borderColor(tokens.colorTransparentStroke),
      },

      ':hover': {
        [`& ~ .${switchClassNames.indicator}`]: {
          backgroundColor: tokens.colorCompoundBrandBackgroundHover,
          ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
        },
      },

      ':hover:active': {
        [`& ~ .${switchClassNames.indicator}`]: {
          backgroundColor: tokens.colorCompoundBrandBackgroundPressed,
          ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
        },
      },
    },

    // Disabled and unchecked
    ':disabled:not(:checked)': {
      [`& ~ .${switchClassNames.indicator}`]: {
        ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      },
    },

    // Disabled and checked
    ':disabled:checked': {
      [`& ~ .${switchClassNames.indicator}`]: {
        backgroundColor: tokens.colorNeutralBackgroundDisabled,
        ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
      },
    },
  },

  highContrast: {
    '@media (forced-colors: active)': {
      ':disabled': {
        [`& ~ .${switchClassNames.indicator}`]: {
          color: 'GrayText',
          ...shorthands.borderColor('GrayText'),
        },

        [`& ~ .${switchClassNames.label}`]: {
          color: 'GrayText',
        },
      },
    },
  },

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
    height: `calc(${trackHeight}px + 2 * ${tokens.spacingVerticalS})`,
    width: '100%',
  },

  labelHorizontal: {
    width: `calc(${trackWidth}px + ${tokens.spacingHorizontalS})`,
  },
  labelVertical: {
    height: `calc(${trackHeight}px + ${tokens.spacingVerticalS})`,
  },
});

const useLabelStyles = makeStyles({
  base: {
    cursor: 'pointer',

    // Use a (negative) margin to account for the difference between the track's height and the label's line height.
    // This prevents the label from expanding the height of the switch, but preserves line height if the label wraps.
    marginBottom: `calc((${trackHeight}px - ${tokens.lineHeightBase300}) / 2)`,
    marginTop: `calc((${trackHeight}px - ${tokens.lineHeightBase300}) / 2)`,

    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
  },
  above: {
    paddingBottom: tokens.spacingVerticalXS,
    width: '100%',
  },
  after: {
    paddingLeft: tokens.spacingHorizontalM,
  },
  before: {
    paddingRight: tokens.spacingHorizontalM,
  },
});

/**
 * Apply styling to the Switch slots based on the state
 */
export const useSwitchStyles_unstable = (state: SwitchState): SwitchState => {
  const rootStyles = useRootStyles();
  const indicatorStyles = useIndicatorStyles();
  const inputStyles = useInputStyles();
  const labelStyles = useLabelStyles();

  const { label, labelPosition } = state;

  state.root.className = mergeClasses(
    switchClassNames.root,
    rootStyles.base,
    labelPosition === 'above' && rootStyles.vertical,
    state.root.className,
  );

  state.indicator.className = mergeClasses(
    switchClassNames.indicator,
    indicatorStyles.base,
    label && labelPosition === 'before' && indicatorStyles.labelBefore,
    label && labelPosition === 'after' && indicatorStyles.labelAfter,
    label && labelPosition === 'above' && indicatorStyles.labelAbove,
    state.indicator.className,
  );

  state.input.className = mergeClasses(
    switchClassNames.input,
    inputStyles.base,
    inputStyles.highContrast,
    inputStyles[labelPosition],
    label && (labelPosition === 'before' || labelPosition === 'after') && inputStyles.labelHorizontal,
    label && labelPosition === 'above' && inputStyles.labelVertical,
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
