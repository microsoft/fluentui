import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import {
  thumbClassName,
  trackClassName,
  useActiveRailStyles,
  useMarksWrapperStyles,
  useRailStyles,
  useRootStyles,
  useSliderWrapper,
  useThumbStyles,
  useThumbWrapperStyles,
  useTrackStyles,
  useTrackWrapperStyles,
} from '../Slider/useSliderStyles';
import { createFocusIndicatorStyleRule } from '@fluentui/react-tabster';
import type { RangedSliderState } from './RangedSlider.types';

export const lowerThumbClassName = mergeClasses(thumbClassName, `${thumbClassName + '-lower'}`);
export const upperThumbClassName = mergeClasses(thumbClassName, `${thumbClassName + '-upper'}`);

/**
 * Styles for the Input slot
 */
const useInputStyles = makeStyles({
  input: {
    opacity: 0,
    position: 'absolute',
    padding: 0,
    margin: 0,
    width: '0px',
    height: '0px',
    pointerEvents: 'none',
  },

  lowerInputFocusIndicator: createFocusIndicatorStyleRule(
    theme => ({
      [`& + .${thumbClassName + '-lower'}`]: {
        ':before': {
          outline: 'none',
          boxSizing: 'border-box',
          border: 'calc(var(--slider-thumb-size) * .05) solid black',
        },
      },
    }),
    { selector: 'focus' },
  ),

  upperInputFocusIndicator: createFocusIndicatorStyleRule(
    theme => ({
      [`& + .${thumbClassName + '-upper'}`]: {
        ':before': {
          outline: 'none',
          boxSizing: 'border-box',
          border: 'calc(var(--slider-thumb-size) * .05) solid black',
        },
      },
    }),
    { selector: 'focus' },
  ),
});

export const useRangedSliderStyles = (state: RangedSliderState): RangedSliderState => {
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
    rootStyles.root,
    rootStyles[state.size!],
    state.vertical ? rootStyles.vertical : rootStyles.horizontal,
    state.disabled ? rootStyles.disabled : rootStyles.enabled,
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
    state.marksWrapper.className,
  );

  state.lowerThumbWrapper.className = mergeClasses(
    thumbWrapperStyles.thumbWrapper,
    state.vertical ? thumbWrapperStyles.vertical : thumbWrapperStyles.horizontal,
    state.lowerThumbWrapper.className,
  );

  state.lowerThumb.className = mergeClasses(
    lowerThumbClassName,
    thumbStyles.thumb,
    !state.vertical && thumbStyles.horizontal,
    state.disabled ? thumbStyles.disabled : thumbStyles.enabled,
    state.lowerThumb.className,
  );

  state.upperThumbWrapper.className = mergeClasses(
    thumbWrapperStyles.thumbWrapper,
    state.vertical ? thumbWrapperStyles.vertical : thumbWrapperStyles.horizontal,
    state.upperThumbWrapper.className,
  );

  state.upperThumb.className = mergeClasses(
    upperThumbClassName,
    thumbStyles.thumb,
    !state.vertical && thumbStyles.horizontal,
    state.disabled ? thumbStyles.disabled : thumbStyles.enabled,
    state.upperThumb.className,
  );

  state.activeRail.className = mergeClasses(
    activeRailStyles.activeRail,
    state.vertical ? activeRailStyles.vertical : activeRailStyles.horizontal,
    state.activeRail.className,
  );

  state.lowerInput.className = mergeClasses(
    inputStyles.input,
    inputStyles.lowerInputFocusIndicator,
    state.lowerInput.className,
  );

  state.upperInput.className = mergeClasses(
    inputStyles.input,
    inputStyles.upperInputFocusIndicator,
    state.upperInput.className,
  );

  return state;
};
