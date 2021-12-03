import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import type { SliderState } from './Slider.types';

export const sliderClassName = 'fui-Slider';

export const thumbClassName = `${sliderClassName}-thumb`;
export const trackClassName = `${sliderClassName}-track`;
export const markContainerClassName = `${sliderClassName}-markItemContainer`;
export const firstMarkClassName = `${sliderClassName}-firstMark`;
export const lastMarkClassName = `${sliderClassName}-lastMark`;
export const markClassName = `${sliderClassName}-mark`;
export const markLabelClassName = `${sliderClassName}-label`;

const sClassName = 'fui-Slider';
const internalMarkContainerClassName = `${sClassName}-markItemContainer`;
const internalFirstMarkClassName = `${sClassName}-firstMark`;
const internalLastMarkClassName = `${sClassName}-lastMark`;
const internalMarkClassName = `${sClassName}-mark`;
const internalMarkLabelClassName = `${sClassName}-label`;

/**
 * Styles for the root slot
 */
export const useRootStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'inline-flex',
    userSelect: 'none',
    touchAction: 'none',
    verticalAlign: 'bottom',
  },

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

  horizontal: {
    minWidth: '120px',
    minHeight: 'var(--slider-thumb-size)',
    flexDirection: 'column',
  },

  vertical: {
    transform: 'scaleY(-1)',
    minWidth: 'var(--slider-thumb-size)',
    minHeight: '120px',
    flexDirection: 'row',
  },

  enabled: {
    cursor: 'grab',
    ':hover': {
      [`& .${thumbClassName}`]: {
        background: tokens.colorBrandBackgroundHover,
      },
      [`& .${trackClassName}`]: {
        background: tokens.colorBrandBackgroundHover,
      },
    },
    ':active': {
      cursor: 'grabbing',
      [`& .${thumbClassName}`]: {
        background: tokens.colorBrandBackgroundPressed,
      },
      [`& .${trackClassName}`]: {
        background: tokens.colorBrandBackgroundPressed,
      },
    },
  },

  disabled: {
    cursor: 'not-allowed',
  },

  focusIndicator: createFocusOutlineStyle({ selector: 'focus-within', style: { outlineOffset: '6px' } }),
});

/**
 * Styles for the slider wrapper slot
 */
export const useSliderWrapper = makeStyles({
  sliderWrapper: {
    position: 'absolute',
    overflow: 'hidden',
  },

  horizontal: {
    left: '0px',
    right: '0px',
    top: '0px',
    minHeight: 'var(--slider-thumb-size)',
  },

  vertical: {
    top: '0px',
    bottom: '0px',
    left: '0px',
    minWidth: 'var(--slider-thumb-size)',
  },
});

/**
 * Styles for the rail slot
 */
export const useRailStyles = makeStyles({
  rail: {
    position: 'absolute',
    borderRadius: tokens.borderRadiusXLarge,
    boxSizing: 'border-box',
    pointerEvents: 'none',
  },

  enabled: {
    background: tokens.colorNeutralStrokeAccessible,
  },

  disabled: {
    background: tokens.colorNeutralBackgroundDisabled,
    border: `1px solid ${tokens.colorTransparentStrokeDisabled}`,
  },

  horizontal: {
    height: 'var(--slider-rail-size)',
    top: '50%',
    left: 'calc(var(--slider-thumb-size) * .5)',
    right: 'calc(var(--slider-thumb-size) * .5)',
    transform: 'translateY(-50%)',
  },

  vertical: {
    width: 'var(--slider-rail-size)',
    left: '50%',
    top: 'calc(var(--slider-thumb-size) * .5)',
    bottom: 'calc(var(--slider-thumb-size) * .5)',
    transform: 'translateX(-50%)',
  },
});

/**
 * Styles for the trackWrapper slot
 */
export const useTrackWrapperStyles = makeStyles({
  trackWrapper: {
    position: 'absolute',
  },

  horizontal: {
    top: '50%',
    left: 'calc(var(--slider-thumb-size) * .5)',
    right: 'calc(var(--slider-thumb-size) * .5)',
  },

  vertical: {
    left: '50%',
    top: 'calc(var(--slider-thumb-size) * .5)',
    bottom: 'calc(var(--slider-thumb-size) * .5)',
  },
});

/**
 * Styles for the track slot
 */
export const useTrackStyles = makeStyles({
  track: {
    position: 'absolute',
    borderRadius: tokens.borderRadiusXLarge,
  },

  horizontal: {
    height: 'var(--slider-rail-size)',
    top: '50%',
    transform: 'translateY(-50%)',
    minWidth: 'calc(var(--slider-thumb-size) / 4)',
  },

  vertical: {
    width: 'var(--slider-rail-size)',
    left: '50%',
    transform: 'translateX(-50%)',
    minHeight: 'calc(var(--slider-thumb-size) / 4)',
  },

  enabled: {
    background: tokens.colorCompoundBrandBackground,
  },

  disabled: {
    background: tokens.colorNeutralForegroundDisabled,
  },
});

