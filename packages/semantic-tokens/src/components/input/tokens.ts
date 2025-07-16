// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE
import {
  backgroundCtrlNeutralRestRaw,
  backgroundCtrlNeutralHoverRaw,
  backgroundCtrlNeutralPressedRaw,
  backgroundCtrlNeutralDisabledRaw,
  strokeCtrlOnOutlineRestRaw,
  strokeWidthDefaultRaw,
  backgroundCtrlBrandRestRaw,
  foregroundCtrlOnBrandRestRaw,
  foregroundCtrlNeutralSecondaryRestRaw,
  strokeCtrlOnOutlineHoverRaw,
  strokeCtrlOnOutlinePressedRaw,
  strokeCtrlOnOutlineDisabledRaw,
} from '../../control/variables';
import {
  colorNeutralBackground1,
  colorNeutralBackgroundDisabled,
  colorPaletteRedBorder2,
  colorNeutralStroke1,
  strokeWidthThin,
  strokeWidthThick,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeAccessibleHover,
  colorNeutralStrokeAccessiblePressed,
  colorCompoundBrandStroke,
  colorNeutralStroke1Hover,
  colorNeutralStroke1Pressed,
  colorNeutralStrokeDisabled,
} from '../../legacy/tokens';
import { statusDangerStrokeRaw } from '../../optional/variables';
import {
  ctrlInputBackgroundRestRaw,
  ctrlInputBackgroundHoverRaw,
  ctrlInputBackgroundPressedRaw,
  ctrlInputBackgroundDisabledRaw,
  ctrlInputBackgroundSelectedRaw,
  ctrlInputBackgroundErrorRaw,
  ctrlInputStrokeRestRaw,
  ctrlInputStrokeWidthRestRaw,
  ctrlInputStrokeWidthHoverRaw,
  ctrlInputStrokeWidthPressedRaw,
  ctrlInputStrokeWidthSelectedRaw,
  ctrlInputBottomLineStrokeWidthRestRaw,
  ctrlInputTextSelectionBackgroundRaw,
  ctrlInputTextSelectionForegroundRaw,
  ctrlInputBottomLineStrokeWidthHoverRaw,
  ctrlInputBottomLineStrokeWidthPressedRaw,
  ctrlInputBottomLineStrokeWidthSelectedRaw,
  ctrlInputBottomLineStrokeRestRaw,
  ctrlInputBottomLineStrokeHoverRaw,
  ctrlInputBottomLineStrokePressedRaw,
  ctrlInputBottomLineStrokeDisabledRaw,
  ctrlInputBottomLineStrokeSelectedRaw,
  ctrlInputBottomLineStrokeErrorRaw,
  ctrlInputStrokeHoverRaw,
  ctrlInputStrokePressedRaw,
  ctrlInputStrokeDisabledRaw,
  ctrlInputStrokeSelectedRaw,
  ctrlInputStrokeErrorRaw,
} from './variables';

