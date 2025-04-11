import {
  foregroundCtrlNeutralSecondaryRestRaw,
  foregroundCtrlNeutralSecondaryDisabledRaw,
  cornerCtrlRestRaw,
  cornerCtrlSmRestRaw,
  cornerCtrlLgRestRaw,
} from '../../control/variables';
import {
  backgroundCtrlOutlineRestRaw,
  backgroundCtrlOutlineHoverRaw,
  backgroundCtrlOutlinePressedRaw,
  backgroundCtrlOutlineDisabledRaw,
} from '../../nullable/variables';
import {
  ctrlSegmentedBackgroundRestRaw,
  ctrlSegmentedBackgroundHoverRaw,
  ctrlSegmentedBackgroundPressedRaw,
  ctrlSegmentedBackgroundDisabledRaw,
  ctrlSegmentedStrokeRestRaw,
  ctrlSegmentedStrokeHoverRaw,
  ctrlSegmentedStrokePressedRaw,
  ctrlSegmentedStrokeDisabledRaw,
  ctrlSegmentedCornerRestRaw,
  ctrlSegmentedCornerHoverRaw,
  ctrlSegmentedCornerPressedRaw,
  ctrlSegmentedPaddingRestRaw,
  ctrlSegmentedPaddingHoverRaw,
  ctrlSegmentedPaddingPressedRaw,
  ctrlSegmentedGapRaw,
  ctrlSegmentedItemCornerRestRaw,
  ctrlSegmentedItemCornerHoverRaw,
  ctrlSegmentedItemCornerPressedRaw,
  ctrlSegmentedSmPaddingRestRaw,
  ctrlSegmentedSmPaddingHoverRaw,
  ctrlSegmentedSmPaddingPressedRaw,
  ctrlSegmentedLgPaddingRestRaw,
  ctrlSegmentedLgPaddingHoverRaw,
  ctrlSegmentedLgPaddingPressedRaw,
  ctrlSegmentedSmItemCornerRestRaw,
  ctrlSegmentedSmItemCornerHoverRaw,
  ctrlSegmentedSmItemCornerPressedRaw,
  ctrlSegmentedLgItemCornerRestRaw,
  ctrlSegmentedLgItemCornerHoverRaw,
  ctrlSegmentedLgItemCornerPressedRaw,
  ctrlSegmentedSmCornerRestRaw,
  ctrlSegmentedSmCornerHoverRaw,
  ctrlSegmentedSmCornerPressedRaw,
  ctrlSegmentedLgCornerRestRaw,
  ctrlSegmentedLgCornerHoverRaw,
  ctrlSegmentedLgCornerPressedRaw,
} from './variables';

