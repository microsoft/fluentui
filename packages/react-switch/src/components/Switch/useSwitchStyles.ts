import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SwitchState } from './Switch.types';

export const switchClassName = 'fui-Switch';
const switchThumbClassName = 'fui-Switch__thumb';
const switchTrackClassName = 'fui-Switch__track';

const useRootStyles = makeStyles({
  base: {
    boxSizing: 'border-box',
    cursor: 'pointer',
    height: '36px',
    ...shorthands.padding('8px'),
    position: 'relative',
    width: '56px',
  },

  focusIndicator: createFocusOutlineStyle({ style: {}, selector: 'focus-within' }),

  checked: {
    [`& .${switchThumbClassName}`]: {
      backgroundColor: tokens.colorNeutralForegroundOnBrand,
    },

    [`& .${switchTrackClassName}`]: {
      backgroundColor: tokens.colorBrandBackground,
      ...shorthands.borderColor(tokens.colorTransparentStroke),
    },

    ':hover': {
      [`& .${switchThumbClassName}`]: {
        backgroundColor: tokens.colorNeutralForegroundOnBrand,
      },

      [`& .${switchTrackClassName}`]: {
        backgroundColor: tokens.colorBrandBackgroundHover,
        ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
      },
    },

    ':active': {
      [`& .${switchThumbClassName}`]: {
        backgroundColor: tokens.colorNeutralForegroundOnBrand,
      },

      [`& .${switchTrackClassName}`]: {
        backgroundColor: tokens.colorBrandBackgroundPressed,
        ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
      },
    },
  },

  unchecked: {
    [`& .${switchThumbClassName}`]: {
      backgroundColor: tokens.colorNeutralStrokeAccessible,
    },

    [`& .${switchTrackClassName}`]: {
      ...shorthands.borderColor(tokens.colorNeutralStrokeAccessible),
    },

    ':hover': {
      [`& .${switchThumbClassName}`]: {
        backgroundColor: tokens.colorNeutralStrokeAccessibleHover,
      },

      [`& .${switchTrackClassName}`]: {
        ...shorthands.borderColor(tokens.colorNeutralStrokeAccessibleHover),
      },
    },

    ':active': {
      [`& .${switchThumbClassName}`]: {
        backgroundColor: tokens.colorNeutralStrokeAccessiblePressed,
      },

      [`& .${switchTrackClassName}`]: {
        ...shorthands.borderColor(tokens.colorNeutralStrokeAccessiblePressed),
      },
    },
  },

  checkedDisabled: {
    cursor: 'default',

    [`& .${switchThumbClassName}`]: {
      backgroundColor: tokens.colorNeutralForegroundDisabled,
    },

    [`& .${switchTrackClassName}`]: {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
    },

    ':hover': {
      [`& .${switchThumbClassName}`]: {
        backgroundColor: tokens.colorNeutralForegroundDisabled,
      },

      [`& .${switchTrackClassName}`]: {
        backgroundColor: tokens.colorNeutralBackgroundDisabled,
        ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
      },
    },

    ':active': {
      [`& .${switchThumbClassName}`]: {
        backgroundColor: tokens.colorNeutralForegroundDisabled,
      },

      [`& .${switchTrackClassName}`]: {
        backgroundColor: tokens.colorNeutralBackgroundDisabled,
        ...shorthands.borderColor(tokens.colorTransparentStrokeDisabled),
      },
    },
  },

  uncheckedDisabled: {
    cursor: 'default',

    [`& .${switchThumbClassName}`]: {
      backgroundColor: tokens.colorNeutralForegroundDisabled,
    },

    [`& .${switchTrackClassName}`]: {
      ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
    },

    ':hover': {
      [`& .${switchThumbClassName}`]: {
        backgroundColor: tokens.colorNeutralForegroundDisabled,
      },

      [`& .${switchTrackClassName}`]: {
        ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      },
    },

    ':active': {
      [`& .${switchThumbClassName}`]: {
        backgroundColor: tokens.colorNeutralForegroundDisabled,
      },

      [`& .${switchTrackClassName}`]: {
        ...shorthands.borderColor(tokens.colorNeutralStrokeDisabled),
      },
    },
  },
});

const useInputStyles = makeStyles({
  base: {
    boxSizing: 'border-box',
    cursor: 'inherit',
    height: '100%',
    left: 0,
    ...shorthands.margin(0),
    opacity: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
});

const useThumbStyles = makeStyles({
  base: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    boxSizing: 'border-box',
    height: '14px',
    transitionDuration: '200ms',
    transitionTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)',
    transitionProperty: 'all',
    width: '14px',
  },

  checked: {
    transform: 'translateX(20px)',
  },
});

const useTrackStyles = makeStyles({
  base: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    ...shorthands.borderStyle('solid'),
    ...shorthands.borderWidth('1px'),
    boxSizing: 'border-box',
    height: '20px',
    ...shorthands.padding('2px'),
    transitionDuration: '200ms',
    transitionTimingFunction: 'cubic-bezier(0.33, 0, 0.67, 1)',
    transitionProperty: 'all',
    width: '40px',
  },
});

/**
 * Apply styling to the Switch slots based on the state
 */
export const useSwitchStyles_unstable = (state: SwitchState): SwitchState => {
  const rootStyles = useRootStyles();
  const inputStyles = useInputStyles();
  const thumbStyles = useThumbStyles();
  const trackStyles = useTrackStyles();

  const {
    checked,
    input: { disabled },
  } = state;

  state.root.className = mergeClasses(
    switchClassName,
    rootStyles.base,
    rootStyles.focusIndicator,
    checked ? rootStyles.checked : rootStyles.unchecked,
    disabled && (checked ? rootStyles.checkedDisabled : rootStyles.uncheckedDisabled),
    state.root.className,
  );
  state.input.className = mergeClasses(inputStyles.base, state.input.className);
  state.thumb.className = mergeClasses(
    switchThumbClassName,
    thumbStyles.base,
    checked && thumbStyles.checked,
    state.thumb.className,
  );
  state.track.className = mergeClasses(switchTrackClassName, trackStyles.base, state.track.className);

  return state;
};
