'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RangeSliderSlots, RangeSliderState } from './RangeSlider.types';
import { rangeSliderCSSVars } from './RangeSlider.constants';

export const rangeSliderClassNames: SlotClassNames<RangeSliderSlots> = {
  root: 'fui-RangeSlider',
  rail: 'fui-RangeSlider__rail',
  startThumb: 'fui-RangeSlider__startThumb',
  endThumb: 'fui-RangeSlider__endThumb',
  startInput: 'fui-RangeSlider__startInput',
  endInput: 'fui-RangeSlider__endInput',
};

const startThumbPositionVar = `--fui-RangeSlider__startThumb--position`;
const endThumbPositionVar = `--fui-RangeSlider__endThumb--position`;

const {
  rangeSliderDirectionVar,
  rangeSliderInnerThumbRadiusVar,
  rangeSliderStartProgressVar,
  rangeSliderEndProgressVar,
  rangeSliderProgressColorVar,
  rangeSliderRailSizeVar,
  rangeSliderRailColorVar,
  rangeSliderStepsPercentVar,
  rangeSliderThumbColorVar,
  rangeSliderThumbSizeVar,
} = rangeSliderCSSVars;

const useRootStyles = makeStyles({
  root: {
    position: 'relative',
    display: 'inline-grid',
    touchAction: 'none',
    alignItems: 'center',
    justifyItems: 'center',
  },
  small: {
    [rangeSliderThumbSizeVar]: '16px',
    [rangeSliderInnerThumbRadiusVar]: '5px',
    [rangeSliderRailSizeVar]: '2px',
    minHeight: '24px',
  },
  medium: {
    [rangeSliderThumbSizeVar]: '20px',
    [rangeSliderInnerThumbRadiusVar]: '6px',
    [rangeSliderRailSizeVar]: '4px',
    minHeight: '32px',
  },
  horizontal: {
    minWidth: '120px',
    gridTemplateRows: `1fr var(${rangeSliderThumbSizeVar}) 1fr`,
    gridTemplateColumns: `1fr calc(100% - var(${rangeSliderThumbSizeVar})) 1fr`,
  },
  vertical: {
    minHeight: '120px',
    gridTemplateRows: `1fr calc(100% - var(${rangeSliderThumbSizeVar})) 1fr`,
    gridTemplateColumns: `1fr var(${rangeSliderThumbSizeVar}) 1fr`,
  },
  enabled: {
    cursor: 'pointer',
    [rangeSliderRailColorVar]: tokens.colorNeutralStrokeAccessible,
    [rangeSliderProgressColorVar]: tokens.colorCompoundBrandBackground,
    [rangeSliderThumbColorVar]: tokens.colorCompoundBrandBackground,
    ':hover': {
      [rangeSliderThumbColorVar]: tokens.colorCompoundBrandBackgroundHover,
      [rangeSliderProgressColorVar]: tokens.colorCompoundBrandBackgroundHover,
    },
    ':active': {
      [rangeSliderThumbColorVar]: tokens.colorCompoundBrandBackgroundPressed,
      [rangeSliderProgressColorVar]: tokens.colorCompoundBrandBackgroundPressed,
    },
    '@media (forced-colors: active)': {
      [rangeSliderRailColorVar]: 'CanvasText',
      [rangeSliderThumbColorVar]: 'Highlight',
      [rangeSliderProgressColorVar]: 'Highlight',
      ':hover': {
        [rangeSliderThumbColorVar]: 'Highlight',
        [rangeSliderProgressColorVar]: 'Highlight',
      },
    },
  },
  disabled: {
    cursor: 'default',
    [rangeSliderThumbColorVar]: tokens.colorNeutralForegroundDisabled,
    [rangeSliderRailColorVar]: tokens.colorNeutralBackgroundDisabled,
    [rangeSliderProgressColorVar]: tokens.colorNeutralForegroundDisabled,
    '@media (forced-colors: active)': {
      [rangeSliderRailColorVar]: 'GrayText',
      [rangeSliderThumbColorVar]: 'GrayText',
      [rangeSliderProgressColorVar]: 'GrayText',
    },
  },
});

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
    backgroundImage: `linear-gradient(
      var(${rangeSliderDirectionVar}),
      var(${rangeSliderRailColorVar}) 0%,
      var(${rangeSliderRailColorVar}) var(${rangeSliderStartProgressVar}),
      var(${rangeSliderProgressColorVar}) var(${rangeSliderStartProgressVar}),
      var(${rangeSliderProgressColorVar}) var(${rangeSliderEndProgressVar}),
      var(${rangeSliderRailColorVar}) var(${rangeSliderEndProgressVar})
    )`,
    outlineWidth: '1px',
    outlineStyle: 'solid',
    outlineColor: tokens.colorTransparentStroke,
    '::before': {
      content: "''",
      position: 'absolute',
      backgroundImage: `repeating-linear-gradient(
        var(${rangeSliderDirectionVar}),
        #0000 0%,
        #0000 calc(var(${rangeSliderStepsPercentVar}) - 1px),
        ${tokens.colorNeutralBackground1} calc(var(${rangeSliderStepsPercentVar}) - 1px),
        ${tokens.colorNeutralBackground1} var(${rangeSliderStepsPercentVar})
      )`,
      '@media (forced-colors: active)': {
        backgroundImage: `repeating-linear-gradient(
          var(${rangeSliderDirectionVar}),
          #0000 0%,
          #0000 calc(var(${rangeSliderStepsPercentVar}) - 1px),
          HighlightText calc(var(${rangeSliderStepsPercentVar}) - 1px),
          HighlightText var(${rangeSliderStepsPercentVar})
        )`,
      },
    },
  },
  horizontal: {
    width: '100%',
    height: `var(${rangeSliderRailSizeVar})`,
    '::before': {
      left: '-1px',
      right: '-1px',
      height: `var(${rangeSliderRailSizeVar})`,
    },
  },
  vertical: {
    width: `var(${rangeSliderRailSizeVar})`,
    height: '100%',
    '::before': {
      width: `var(${rangeSliderRailSizeVar})`,
      top: '-1px',
      bottom: '-1px',
    },
  },
});