/**
 * Styles for the mark slot
 */
export const useMarksWrapperStyles = makeStyles({
  marksWrapper: {
    position: 'relative',
    display: 'grid',
    outline: 'none',
    zIndex: '1',
    whiteSpace: 'nowrap',
    [`& .${internalMarkClassName}`]: {
      background: tokens.colorNeutralBackground1,
    },

    [`& .${internalMarkLabelClassName}`]: {
      padding: '2px',
      fontSize: '12px',
    },

    [`& .${internalFirstMarkClassName}, .${internalLastMarkClassName}`]: {
      opacity: '0',
    },
  },

  horizontal: {
    marginTop: 'calc(var(--slider-rail-size) + var(--slider-mark-size))',
    marginLeft: 'calc(var(--slider-thumb-size) / 2)',
    marginRight: 'calc(var(--slider-thumb-size) / 2)',
    justifyItems: 'end',

    [`& .${internalMarkContainerClassName}`]: {
      display: 'flex',
      flexDirection: 'column',
      transform: 'translateX(50%)',
      alignItems: 'center',
    },

    [`& .${internalMarkLabelClassName}`]: {
      fontFamily: tokens.fontFamilyBase,
      color: tokens.colorNeutralForeground1,
      paddingTop: 'calc(var(--slider-thumb-size) /2 )',
    },

    [`& .${internalMarkClassName}`]: {
      height: '4px',
      width: '1px',
    },
  },

  vertical: {
    marginTop: 'calc(var(--slider-thumb-size) / 2)',
    marginBottom: 'calc(var(--slider-thumb-size) / 2)',
    marginLeft: 'calc(var(--slider-rail-size) + var(--slider-mark-size))',
    justifyItems: 'start',

    [`& .${internalMarkContainerClassName}`]: {
      display: 'flex',
      flexDirection: 'row',
      transform: 'translateY(50%)',
      alignItems: 'center',
      maxWidth: '100%',
      maxHeight: '100%',
    },

    [`& .${internalMarkLabelClassName}`]: {
      paddingLeft: 'calc(var(--slider-thumb-size) /2 )',
      transform: 'scaleY(-1)',
    },

    [`& .${internalMarkClassName}`]: {
      height: '1px',
      width: 'var(--slider-mark-size)',
    },
  },

  disabled: {
    [`& .${internalMarkLabelClassName}`]: {
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
});

/**
 * Styles for the thumb slot
 */
export const useThumbWrapperStyles = makeStyles({
  thumbWrapper: {
    position: 'absolute',
    outline: 'none',
    zIndex: '2',
  },

  horizontal: {
    left: 'calc(var(--slider-thumb-size) / 2)',
    right: 'calc(var(--slider-thumb-size) / 2)',
    top: '50%',
  },

  vertical: {
    top: 'calc(var(--slider-thumb-size) / 2)',
    bottom: 'calc(var(--slider-thumb-size) / 2)',
    left: '50%',
  },
});

/**
 * Styles for the thumb slot
 */
export const useThumbStyles = makeStyles({
  thumb: {
    position: 'absolute',
    width: 'var(--slider-thumb-size)',
    height: 'var(--slider-thumb-size)',
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px',
    outline: 'none',
    borderRadius: tokens.borderRadiusCircular,
    boxSizing: 'border-box',
    boxShadow: `0 0 0 calc(var(--slider-thumb-size) * .2) ${tokens.colorNeutralBackground1} inset`,
    transform: 'translate(-50%, -50%)',

    ':before': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      borderRadius: tokens.borderRadiusCircular,
      boxSizing: 'border-box',
      content: "''",
      border: `calc(var(--slider-thumb-size) * .05) solid ${tokens.colorNeutralStroke1}`,
    },
  },

  enabled: {
    background: tokens.colorCompoundBrandBackground,
  },

  disabled: {
    background: tokens.colorNeutralForegroundDisabled,
    ':before': {
      border: `calc(var(--slider-thumb-size) * .05) solid ${tokens.colorNeutralForegroundDisabled}`,
    },
  },

  horizontal: {
    top: '50%',
  },
});

/**
 * Styles for the activeRail slot
 */
export const useActiveRailStyles = makeStyles({
  activeRail: {
    position: 'absolute',
  },

  horizontal: {
    left: 'calc(var(--slider-thumb-size) / 2)',
    right: 'calc(var(--slider-thumb-size) / 2)',
  },

  vertical: {
    top: 'calc(var(--slider-thumb-size) / 2)',
    bottom: 'calc(var(--slider-thumb-size) / 2)',
  },
});

/**
 * Styles for the Input slot
 */
const useInputStyles = makeStyles({
  input: {
    opacity: 0,
    position: 'absolute',
    padding: 0,
    margin: 0,
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
