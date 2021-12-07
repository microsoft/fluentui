import { shorthands, makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import type { SliderState } from './Slider.types';

export const sliderClassName = 'fui-Slider';

const thumbClassName = `${sliderClassName}-thumb`;
const railClassName = `${sliderClassName}-rail`;

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
  },

  small: {
    '--slider-thumb-size': '10px',
    '--slider-rail-size': '2px',
  },

  medium: {
    '--slider-thumb-size': '20px',
    '--slider-rail-size': '4px',
  },

  horizontal: {
    minWidth: '120px',
    height: 'var(--slider-thumb-size)',
    alignItems: 'center',
  },

  vertical: {
    width: 'var(--slider-thumb-size)',
    minHeight: '120px',
    justifyItems: 'center',
    gridTemplateColumns: 'var(--slider-thumb-size)',
  },

  enabled: theme => ({
    '--slider-rail-color': theme.colorNeutralStrokeAccessible,
    '--slider-progress-color': theme.colorCompoundBrandBackground,
    ':hover': {
      [`& .${thumbClassName}`]: {
        background: theme.colorBrandBackgroundHover,
      },
      '--slider-progress-color': theme.colorBrandBackgroundHover,
    },
    ':active': {
      [`& .${thumbClassName}`]: {
        background: theme.colorBrandBackgroundPressed,
      },
      '--slider-progress-color': theme.colorBrandBackgroundPressed,
    },
  }),

  disabled: theme => ({
    '--slider-rail-color': theme.colorNeutralBackgroundDisabled,
    '--slider-progress-color': theme.colorNeutralForegroundDisabled,
  }),

  focusIndicatorHorizontal: theme =>
    createFocusOutlineStyle(theme, {
      selector: 'focus-within',
      style: { outlineOffset: { top: '6px', bottom: '6px', left: '10px', right: '10px' } },
    }),
  focusIndicatorVertical: theme =>
    createFocusOutlineStyle(theme, {
      selector: 'focus-within',
      style: { outlineOffset: { top: '10px', bottom: '10px', left: '6px', right: '6px' } },
    }),
});

/**
 * Styles for the rail slot
 */
export const useRailStyles = makeStyles({
  rail: theme => ({
    ...shorthands.borderRadius(theme.borderRadiusXLarge),
    pointerEvents: 'none',
    gridArea: 'slider',
    position: 'relative',
    background: `linear-gradient(
      var(--slider-rail-direction),
      var(--slider-rail-color) 0%,
      var(--slider-rail-color) var(--slider-rail-offset),
      var(--slider-progress-color) var(--slider-rail-offset),
      var(--slider-progress-color) calc(var(--slider-rail-offset) + var(--slider-rail-progress)),
      var(--slider-rail-color) calc(var(--slider-rail-offset) + var(--slider-rail-progress))
    )`,
    ':before': {
      content: "''",
      position: 'absolute',
      background: `repeating-linear-gradient(
        var(--slider-rail-direction),
        #0000 0%,
        #0000 calc(var(--slider-rail-steps-percent) - 1px),
        #fff calc(var(--slider-rail-steps-percent) - 1px),
        #fff var(--slider-rail-steps-percent)
      )`,
    },
  }),

  disabled: theme => ({
    ...shorthands.border('1px', 'solid', theme.colorTransparentStrokeDisabled),
  }),

  horizontal: {
    '--slider-rail-direction': '90deg',
    height: 'var(--slider-rail-size)',
    ':before': {
      left: '-1px',
      right: '-1px',
      height: 'var(--slider-rail-size)',
    },
  },

  vertical: {
    '--slider-rail-direction': '0deg',
    width: 'var(--slider-rail-size)',
    height: '100%',
    ':before': {
      width: 'var(--slider-rail-size)',
      top: '-1px',
      bottom: '1px',
    },
  },
});

/**
 * Styles for the thumb slot
 */
export const useThumbStyles = makeStyles({
  thumb: theme => ({
    position: 'absolute',
    width: 'var(--slider-thumb-size)',
    height: 'var(--slider-thumb-size)',
    outline: 'none',
    ...shorthands.borderRadius(theme.borderRadiusCircular),
    boxShadow: `0 0 0 calc(var(--slider-thumb-size) * .2) ${theme.colorNeutralBackground1} inset`,
    transform: 'translateX(-50%)',
    ':before': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      ...shorthands.borderRadius(theme.borderRadiusCircular),
      boxSizing: 'border-box',
      content: "''",
      ...shorthands.border('calc(var(--slider-thumb-size) * .05)', 'solid', theme.colorNeutralStroke1),
    },
  }),

  enabled: theme => ({
    backgroundColor: theme.colorCompoundBrandBackground,
  }),

  disabled: theme => ({
    backgroundColor: theme.colorNeutralForegroundDisabled,
    ':before': {
      ...shorthands.border('calc(var(--slider-thumb-size) * .05)', 'solid', theme.colorNeutralForegroundDisabled),
    },
  }),
  horizontal: {
    left: 'var(--slider-thumb-position)',
  },
  vertical: {
    transform: 'translateY(50%)',
    bottom: 'var(--slider-thumb-position)',
  },
});

/**
 * Styles for the Input slot
 */
const useInputStyles = makeStyles({
  input: {
    opacity: 0,
    gridArea: 'slider',
    ...shorthands.padding(0),
    ...shorthands.margin(0),
  },
  horizontal: {
    height: 'var(--slider-thumb-size)',
  },
  vertical: {
    writingMode: 'bt-lr',
    '-webkit-appearance': 'slider-vertical',
    width: 'var(--slider-thumb-size)',
  },
});

/**
 * Apply styling to the Slider slots based on the state
 */
export const useSliderStyles = (state: SliderState): SliderState => {
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
    railClassName,
    railStyles.rail,
    state.vertical ? railStyles.vertical : railStyles.horizontal,
    state.disabled && railStyles.disabled,
    state.rail.className,
  );

  state.thumb.className = mergeClasses(
    thumbClassName,
    thumbStyles.thumb,
    state.vertical ? thumbStyles.vertical : thumbStyles.horizontal,
    state.disabled ? thumbStyles.disabled : thumbStyles.enabled,
    state.thumb.className,
  );

  state.input.className = mergeClasses(
    inputStyles.input,
    state.vertical ? inputStyles.vertical : inputStyles.horizontal,
    state.input.className,
  );

  return state;
};
