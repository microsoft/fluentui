import { makeStyles, mergeClasses } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { type SliderState, sliderCSSVars, sliderClassNames } from '@fluentui/react-slider';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

// Internal CSS variables
const thumbPositionVar = `--fui-Slider__thumb--position`;

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
    [sliderThumbSizeVar]: semanticTokens.ctrlSliderSmThumbSizeRest,
    [sliderInnerThumbRadiusVar]: '5px',
    [sliderRailSizeVar]: semanticTokens.ctrlSliderSmBarHeight,
    minHeight: semanticTokens._ctrlSliderSmBarSizeDefault,
    ':hover': {
      [sliderThumbSizeVar]: semanticTokens.ctrlSliderSmThumbSizeHover,
    },
    ':active': {
      [sliderThumbSizeVar]: semanticTokens.ctrlSliderSmThumbSizePressed,
    },
  },

  smallHorizontal: {
    gridTemplateColumns: `${semanticTokens._ctrlSliderSmPaddingDefault} 1fr ${semanticTokens._ctrlSliderSmPaddingDefault}`,
  },

  smallVertical: {
    gridTemplateRows: `${semanticTokens._ctrlSliderSmPaddingDefault} 1fr ${semanticTokens._ctrlSliderSmPaddingDefault}`,
    minWidth: `Max(${semanticTokens.ctrlSliderSmThumbSizeRest}, ${semanticTokens.ctrlSliderSmThumbSizeHover}, ${semanticTokens.ctrlSliderSmThumbSizePressed})`,
  },

  medium: {
    [sliderThumbSizeVar]: semanticTokens.ctrlSliderThumbSizeRest,
    [sliderInnerThumbRadiusVar]: '6px',
    [sliderRailSizeVar]: semanticTokens.ctrlSliderBarHeight,
    minHeight: semanticTokens._ctrlSliderBarSizeDefault,
    ':hover': {
      [sliderThumbSizeVar]: semanticTokens.ctrlSliderThumbSizeHover,
    },
    ':active': {
      [sliderThumbSizeVar]: semanticTokens.ctrlSliderThumbSizePressed,
    },
  },

  // Thumb should not animate on interactions when disabled
  mediumDisabled: {
    ':hover': {
      [sliderThumbSizeVar]: semanticTokens.ctrlSliderThumbSizeRest,
    },
    ':active': {
      [sliderThumbSizeVar]: semanticTokens.ctrlSliderThumbSizeRest,
    },
  },

  // Thumb should not animate on interactions when disabled
  smallDisabled: {
    ':hover': {
      [sliderThumbSizeVar]: semanticTokens.ctrlSliderSmThumbSizeRest,
    },
    ':active': {
      [sliderThumbSizeVar]: semanticTokens.ctrlSliderSmThumbSizeRest,
    },
  },

  mediumHorizontal: {
    gridTemplateColumns: `${semanticTokens._ctrlSliderPaddingDefault} 1fr ${semanticTokens._ctrlSliderPaddingDefault}`,
  },

  mediumVertical: {
    gridTemplateRows: `${semanticTokens._ctrlSliderPaddingDefault} 1fr ${semanticTokens._ctrlSliderPaddingDefault}`,
    minWidth: `Max(${semanticTokens.ctrlSliderThumbSizeRest}, ${semanticTokens.ctrlSliderThumbSizeHover}, ${semanticTokens.ctrlSliderThumbSizePressed})`,
  },

  horizontal: {
    minWidth: '120px',
    // 3x3 grid with the rail and thumb in the center cell [2,2] and the hidden input stretching across all cells
    gridTemplateRows: `1fr var(${sliderThumbSizeVar}) 1fr`,
  },

  vertical: {
    minHeight: '120px',
    // 3x3 grid with the rail and thumb in the center cell [2,2] and the hidden input stretching across all cells
    gridTemplateColumns: `1fr var(${sliderThumbSizeVar}) 1fr`,
  },

  enabled: {
    [sliderRailColorVar]: semanticTokens.ctrlSliderBarForegroundEmptyRest,
    [sliderProgressColorVar]: semanticTokens.ctrlSliderBarForegroundFilledRest,
    [sliderThumbColorVar]: semanticTokens.ctrlSliderThumbBackgroundRest,
    ':hover': {
      [sliderRailColorVar]: semanticTokens.ctrlSliderBarForegroundEmptyHover,
      [sliderProgressColorVar]: semanticTokens.ctrlSliderBarForegroundFilledHover,
      [sliderThumbColorVar]: semanticTokens.ctrlSliderThumbBackgroundHover,
    },
    ':active': {
      [sliderRailColorVar]: semanticTokens.ctrlSliderBarForegroundEmptyPressed,
      [sliderProgressColorVar]: semanticTokens.ctrlSliderBarForegroundFilledPressed,
      [sliderThumbColorVar]: semanticTokens.ctrlSliderThumbBackgroundPressed,
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
    [sliderRailColorVar]: semanticTokens.ctrlSliderBarForegroundEmptyDisabled,
    [sliderProgressColorVar]: semanticTokens.ctrlSliderBarForegroundFilledDisabled,
    [sliderThumbColorVar]: semanticTokens.ctrlSliderThumbBackgroundDisabled,
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
    borderRadius: semanticTokens.ctrlSliderBarCorner,
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
    outlineWidth: semanticTokens.strokeWidthDefault,
    outlineStyle: 'solid',
    outlineColor: semanticTokens.strokeLayer,
    '::before': {
      content: "''",
      position: 'absolute',
      // Repeating gradient represents the steps if provided
      backgroundImage: `repeating-linear-gradient(
        var(${sliderDirectionVar}),
        #0000 0%,
        #0000 calc(var(${sliderStepsPercentVar}) - 1px),
        ${semanticTokens.backgroundCtrlNeutralRest} calc(var(${sliderStepsPercentVar}) - 1px),
        ${semanticTokens.backgroundCtrlNeutralRest} var(${sliderStepsPercentVar})
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
    borderRadius: semanticTokens.ctrlSliderThumbCorner,
    boxShadow: `0 0 0 calc(var(${sliderThumbSizeVar}) * .2) ${semanticTokens.ctrlSliderThumbInnerStrokeRest} inset`,
    backgroundColor: `var(${sliderThumbColorVar})`,
    '::before': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      borderRadius: semanticTokens.ctrlSliderThumbCorner,
      boxSizing: 'border-box',
      content: "''",
      border: `calc(var(${sliderThumbSizeVar}) * .05) solid ${semanticTokens.ctrlSliderThumbOuterStrokeRest}`,
    },
  },
  disabled: {
    boxShadow: `0 0 0 calc(var(${sliderThumbSizeVar}) * .2) ${semanticTokens.ctrlSliderThumbInnerStrokeDisabled} inset`,
    '::before': {
      border: `calc(var(${sliderThumbSizeVar}) * .05) solid ${semanticTokens.ctrlSliderThumbOuterStrokeDisabled}`,
    },
  },
  enabled: {
    ':hover': {
      boxShadow: `0 0 0 calc(var(${sliderThumbSizeVar}) * .2) ${semanticTokens.ctrlSliderThumbInnerStrokeHover} inset`,
      '::before': {
        border: `calc(var(${sliderThumbSizeVar}) * .05) solid ${semanticTokens.ctrlSliderThumbOuterStrokeHover}`,
      },
    },
    ':active': {
      boxShadow: `0 0 0 calc(var(${sliderThumbSizeVar}) * .2) ${semanticTokens.ctrlSliderThumbInnerStrokePressed} inset`,
      '::before': {
        border: `calc(var(${sliderThumbSizeVar}) * .05) solid ${semanticTokens.ctrlSliderThumbOuterStrokePressed}`,
      },
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
export const useSemanticSliderStyles = (_state: unknown): SliderState => {
  'use no memo';

  const state = _state as SliderState;
  const rootStyles = useRootStyles();
  const railStyles = useRailStyles();
  const thumbStyles = useThumbStyles();
  const inputStyles = useInputStyles();
  const isVertical = state.vertical;
  const isSmallVertical = state.size === 'small' && isVertical;
  const isSmallHorizontal = state.size === 'small' && !isVertical;
  const isMediumVertical = state.size === 'medium' && isVertical;
  const isMediumHorizontal = state.size === 'medium' && !isVertical;
  const disabledThumbStyle = state.size === 'small' ? rootStyles.smallDisabled : rootStyles.mediumDisabled;

  state.root.className = mergeClasses(
    state.root.className,
    sliderClassNames.root,
    rootStyles.root,
    isVertical ? rootStyles.focusIndicatorVertical : rootStyles.focusIndicatorHorizontal,
    rootStyles[state.size!],
    isVertical ? rootStyles.vertical : rootStyles.horizontal,
    isSmallVertical && rootStyles.smallVertical,
    isSmallHorizontal && rootStyles.smallHorizontal,
    isMediumVertical && rootStyles.mediumVertical,
    isMediumHorizontal && rootStyles.mediumHorizontal,
    state.disabled ? rootStyles.disabled : rootStyles.enabled,
    state.disabled && disabledThumbStyle,
    getSlotClassNameProp_unstable(state.root),
  );

  state.rail.className = mergeClasses(
    state.rail.className,
    sliderClassNames.rail,
    railStyles.rail,
    isVertical ? railStyles.vertical : railStyles.horizontal,
    getSlotClassNameProp_unstable(state.rail),
  );

  state.thumb.className = mergeClasses(
    state.thumb.className,
    sliderClassNames.thumb,
    thumbStyles.thumb,
    isVertical ? thumbStyles.vertical : thumbStyles.horizontal,
    state.disabled && thumbStyles.disabled,
    getSlotClassNameProp_unstable(state.thumb),
  );

  state.input.className = mergeClasses(
    state.input.className,
    sliderClassNames.input,
    inputStyles.input,
    isVertical ? inputStyles.vertical : inputStyles.horizontal,
    state.disabled && inputStyles.disabled,
    getSlotClassNameProp_unstable(state.input),
  );

  return state;
};
