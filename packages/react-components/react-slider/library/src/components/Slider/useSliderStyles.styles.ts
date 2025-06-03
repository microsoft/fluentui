import { makeStyles, mergeClasses } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import type { SliderState, SliderSlots } from './Slider.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const sliderClassNames: SlotClassNames<SliderSlots> = {
  root: 'fui-Slider',
  rail: 'fui-Slider__rail',
  thumb: 'fui-Slider__thumb',
  input: 'fui-Slider__input',
};

// Internal CSS variables
const thumbPositionVar = `--fui-Slider__thumb--position`;

export const sliderCSSVars = {
  sliderDirectionVar: `--fui-Slider--direction`,
  sliderInnerThumbRadiusVar: `--fui-Slider__inner-thumb--radius`,
  sliderProgressVar: `--fui-Slider--progress`,
  sliderProgressColorVar: `--fui-Slider__progress--color`,
  sliderRailSizeVar: `--fui-Slider__rail--size`,
  sliderRailColorVar: `--fui-Slider__rail--color`,
  sliderStepsPercentVar: `--fui-Slider--steps-percent`,
  sliderThumbColorVar: `--fui-Slider__thumb--color`,
  sliderThumbSizeVar: `--fui-Slider__thumb--size`,
};

const {
  sliderDirectionVar,
  sliderInnerThumbRadiusVar,
  sliderProgressVar,
  sliderProgressColorVar,
  sliderRailSizeVar,
  sliderRailColorVar,
  sliderStepsPercentVar,
  sliderThumbColorVar,
  sliderThumbSizeVar,
} = sliderCSSVars;

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'inline-grid',
    touchAction: 'none',
    alignItems: 'center',
    justifyItems: 'center',
  },

  small: {
    [sliderThumbSizeVar]: '16px',
    [sliderInnerThumbRadiusVar]: '5px',
    [sliderRailSizeVar]: '2px',
    minHeight: '24px',
  },

  medium: {
    [sliderThumbSizeVar]: '20px',
    [sliderInnerThumbRadiusVar]: '6px',
    [sliderRailSizeVar]: '4px',
    minHeight: '32px',
  },

  horizontal: {
    minWidth: '120px',
    // 3x3 grid with the rail and thumb in the center cell [2,2] and the hidden input stretching across all cells
    gridTemplateRows: `1fr var(${sliderThumbSizeVar}) 1fr`,
    gridTemplateColumns: `1fr calc(100% - var(${sliderThumbSizeVar})) 1fr`,
  },

  vertical: {
    minHeight: '120px',
    // 3x3 grid with the rail and thumb in the center cell [2,2] and the hidden input stretching across all cells
    gridTemplateRows: `1fr calc(100% - var(${sliderThumbSizeVar})) 1fr`,
    gridTemplateColumns: `1fr var(${sliderThumbSizeVar}) 1fr`,
  },

  enabled: {
    [sliderRailColorVar]: tokens.colorNeutralStrokeAccessible,
    [sliderProgressColorVar]: tokens.colorCompoundBrandBackground,
    [sliderThumbColorVar]: tokens.colorCompoundBrandBackground,
    ':hover': {
      [sliderThumbColorVar]: tokens.colorCompoundBrandBackgroundHover,
      [sliderProgressColorVar]: tokens.colorCompoundBrandBackgroundHover,
    },
    ':active': {
      [sliderThumbColorVar]: tokens.colorCompoundBrandBackgroundPressed,
      [sliderProgressColorVar]: tokens.colorCompoundBrandBackgroundPressed,
    },
    '@media (forced-colors: active)': {
      [sliderRailColorVar]: 'CanvasText',
      [sliderThumbColorVar]: 'Highlight',
      [sliderProgressColorVar]: 'Highlight',
      ':hover': {
        [sliderThumbColorVar]: 'Highlight',
        [sliderProgressColorVar]: 'Highlight',
      },
    },
  },

  disabled: {
    [sliderThumbColorVar]: tokens.colorNeutralForegroundDisabled,
    [sliderRailColorVar]: tokens.colorNeutralBackgroundDisabled,
    [sliderProgressColorVar]: tokens.colorNeutralForegroundDisabled,
    '@media (forced-colors: active)': {
      [sliderRailColorVar]: 'GrayText',
      [sliderCSSVars.sliderThumbColorVar]: 'GrayText',
      [sliderCSSVars.sliderProgressColorVar]: 'GrayText',
    },
  },

  focusIndicatorHorizontal: createFocusOutlineStyle({
    selector: 'focus-within',
    style: { outlineOffset: { top: '-2px', bottom: '-2px', left: '-4px', right: '-4px' } },
  }),

  focusIndicatorVertical: createFocusOutlineStyle({
    selector: 'focus-within',
    style: { outlineOffset: { top: '-2px', bottom: '-2px', left: '4px', right: '4px' } },
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
    // Background gradient represents the progress of the slider
    backgroundImage: `linear-gradient(
      var(${sliderDirectionVar}),
      var(${sliderProgressColorVar}) 0%,
      var(${sliderProgressColorVar}) var(${sliderProgressVar}),
      var(${sliderRailColorVar}) var(${sliderProgressVar})
    )`,
    outlineWidth: '1px',
    outlineStyle: 'solid',
    outlineColor: tokens.colorTransparentStroke,
    '::before': {
      content: "''",
      position: 'absolute',
      // Repeating gradient represents the steps if provided
      backgroundImage: `repeating-linear-gradient(
        var(${sliderDirectionVar}),
        #0000 0%,
        #0000 calc(var(${sliderStepsPercentVar}) - 1px),
        ${tokens.colorNeutralBackground1} calc(var(${sliderStepsPercentVar}) - 1px),
        ${tokens.colorNeutralBackground1} var(${sliderStepsPercentVar})
      )`,
      // force steps to use HighlightText for high contrast mode
      '@media (forced-colors: active)': {
        backgroundImage: `repeating-linear-gradient(
          var(${sliderDirectionVar}),
          #0000 0%,
          #0000 calc(var(${sliderStepsPercentVar}) - 1px),
          HighlightText calc(var(${sliderStepsPercentVar}) - 1px),
          HighlightText var(${sliderStepsPercentVar})
        )`,
      },
    },
  },

  horizontal: {
    width: '100%',
    height: `var(${sliderRailSizeVar})`,
    '::before': {
      left: '-1px',
      right: '-1px',
      height: `var(${sliderRailSizeVar})`,
    },
  },

  vertical: {
    width: `var(${sliderRailSizeVar})`,
    height: '100%',
    '::before': {
      width: `var(${sliderRailSizeVar})`,
      top: '-1px',
      bottom: '-1px',
    },
  },
});

