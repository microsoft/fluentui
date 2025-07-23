import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
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
  thumbColorVar: `--fui-Area__thumb--color`,
  mainColorVar: `--fui-Area--main-color`,
};

// Internal CSS variables
const thumbSizeVar = `--fui-Slider__thumb--size`;

/**
 * Styles for the root slot
 */
const useRootStyles = makeResetStyles({
  position: 'relative',
  border: `1px solid ${tokens.colorNeutralStroke1}`,
  background: `linear-gradient(to bottom, transparent, #000), linear-gradient(to right, #fff, transparent), var(${colorAreaCSSVars.mainColorVar})`,
  forcedColorAdjust: 'none',
  display: 'inline-grid',
  touchAction: 'none',
  alignItems: 'start',
  justifyItems: 'start',
  [thumbSizeVar]: '20px',
  minWidth: '300px',
  minHeight: '300px',
  boxSizing: 'border-box',
  marginBottom: tokens.spacingVerticalSNudge,
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
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralForeground4}`,
    boxShadow: tokens.shadow4,
    backgroundColor: `var(${colorAreaCSSVars.thumbColorVar})`,
    transform: 'translate(-50%, 50%)',
    left: `var(${colorAreaCSSVars.areaXProgressVar})`,
    bottom: `var(${colorAreaCSSVars.areaYProgressVar})`,
    '::before': {
      position: 'absolute',
      inset: '0px',
      borderRadius: tokens.borderRadiusCircular,
      boxSizing: 'border-box',
      content: "''",
      border: `${tokens.strokeWidthThick} solid ${tokens.colorNeutralBackground1}`,
    },
  },
  focusIndicator: createFocusOutlineStyle({
    selector: 'focus-within',
    style: {
      outlineWidth: tokens.strokeWidthThick,
      ...shorthands.borderWidth(tokens.strokeWidthThick),
      outlineRadius: tokens.borderRadiusCircular,
    },
  }),
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

const useShapeStyles = makeStyles({
  rounded: {
    borderRadius: tokens.borderRadiusMedium,
  },
  square: {
    borderRadius: tokens.borderRadiusNone,
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
  const shapeStyles = useShapeStyles();

  state.root.className = mergeClasses(
    colorAreaClassNames.root,
    rootStyles,
    shapeStyles[state.shape || 'rounded'],
    state.root.className,
  );

  state.thumb.className = mergeClasses(
    colorAreaClassNames.thumb,
    thumbStyles.thumb,
    thumbStyles.focusIndicator,
    state.thumb.className,
  );

  state.inputX.className = mergeClasses(colorAreaClassNames.inputX, inputStyles.input, state.inputX.className);

  state.inputY.className = mergeClasses(colorAreaClassNames.inputY, inputStyles.input, state.inputY.className);
  return state;
};
