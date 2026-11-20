import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

const slider = {
  rail: '--fui-Slider__rail--color',
  progress: '--fui-Slider__progress--color',
  thumb: '--fui-Slider__thumb--color',
  thumbSize: '--fui-Slider__thumb--size',
  innerThumbRadius: '--fui-Slider__inner-thumb--radius',
  railSize: '--fui-Slider__rail--size',
};
const checkboxColor = '--fui-Checkbox__indicator--color';
const checkboxBorderColor = '--fui-Checkbox__indicator--borderColor';
const buttonIconSpacing = '--fui-Button__icon--spacing';
const cardBorderRadius = '--fui-Card--border-radius';
const cardSize = '--fui-Card--size';

const sliderColors = {
  [slider.rail]: tokens.colorPaletteBerryBorderActive,
  [slider.progress]: tokens.colorPaletteGreenBorderActive,
  [slider.thumb]: tokens.colorPaletteGreenBorderActive,
};
const checkboxColors = {
  [checkboxColor]: tokens.colorPaletteBerryForeground2,
  [checkboxBorderColor]: tokens.colorPaletteBerryBorderActive,
};

/**
 * App values for components' own CSS variables, which component state rules (`:hover`, `:active`, checked, sizes)
 * redefine. Griffel deduplicated an app variable against the component's in `mergeClasses()`; CSS Modules rely on
 * specificity and source order instead.
 */
export const useComponentVariableStyles = makeStyles({
  sliderColors,
  sliderEveryState: {
    ...sliderColors,
    ':hover': {
      [slider.progress]: tokens.colorPaletteBlueBorderActive,
      [slider.thumb]: tokens.colorPaletteBlueBorderActive,
    },
    ':active': {
      [slider.progress]: tokens.colorPaletteRedBorderActive,
      [slider.thumb]: tokens.colorPaletteRedBorderActive,
    },
  },
  sliderHover: { ':hover': { [slider.thumb]: tokens.colorPaletteBlueBorderActive } },
  sliderSizes: {
    [slider.thumbSize]: tokens.spacingHorizontalXXL,
    [slider.innerThumbRadius]: tokens.spacingHorizontalS,
    [slider.railSize]: tokens.strokeWidthThicker,
  },
  checkboxColors,
  checkboxEveryState: {
    ...checkboxColors,
    ':hover': { [checkboxBorderColor]: tokens.colorPaletteBlueBorderActive },
    ':active': { [checkboxBorderColor]: tokens.colorPaletteRedBorderActive },
  },
  /** On the icon slot, which declares the variable itself. */
  buttonIconSpacing: { [buttonIconSpacing]: tokens.spacingHorizontalL },
  /** From the root, reaching the icon through a Fluent slot class. */
  buttonIconSpacingDescendant: { '& .fui-Button__icon': { [buttonIconSpacing]: tokens.spacingHorizontalL } },
  cardBorderRadius: { [cardBorderRadius]: tokens.borderRadiusXLarge },
  cardSize: { [cardSize]: tokens.spacingHorizontalXL },
});

/** Variables set on an ancestor: they only apply where the component doesn't declare its own value. */
export const useInheritedVariableStyles = makeStyles({
  Slider: sliderColors,
  Checkbox: checkboxColors,
  Button: { [buttonIconSpacing]: tokens.spacingHorizontalL },
  Card: { [cardBorderRadius]: tokens.borderRadiusXLarge, [cardSize]: tokens.spacingHorizontalXL },
});
