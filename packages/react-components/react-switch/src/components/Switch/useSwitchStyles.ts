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
const thumbSize = 14;
const trackHeight = 20;
const trackWidth = 40;

const useRootStyles = makeStyles({
  base: {
    alignItems: 'flex-start',
    boxSizing: 'border-box',
    display: 'inline-flex',
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalS),
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
    fontSize: `${thumbSize + spaceBetweenThumbAndTrack}px`,
    height: `${trackHeight}px`,
    pointerEvents: 'none',
    transitionDuration: '200ms',
    transitionTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)',
    transitionProperty: 'background, border, color',
    width: `${trackWidth}px`,

    '> *': {
      transitionDuration: '200ms',
      transitionTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)',
      transitionProperty: 'transform',
    },
  },
});

const useInputStyles = makeStyles({
  base: {
    boxSizing: 'border-box',
    cursor: 'pointer',
    height: '100%',
    left: 0,
    ...shorthands.margin(0),
    opacity: 0,
    position: 'absolute',
    top: 0,
    width: '100%',

    // Checked (both enabled and disabled)
    ':checked': {
      [`& ~ .${switchClassNames.indicator}`]: {
        '> *': {
          transform: `translateX(${trackWidth - thumbSize - spaceBetweenThumbAndTrack * 2}px)`,
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
        backgroundColor: tokens.colorBrandBackground,
        color: tokens.colorNeutralForegroundOnBrand,
        ...shorthands.borderColor(tokens.colorTransparentStroke),
      },

      ':hover': {
        [`& ~ .${switchClassNames.indicator}`]: {
          backgroundColor: tokens.colorBrandBackgroundHover,
          ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
        },
      },

      ':hover:active': {
        [`& ~ .${switchClassNames.indicator}`]: {
          backgroundColor: tokens.colorBrandBackgroundPressed,
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
});

const useLabelStyles = makeStyles({
  base: {
    userSelect: 'none',
  },

  above: {
    marginBottom: tokens.spacingVerticalXS,
  },
  after: {
    marginLeft: tokens.spacingHorizontalM,
  },
  before: {
    marginRight: tokens.spacingHorizontalM,
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

  const { labelPosition } = state;

  state.root.className = mergeClasses(
    switchClassNames.root,
    rootStyles.base,
    labelPosition === 'above' && rootStyles.vertical,
    state.root.className,
  );

  state.indicator.className = mergeClasses(switchClassNames.indicator, indicatorStyles.base, state.indicator.className);

  state.input.className = mergeClasses(
    switchClassNames.input,
    inputStyles.base,
    inputStyles.highContrast,
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
