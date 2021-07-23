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
});

/**
 * Styles for the activeRail slot
 */
const useActiveRailStyles = makeStyles({
  activeRail: theme => ({
    position: 'absolute',
  }),
});

/**
 * Styles for the track slot
 */
const useTrackStyles = makeStyles({
  track: theme => ({
    position: 'absolute',
    height: '4px',
    minWidth: '10px',
    background: '#606060',
    borderRadius: '4px',

    [HighContrastSelector]: {
      background: 'Highlight',
    },
  }),
});

/**
 * Styles for the thumbContainer slot
 */
const useThumbContainerStyles = makeStyles({
  thumbContainer: theme => ({
    position: 'absolute',
  }),
});

/**
 * Styles for the thumb slot
 */
const useThumbStyles = makeStyles({
  thumb: theme => ({
    position: 'absolute',
    width: '20px',
    height: '20px',
    background: '#606060',
    borderRadius: '50%',
    transform: 'translate(-50%,-40%)',
    top: '50%',
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
  const activeRailStyles = useActiveRailStyles();
  const trackStyles = useTrackStyles();
  const thumbStyles = useThumbStyles();
  const thumbContainerStyles = useThumbContainerStyles();

  state.className = mergeClasses(
    rootStyles.root,
    rootStyles.hover,
    rootStyles.focusWithin,
    rootStyles.activation,
    state.className,
  );

  state.rail.className = mergeClasses(railStyles.rail, state.rail.className);

  state.activeRail.className = mergeClasses(activeRailStyles.activeRail, state.activeRail.className);

  state.track.className = mergeClasses(trackStyles.track, state.track.className);

  state.thumb.className = mergeClasses(thumbStyles.thumb, thumbStyles.focusIndicator, state.thumb.className);

  state.thumbContainer.className = mergeClasses(thumbContainerStyles.thumbContainer, state.thumbContainer.className);

  return state;
};
