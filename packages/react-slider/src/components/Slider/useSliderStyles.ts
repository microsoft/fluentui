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
    // overflow: 'hidden',
    userSelect: 'none',
    display: 'inline-flex',
    touchAction: 'none',
  }),

  horizontal: theme => ({
    minWidth: '280px',
    minHeight: 'var(--slider-thumb-size)',
  }),

  vertical: theme => ({
    transform: 'scaleY(-1)',
    width: 'var(--slider-thumb-size)',
    minHeight: '120px',
  }),
});

/**
 * Styles for the rail slot
 */
const useRailStyles = makeStyles({
  rail: theme => ({
    position: 'absolute',
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

  horizontal: theme => ({
    height: '4px',
    top: '50%',
    left: 'calc(var(--slider-thumb-size) * .05)',
    right: 'calc(var(--slider-thumb-size) * .05)',
    transform: 'translateY(-50%)',
  }),

  vertical: theme => ({
    width: '4px',
    left: '50%',
    top: 'calc(var(--slider-thumb-size) * .05)',
    bottom: 'calc(var(--slider-thumb-size) * .05)',
    transform: 'translateX(-50%)',
  }),
});

/**
 * Styles for the trackWrapper slot
 */
const useTrackWrapperStyles = makeStyles({
  trackWrapper: theme => ({
    position: 'absolute',
  }),

  horizontal: theme => ({
    top: '50%',
    left: 'calc(var(--slider-thumb-size) * .05)',
    right: 'calc(var(--slider-thumb-size) * .05)',
  }),

  vertical: theme => ({
    left: '50%',
    top: 'calc(var(--slider-thumb-size) * .05)',
    bottom: 'calc(var(--slider-thumb-size) * .05)',
  }),
});

/**
 * Styles for the track slot
 */
const useTrackStyles = makeStyles({
  track: theme => ({
    position: 'absolute',
    background: 'var(--slider-color)',
    borderRadius: '99px',
  }),

  horizontal: theme => ({
    height: '4px',
    top: '50%',
    transform: 'translateY(-50%)',
    minWidth: 'calc(var(--slider-thumb-size) / 2)',
  }),

  vertical: theme => ({
    width: '4px',
    left: '50%',
    transform: 'translateX(-50%)',
    minHeight: 'calc(var(--slider-thumb-size) / 2)',
  }),

  enabled: theme => ({
    background: 'var(--slider-color)',
  }),

  disabled: theme => ({
    background: '#868686',
  }),
});

/**
 * Styles for the mark slot
 */
const useMarkStyles = makeStyles({
  mark: theme => ({
    position: 'absolute',
    outline: 'none',

    '& .ms-Slider-markItemContainer': {
      position: 'absolute',
    },

    '& .ms-Slider-mark': {
      position: 'absolute',
      background: '#626262',
    },

    '& .ms-Slider-label': {
      position: 'absolute',
    },
  }),

  horizontal: theme => ({
    left: 'calc(var(--slider-thumb-size) / 2)',
    right: 'calc(var(--slider-thumb-size) / 2)',
    top: '0px',
    bottom: '0px',

    '& .ms-Slider-mark': {
      width: '1px',
      height: '4px',
    },

    '& .ms-Slider-markItemContainer': {
      width: '1px',
      height: '4px',
      bottom: '0px',
    },

    '& .ms-Slider-label': {
      transform: 'translate(-50%)',
      top: '10px',
    },
  }),

  vertical: theme => ({
    top: 'calc(var(--slider-thumb-size) / 2)',
    bottom: 'calc(var(--slider-thumb-size) / 2)',

    '& .ms-Slider-mark': {
      height: '1px',
      width: '4px',
    },
  }),
});

/**
 * Styles for the thumb slot
 */
const useThumbWrapperStyles = makeStyles({
  thumbWrapper: theme => ({
    position: 'absolute',
    outline: 'none',
  }),

  horizontal: theme => ({
    left: 'calc(var(--slider-thumb-size) / 2)',
    right: 'calc(var(--slider-thumb-size) / 2)',
    top: '50%',
  }),

  vertical: theme => ({
    top: 'calc(var(--slider-thumb-size) / 2)',
    bottom: 'calc(var(--slider-thumb-size) / 2)',
    left: '50%',
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

  horizontal: theme => ({
    top: '50%',
  }),
});

/**
 * Styles for the activeRail slot
 */
const useActiveRailStyles = makeStyles({
  activeRail: theme => ({
    position: 'absolute',
  }),

  horizontal: theme => ({
    left: 'calc(var(--slider-thumb-size) / 2)',
    right: 'calc(var(--slider-thumb-size) / 2)',
  }),

  vertical: theme => ({
    top: 'calc(var(--slider-thumb-size) / 2)',
    bottom: 'calc(var(--slider-thumb-size) / 2)',
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
  const markStyles = useMarkStyles();
  const thumbWrapperStyles = useThumbWrapperStyles();
  const thumbStyles = useThumbStyles();
  const activeRailStyles = useActiveRailStyles();

  state.className = mergeClasses(
    rootStyles.root,
    state.vertical ? rootStyles.vertical : rootStyles.horizontal,
    state.className,
  );

  state.rail.className = mergeClasses(
    railStyles.rail,
    state.vertical ? railStyles.vertical : railStyles.horizontal,
    state.disabled ? railStyles.disabled : railStyles.enabled,
    state.rail.className,
  );

  state.trackWrapper.className = mergeClasses(
    trackWrapperStyles.trackWrapper,
    state.vertical ? trackWrapperStyles.vertical : trackWrapperStyles.horizontal,
    state.trackWrapper.className,
  );

  state.track.className = mergeClasses(
    trackStyles.track,
    state.vertical ? trackStyles.vertical : trackStyles.horizontal,
    state.disabled ? trackStyles.disabled : trackStyles.enabled,
    state.track.className,
  );

  state.mark.className = mergeClasses(
    markStyles.mark,
    markStyles.mark,
    state.vertical ? markStyles.vertical : markStyles.horizontal,
    state.mark.className,
  );

  state.thumbWrapper.className = mergeClasses(
    thumbWrapperStyles.thumbWrapper,
    state.vertical ? thumbWrapperStyles.vertical : thumbWrapperStyles.horizontal,
    state.thumbWrapper.className,
  );

  state.thumb.className = mergeClasses(
    thumbStyles.thumb,
    !state.vertical && thumbStyles.horizontal,
    thumbStyles.focusIndicator,
    state.disabled ? thumbStyles.disabled : thumbStyles.enabled,
    state.thumb.className,
  );

  state.activeRail.className = mergeClasses(
    activeRailStyles.activeRail,
    state.vertical ? activeRailStyles.vertical : activeRailStyles.horizontal,
    state.activeRail.className,
  );

  return state;
};
