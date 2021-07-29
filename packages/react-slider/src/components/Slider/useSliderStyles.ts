import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { HighContrastSelector } from '@fluentui/style-utilities';
import { createFocusIndicatorStyleRule } from '@fluentui/react-tabster';
import { SliderState } from './Slider.types';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: theme => ({
    '--slider-thumb-size': '20px',
    position: 'relative',
    height: 'var(--slider-thumb-size)',
    width: '280px',
    overflow: 'hidden',
    userSelect: 'none',
    display: 'inline-flex',
    touchAction: 'none',
  }),

  hover: theme => ({
    ':hover .ms-Slider-track': {
      background: '#0078D4',
      [HighContrastSelector]: {
        forcedColorAdjust: 'none',
      },
    },

    ':hover .ms-Slider-thumb::after': {
      background: '#0078D4',
      [HighContrastSelector]: {
        forcedColorAdjust: 'none',
      },
    },
  }),

  focusWithin: theme => ({
    ':focus-within .ms-Slider-track': {
      background: '#0078D4',
      [HighContrastSelector]: {
        forcedColorAdjust: 'none',
      },
    },

    ':focus-within .ms-Slider-thumb::after': {
      background: '#0078D4',
      [HighContrastSelector]: {
        background: 'Highlight',
      },
    },
  }),

  activation: theme => ({
    ':active .ms-Slider-track': {
      background: '#005A9E',
      [HighContrastSelector]: {
        forcedColorAdjust: 'none',
      },
    },

    ':active .ms-Slider-thumb::after': {
      background: '#005A9E',
      [HighContrastSelector]: {
        forcedColorAdjust: 'none',
      },
    },
  }),
});

/**
 * Styles for the rail slot
 */
const useRailStyles = makeStyles({
  rail: theme => ({
    position: 'absolute',
    height: '4px',
    width: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    background: '#C8C8C8',
    borderRadius: '4px',
    pointerEvents: 'none',
    [HighContrastSelector]: {
      boxSizing: 'border-box',
      border: '1px solid WindowText',
    },
  }),
});

/**
 * Styles for the track slot
 */
const useTrackStyles = makeStyles({
  track: theme => ({
    position: 'absolute',
    height: '4px',
    top: '50%',
    transform: 'translateY(-50%)',
    minWidth: 'var(--slider-thumb-size)',
    background: '#606060',
    borderRadius: '4px',
    [HighContrastSelector]: {
      background: 'Highlight',
    },
  }),
});

/**
 * Styles for the thumb slot
 */
const useThumbStyles = makeStyles({
  thumb: theme => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 'calc(var(--slider-thumb-size) / 2)',
    right: 'calc(var(--slider-thumb-size) / 2)',
    outline: 'none',
    ':after': {
      content: '""',
      position: 'absolute',
      width: 'var(--slider-thumb-size)',
      height: 'var(--slider-thumb-size)',
      top: '50%',
      background: '#606060',
      borderRadius: '50%',
      boxSizing: 'border-box',
      display: 'block',
      transform: 'translate(-50%,-50%)',
      [HighContrastSelector]: {
        background: 'Highlight',
      },
    },
  }),

  focusIndicator: createFocusIndicatorStyleRule({
    ':after': {
      outline: 'none',
      boxSizing: 'border-box',
      border: '1.7px solid black',
      boxShadow: '0 0 0 .7pt white inset',
      [HighContrastSelector]: {
        background: 'GrayText',
        border: '1.5px solid WindowText inset',
      },
    },
  }),
});

/**
 * Styles for the activeRail slot
 */
const useActiveRailStyles = makeStyles({
  activeRail: theme => ({
    position: 'absolute',
    left: 'calc(var(--slider-thumb-size) / 2)',
    right: 'calc(var(--slider-thumb-size) / 2)',
  }),
});

/**
 * Apply styling to the Slider slots based on the state
 */
export const useSliderStyles = (state: SliderState): SliderState => {
  const rootStyles = useRootStyles();
  const railStyles = useRailStyles();
  const activeRailStyles = useActiveRailStyles();
  const trackStyles = useTrackStyles();
  const thumbStyles = useThumbStyles();

  state.className = mergeClasses(
    rootStyles.root,
    rootStyles.hover,
    rootStyles.focusWithin,
    rootStyles.activation,
    state.className,
  );

  state.rail.className = railStyles.rail;
  state.track.className = mergeClasses(trackStyles.track, state.track.className);
  state.thumb.className = mergeClasses(thumbStyles.thumb, thumbStyles.focusIndicator, state.thumb.className);
  state.activeRail.className = activeRailStyles.activeRail;

  return state;
};
