import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SwitchSlots, SwitchState } from './Switch.types';

export const switchClassNames: {
  [SlotName in keyof SwitchSlots]-?: string;
} = {
  root: 'fui-Switch',
  input: 'fui-Switch__input',
  label: 'fui-Swicth__label',
  track: 'fui-Switch__track',
};

// TODO replace these spacing constants with theme values once they're on the theme.
const spacingXS = '4px';
const spacingS = '8px';
const spacingM = '12px';

// Thumb and track sizes used by the component.
const spaceBetweenThumbAndTrack = '2px';
const thumbSize = '14px';
const trackHeight = '20px';
const trackWidth = '40px';

const useRootStyles = makeStyles({
  base: {
    boxSizing: 'border-box',
    columnGap: spacingM,
    display: 'inline-flex',
    minHeight: `calc(${trackHeight} + ${spacingS} * 2)`,
    ...shorthands.padding(spacingS),
    position: 'relative',
    minWidth: `calc(${trackWidth} + ${spacingS} * 2)`,

    ...createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),
  },

  // Label position variations
  above: {
    flexDirection: 'column',
    paddingTop: spacingXS,
    rowGap: spacingXS,
  },
  after: {
    alignItems: 'flex-start',
    columnGap: spacingM,
    flexDirection: 'row',
  },
  before: {
    alignItems: 'flex-start',
    columnGap: spacingM,
    flexDirection: 'row',
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

    // Enabled and unchecked
    ':enabled:not(:checked)': {
      [`& ~ .${switchClassNames.label}`]: {
        color: tokens.colorNeutralForeground1,
      },

      [`& ~ .${switchClassNames.track}`]: {
        color: tokens.colorNeutralStrokeAccessible,
        ...shorthands.borderColor(tokens.colorNeutralStrokeAccessible),
      },

      ':hover': {
        [`& ~ .${switchClassNames.track}`]: {
          color: tokens.colorNeutralStrokeAccessibleHover,
          ...shorthands.borderColor(tokens.colorNeutralStrokeAccessibleHover),
        },
      },

      ':active': {
        [`& ~ .${switchClassNames.track}`]: {
          color: tokens.colorNeutralStrokeAccessiblePressed,
          ...shorthands.borderColor(tokens.colorNeutralStrokeAccessiblePressed),
        },
      },
    },

    // Enabled and checked
    ':enabled:checked': {
      [`& ~ .${switchClassNames.track}`]: {
        backgroundColor: tokens.colorBrandBackground,
        color: tokens.colorNeutralForegroundOnBrand,
        ...shorthands.borderColor(tokens.colorTransparentStroke),

        '> *': {
          transform: `translateX(calc(${trackWidth} - ${thumbSize} - ${spaceBetweenThumbAndTrack} * 2))`,
        },
      },

      ':hover': {
        [`& ~ .${switchClassNames.track}`]: {
          backgroundColor: tokens.colorBrandBackgroundHover,
          ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
        },
      },

      ':active': {
        [`& ~ .${switchClassNames.track}`]: {
          backgroundColor: tokens.colorBrandBackgroundPressed,
          ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
        },
      },
    },

    // Disabled
    ':disabled': {
      cursor: 'default',
    },

    // Disabled and unchecked
    ':disabled:not(:checked)': {
      [`& ~ .${switchClassNames.label}`]: {
        color: tokens.colorNeutralForegroundDisabled,
      },

      [`& ~ .${switchClassNames.track}`]: {
        ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
        color: tokens.colorNeutralForegroundDisabled,
      },
    },

    // Disabled and checked
    ':disabled:checked': {
      [`& ~ .${switchClassNames.label}`]: {
        color: tokens.colorNeutralForegroundDisabled,
      },

      [`& ~ .${switchClassNames.track}`]: {
        backgroundColor: tokens.colorNeutralBackgroundDisabled,
        ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
        color: tokens.colorNeutralForegroundDisabled,

        '> *': {
          transform: `translateX(calc(${trackWidth} - ${thumbSize} - ${spaceBetweenThumbAndTrack} * 2))`,
        },
      },
    },
  },
});

const useLabelStyles = makeStyles({
  base: {
    color: 'inherit',
    cursor: 'inherit',
    userSelect: 'none',
  },
});

const useTrackStyles = makeStyles({
  base: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderWidth('1px'),
    boxSizing: 'border-box',
    fill: 'currentColor',
    flexShrink: 0,
    fontSize: tokens.fontSizeBase400,
    height: trackHeight,
    pointerEvents: 'none',
    transitionDuration: '200ms',
    transitionTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)',
    transitionProperty: 'background, border, color',
    width: trackWidth,

    '> *': {
      transitionDuration: '200ms',
      transitionTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)',
      transitionProperty: 'transform',
    },
  },
});

/**
 * Apply styling to the Switch slots based on the state
 */
export const useSwitchStyles_unstable = (state: SwitchState): SwitchState => {
  const rootStyles = useRootStyles();
  const inputStyles = useInputStyles();
  const labelStyles = useLabelStyles();
  const trackStyles = useTrackStyles();

  const { labelPosition } = state;

  state.root.className = mergeClasses(
    switchClassNames.root,
    rootStyles.base,
    rootStyles[labelPosition],
    state.root.className,
  );

  state.input.className = mergeClasses(switchClassNames.input, inputStyles.base, state.input.className);

  if (state.label) {
    state.label.className = mergeClasses(switchClassNames.label, labelStyles.base, state.label.className);
  }

  state.track.className = mergeClasses(switchClassNames.track, trackStyles.base, state.track.className);

  return state;
};
