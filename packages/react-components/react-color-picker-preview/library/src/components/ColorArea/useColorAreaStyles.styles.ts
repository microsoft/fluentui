import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ColorAreaSlots, ColorAreaState } from './ColorArea.types';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';

export const colorAreaClassNames: SlotClassNames<ColorAreaSlots> = {
  root: 'fui-ColorArea',
  thumb: 'fui-ColorArea__thumb',
  inputX: 'fui-ColorArea__inputX',
  inputY: 'fui-ColorArea__inputY',
};

export const colorAreaCSSVars = {
  sliderDirectionVar: `--fui-Slider--direction`,
  sliderProgressVar: `--fui-Slider--progress`,
  sliderStepsPercentVar: `--fui-Slider--steps-percent`,
  thumbColorVar: `--fui-Slider__thumb--color`,
  mainColorVar: `--fui-Slider__rail--color`,
};

const { mainColorVar, thumbColorVar, sliderDirectionVar, sliderProgressVar, sliderStepsPercentVar } = colorAreaCSSVars;

// Internal CSS variables
const thumbSizeVar = `--fui-Slider__thumb--size`;
const areaSizeVar = `--fui-Slider__area--size`;
const areaColorVar = `--fui-Slider__area--color`;
const progressColorVar = `--fui-Slider__progress--color`;

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    // touchAction: 'none',\
    background: `linear-gradient(to bottom, transparent, #000), linear-gradient(to right, white, transparent), var(${mainColorVar})`,
    position: 'relative',
    marginBottom: '8px',
    border: `1px solid #ccc`,
    borderRadius: '2px',
    minWidth: '200px',
    minHeight: '200px',
    width: '200px',
    height: '200px',
    outline: 'none',
    [thumbSizeVar]: '20px',
    [areaSizeVar]: '20px',
  },
  horizontal: {
    width: '100%',
    height: `var(${areaSizeVar})`,
    '::before': {
      left: '-1px',
      right: '-1px',
      height: `var(${areaSizeVar})`,
    },
  },

  vertical: {
    width: `var(${areaSizeVar})`,
    height: '100%',
    '::before': {
      width: `var(${areaSizeVar})`,
      top: '-1px',
      bottom: '1px',
    },
  },
});

/**
 * Styles for the thumb slot
 */
const useThumbStyles = makeStyles({
  thumb: {
    gridRowStart: '2',
    gridRowEnd: '2',
    gridColumnStart: '2',
    gridColumnEnd: '2',
    position: 'absolute',
    width: `var(${thumbSizeVar})`,
    height: `var(${thumbSizeVar})`,
    pointerEvents: 'none',
    outlineStyle: 'none',
    forcedColorAdjust: 'none',
    borderRadius: tokens.borderRadiusCircular,
    boxShadow: `0 0 0 calc(var(${thumbSizeVar}) * .2) ${tokens.colorNeutralBackground1} inset`,
    backgroundColor: `var(${thumbColorVar})`,
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
  disabled: {
    '::before': {
      border: `calc(var(${thumbSizeVar}) * .05) solid ${tokens.colorNeutralForegroundDisabled}`,
    },
  },
});

/**
 * Styles for the Input slot
 */
const useInputStyles = makeStyles({
  input: {
    cursor: 'pointer',
    opacity: 0,
    gridRowStart: '1',
    gridRowEnd: '-1',
    gridColumnStart: '1',
    gridColumnEnd: '-1',
    padding: '0',
    margin: '0',
  },
  disabled: {
    cursor: 'default',
  },
  horizontal: {
    height: `var(${thumbSizeVar})`,
    width: '100%',
  },
  vertical: {
    height: '100%',
    width: `var(${thumbSizeVar})`,
    '-webkit-appearance': 'slider-vertical',
  },
});

/**
 * Apply styling to the ColorArea slots based on the state
 */
export const useColorAreaStyles_unstable = (state: ColorAreaState): ColorAreaState => {
  ('use no memo');

  const styles = useStyles();
  const thumbStyles = useThumbStyles();
  const inputStyles = useInputStyles();

  state.root.className = mergeClasses(
    colorAreaClassNames.root,
    styles.root,
    // isVertical ? styles.focusIndicatorVertical : styles.focusIndicatorHorizontal,
    // isVertical ? styles.vertical : styles.horizontal,
    state.root.className,
  );

  // state.inputX.className = mergeClasses(colorAreaClassNames.inputX, inputStyles.input, state.inputX.className);
  // state.inputY.className = mergeClasses(colorAreaClassNames.inputY, inputStyles.input, state.inputY.className);

  state.thumb.className = mergeClasses(colorAreaClassNames.thumb, thumbStyles.thumb, state.thumb.className);

  return state;
};
