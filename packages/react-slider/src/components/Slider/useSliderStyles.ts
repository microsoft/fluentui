import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusIndicatorStyleRule } from '@fluentui/react-tabster';
import { SliderState } from './Slider.types';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: theme => ({
    '--slider-thumb-size': '20px',
    '--slider-color': '#005fb8',
    position: 'relative',
    height: 'var(--slider-thumb-size)',
    minWidth: '280px',
    overflow: 'hidden',
    userSelect: 'none',
    display: 'inline-flex',
    touchAction: 'none',
  }),
});

/**
 * Styles for the rail slot
 */
const useRailStyles = makeStyles({
  rail: theme => ({
    position: 'absolute',
    height: '4px',
    top: '50%',
    left: 'calc(var(--slider-thumb-size) * .05)',
    right: 'calc(var(--slider-thumb-size) * .05)',
    transform: 'translateY(-50%)',
    borderRadius: '99px',
    boxSizing: 'border-box',
    pointerEvents: 'none',
  }),

  enabled: theme => ({
    background: '#8b8b8b',
    border: '1px solid #626262',
  }),

  disabled: theme => ({
    background: '#ababab',
  }),
});

/**
 * Styles for the trackWrapper slot
 */
const useTrackWrapperStyles = makeStyles({
  trackWrapper: theme => ({
    position: 'absolute',
    top: '50%',
    left: 'calc(var(--slider-thumb-size) * .05)',
    right: 'calc(var(--slider-thumb-size) * .05)',
    transform: 'translateY(-50%)',
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
    minWidth: 'calc(var(--slider-thumb-size) / 2)',
    borderRadius: '99px',
  }),

  enabled: theme => ({
    background: 'var(--slider-color)',
  }),

  disabled: theme => ({
    background: '#868686',
  }),
});

/**
 * Styles for the thumb slot
 */
const useThumbWrapperStyles = makeStyles({
  thumbWrapper: theme => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 'calc(var(--slider-thumb-size) / 2)',
    right: 'calc(var(--slider-thumb-size) / 2)',
    outline: 'none',
  }),
});

/**
 * Styles for the thumb slot
 */
const useThumbStyles = makeStyles({
  thumb: theme => ({
    position: 'absolute',
    width: 'var(--slider-thumb-size)',
    height: 'var(--slider-thumb-size)',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    borderRadius: '999px',

    ':before': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      width: 'var(--slider-thumb-size)',
      height: 'var(--slider-thumb-size)',
      content: "''",
      background: 'var(--slider-color)',
      borderRadius: '999px',
      boxSizing: 'border-box',
      border: 'calc(var(--slider-thumb-size) * .05) solid rgba(0, 0, 0,  0)',
      backgroundClip: 'content-box; padding: 1px',
      boxShadow: '0 0 0 calc(var(--slider-thumb-size) * .2) white inset',
    },

    ':after': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      content: "''",
      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.0578) 50.02%, rgba(0, 0, 0, 0.1622) 95.45%)',
      borderRadius: '999px',
      zIndex: '-1',
    },
  }),

  focusIndicator: createFocusIndicatorStyleRule({
    ':before': {
      outline: 'none',
      boxSizing: 'border-box',
      border: 'calc(var(--slider-thumb-size) * .05) solid black',
    },
  }),

  enabled: theme => ({
    ':hover': {
      ':before': {
        boxShadow: '0 0 0 calc(var(--slider-thumb-size) * .15) white inset',
      },
    },

    ':active': {
      ':before': {
        boxShadow: '0 0 0 calc(var(--slider-thumb-size) * .25) white inset',
      },
    },
  }),

  disabled: theme => ({
    ':before': {
      background: 'rgb(174,174,174)',
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
  const trackWrapperStyles = useTrackWrapperStyles();
  const trackStyles = useTrackStyles();
  const thumbWrapperStyles = useThumbWrapperStyles();
  const thumbStyles = useThumbStyles();
  const activeRailStyles = useActiveRailStyles();

  state.className = mergeClasses(rootStyles.root, state.className);
  state.rail.className = mergeClasses(
    railStyles.rail,
    state.disabled ? railStyles.disabled : railStyles.enabled,
    state.rail.className,
  );
  state.trackWrapper.className = mergeClasses(trackWrapperStyles.trackWrapper, state.trackWrapper.className);
  state.track.className = mergeClasses(
    trackStyles.track,
    state.disabled ? trackStyles.disabled : trackStyles.enabled,
    state.track.className,
  );
  state.thumbWrapper.className = mergeClasses(thumbWrapperStyles.thumbWrapper, state.thumbWrapper.className);
  state.thumb.className = mergeClasses(
    thumbStyles.thumb,
    thumbStyles.focusIndicator,
    state.disabled ? thumbStyles.disabled : thumbStyles.enabled,
    state.thumb.className,
  );
  state.activeRail.className = activeRailStyles.activeRail;

  return state;
};
