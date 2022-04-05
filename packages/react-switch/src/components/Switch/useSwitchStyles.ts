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

// TODO replace these spacing constants with theme values once they're on the theme.
const spacingXS = 4;
const spacingS = 8;
const spacingM = 12;

// Thumb and track sizes used by the component.
const spaceBetweenThumbAndTrack = 2;
const thumbSize = 14;
const trackHeight = 20;
const trackWidth = 40;

const useRootStyles = makeStyles({
  base: {
    boxSizing: 'border-box',
    columnGap: `${spacingM}px`,
    display: 'inline-flex',
    ...shorthands.padding(`${spacingS}px`),
    position: 'relative',

    ...createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
  },

  // Label position variations
  above: {
    flexDirection: 'column',
    paddingTop: `${spacingXS}px`,
    rowGap: `${spacingXS}px`,
  },
  after: {
    alignItems: 'flex-start',
    columnGap: `${spacingM}px`,
    flexDirection: 'row',
  },
  before: {
    alignItems: 'flex-start',
    columnGap: `${spacingM}px`,
    flexDirection: 'row',
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
});

const useLabelStyles = makeStyles({
  base: {
    userSelect: 'none',
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
    rootStyles[labelPosition],
    state.root.className,
  );

  state.indicator.className = mergeClasses(switchClassNames.indicator, indicatorStyles.base, state.indicator.className);

  state.input.className = mergeClasses(switchClassNames.input, inputStyles.base, state.input.className);

  if (state.label) {
    state.label.className = mergeClasses(switchClassNames.label, labelStyles.base, state.label.className);
  }

  return state;
};
