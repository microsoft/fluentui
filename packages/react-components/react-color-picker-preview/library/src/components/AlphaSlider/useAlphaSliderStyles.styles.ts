import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useColorSliderStyles_unstable } from '../ColorSlider/useColorSliderStyles.styles';
import type { AlphaSliderSlots, AlphaSliderState } from './AlphaSlider.types';

const TRANSPARENT_IMAGE_URL = 'https://fabricweb.azureedge.net/fabric-website/assets/images/transparent-pattern.png';

export const alphaSliderClassNames: SlotClassNames<AlphaSliderSlots> = {
  root: 'fui-AlphaSlider',
  rail: 'fui-AlphaSlider__rail',
  thumb: 'fui-AlphaSlider__thumb',
  input: 'fui-AlphaSlider__input',
};

export const alphaSliderCSSVars = {
  sliderDirectionVar: `--fui-AlphaSlider--direction`,
  sliderProgressVar: `--fui-AlphaSlider--progress`,
  thumbColorVar: `--fui-AlphaSlider__thumb--color`,
  railColorVar: `--fui-AlphaSlider__rail--color`,
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  rail: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundImage: `linear-gradient(var(${alphaSliderCSSVars.sliderDirectionVar}), transparent, var(${alphaSliderCSSVars.railColorVar})), url(${TRANSPARENT_IMAGE_URL})`,
  },
});

/**
 * Styles for the thumb slot
 */
const useThumbStyles = makeStyles({
  thumb: {
    backgroundColor: tokens.colorNeutralBackground1,
    '::before': {
      backgroundColor: `var(${alphaSliderCSSVars.thumbColorVar})`,
    },
  },
  horizontal: {
    transform: 'translateX(-50%)',
    left: `var(${alphaSliderCSSVars.sliderProgressVar})`,
  },
  vertical: {
    transform: 'translateY(50%)',
    bottom: `var(${alphaSliderCSSVars.sliderProgressVar})`,
  },
});

/**
 * Apply styling to the AlphaSlider slots based on the state
 */
export const useAlphaSliderStyles_unstable = (state: AlphaSliderState): AlphaSliderState => {
  'use no memo';

  const styles = useStyles();
  const thumbStyles = useThumbStyles();
  state.root.className = mergeClasses(alphaSliderClassNames.root, state.root.className);
  state.input.className = mergeClasses(alphaSliderClassNames.input, state.input.className);
  state.rail.className = mergeClasses(alphaSliderClassNames.rail, styles.rail, state.rail.className);

  state.thumb.className = mergeClasses(
    alphaSliderClassNames.thumb,
    thumbStyles.thumb,
    state.vertical ? thumbStyles.vertical : thumbStyles.horizontal,
    state.thumb.className,
  );

  state.thumb.className = mergeClasses(
    alphaSliderClassNames.thumb,
    thumbStyles.thumb,
    state.vertical ? thumbStyles.vertical : thumbStyles.horizontal,
    state.thumb.className,
  );

  useColorSliderStyles_unstable(state);
  return state;
};
