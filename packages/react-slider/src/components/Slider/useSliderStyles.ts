import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
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
const thumbSizeVar = `--fui-Slider__thumb--size`;
const railSizeVar = `--fui-Slider__rail--size`;
const railColorVar = `--fui-Slider__rail--color`;
const progressColorVar = `--fui-Slider__progress--color`;
const thumbColorVar = `--fui-Slider__thumb--color`;

export const sliderCSSVars = {
  railDirectionVar: `--fui-Slider__rail--direction`,
  railOffsetVar: `--fui-Slider__rail--offset`,
  railProgressVar: `--fui-Slider__rail--progress`,
  railStepsPercentVar: `--fui-Slider__rail--steps-percent`,
  thumbPositionVar: `--fui-Slider__thumb--position`,
};

const { railDirectionVar, railOffsetVar, railStepsPercentVar, railProgressVar, thumbPositionVar } = sliderCSSVars;

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'inline-grid',
    gridTemplateAreas: '"slider"',
    userSelect: 'none',
    touchAction: 'none',
    alignItems: 'center',
    justifyItems: 'center',
  },

  small: {
    [thumbSizeVar]: '16px',
    [railSizeVar]: '2px',
    minHeight: '24px',
  },

  medium: {
    [thumbSizeVar]: '20px',
    [railSizeVar]: '4px',
    minHeight: '32px',
  },

  horizontal: {
    minWidth: '120px',
    height: `var(${thumbSizeVar})`,
  },

  vertical: {
    width: `var(${thumbSizeVar})`,
    minHeight: '120px',
    gridTemplateColumns: `var(${thumbSizeVar})`,
  },

  enabled: {
    [railColorVar]: tokens.colorNeutralStrokeAccessible,
    [progressColorVar]: tokens.colorCompoundBrandBackground,
    [thumbColorVar]: tokens.colorCompoundBrandBackground,
    ':hover': {
      [thumbColorVar]: tokens.colorBrandBackgroundHover,
      [progressColorVar]: tokens.colorBrandBackgroundHover,
    },
    ':active': {
      [thumbColorVar]: tokens.colorBrandBackgroundPressed,
      [progressColorVar]: tokens.colorBrandBackgroundPressed,
    },
    '@media (forced-colors: active)': {
      [railColorVar]: 'CanvasText',
      [thumbColorVar]: 'Highlight',
      [progressColorVar]: 'Highlight',
      ':hover': {
        [thumbColorVar]: 'Highlight',
        [progressColorVar]: 'Highlight',
      },
    },
  },

  disabled: {
    [thumbColorVar]: tokens.colorNeutralForegroundDisabled,
    [railColorVar]: tokens.colorNeutralBackgroundDisabled,
    [progressColorVar]: tokens.colorNeutralForegroundDisabled,
    '@media (forced-colors: active)': {
      [railColorVar]: 'GrayText',
      [thumbColorVar]: 'GrayText',
      [progressColorVar]: 'GrayText',
    },
  },

  focusIndicatorHorizontal: createFocusOutlineStyle({
    selector: 'focus-within',
    style: { outlineOffset: { top: '6px', bottom: '6px', left: '10px', right: '10px' } },
  }),

  focusIndicatorVertical: createFocusOutlineStyle({
    selector: 'focus-within',
    style: { outlineOffset: { top: '10px', bottom: '10px', left: '6px', right: '6px' } },
  }),
});

/**
 * Styles for the rail slot
 */
const useRailStyles = makeStyles({
  rail: {
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
    pointerEvents: 'none',
    gridRowStart: 'slider',
    gridRowEnd: 'slider',
    gridColumnStart: 'slider',
    gridColumnEnd: 'slider',
    position: 'relative',
    forcedColorAdjust: 'none',
    // Background gradient represents the progress of the slider
    backgroundImage: `linear-gradient(
      var(${railDirectionVar}),
      var(${railColorVar}) 0%,
      var(${railColorVar}) var(${railOffsetVar}),
      var(${progressColorVar}) var(${railOffsetVar}),
      var(${progressColorVar}) calc(var(${railOffsetVar}) + var(${railProgressVar})),
      var(${railColorVar}) calc(var(${railOffsetVar}) + var(${railProgressVar}))
    )`,
    outlineWidth: '1px',
    outlineStyle: 'solid',
    outlineColor: tokens.colorTransparentStroke,
    ':before': {
      content: "''",
      position: 'absolute',
      // Repeating gradient represents the steps if provided
      backgroundImage: `repeating-linear-gradient(
        var(${railDirectionVar}),
        #0000 0%,
        #0000 calc(var(${railStepsPercentVar}) - 1px),
        ${tokens.colorNeutralBackground1} calc(var(${railStepsPercentVar}) - 1px),
        ${tokens.colorNeutralBackground1} var(${railStepsPercentVar})
      )`,
    },
  },

  horizontal: {
    width: '100%',
    height: `var(${railSizeVar})`,
    ':before': {
      left: '-1px',
      right: '-1px',
      height: `var(${railSizeVar})`,
    },
  },

  vertical: {
    width: `var(${railSizeVar})`,
    height: '100%',
    ':before': {
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
    position: 'absolute',
    width: `var(${thumbSizeVar})`,
    height: `var(${thumbSizeVar})`,
    pointerEvents: 'none',
    outlineStyle: 'none',
    forcedColorAdjust: 'none',
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    boxShadow: `0 0 0 calc(var(${thumbSizeVar}) * .2) ${tokens.colorNeutralBackground1} inset`,
    backgroundColor: `var(${thumbColorVar})`,
    transform: 'translateX(-50%)',
    ':before': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      ...shorthands.borderRadius(tokens.borderRadiusCircular),
      boxSizing: 'border-box',
      content: "''",
      ...shorthands.border(`calc(var(${thumbSizeVar}) * .05)`, 'solid', tokens.colorNeutralStroke1),
    },
  },
  disabled: {
    ':before': {
      ...shorthands.border(`calc(var(${thumbSizeVar}) * .05)`, 'solid', tokens.colorNeutralForegroundDisabled),
    },
  },
  horizontal: {
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
    opacity: 0,
    gridRowStart: 'slider',
    gridRowEnd: 'slider',
    gridColumnStart: 'slider',
    gridColumnEnd: 'slider',
    ...shorthands.padding(0),
    ...shorthands.margin(0),
  },
  horizontal: {
    height: `var(${thumbSizeVar})`,
    width: `calc(100% + var(${thumbSizeVar}))`,
  },
  vertical: {
    height: `calc(100% + var(${thumbSizeVar}))`,
    width: `var(${thumbSizeVar})`,
    '-webkit-appearance': 'slider-vertical',
  },
});

/**
 * Apply styling to the Slider slots based on the state
 */
export const useSliderStyles_unstable = (state: SliderState): SliderState => {
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
    state.input.className,
  );

  return state;
};