export const ctrlSegmentedBackgroundRest = `var(${ctrlSegmentedBackgroundRestRaw}, var(${backgroundCtrlOutlineRestRaw}))`;
export const ctrlSegmentedBackgroundHover = `var(${ctrlSegmentedBackgroundHoverRaw}, var(${backgroundCtrlOutlineHoverRaw}))`;
export const ctrlSegmentedBackgroundPressed = `var(${ctrlSegmentedBackgroundPressedRaw}, var(${backgroundCtrlOutlinePressedRaw}))`;
export const ctrlSegmentedBackgroundDisabled = `var(${ctrlSegmentedBackgroundDisabledRaw}, var(${backgroundCtrlOutlineDisabledRaw}))`;
export const ctrlSegmentedStrokeRest = `var(${ctrlSegmentedStrokeRestRaw}, var(${foregroundCtrlNeutralSecondaryRestRaw}))`;
export const ctrlSegmentedStrokeHover = `var(${ctrlSegmentedStrokeHoverRaw}, var(${foregroundCtrlNeutralSecondaryRestRaw}))`;
export const ctrlSegmentedStrokePressed = `var(${ctrlSegmentedStrokePressedRaw}, var(${foregroundCtrlNeutralSecondaryRestRaw}))`;
export const ctrlSegmentedStrokeDisabled = `var(${ctrlSegmentedStrokeDisabledRaw}, var(${foregroundCtrlNeutralSecondaryDisabledRaw}))`;
export const ctrlSegmentedCornerRest = `var(${ctrlSegmentedCornerRestRaw}, var(${cornerCtrlRestRaw}))`;
export const ctrlSegmentedCornerHover = `var(${ctrlSegmentedCornerHoverRaw}, var(${cornerCtrlRestRaw}))`;
export const ctrlSegmentedCornerPressed = `var(${ctrlSegmentedCornerPressedRaw}, var(${cornerCtrlRestRaw}))`;
export const ctrlSegmentedPaddingRest = `var(${ctrlSegmentedPaddingRestRaw})`;
export const ctrlSegmentedPaddingHover = `var(${ctrlSegmentedPaddingHoverRaw}, var(${ctrlSegmentedPaddingRestRaw}))`;
export const ctrlSegmentedPaddingPressed = `var(${ctrlSegmentedPaddingPressedRaw}, var(${ctrlSegmentedPaddingRestRaw}))`;
export const ctrlSegmentedGap = `var(${ctrlSegmentedGapRaw}, unset)`;
export const ctrlSegmentedItemCornerRest = `var(${ctrlSegmentedItemCornerRestRaw}, var(${cornerCtrlSmRestRaw}))`;
export const ctrlSegmentedItemCornerHover = `var(${ctrlSegmentedItemCornerHoverRaw}, var(${cornerCtrlSmRestRaw}))`;
export const ctrlSegmentedItemCornerPressed = `var(${ctrlSegmentedItemCornerPressedRaw}, var(${cornerCtrlSmRestRaw}))`;
export const ctrlSegmentedSmPaddingRest = `var(${ctrlSegmentedSmPaddingRestRaw})`;
export const ctrlSegmentedSmPaddingHover = `var(${ctrlSegmentedSmPaddingHoverRaw}, var(${ctrlSegmentedSmPaddingRestRaw}))`;
export const ctrlSegmentedSmPaddingPressed = `var(${ctrlSegmentedSmPaddingPressedRaw}, var(${ctrlSegmentedSmPaddingRestRaw}))`;
export const ctrlSegmentedLgPaddingRest = `var(${ctrlSegmentedLgPaddingRestRaw})`;
export const ctrlSegmentedLgPaddingHover = `var(${ctrlSegmentedLgPaddingHoverRaw}, var(${ctrlSegmentedLgPaddingRestRaw}))`;
export const ctrlSegmentedLgPaddingPressed = `var(${ctrlSegmentedLgPaddingPressedRaw}, var(${ctrlSegmentedLgPaddingRestRaw}))`;
export const ctrlSegmentedSmItemCornerRest = `var(${ctrlSegmentedSmItemCornerRestRaw})`;
export const ctrlSegmentedSmItemCornerHover = `var(${ctrlSegmentedSmItemCornerHoverRaw})`;
export const ctrlSegmentedSmItemCornerPressed = `var(${ctrlSegmentedSmItemCornerPressedRaw})`;
export const ctrlSegmentedLgItemCornerRest = `var(${ctrlSegmentedLgItemCornerRestRaw}, var(${cornerCtrlRestRaw}))`;
export const ctrlSegmentedLgItemCornerHover = `var(${ctrlSegmentedLgItemCornerHoverRaw}, var(${cornerCtrlRestRaw}))`;
export const ctrlSegmentedLgItemCornerPressed = `var(${ctrlSegmentedLgItemCornerPressedRaw}, var(${cornerCtrlRestRaw}))`;
export const ctrlSegmentedSmCornerRest = `var(${ctrlSegmentedSmCornerRestRaw}, var(${cornerCtrlSmRestRaw}))`;
export const ctrlSegmentedSmCornerHover = `var(${ctrlSegmentedSmCornerHoverRaw}, var(${cornerCtrlSmRestRaw}))`;
export const ctrlSegmentedSmCornerPressed = `var(${ctrlSegmentedSmCornerPressedRaw}, var(${cornerCtrlSmRestRaw}))`;
export const ctrlSegmentedLgCornerRest = `var(${ctrlSegmentedLgCornerRestRaw}, var(${cornerCtrlLgRestRaw}))`;
export const ctrlSegmentedLgCornerHover = `var(${ctrlSegmentedLgCornerHoverRaw}, var(${cornerCtrlLgRestRaw}))`;
export const ctrlSegmentedLgCornerPressed = `var(${ctrlSegmentedLgCornerPressedRaw}, var(${cornerCtrlLgRestRaw}))`;
