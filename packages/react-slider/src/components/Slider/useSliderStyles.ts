import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusIndicatorStyleRule } from '@fluentui/react-tabster';
import { SliderState } from './Slider.types';

const thumbClassName = 'ms-Slider-thumb';
const trackClassName = 'ms-Slider-track';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: theme => ({
    '--slider-thumb-size': '20px',
    '--slider-rail-size': '4px',

    position: 'relative',
    userSelect: 'none',
    display: 'inline-flex',
    touchAction: 'none',
  }),

  horizontal: theme => ({
    minWidth: '120px',
    height: 'var(--slider-thumb-size)',
  }),

  vertical: theme => ({
    transform: 'scaleY(-1)',
    width: 'var(--slider-thumb-size)',
    minHeight: '120px',
  }),

  enabled: theme => ({
    ':hover': {
      '& .ms-Slider-thumb': {
        background: theme.alias.color.neutral.brandBackgroundHover,
      },
      '& .ms-Slider-track': {
        background: theme.alias.color.neutral.brandBackgroundHover,
      },
    },
    ':active': {
      '& .ms-Slider-thumb': {
        background: theme.alias.color.neutral.brandBackgroundPressed,
      },
      '& .ms-Slider-track': {
        background: theme.alias.color.neutral.brandBackgroundPressed,
      },
    },
  }),

  focusIndictor: createFocusIndicatorStyleRule(
    theme => ({
      ':after': {
        content: "''",
        position: 'absolute',
        top: '-6px',
        right: '-6px',
        bottom: '-6px',
        left: '-6px',
        boxSizing: 'border-box',
        border: `1px solid ${theme.alias.color.neutral.neutralForeground1}`,
        borderRadius: theme.global.borderRadius.medium,
      },
    }),
    { selector: 'focus-within' },
  ),
});

/**
 * Styles for the rail slot
 */
const useRailStyles = makeStyles({
  rail: theme => ({
    position: 'absolute',
    borderRadius: theme.global.borderRadius.xLarge,
    boxSizing: 'border-box',
    pointerEvents: 'none',
  }),

  enabled: theme => ({
    background: theme.alias.color.neutral.neutralStrokeAccessible,
  }),

  disabled: theme => ({
    background: theme.alias.color.neutral.neutralBackgroundDisabled,
  }),

  horizontal: theme => ({
    height: 'var(--slider-rail-size)',
    top: '50%',
    left: 'calc(var(--slider-thumb-size) * .5)',
    right: 'calc(var(--slider-thumb-size) * .5)',
    transform: 'translateY(-50%)',
  }),

  vertical: theme => ({
    width: 'var(--slider-rail-size)',
    left: '50%',
    top: 'calc(var(--slider-thumb-size) * .5)',
    bottom: 'calc(var(--slider-thumb-size) * .5)',
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
    left: 'calc(var(--slider-thumb-size) * .5)',
    right: 'calc(var(--slider-thumb-size) * .5)',
  }),

  vertical: theme => ({
    left: '50%',
    top: 'calc(var(--slider-thumb-size) * .5)',
    bottom: 'calc(var(--slider-thumb-size) * .5)',
  }),
});

/**
 * Styles for the track slot
 */
const useTrackStyles = makeStyles({
  track: theme => ({
    position: 'absolute',
    borderRadius: theme.global.borderRadius.xLarge,
  }),

  horizontal: theme => ({
    height: 'var(--slider-rail-size)',
    top: '50%',
    transform: 'translateY(-50%)',
    minWidth: 'calc(var(--slider-thumb-size) / 2)',
  }),

  vertical: theme => ({
    width: 'var(--slider-rail-size)',
    left: '50%',
    transform: 'translateX(-50%)',
    minHeight: 'calc(var(--slider-thumb-size) / 2)',
  }),

  enabled: theme => ({
    background: theme.alias.color.neutral.brandBackground,
  }),

  disabled: theme => ({
    background: theme.alias.color.neutral.neutralForegroundDisabled,
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
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    borderRadius: theme.global.borderRadius.circular,
    boxSizing: 'border-box',
    boxShadow: `0 0 0 calc(var(--slider-thumb-size) * .2) ${theme.alias.color.neutral.neutralBackground1} inset`,
    border: `calc(var(--slider-thumb-size) * .05) solid ${theme.alias.color.neutral.neutralStroke1}`,
    backgroundClip: 'content-box; padding: 1px',
  }),

  enabled: theme => ({
    background: theme.alias.color.neutral.brandBackground,
  }),

  disabled: theme => ({
    background: theme.alias.color.neutral.neutralStrokeDisabled,
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
  const thumbWrapperStyles = useThumbWrapperStyles();
  const thumbStyles = useThumbStyles();
  const activeRailStyles = useActiveRailStyles();

  state.className = mergeClasses(
    rootStyles.root,
    state.vertical ? rootStyles.vertical : rootStyles.horizontal,
    !state.disabled && rootStyles.enabled,
    rootStyles.focusIndictor,
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
    trackClassName,
    trackStyles.track,
    state.vertical ? trackStyles.vertical : trackStyles.horizontal,
    state.disabled ? trackStyles.disabled : trackStyles.enabled,
    state.track.className,
  );

  state.thumbWrapper.className = mergeClasses(
    thumbWrapperStyles.thumbWrapper,
    state.vertical ? thumbWrapperStyles.vertical : thumbWrapperStyles.horizontal,
    state.thumbWrapper.className,
  );

  state.thumb.className = mergeClasses(
    thumbClassName,
    thumbStyles.thumb,
    !state.vertical && thumbStyles.horizontal,
    state.disabled ? trackStyles.disabled : trackStyles.enabled,
    state.thumb.className,
  );

  state.activeRail.className = mergeClasses(
    activeRailStyles.activeRail,
    state.vertical ? activeRailStyles.vertical : activeRailStyles.horizontal,
    state.activeRail.className,
  );

  return state;
};
