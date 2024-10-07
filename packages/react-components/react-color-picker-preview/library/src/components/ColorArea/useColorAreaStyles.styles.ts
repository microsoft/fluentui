import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import type { ColorAreaSlots, ColorAreaState } from './ColorArea.types';

export const colorAreaClassNames: SlotClassNames<ColorAreaSlots> = {
  root: 'fui-ColorArea',
  thumb: 'fui-ColorArea__thumb',
  inputX: 'fui-ColorArea__inputX',
  inputY: 'fui-ColorArea__inputY',
};

export const colorAreaCSSVars = {
  areaXProgressVar: `--fui-AreaX--progress`,
  areaYProgressVar: `--fui-AreaY--progress`,
  areaStepsPercentVar: `--fui-Area--steps-percent`,
  thumbColorVar: `--fui-Area__thumb--color`,
  mainColorVar: `--fui-Area--main-color`,
};

// Internal CSS variables
const thumbSizeVar = `--fui-Slider__thumb--size`;

const { areaXProgressVar, areaYProgressVar, thumbColorVar, mainColorVar } = colorAreaCSSVars;

/**
 * Styles for the root slot
 */
const useRootStyles = makeResetStyles({
  position: 'relative',
  border: `1px solid ${tokens.colorNeutralStroke1}`,
  borderRadius: tokens.borderRadiusMedium,
  background: `linear-gradient(to bottom, transparent, #000), linear-gradient(to right, white, transparent), var(${mainColorVar})`,
  'forced-color-adjust': 'none',
  display: 'inline-grid',
  touchAction: 'none',
  alignItems: 'start',
  justifyItems: 'start',
  [thumbSizeVar]: '20px',
  minWidth: '200px',
  minHeight: '200px',
});

/**
 * Styles for the thumb slot
 */
const useThumbStyles = makeStyles({
  thumb: {
    position: 'absolute',
    width: `var(${thumbSizeVar})`,
    height: `var(${thumbSizeVar})`,
    pointerEvents: 'none',
    outlineStyle: 'none',
    forcedColorAdjust: 'none',
    borderRadius: tokens.borderRadiusCircular,
    boxShadow: `0 0 0 calc(var(${thumbSizeVar}) * .2) ${tokens.colorNeutralBackground1} inset`,
    backgroundColor: `var(${thumbColorVar})`,
    transform: 'translate(-50%, 50%)',
    left: `var(${areaXProgressVar})`,
    bottom: `var(${areaYProgressVar})`,
    '::before': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      borderRadius: tokens.borderRadiusCircular,
      boxSizing: 'border-box',
      content: "''",
      border: `calc(var(${thumbSizeVar}) * .05) solid ${tokens.colorNeutralStroke1}`,
    },
  },
});

/**
 * Styles for the Input slot
 */
const useInputStyles = makeStyles({
  input: {
    overflow: 'hidden',
    position: 'absolute',
    pointerEvents: 'none',
    top: 0,
    left: 0,
    opacity: 0,
    padding: '0',
    margin: '0',
    width: '100%',
    height: '100%',
  },
});

/**
 * Apply styling to the ColorArea slots based on the state
 */
export const useColorAreaStyles_unstable = (state: ColorAreaState): ColorAreaState => {
  'use no memo';

  const rootStyles = useRootStyles();
  const thumbStyles = useThumbStyles();
  const inputStyles = useInputStyles();

  state.root.className = mergeClasses(colorAreaClassNames.root, rootStyles, state.root.className);

  state.thumb.className = mergeClasses(colorAreaClassNames.thumb, thumbStyles.thumb, state.thumb.className);

  state.inputX.className = mergeClasses(colorAreaClassNames.inputX, inputStyles.input, state.inputX.className);

  state.inputY.className = mergeClasses(colorAreaClassNames.inputY, inputStyles.input, state.inputY.className);
  return state;
};