export const ctrlInputBackgroundRest = `var(${ctrlInputBackgroundRestRaw}, var(${backgroundCtrlNeutralRestRaw}, ${colorNeutralBackground1}))`;
export const ctrlInputBackgroundHover = `var(${ctrlInputBackgroundHoverRaw}, var(${backgroundCtrlNeutralHoverRaw}))`;
export const ctrlInputBackgroundPressed = `var(${ctrlInputBackgroundPressedRaw}, var(${backgroundCtrlNeutralPressedRaw}))`;
export const ctrlInputBackgroundDisabled = `var(${ctrlInputBackgroundDisabledRaw}, var(${backgroundCtrlNeutralDisabledRaw}, ${colorNeutralBackgroundDisabled}))`;
export const ctrlInputBackgroundSelected = `var(${ctrlInputBackgroundSelectedRaw}, var(${backgroundCtrlNeutralRestRaw}, ${colorNeutralBackground1}))`;
export const ctrlInputBackgroundError = `var(${ctrlInputBackgroundErrorRaw}, var(${backgroundCtrlNeutralRestRaw}, ${colorPaletteRedBorder2}))`;
export const ctrlInputStrokeRest = `var(${ctrlInputStrokeRestRaw}, var(${strokeCtrlOnOutlineRestRaw}, ${colorNeutralStroke1}))`;
export const ctrlInputStrokeWidthRest = `var(${ctrlInputStrokeWidthRestRaw}, var(${strokeWidthDefaultRaw}, ${strokeWidthThin}))`;
export const ctrlInputStrokeWidthHover = `var(${ctrlInputStrokeWidthHoverRaw}, var(${strokeWidthDefaultRaw}))`;
export const ctrlInputStrokeWidthPressed = `var(${ctrlInputStrokeWidthPressedRaw}, var(${strokeWidthDefaultRaw}))`;
export const ctrlInputStrokeWidthSelected = `var(${ctrlInputStrokeWidthSelectedRaw})`;
export const ctrlInputBottomLineStrokeWidthRest = `var(${ctrlInputBottomLineStrokeWidthRestRaw}, var(${strokeWidthDefaultRaw}, ${strokeWidthThin}))`;
export const ctrlInputTextSelectionBackground = `var(${ctrlInputTextSelectionBackgroundRaw}, var(${backgroundCtrlBrandRestRaw}))`;
export const ctrlInputTextSelectionForeground = `var(${ctrlInputTextSelectionForegroundRaw}, var(${foregroundCtrlOnBrandRestRaw}))`;
export const ctrlInputBottomLineStrokeWidthHover = `var(${ctrlInputBottomLineStrokeWidthHoverRaw}, var(${strokeWidthDefaultRaw}))`;
export const ctrlInputBottomLineStrokeWidthPressed = `var(${ctrlInputBottomLineStrokeWidthPressedRaw}, var(${ctrlInputBottomLineStrokeWidthSelectedRaw}))`;
export const ctrlInputBottomLineStrokeWidthSelected = `var(${ctrlInputBottomLineStrokeWidthSelectedRaw}, ${strokeWidthThick})`;
export const ctrlInputBottomLineStrokeRest = `var(${ctrlInputBottomLineStrokeRestRaw}, var(${foregroundCtrlNeutralSecondaryRestRaw}, ${colorNeutralStrokeAccessible}))`;
export const ctrlInputBottomLineStrokeHover = `var(${ctrlInputBottomLineStrokeHoverRaw}, var(${foregroundCtrlNeutralSecondaryRestRaw}, ${colorNeutralStrokeAccessibleHover}))`;
export const ctrlInputBottomLineStrokePressed = `var(${ctrlInputBottomLineStrokePressedRaw}, var(${foregroundCtrlNeutralSecondaryRestRaw}, ${colorNeutralStrokeAccessiblePressed}))`;
export const ctrlInputBottomLineStrokeDisabled = `var(${ctrlInputBottomLineStrokeDisabledRaw}, unset)`;
export const ctrlInputBottomLineStrokeSelected = `var(${ctrlInputBottomLineStrokeSelectedRaw}, var(${backgroundCtrlBrandRestRaw}, ${colorCompoundBrandStroke}))`;
export const ctrlInputBottomLineStrokeError = `var(${ctrlInputBottomLineStrokeErrorRaw}, unset)`;
export const ctrlInputStrokeHover = `var(${ctrlInputStrokeHoverRaw}, var(${strokeCtrlOnOutlineHoverRaw}, ${colorNeutralStroke1Hover}))`;
export const ctrlInputStrokePressed = `var(${ctrlInputStrokePressedRaw}, var(${strokeCtrlOnOutlinePressedRaw}, ${colorNeutralStroke1Pressed}))`;
export const ctrlInputStrokeDisabled = `var(${ctrlInputStrokeDisabledRaw}, var(${strokeCtrlOnOutlineDisabledRaw}, ${colorNeutralStrokeDisabled}))`;
export const ctrlInputStrokeSelected = `var(${ctrlInputStrokeSelectedRaw}, var(${strokeCtrlOnOutlineRestRaw}, ${colorNeutralStroke1}))`;
export const ctrlInputStrokeError = `var(${ctrlInputStrokeErrorRaw}, var(${statusDangerStrokeRaw}))`;
