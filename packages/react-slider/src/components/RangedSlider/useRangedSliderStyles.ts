import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import {
  thumbClassName,
  trackClassName,
  useRootStyles,
  useSliderWrapper,
  useRailStyles,
  useTrackWrapperStyles,
  useTrackStyles,
  useMarksWrapperStyles,
  useThumbWrapperStyles,
  useThumbStyles,
  useActiveRailStyles,
} from '../Slider/useSliderStyles';
import { createFocusIndicatorStyleRule } from '@fluentui/react-tabster';
import type { RangedSliderState } from './RangedSlider.types';

/**
 * Focus styling for the lower hidden input. It applies the focus border around the thumb.
 */
export const useInputLowerFocusStyles = makeStyles({
  focusIndicator: createFocusIndicatorStyleRule(
    theme => ({
      '& + .ms-Slider-thumb': {
        background: 'red',
      },
    }),
    { selector: 'focus' },
  ),
});

/**
 * Focus styling for the upper hidden input. It applies the focus border around the upper thumb.
 */
export const useInputUpperFocusStyles = makeStyles({
  focusIndicator: createFocusIndicatorStyleRule(
    theme => ({
      '& + .ms-Slider-thumb': {
        background: 'red',
      },
    }),
    { selector: 'focus' },
  ),
});

/**
 * Styles for the Input slot
 */
export const useInputStyles = makeStyles({
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
  const inputLowerFocusStyles = useInputLowerFocusStyles();
  const inputUpperFocusStyles = useInputLowerFocusStyles();

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
    thumbClassName,
    thumbStyles.thumb,
    !state.vertical && thumbStyles.horizontal,
    state.disabled ? trackStyles.disabled : trackStyles.enabled,
    state.lowerThumb.className,
  );

  state.upperThumbWrapper.className = mergeClasses(
    thumbWrapperStyles.thumbWrapper,
    state.vertical ? thumbWrapperStyles.vertical : thumbWrapperStyles.horizontal,
    state.upperThumbWrapper.className,
  );

  state.upperThumb.className = mergeClasses(
    thumbClassName,
    thumbStyles.thumb,
    !state.vertical && thumbStyles.horizontal,
    state.disabled ? trackStyles.disabled : trackStyles.enabled,
    state.upperThumb.className,
  );

  state.activeRail.className = mergeClasses(
    activeRailStyles.activeRail,
    state.vertical ? activeRailStyles.vertical : activeRailStyles.horizontal,
    state.activeRail.className,
  );

  state.inputLower.className = mergeClasses(
    inputStyles.input,
    inputLowerFocusStyles.focusIndicator,
    state.inputLower.className,
  );
  state.inputUpper.className = mergeClasses(
    inputStyles.input,
    inputUpperFocusStyles.focusIndicator,
    state.inputUpper.className,
  );

  return state;
};