const useThumbStyles = makeStyles({
  thumbBase: {
    gridRowStart: '2',
    gridRowEnd: '2',
    gridColumnStart: '2',
    gridColumnEnd: '2',
    position: 'absolute',
    width: `var(${rangeSliderThumbSizeVar})`,
    height: `var(${rangeSliderThumbSizeVar})`,
    pointerEvents: 'auto',
    outlineStyle: 'none',
    forcedColorAdjust: 'none',
    borderRadius: tokens.borderRadiusCircular,
    boxShadow: `0 0 0 calc(var(${rangeSliderThumbSizeVar}) * .2) ${tokens.colorNeutralBackground1} inset`,
    backgroundColor: `var(${rangeSliderThumbColorVar})`,

    '::before': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      borderRadius: tokens.borderRadiusCircular,
      boxSizing: 'border-box',
      content: "''",
      border: `calc(var(${rangeSliderThumbSizeVar}) * .05) solid ${tokens.colorNeutralStroke1}`,
    },
  },
  // Applied to each disabled thumb, so a single disabled thumb looks disabled while the other stays enabled
  disabled: {
    [rangeSliderThumbColorVar]: tokens.colorNeutralForegroundDisabled,
    '::before': {
      border: `calc(var(${rangeSliderThumbSizeVar}) * .05) solid ${tokens.colorNeutralForegroundDisabled}`,
    },
    '@media (forced-colors: active)': {
      [rangeSliderThumbColorVar]: 'GrayText',
    },
  },
  startHorizontal: {
    [`${startThumbPositionVar}`]: `clamp(var(${rangeSliderInnerThumbRadiusVar}), var(${rangeSliderStartProgressVar}), calc(100% - var(${rangeSliderInnerThumbRadiusVar})))`,
    transform: 'translateX(-50%)',
    left: `var(${startThumbPositionVar})`,
  },
  endHorizontal: {
    [`${endThumbPositionVar}`]: `clamp(var(${rangeSliderInnerThumbRadiusVar}), var(${rangeSliderEndProgressVar}), calc(100% - var(${rangeSliderInnerThumbRadiusVar})))`,
    transform: 'translateX(-50%)',
    left: `var(${endThumbPositionVar})`,
  },
  startVertical: {
    [`${startThumbPositionVar}`]: `clamp(var(${rangeSliderInnerThumbRadiusVar}), var(${rangeSliderStartProgressVar}), calc(100% - var(${rangeSliderInnerThumbRadiusVar})))`,
    transform: 'translateY(50%)',
    bottom: `var(${startThumbPositionVar})`,
  },
  endVertical: {
    [`${endThumbPositionVar}`]: `clamp(var(${rangeSliderInnerThumbRadiusVar}), var(${rangeSliderEndProgressVar}), calc(100% - var(${rangeSliderInnerThumbRadiusVar})))`,
    transform: 'translateY(50%)',
    bottom: `var(${endThumbPositionVar})`,
  },
  focusIndicator: createFocusOutlineStyle({
    selector: 'focus-within',
    style: {
      outlineOffset: { top: '0px', bottom: '0px', left: '0px', right: '0px' },
    },
  }),
  activeThumb: {
    zIndex: 1,
  },
});

