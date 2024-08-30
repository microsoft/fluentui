import { makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import type { ColorSliderSlots, ColorSliderState } from './ColorSlider.types';

export const colorSliderClassNames: SlotClassNames<ColorSliderSlots> = {
  root: 'fui-ColorSlider',
  rail: 'fui-ColorSlider__rail',
  thumb: 'fui-ColorSlider__thumb',
  input: 'fui-ColorSlider__input',
};

export const colorSliderCSSVars = {
  sliderDirectionVar: `--fui-Slider--direction`,
  sliderProgressVar: `--fui-Slider--progress`,
  sliderStepsPercentVar: `--fui-Slider--steps-percent`,
  thumbColorVar: `--fui-Slider__thumb--color`,
};

// Internal CSS variables
const thumbSizeVar = `--fui-Slider__thumb--size`;
const railSizeVar = `--fui-Slider__rail--size`;

const { sliderDirectionVar, sliderProgressVar, thumbColorVar } = colorSliderCSSVars;

const hueBackground = `linear-gradient(${[
  `var(${sliderDirectionVar})`,
  'red 0',
  '#f09 10%',
  '#cd00ff 20%',
  '#3200ff 30%',
  '#06f 40%',
  '#00fffd 50%',
  '#0f6 60%',
  '#35ff00 70%',
  '#cdff00 80%',
  '#f90 90%',
  'red 100%',
].join(',')})`;

/**
 * Styles for the root slot
 */
const useRootStyles = makeResetStyles({
  position: 'relative',
  display: 'inline-grid',
  touchAction: 'none',
  alignItems: 'center',
  justifyItems: 'center',
  [thumbSizeVar]: '20px',
  [railSizeVar]: '20px',
  minHeight: '32px',
});

const useStyles = makeStyles({
  horizontal: {
    minWidth: '120px',
    // 3x3 grid with the rail and thumb in the center cell [2,2] and the hidden input stretching across all cells
    gridTemplateRows: `1fr var(${thumbSizeVar}) 1fr`,
    gridTemplateColumns: `1fr calc(100% - var(${thumbSizeVar})) 1fr`,
  },

  vertical: {
    minHeight: '280px',
    // 3x3 grid with the rail and thumb in the center cell [2,2] and the hidden input stretching across all cells
    gridTemplateRows: `1fr calc(100% - var(${thumbSizeVar})) 1fr`,
    gridTemplateColumns: `1fr var(${thumbSizeVar}) 1fr`,
  },
  hue: {
    backgroundImage: hueBackground,
  },
  focusIndicatorHorizontal: createFocusOutlineStyle({
    selector: 'focus-within',
    style: { outlineOffset: { top: '-2px', bottom: '-2px', left: '8px', right: '8px' } },
  }),

  focusIndicatorVertical: createFocusOutlineStyle({
    selector: 'focus-within',
    style: { outlineOffset: { top: '6px', bottom: '6px', left: '4px', right: '4px' } },
  }),
});

/**
 * Styles for the rail slot
 */
const useRailStyles = makeStyles({
  rail: {
    borderRadius: tokens.borderRadiusXLarge,
    pointerEvents: 'none',
    gridRowStart: '2',
    gridRowEnd: '2',
    gridColumnStart: '2',
    gridColumnEnd: '2',
    position: 'relative',
    forcedColorAdjust: 'none',
    outlineWidth: '1px',
    outlineStyle: 'solid',
    outlineColor: tokens.colorTransparentStroke,
    '::before': {
      content: "''",
      position: 'absolute',
    },
  },

  horizontal: {
    width: '100%',
    height: `var(${railSizeVar})`,
    '::before': {
      left: '-1px',
      right: '-1px',
      height: `var(${railSizeVar})`,
    },
  },

  vertical: {
    width: `var(${railSizeVar})`,
    height: '100%',
    '::before': {
      width: `var(${railSizeVar})`,
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
  horizontal: {
    transform: 'translateX(-50%)',
    left: `var(${sliderProgressVar})`,
  },
  vertical: {
    transform: 'translateY(50%)',
    bottom: `var(${sliderProgressVar})`,
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
 * Apply styling to the ColorSlider slots based on the state
 */
export const useColorSliderStyles_unstable = (state: ColorSliderState): ColorSliderState => {
  'use no memo';

  const rootStyles = useRootStyles();
  const styles = useStyles();
  const railStyles = useRailStyles();
  const thumbStyles = useThumbStyles();
  const inputStyles = useInputStyles();
  const isVertical = state.vertical;

  state.root.className = mergeClasses(
    colorSliderClassNames.root,
    rootStyles,
    isVertical ? styles.vertical : styles.horizontal,
    state.root.className,
  );

  state.rail.className = mergeClasses(
    colorSliderClassNames.rail,
    railStyles.rail,
    styles.hue,
    isVertical ? railStyles.vertical : railStyles.horizontal,
    state.rail.className,
  );

  state.thumb.className = mergeClasses(
    colorSliderClassNames.thumb,
    thumbStyles.thumb,
    isVertical ? thumbStyles.vertical : thumbStyles.horizontal,
    state.thumb.className,
  );

  state.input.className = mergeClasses(
    colorSliderClassNames.input,
    inputStyles.input,
    isVertical ? inputStyles.vertical : inputStyles.horizontal,
    state.input.className,
  );
  return state;
};
