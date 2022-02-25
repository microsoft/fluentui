import { shorthands, makeStyles, mergeClasses } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import type { SliderState } from './Slider.types';

export const sliderClassName = 'fui-Slider';

const thumbSizeVar = `--fui-slider-thumb-size`;
const railSizeVar = `--fui-slider-rail-size`;
const railColorVar = `--fui-slider-rail-color`;
const progressColorVar = `--fui-slider-progress-color`;
const thumbColorVar = `--fui-slider-thumb-color`;

export const railDirectionVar = `--fui-slider-rail-direction`;
export const railOffsetVar = `--fui-slider-rail-offset`;
export const railProgressVar = `--fui-slider-rail-progress`;
export const railStepsPercentVar = `--fui-slider-rail-steps-percent`;
export const thumbPositionVar = `--fui-slider-thumb-position`;

/**
 * Styles for the root slot
 */
export const useRootStyles = makeStyles({
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
export const useRailStyles = makeStyles({
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
export const useThumbStyles = makeStyles({
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

  state.root.className = mergeClasses(
    sliderClassName,
    rootStyles.root,
    state.vertical ? rootStyles.focusIndicatorVertical : rootStyles.focusIndicatorHorizontal,
    rootStyles[state.size!],
    state.vertical ? rootStyles.vertical : rootStyles.horizontal,
    state.disabled ? rootStyles.disabled : rootStyles.enabled,
    state.root.className,
  );

  state.rail.className = mergeClasses(
    railStyles.rail,
    state.vertical ? railStyles.vertical : railStyles.horizontal,
    state.rail.className,
  );

  state.thumb.className = mergeClasses(
    thumbStyles.thumb,
    state.vertical ? thumbStyles.vertical : thumbStyles.horizontal,
    state.disabled && thumbStyles.disabled,
    state.thumb.className,
  );

  state.input.className = mergeClasses(
    inputStyles.input,
    state.vertical ? inputStyles.vertical : inputStyles.horizontal,
    state.input.className,
  );

  return state;
};