const useInputStyles = makeStyles({
  thumbInput: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    border: 0,
    backgroundColor: 'transparent',
    color: 'transparent',
    caretColor: 'transparent',
    outlineStyle: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
    opacity: 0,
    cursor: 'pointer',
    // Prevent native range input from intercepting pointer events (touch/click);
    // all pointer interaction is handled by the root's custom pointer handlers.
    pointerEvents: 'none',
  },
  vertical: {
    '-webkit-appearance': 'slider-vertical',
    // Workaround to check if the browser supports `writing-mode: vertical-lr` for inputs and input[type=range] specifically.
    // We check if the `writing-mode: sideways-lr` is supported as it's newer feature and it means
    // that vertical controls should also support `writing-mode: vertical-lr`.
    '@supports (writing-mode: sideways-lr)': {
      writingMode: 'vertical-lr',
      // Keep values increasing upwards in RTL too; Griffel would flip this to ltr.
      // The cast is needed because the Direction type has no room for the @noflip comment.
      direction: 'rtl /* @noflip */' as 'rtl',
    },
    // Fallback for browsers that don't support `writing-mode: vertical-lr` for inputs
    '@supports not (writing-mode: sideways-lr)': {
      WebkitAppearance: 'slider-vertical',
    },
  },
  disabled: {
    cursor: 'default',
  },
});

export const useRangeSliderStyles_unstable = (state: RangeSliderState): RangeSliderState => {
  const rootStyles = useRootStyles();
  const railStyles = useRailStyles();
  const thumbStyles = useThumbStyles();
  const inputStyles = useInputStyles();

  const thumbsOverlap = state.value.start === state.value.end;

  /* eslint-disable react-hooks/immutability */
  state.root.className = mergeClasses(
    rangeSliderClassNames.root,
    rootStyles.root,
    rootStyles[state.size!],
    state.vertical ? rootStyles.vertical : rootStyles.horizontal,
    state.disabled ? rootStyles.disabled : rootStyles.enabled,
    state.root.className,
  );

  state.rail.className = mergeClasses(
    rangeSliderClassNames.rail,
    railStyles.rail,
    state.vertical ? railStyles.vertical : railStyles.horizontal,
    state.rail.className,
  );

  state.startThumb.className = mergeClasses(
    rangeSliderClassNames.startThumb,
    thumbStyles.thumbBase,
    state.vertical ? thumbStyles.startVertical : thumbStyles.startHorizontal,
    thumbStyles.focusIndicator,
    state.startDisabled && thumbStyles.disabled,
    thumbsOverlap && state.activeThumb === 'start' && thumbStyles.activeThumb,
    state.startThumb.className,
  );

  state.endThumb.className = mergeClasses(
    rangeSliderClassNames.endThumb,
    thumbStyles.thumbBase,
    state.vertical ? thumbStyles.endVertical : thumbStyles.endHorizontal,
    thumbStyles.focusIndicator,
    state.endDisabled && thumbStyles.disabled,
    thumbsOverlap && state.activeThumb === 'end' && thumbStyles.activeThumb,
    state.endThumb.className,
  );

  state.startInput.className = mergeClasses(
    rangeSliderClassNames.startInput,
    inputStyles.thumbInput,
    state.vertical && inputStyles.vertical,
    state.startDisabled && inputStyles.disabled,
    state.startInput.className,
  );

  state.endInput.className = mergeClasses(
    rangeSliderClassNames.endInput,
    inputStyles.thumbInput,
    state.vertical && inputStyles.vertical,
    state.endDisabled && inputStyles.disabled,
    state.endInput.className,
  );
  /* eslint-enable react-hooks/immutability */

  return state;
};
