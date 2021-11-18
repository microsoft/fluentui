import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import type { SliderState } from './Slider.types';

export const sliderClassName = 'fui-Slider';

const thumbClassName = `${sliderClassName}-thumb`;
const trackClassName = `${sliderClassName}-track`;
const railClassName = `${sliderClassName}-rail`;

/**
 * Styles for the root slot
 */
export const useRootStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'inline-grid',
    gridTemplateAreas: '"slider"',
    userSelect: 'none',
    touchAction: 'none',
  },

  small: {
    '--slider-thumb-size': '10px',
    '--slider-rail-size': '2px',
  },

  medium: {
    '--slider-thumb-size': '20px',
    '--slider-rail-size': '4px',
  },

  horizontal: {
    minWidth: '120px',
    height: 'var(--slider-thumb-size)',
    alignItems: 'center',
  },

  vertical: {
    transform: 'scaleY(-1)',
    width: 'var(--slider-thumb-size)',
    minHeight: '120px',
    justifyItems: 'center',
    gridTemplateColumns: 'var(--slider-thumb-size)',
  },

  enabled: theme => ({
    cursor: 'grab',
    ':hover': {
      [`& .${thumbClassName}`]: {
        background: theme.colorBrandBackgroundHover,
      },
      [`& .${trackClassName}`]: {
        background: theme.colorBrandBackgroundHover,
      },
    },
    ':active': {
      cursor: 'grabbing',
      [`& .${thumbClassName}`]: {
        background: theme.colorBrandBackgroundPressed,
      },
      [`& .${trackClassName}`]: {
        background: theme.colorBrandBackgroundPressed,
      },
    },
  }),

  disabled: theme => ({
    cursor: 'not-allowed',
  }),

  focusIndicator: theme =>
    createFocusOutlineStyle(theme, { selector: 'focus-within', style: { outlineOffset: '10px' } }),
});

/**
 * Styles for the rail slot
 */
export const useRailStyles = makeStyles({
  rail: theme => ({
    borderRadius: theme.borderRadiusXLarge,
    pointerEvents: 'none',
    gridArea: 'slider',
  }),

  enabled: theme => ({
    background: theme.colorNeutralStrokeAccessible,
  }),

  disabled: theme => ({
    background: theme.colorNeutralBackgroundDisabled,
    border: `1px solid ${theme.colorTransparentStrokeDisabled}`,
  }),

  horizontal: {
    height: 'var(--slider-rail-size)',
  },

  vertical: {
    width: 'var(--slider-rail-size)',
    height: '100%',
  },
});

/**
 * Styles for the track slot
 */
export const useTrackStyles = makeStyles({
  track: theme => ({
    borderRadius: theme.borderRadiusXLarge,
    gridArea: 'slider',
    position: 'relative',
  }),

  horizontal: {
    height: 'var(--slider-rail-size)',
  },

  vertical: {
    width: 'var(--slider-rail-size)',
  },

  enabled: theme => ({
    background: theme.colorCompoundBrandBackground,
  }),

  disabled: theme => ({
    background: theme.colorNeutralForegroundDisabled,
  }),
});

/**
 * Styles for the thumb slot
 */
export const useThumbStyles = makeStyles({
  thumb: theme => ({
    position: 'absolute',
    width: 'var(--slider-thumb-size)',
    height: 'var(--slider-thumb-size)',
    outline: 'none',
    borderRadius: theme.borderRadiusCircular,
    boxShadow: `0 0 0 calc(var(--slider-thumb-size) * .2) ${theme.colorNeutralBackground1} inset`,
    transform: 'translateX(-50%)',
    left: 0,

    ':before': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      borderRadius: theme.borderRadiusCircular,
      boxSizing: 'border-box',
      content: "''",
      border: `calc(var(--slider-thumb-size) * .05) solid ${theme.colorNeutralStroke1}`,
    },
  }),

  enabled: theme => ({
    background: theme.colorCompoundBrandBackground,
  }),

  disabled: theme => ({
    background: theme.colorNeutralForegroundDisabled,
    ':before': {
      border: `calc(var(--slider-thumb-size) * .05) solid ${theme.colorNeutralForegroundDisabled}`,
    },
  }),

  vertical: theme => ({
    transform: 'translateY(-50%)',
  }),
});

/**
 * Styles for the Input slot
 */
const useInputStyles = makeStyles({
  input: {
    opacity: 0,
    gridArea: 'slider',
    padding: 0,
    margin: 0,
    height: 'var(--slider-thumb-size)',
    touchAction: 'none',
    pointerEvents: 'none',
  },
});

/**
 * Apply styling to the Slider slots based on the state
 */
export const useSliderStyles = (state: SliderState): SliderState => {
  const rootStyles = useRootStyles();
  const railStyles = useRailStyles();
  const trackStyles = useTrackStyles();
  const thumbStyles = useThumbStyles();
  const inputStyles = useInputStyles();

  state.root.className = mergeClasses(
    sliderClassName,
    rootStyles.root,
    rootStyles.focusIndicator,
    rootStyles[state.size!],
    state.vertical ? rootStyles.vertical : rootStyles.horizontal,
    state.disabled ? rootStyles.disabled : rootStyles.enabled,
    rootStyles.focusIndicator,
    state.root.className,
  );

  state.rail.className = mergeClasses(
    railClassName,
    railStyles.rail,
    state.vertical ? railStyles.vertical : railStyles.horizontal,
    state.disabled ? railStyles.disabled : railStyles.enabled,
    state.rail.className,
  );

  state.track.className = mergeClasses(
    trackClassName,
    trackStyles.track,
    state.vertical ? trackStyles.vertical : trackStyles.horizontal,
    state.disabled ? trackStyles.disabled : trackStyles.enabled,
    state.track.className,
  );

  state.thumb.className = mergeClasses(
    thumbClassName,
    thumbStyles.thumb,
    state.vertical && thumbStyles.vertical,
    state.disabled ? thumbStyles.disabled : thumbStyles.enabled,
    state.thumb.className,
  );

  state.input.className = mergeClasses(inputStyles.input, state.input.className);

  return state;
};
