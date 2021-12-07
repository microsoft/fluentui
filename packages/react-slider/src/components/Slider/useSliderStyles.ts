import { shorthands, makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import type { SliderState } from './Slider.types';

export const sliderClassName = 'fui-Slider';

export const thumbClassName = `${sliderClassName}-thumb`;
export const trackClassName = `${sliderClassName}-track`;
export const markContainerClassName = `${sliderClassName}-markItemContainer`;
export const firstMarkClassName = `${sliderClassName}-firstMark`;
export const lastMarkClassName = `${sliderClassName}-lastMark`;
export const markClassName = `${sliderClassName}-mark`;
export const markLabelClassName = `${sliderClassName}-label`;

/**
 * Styles for the root slot
 */
export const useRootStyles = makeStyles({
  root: theme => ({
    position: 'relative',
    display: 'inline-flex',
    userSelect: 'none',
    touchAction: 'none',
    verticalAlign: 'bottom',
  }),

  small: {
    '--slider-thumb-size': '10px',
    '--slider-rail-size': '2px',
    '--slider-mark-size': '2px',
  },

  medium: {
    '--slider-thumb-size': '20px',
    '--slider-rail-size': '4px',
    '--slider-mark-size': '4px',
  },

  horizontal: theme => ({
    minWidth: '120px',
    minHeight: 'var(--slider-thumb-size)',
    flexDirection: 'column',
  }),

  vertical: theme => ({
    transform: 'scaleY(-1)',
    minWidth: 'var(--slider-thumb-size)',
    minHeight: '120px',
    flexDirection: 'row',
  }),

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
    createFocusOutlineStyle(theme, { selector: 'focus-within', style: { outlineOffset: '6px' } }),
});

/**
 * Styles for the slider wrapper slot
 */
export const useSliderWrapper = makeStyles({
  sliderWrapper: theme => ({
    position: 'absolute',
    ...shorthands.overflow('hidden'),
  }),

  horizontal: theme => ({
    left: '0px',
    right: '0px',
    top: '0px',
    minHeight: 'var(--slider-thumb-size)',
  }),

  vertical: theme => ({
    top: '0px',
    bottom: '0px',
    left: '0px',
    minWidth: 'var(--slider-thumb-size)',
  }),
});

/**
 * Styles for the rail slot
 */
export const useRailStyles = makeStyles({
  rail: theme => ({
    position: 'absolute',
    ...shorthands.borderRadius(theme.borderRadiusXLarge),
    boxSizing: 'border-box',
    pointerEvents: 'none',
  }),

  enabled: theme => ({
    backgroundColor: theme.colorNeutralStrokeAccessible,
  }),

  disabled: theme => ({
    backgroundColor: theme.colorNeutralBackgroundDisabled,
    ...shorthands.border('1px', 'solid', theme.colorTransparentStrokeDisabled),
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
export const useTrackWrapperStyles = makeStyles({
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
export const useTrackStyles = makeStyles({
  track: theme => ({
    position: 'absolute',
    ...shorthands.borderRadius(theme.borderRadiusXLarge),
  }),

  horizontal: theme => ({
    height: 'var(--slider-rail-size)',
    top: '50%',
    transform: 'translateY(-50%)',
    minWidth: 'calc(var(--slider-thumb-size) / 4)',
  }),

  vertical: theme => ({
    width: 'var(--slider-rail-size)',
    left: '50%',
    transform: 'translateX(-50%)',
    minHeight: 'calc(var(--slider-thumb-size) / 4)',
  }),

  enabled: theme => ({
    backgroundColor: theme.colorCompoundBrandBackground,
  }),

  disabled: theme => ({
    backgroundColor: theme.colorNeutralForegroundDisabled,
  }),
});

/**
 * Styles for the mark slot
 */
export const useMarksWrapperStyles = makeStyles({
  marksWrapper: theme => ({
    position: 'relative',
    display: 'grid',
    outlineStyle: 'none',
    zIndex: 1,
    whiteSpace: 'nowrap',
    [`& .${markClassName}`]: {
      backgroundColor: theme.colorNeutralBackground1,
    },

    [`& .${markLabelClassName}`]: {
      ...shorthands.padding('2px'),
      fontSize: '12px',
    },

    [`& .${firstMarkClassName}, .${lastMarkClassName}`]: {
      opacity: '0',
    },
  }),

  horizontal: theme => ({
    marginTop: 'calc(var(--slider-rail-size) + var(--slider-mark-size))',
    marginLeft: 'calc(var(--slider-thumb-size) / 2)',
    marginRight: 'calc(var(--slider-thumb-size) / 2)',
    justifyItems: 'end',

    [`& .${markContainerClassName}`]: {
      display: 'flex',
      flexDirection: 'column',
      transform: 'translateX(50%)',
      alignItems: 'center',
    },

    [`& .${markLabelClassName}`]: {
      fontFamily: theme.fontFamilyBase,
      color: theme.colorNeutralForeground1,
      paddingTop: 'calc(var(--slider-thumb-size) /2 )',
    },

    [`& .${markClassName}`]: {
      height: '4px',
      width: '1px',
    },
  }),

  vertical: theme => ({
    marginTop: 'calc(var(--slider-thumb-size) / 2)',
    marginBottom: 'calc(var(--slider-thumb-size) / 2)',
    marginLeft: 'calc(var(--slider-rail-size) + var(--slider-mark-size))',
    justifyItems: 'start',

    [`& .${markContainerClassName}`]: {
      display: 'flex',
      flexDirection: 'row',
      transform: 'translateY(50%)',
      alignItems: 'center',
      maxWidth: '100%',
      maxHeight: '100%',
    },

    [`& .${markLabelClassName}`]: {
      paddingLeft: 'calc(var(--slider-thumb-size) /2 )',
      transform: 'scaleY(-1)',
    },

    [`& .${markClassName}`]: {
      height: '1px',
      width: 'var(--slider-mark-size)',
    },
  }),

  disabled: theme => ({
    [`& .${markLabelClassName}`]: {
      color: theme.colorNeutralForegroundDisabled,
    },
  }),
});

/**
 * Styles for the thumb slot
 */
export const useThumbWrapperStyles = makeStyles({
  thumbWrapper: theme => ({
    position: 'absolute',
    outlineStyle: 'none',
    zIndex: 2,
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
export const useThumbStyles = makeStyles({
  thumb: theme => ({
    position: 'absolute',
    width: 'var(--slider-thumb-size)',
    height: 'var(--slider-thumb-size)',
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    outlineStyle: 'none',
    ...shorthands.borderRadius(theme.borderRadiusCircular),
    boxSizing: 'border-box',
    boxShadow: `0 0 0 calc(var(--slider-thumb-size) * .2) ${theme.colorNeutralBackground1} inset`,
    transform: 'translate(-50%, -50%)',

    ':before': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      ...shorthands.borderRadius(theme.borderRadiusCircular),
      boxSizing: 'border-box',
      content: "''",
      ...shorthands.border('calc(var(--slider-thumb-size) * .05)', 'solid', theme.colorNeutralStroke1),
    },
  }),

  enabled: theme => ({
    backgroundColor: theme.colorCompoundBrandBackground,
  }),

  disabled: theme => ({
    backgroundColor: theme.colorNeutralForegroundDisabled,
    ':before': {
      ...shorthands.border('calc(var(--slider-thumb-size) * .05)', 'solid', theme.colorNeutralForegroundDisabled),
    },
  }),

  horizontal: theme => ({
    top: '50%',
  }),
});

/**
 * Styles for the activeRail slot
 */
export const useActiveRailStyles = makeStyles({
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
 * Styles for the Input slot
 */
const useInputStyles = makeStyles({
  input: {
    opacity: 0,
    position: 'absolute',
    ...shorthands.padding('0'),
    ...shorthands.margin('0'),
    width: '100%',
    height: '100%',
    touchAction: 'none',
    pointerEvents: 'none',
  },
});

/**
 * Apply styling to the Slider slots based on the state
 */
export const useSliderStyles = (state: SliderState): SliderState => {
  const rootStyles = useRootStyles();
  const sliderWrapperStyles = useSliderWrapper();
  const railStyles = useRailStyles();
  const trackWrapperStyles = useTrackWrapperStyles();
  const trackStyles = useTrackStyles();
  const marksWrapperStyles = useMarksWrapperStyles();
  const thumbWrapperStyles = useThumbWrapperStyles();
  const thumbStyles = useThumbStyles();
  const activeRailStyles = useActiveRailStyles();
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

  state.sliderWrapper.className = mergeClasses(
    sliderWrapperStyles.sliderWrapper,
    state.vertical ? sliderWrapperStyles.vertical : sliderWrapperStyles.horizontal,
    state.sliderWrapper.className,
  );

  state.rail.className = mergeClasses(
    railStyles.rail,
    state.vertical ? railStyles.vertical : railStyles.horizontal,
    state.disabled ? railStyles.disabled : railStyles.enabled,
    state.rail.className,
  );

  state.sliderWrapper.className = mergeClasses(
    sliderWrapperStyles.sliderWrapper,
    state.vertical ? sliderWrapperStyles.vertical : sliderWrapperStyles.horizontal,
    state.sliderWrapper.className,
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

  state.marksWrapper.className = mergeClasses(
    marksWrapperStyles.marksWrapper,
    state.vertical ? marksWrapperStyles.vertical : marksWrapperStyles.horizontal,
    state.disabled && marksWrapperStyles.disabled,
    state.marksWrapper.className,
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
    state.disabled ? thumbStyles.disabled : thumbStyles.enabled,
    state.thumb.className,
  );

  state.activeRail.className = mergeClasses(
    activeRailStyles.activeRail,
    state.vertical ? activeRailStyles.vertical : activeRailStyles.horizontal,
    state.activeRail.className,
  );

  state.input.className = mergeClasses(inputStyles.input, state.input.className);

  return state;
};