/**
 * Styles for the thumb slot
 */
const useThumbStyles = makeStyles({
  thumb: {
    // Ensure the thumb stays within the track boundaries.
    // When the value is at 0% or 100%, the distance from the track edge
    // to the thumb center equals the inner thumb radius.
    [`${thumbPositionVar}`]: `clamp(var(${sliderInnerThumbRadiusVar}), var(${sliderProgressVar}), calc(100% - var(${sliderInnerThumbRadiusVar})))`,
    gridRowStart: '2',
    gridRowEnd: '2',
    gridColumnStart: '2',
    gridColumnEnd: '2',
    position: 'absolute',
    width: `var(${sliderThumbSizeVar})`,
    height: `var(${sliderThumbSizeVar})`,
    pointerEvents: 'none',
    outlineStyle: 'none',
    forcedColorAdjust: 'none',
    borderRadius: tokens.borderRadiusCircular,
    boxShadow: `0 0 0 calc(var(${sliderThumbSizeVar}) * .2) ${tokens.colorNeutralBackground1} inset`,
    backgroundColor: `var(${sliderThumbColorVar})`,
    '::before': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      borderRadius: tokens.borderRadiusCircular,
      boxSizing: 'border-box',
      content: "''",
      border: `calc(var(${sliderThumbSizeVar}) * .05) solid ${tokens.colorNeutralStroke1}`,
    },
  },
  disabled: {
    '::before': {
      border: `calc(var(${sliderThumbSizeVar}) * .05) solid ${tokens.colorNeutralForegroundDisabled}`,
    },
  },
  horizontal: {
    transform: 'translateX(-50%)',
    left: `var(${thumbPositionVar})`,
  },
  vertical: {
    transform: 'translateY(50%)',
    bottom: `var(${thumbPositionVar})`,
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
    height: `var(${sliderThumbSizeVar})`,
    width: '100%',
  },
  vertical: {
    height: '100%',
    width: `var(${sliderThumbSizeVar})`,
    // Workaround to check if the browser supports `writing-mode: vertical-lr` for inputs and input[type=range] specifically.
    // We check if the `writing-mode: sideways-lr` is supported as it's newer feature and it means
    // that vertical controls should also support `writing-mode: vertical-lr`.
    '@supports (writing-mode: sideways-lr)': {
      writingMode: 'vertical-lr',
      direction: 'rtl',
    },
    // Fallback for browsers that don't support `writing-mode: vertical-lr` for inputs
    '@supports not (writing-mode: sideways-lr)': {
      WebkitAppearance: 'slider-vertical',
    },
  },
});

/**
 * Apply styling to the Slider slots based on the state
 */
export const useSliderStyles_unstable = (state: SliderState): SliderState => {
  'use no memo';

  const rootStyles = useRootStyles();
  const railStyles = useRailStyles();
  const thumbStyles = useThumbStyles();
  const inputStyles = useInputStyles();
  const isVertical = state.vertical;

  state.root.className = mergeClasses(
    sliderClassNames.root,
    rootStyles.root,
    isVertical ? rootStyles.focusIndicatorVertical : rootStyles.focusIndicatorHorizontal,
    rootStyles[state.size!],
    isVertical ? rootStyles.vertical : rootStyles.horizontal,
    state.disabled ? rootStyles.disabled : rootStyles.enabled,
    state.root.className,
  );

  state.rail.className = mergeClasses(
    sliderClassNames.rail,
    railStyles.rail,
    isVertical ? railStyles.vertical : railStyles.horizontal,
    state.rail.className,
  );

  state.thumb.className = mergeClasses(
    sliderClassNames.thumb,
    thumbStyles.thumb,
    isVertical ? thumbStyles.vertical : thumbStyles.horizontal,
    state.disabled && thumbStyles.disabled,
    state.thumb.className,
  );

  state.input.className = mergeClasses(
    sliderClassNames.input,
    inputStyles.input,
    isVertical ? inputStyles.vertical : inputStyles.horizontal,
    state.disabled && inputStyles.disabled,
    state.input.className,
  );

  return state;
};
