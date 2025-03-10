import { makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
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
  thumbColorVar: `--fui-Slider__thumb--color`,
  railColorVar: `--fui-Slider__rail--color`,
  thumbSizeVar: `--fui-Slider__thumb--size`,
  railSizeVar: `--fui-Slider__rail--size`,
};

const hueBackground = `linear-gradient(${[
  `var(${colorSliderCSSVars.sliderDirectionVar})`,
  'red',
  'fuchsia',
  'blue',
  'aqua',
  'lime',
  'yellow',
  'red',
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
  [colorSliderCSSVars.thumbSizeVar]: '20px',
  [colorSliderCSSVars.railSizeVar]: '20px',
  minHeight: '32px',
});

const useStyles = makeStyles({
  horizontal: {
    minWidth: '200px',
    // 3x3 grid with the rail and thumb in the center cell [2,2] and the hidden input stretching across all cells
    gridTemplateRows: `1fr var(${colorSliderCSSVars.thumbSizeVar}) 1fr`,
    gridTemplateColumns: `1fr 100% 1fr`,
  },

  vertical: {
    minHeight: '280px',
    // 3x3 grid with the rail and thumb in the center cell [2,2] and the hidden input stretching across all cells
    gridTemplateRows: `1fr 100% 1fr`,
    gridTemplateColumns: `1fr var(${colorSliderCSSVars.thumbSizeVar}) 1fr`,
  },
});

const useChannelStyles = makeStyles({
  hue: {
    backgroundImage: hueBackground,
  },
  saturation: {
    backgroundImage: `linear-gradient(to right, #808080, var(${colorSliderCSSVars.railColorVar}))`,
  },
  value: {
    backgroundImage: `linear-gradient(to right, #000, var(${colorSliderCSSVars.railColorVar}))`,
  },
});

/**
 * Styles for the rail slot
 */
const useRailStyles = makeStyles({
  rail: {
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
    height: `var(${colorSliderCSSVars.railSizeVar})`,
    '::before': {
      left: '-1px',
      right: '-1px',
      height: `var(${colorSliderCSSVars.railSizeVar})`,
    },
  },

  vertical: {
    width: `var(${colorSliderCSSVars.railSizeVar})`,
    height: '100%',
    '::before': {
      width: `var(${colorSliderCSSVars.railSizeVar})`,
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
    width: `var(${colorSliderCSSVars.thumbSizeVar})`,
    height: `var(${colorSliderCSSVars.thumbSizeVar})`,
    pointerEvents: 'none',
    outlineStyle: 'none',
    forcedColorAdjust: 'none',
    borderRadius: tokens.borderRadiusCircular,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralForeground4}`,
    boxShadow: tokens.shadow4,
    backgroundColor: `var(${colorSliderCSSVars.thumbColorVar})`,
    '::before': {
      position: 'absolute',
      inset: '0px',
      borderRadius: tokens.borderRadiusCircular,
      boxSizing: 'border-box',
      content: "''",
      border: `${tokens.strokeWidthThick} solid ${tokens.colorNeutralBackground1}`,
    },
  },
  horizontal: {
    transform: 'translateX(-50%)',
    left: `var(${colorSliderCSSVars.sliderProgressVar})`,
  },
  vertical: {
    transform: 'translateY(50%)',
    bottom: `var(${colorSliderCSSVars.sliderProgressVar})`,
  },
});

const useShapeStyles = makeStyles({
  rounded: {
    borderRadius: tokens.borderRadiusMedium,
  },
  square: {
    borderRadius: tokens.borderRadiusNone,
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
    [`:focus-visible ~ .${colorSliderClassNames.thumb}`]: {
      border: `2px solid ${tokens.colorStrokeFocus2}`,
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorTransparentStroke}`,
      borderRadius: tokens.borderRadiusCircular,
    },
  },
  horizontal: {
    height: `var(${colorSliderCSSVars.thumbSizeVar})`,
    width: '100%',
  },
  vertical: {
    height: '100%',
    width: `var(${colorSliderCSSVars.thumbSizeVar})`,
    'writing-mode': 'vertical-lr',
    direction: 'rtl',
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
  const shapeStyles = useShapeStyles();
  const channelStyles = useChannelStyles();
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
    channelStyles[state.channel || 'hue'],
    shapeStyles[state.shape || 'rounded'],
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
