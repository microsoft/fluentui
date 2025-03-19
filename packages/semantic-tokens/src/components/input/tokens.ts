import {
  backgroundCtrlBrandRestRaw,
  backgroundCtrlNeutralDisabledRaw,
  backgroundCtrlNeutralHoverRaw,
  backgroundCtrlNeutralPressedRaw,
  backgroundCtrlNeutralRestRaw,
  foregroundCtrlNeutralSecondaryRestRaw,
  foregroundCtrlOnbrandRestRaw,
  strokeCtrlOnoutlineDisabledRaw,
  strokeCtrlOnoutlineHoverRaw,
  strokeCtrlOnoutlinePressedRaw,
  strokeCtrlOnoutlineRestRaw,
  strokewidthDefaultRaw,
} from '../../control/variables';
import { statusDangerStrokeRaw } from '../../optional/variables';
import {
  ctrlInputBackgroundDisabledRaw,
  ctrlInputBackgroundErrorRaw,
  ctrlInputBackgroundHoverRaw,
  ctrlInputBackgroundPressedRaw,
  ctrlInputBackgroundRestRaw,
  ctrlInputBackgroundSelectedRaw,
  ctrlInputBottomlineStrokeDisabledRaw,
  ctrlInputBottomlineStrokeErrorRaw,
  ctrlInputBottomlineStrokeHoverRaw,
  ctrlInputBottomlineStrokePressedRaw,
  ctrlInputBottomlineStrokeRestRaw,
  ctrlInputBottomlineStrokeSelectedRaw,
  ctrlInputBottomlineStrokewidthHoverRaw,
  ctrlInputBottomlineStrokewidthPressedRaw,
  ctrlInputBottomlineStrokewidthRestRaw,
  ctrlInputBottomlineStrokewidthSelectedRaw,
  ctrlInputStrokeDisabledRaw,
  ctrlInputStrokeErrorRaw,
  ctrlInputStrokeHoverRaw,
  ctrlInputStrokePressedRaw,
  ctrlInputStrokeRestRaw,
  ctrlInputStrokeSelectedRaw,
  ctrlInputStrokewidthHoverRaw,
  ctrlInputStrokewidthPressedRaw,
  ctrlInputStrokewidthRestRaw,
  ctrlInputStrokewidthSelectedRaw,
  ctrlInputTextselectionBackgroundRaw,
  ctrlInputTextselectionForegroundRaw,
} from './variables';
export const ctrlInputBackgroundRest = `var(${ctrlInputBackgroundRestRaw}, var(${backgroundCtrlNeutralRestRaw}))`;
export const ctrlInputBackgroundHover = `var(${ctrlInputBackgroundHoverRaw}, var(${backgroundCtrlNeutralHoverRaw}))`;
export const ctrlInputBackgroundPressed = `var(${ctrlInputBackgroundPressedRaw}, var(${backgroundCtrlNeutralPressedRaw}))`;
export const ctrlInputBackgroundDisabled = `var(${ctrlInputBackgroundDisabledRaw}, var(${backgroundCtrlNeutralDisabledRaw}))`;
export const ctrlInputBackgroundSelected = `var(${ctrlInputBackgroundSelectedRaw}, var(${backgroundCtrlNeutralRestRaw}))`;
export const ctrlInputBackgroundError = `var(${ctrlInputBackgroundErrorRaw}, var(${backgroundCtrlNeutralRestRaw}))`;
export const ctrlInputStrokeRest = `var(${ctrlInputStrokeRestRaw}, var(${strokeCtrlOnoutlineRestRaw}))`;
export const ctrlInputBottomlineStrokewidthRest = `var(${ctrlInputBottomlineStrokewidthRestRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlInputStrokewidthRest = `var(${ctrlInputStrokewidthRestRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlInputTextselectionBackground = `var(${ctrlInputTextselectionBackgroundRaw}, var(${backgroundCtrlBrandRestRaw}))`;
export const ctrlInputTextselectionForeground = `var(${ctrlInputTextselectionForegroundRaw}, var(${foregroundCtrlOnbrandRestRaw}))`;
export const ctrlInputStrokewidthHover = `var(${ctrlInputStrokewidthHoverRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlInputStrokewidthPressed = `var(${ctrlInputStrokewidthPressedRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlInputStrokewidthSelected = `var(${ctrlInputStrokewidthSelectedRaw})`;
export const ctrlInputBottomlineStrokewidthHover = `var(${ctrlInputBottomlineStrokewidthHoverRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlInputBottomlineStrokewidthPressed = `var(${ctrlInputBottomlineStrokewidthPressedRaw}, var(${ctrlInputBottomlineStrokewidthSelectedRaw}))`;
export const ctrlInputBottomlineStrokewidthSelected = `var(${ctrlInputBottomlineStrokewidthSelectedRaw})`;
export const ctrlInputBottomlineStrokeRest = `var(${ctrlInputBottomlineStrokeRestRaw}, var(${foregroundCtrlNeutralSecondaryRestRaw}))`;
export const ctrlInputBottomlineStrokeHover = `var(${ctrlInputBottomlineStrokeHoverRaw}, var(${foregroundCtrlNeutralSecondaryRestRaw}))`;
export const ctrlInputBottomlineStrokePressed = `var(${ctrlInputBottomlineStrokePressedRaw}, var(${foregroundCtrlNeutralSecondaryRestRaw}))`;
export const ctrlInputBottomlineStrokeDisabled = `var(${ctrlInputBottomlineStrokeDisabledRaw}, unset)`;
export const ctrlInputBottomlineStrokeSelected = `var(${ctrlInputBottomlineStrokeSelectedRaw}, var(${backgroundCtrlBrandRestRaw}))`;
export const ctrlInputBottomlineStrokeError = `var(${ctrlInputBottomlineStrokeErrorRaw}, unset)`;
export const ctrlInputStrokeHover = `var(${ctrlInputStrokeHoverRaw}, var(${strokeCtrlOnoutlineHoverRaw}))`;
export const ctrlInputStrokePressed = `var(${ctrlInputStrokePressedRaw}, var(${strokeCtrlOnoutlinePressedRaw}))`;
export const ctrlInputStrokeDisabled = `var(${ctrlInputStrokeDisabledRaw}, var(${strokeCtrlOnoutlineDisabledRaw}))`;
export const ctrlInputStrokeSelected = `var(${ctrlInputStrokeSelectedRaw}, var(${strokeCtrlOnoutlineRestRaw}))`;
export const ctrlInputStrokeError = `var(${ctrlInputStrokeErrorRaw}, var(${statusDangerStrokeRaw}))`;
