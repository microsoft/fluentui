import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { HighContrastSelector } from '@fluentui/style-utilities';
import { createFocusIndicatorStyleRule } from '@fluentui/react-tabster';
import { SliderState } from './Slider.types';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: theme => ({
    userSelect: 'none',
    position: 'relative',
    display: 'inline-flex',
    height: '25px',
    width: '280px',
    alignItems: 'center',
  }),

  hover: theme => ({
    ':hover .ms-Slider-thumb ': {
      background: '#0078D4',

      [HighContrastSelector]: {
        forcedColorAdjust: 'none',
      },
    },

    ':hover .ms-Slider-track': {
      background: '#0078D4',

      [HighContrastSelector]: {
        forcedColorAdjust: 'none',
      },
    },
  }),

  focusWithin: theme => ({
    ':focus-within .ms-Slider-track': {
      // position: 'absolute',
      background: '#0078D4',

      [HighContrastSelector]: {
        forcedColorAdjust: 'none',
      },
    },

    ':focus-within .ms-Slider-thumb': {
      background: '#0078D4',

      [HighContrastSelector]: {
        background: 'GrayText',
      },
    },
  }),

  activation: theme => ({
    ':active .ms-Slider-thumb': {
      background: '#005A9E',

      [HighContrastSelector]: {
        forcedColorAdjust: 'none',
      },
    },

    ':active .ms-Slider-track': {
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
    height: '4px',
    width: '100%',
    background: '#C8C8C8',
    borderRadius: '4px',
    [HighContrastSelector]: {
      border: '1px solid WindowText',
    },
  }),

  vertical: theme => ({
    height: '120px',
    width: '4px',
  }),
});

/**
 * Styles for the track slot
 */
const useTrackStyles = makeStyles({
  track: theme => ({
    position: 'absolute',
    height: '4px',
    paddingRight: '2px', // Patches a minor gap between the rounded corners of the track and thumb
    background: '#606060',
    borderRadius: '4px 0px 0px 4px',

    [HighContrastSelector]: {
      background: 'Highlight',
    },
  }),

  vertical: theme => ({
    width: '4px',
    borderRadius: '0px 0px 4px 4px',
    paddingRight: '0px',
    paddingTop: '3px', // Patches a minor gap between the rounded corners of the track and thumb
  }),

  disabled: theme => ({
    // Still being worked on.
    background: 'red',

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
    flex: '1',
    width: '20px',
    height: '20px',
    background: '#606060',
    borderRadius: '50%',
    overflow: 'visible',
    // Doesn't work on Safari

    [HighContrastSelector]: {
      background: 'Highlight',
    },
  }),

  disabled: theme => ({
    // Theme still being worked on.
    background: 'red',
    [HighContrastSelector]: {
      background: 'Highlight',
    },
  }),

  focusIndicator: createFocusIndicatorStyleRule({
    outline: 'none',
    boxShadow: '0 0 0 1.5pt black',
    border: '1px solid #FFFFFF',

    [HighContrastSelector]: {
      background: 'GrayText',
      border: '2px solid WindowText',
    },
  }),
});

/**
 * Apply styling to the Slider slots based on the state
 */
export const useSliderStyles = (state: SliderState): SliderState => {
  const rootStyles = useRootStyles();
  const railStyles = useRailStyles();
  const trackStyles = useTrackStyles();
  const thumbStyles = useThumbStyles();

  state.className = mergeClasses(
    rootStyles.root,
    rootStyles.hover,
    rootStyles.focusWithin,
    rootStyles.activation,
    state.className,
  );

  state.rail.className = mergeClasses(railStyles.rail, state.rail.className);

  state.track.className = mergeClasses(
    trackStyles.track,

    state.track.className,
  );

  state.thumb.className = mergeClasses(
    thumbStyles.thumb,
    thumbStyles.focusIndicator,

    state.thumb.className,
  );

  return state;
};
