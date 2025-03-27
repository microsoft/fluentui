import {
  backgroundCtrlBrandDisabledRaw,
  backgroundCtrlBrandHoverRaw,
  backgroundCtrlBrandPressedRaw,
  backgroundCtrlBrandRestRaw,
  cornerCircularRaw,
  foregroundCtrlOnbrandDisabledRaw,
  foregroundCtrlOnbrandRestRaw,
  sizeCtrlIconRaw,
  sizeCtrlLgIconRaw,
  sizeCtrlSmIconRaw,
  strokewidthDefaultRaw,
} from '../../control/variables';
import {
  ctrlProgressBackgroundEmptyRaw,
  ctrlProgressHeightFilledRaw,
  ctrlProgressLgHeightFilledRaw,
  ctrlProgressSmHeightFilledRaw,
} from '../progress/variables';
import {
  ctrlSliderBarCornerRaw,
  ctrlSliderBarForegroundEmptyDisabledRaw,
  ctrlSliderBarForegroundEmptyHoverRaw,
  ctrlSliderBarForegroundEmptyPressedRaw,
  ctrlSliderBarForegroundEmptyRestRaw,
  ctrlSliderBarForegroundFilledDisabledRaw,
  ctrlSliderBarForegroundFilledHoverRaw,
  ctrlSliderBarForegroundFilledPressedRaw,
  ctrlSliderBarForegroundFilledRestRaw,
  ctrlSliderBarHeightRaw,
  ctrlSliderLgBarHeightRaw,
  ctrlSliderLgThumbSizeHoverRaw,
  ctrlSliderLgThumbSizePressedRaw,
  ctrlSliderLgThumbSizeRestRaw,
  ctrlSliderSmBarHeightRaw,
  ctrlSliderSmThumbSizeHoverRaw,
  ctrlSliderSmThumbSizePressedRaw,
  ctrlSliderSmThumbSizeRestRaw,
  ctrlSliderThumbBackgroundDisabledRaw,
  ctrlSliderThumbBackgroundHoverRaw,
  ctrlSliderThumbBackgroundPressedRaw,
  ctrlSliderThumbBackgroundRestRaw,
  ctrlSliderThumbCornerRaw,
  ctrlSliderThumbInnerStrokeDisabledRaw,
  ctrlSliderThumbInnerStrokeHoverRaw,
  ctrlSliderThumbInnerStrokePressedRaw,
  ctrlSliderThumbInnerStrokeRestRaw,
  ctrlSliderThumbInnerStrokewidthHoverRaw,
  ctrlSliderThumbInnerStrokewidthPressedRaw,
  ctrlSliderThumbInnerStrokewidthRestRaw,
  ctrlSliderThumbOuterStrokeDisabledRaw,
  ctrlSliderThumbOuterStrokeHoverRaw,
  ctrlSliderThumbOuterStrokePressedRaw,
  ctrlSliderThumbOuterStrokeRestRaw,
  ctrlSliderThumbOuterStrokewidthRaw,
  ctrlSliderThumbSizeHoverRaw,
  ctrlSliderThumbSizePressedRaw,
  ctrlSliderThumbSizeRestRaw,
} from './variables';

export const ctrlSliderBarHeight = `var(${ctrlSliderBarHeightRaw}, var(${ctrlProgressHeightFilledRaw}))`;
export const ctrlSliderBarCorner = `var(${ctrlSliderBarCornerRaw}, var(${cornerCircularRaw}))`;
export const ctrlSliderBarForegroundFilledRest = `var(${ctrlSliderBarForegroundFilledRestRaw}, var(${backgroundCtrlBrandRestRaw}))`;
export const ctrlSliderBarForegroundEmptyRest = `var(${ctrlSliderBarForegroundEmptyRestRaw}, var(${ctrlProgressBackgroundEmptyRaw}))`;
export const ctrlSliderBarForegroundEmptyHover = `var(${ctrlSliderBarForegroundEmptyHoverRaw}, var(${ctrlProgressBackgroundEmptyRaw}))`;
export const ctrlSliderBarForegroundEmptyPressed = `var(${ctrlSliderBarForegroundEmptyPressedRaw}, var(${ctrlProgressBackgroundEmptyRaw}))`;
export const ctrlSliderBarForegroundEmptyDisabled = `var(${ctrlSliderBarForegroundEmptyDisabledRaw}, var(${ctrlProgressBackgroundEmptyRaw}))`;
export const ctrlSliderBarForegroundFilledHover = `var(${ctrlSliderBarForegroundFilledHoverRaw}, var(${backgroundCtrlBrandHoverRaw}))`;
export const ctrlSliderBarForegroundFilledPressed = `var(${ctrlSliderBarForegroundFilledPressedRaw}, var(${backgroundCtrlBrandPressedRaw}))`;
export const ctrlSliderBarForegroundFilledDisabled = `var(${ctrlSliderBarForegroundFilledDisabledRaw}, var(${backgroundCtrlBrandDisabledRaw}))`;
export const ctrlSliderThumbCorner = `var(${ctrlSliderThumbCornerRaw}, var(${cornerCircularRaw}))`;
export const ctrlSliderThumbSizeRest = `var(${ctrlSliderThumbSizeRestRaw}, var(${sizeCtrlIconRaw}))`;
export const ctrlSliderThumbSizeHover = `var(${ctrlSliderThumbSizeHoverRaw}, var(${sizeCtrlIconRaw}))`;
export const ctrlSliderThumbSizePressed = `var(${ctrlSliderThumbSizePressedRaw}, var(${sizeCtrlIconRaw}))`;
export const ctrlSliderThumbBackgroundRest = `var(${ctrlSliderThumbBackgroundRestRaw}, var(${foregroundCtrlOnbrandRestRaw}))`;
export const ctrlSliderThumbBackgroundHover = `var(${ctrlSliderThumbBackgroundHoverRaw}, var(${foregroundCtrlOnbrandRestRaw}))`;
export const ctrlSliderThumbBackgroundPressed = `var(${ctrlSliderThumbBackgroundPressedRaw}, var(${foregroundCtrlOnbrandRestRaw}))`;
export const ctrlSliderThumbBackgroundDisabled = `var(${ctrlSliderThumbBackgroundDisabledRaw}, var(${foregroundCtrlOnbrandDisabledRaw}))`;
export const ctrlSliderThumbInnerStrokewidthRest = `var(${ctrlSliderThumbInnerStrokewidthRestRaw})`;
export const ctrlSliderThumbInnerStrokewidthHover = `var(${ctrlSliderThumbInnerStrokewidthHoverRaw}, var(${ctrlSliderThumbInnerStrokewidthRestRaw}))`;
export const ctrlSliderThumbInnerStrokewidthPressed = `var(${ctrlSliderThumbInnerStrokewidthPressedRaw}, var(${ctrlSliderThumbInnerStrokewidthRestRaw}))`;
export const ctrlSliderThumbInnerStrokeRest = `var(${ctrlSliderThumbInnerStrokeRestRaw}, var(${backgroundCtrlBrandRestRaw}))`;
export const ctrlSliderThumbInnerStrokeHover = `var(${ctrlSliderThumbInnerStrokeHoverRaw}, var(${backgroundCtrlBrandHoverRaw}))`;
export const ctrlSliderThumbInnerStrokePressed = `var(${ctrlSliderThumbInnerStrokePressedRaw}, var(${backgroundCtrlBrandPressedRaw}))`;
export const ctrlSliderThumbInnerStrokeDisabled = `var(${ctrlSliderThumbInnerStrokeDisabledRaw}, var(${backgroundCtrlBrandDisabledRaw}))`;
export const ctrlSliderThumbOuterStrokewidth = `var(${ctrlSliderThumbOuterStrokewidthRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlSliderThumbOuterStrokeRest = `var(${ctrlSliderThumbOuterStrokeRestRaw}, var(${backgroundCtrlBrandRestRaw}))`;
export const ctrlSliderThumbOuterStrokeHover = `var(${ctrlSliderThumbOuterStrokeHoverRaw}, var(${backgroundCtrlBrandHoverRaw}))`;
export const ctrlSliderThumbOuterStrokePressed = `var(${ctrlSliderThumbOuterStrokePressedRaw}, var(${backgroundCtrlBrandPressedRaw}))`;
export const ctrlSliderThumbOuterStrokeDisabled = `var(${ctrlSliderThumbOuterStrokeDisabledRaw}, var(${backgroundCtrlBrandDisabledRaw}))`;
export const ctrlSliderSmThumbSizeRest = `var(${ctrlSliderSmThumbSizeRestRaw}, var(${sizeCtrlSmIconRaw}))`;
export const ctrlSliderSmThumbSizeHover = `var(${ctrlSliderSmThumbSizeHoverRaw}, var(${sizeCtrlSmIconRaw}))`;
export const ctrlSliderSmThumbSizePressed = `var(${ctrlSliderSmThumbSizePressedRaw}, var(${sizeCtrlSmIconRaw}))`;
export const ctrlSliderSmBarHeight = `var(${ctrlSliderSmBarHeightRaw}, var(${ctrlProgressSmHeightFilledRaw}))`;
export const ctrlSliderLgThumbSizeRest = `var(${ctrlSliderLgThumbSizeRestRaw}, var(${sizeCtrlLgIconRaw}))`;
export const ctrlSliderLgBarHeight = `var(${ctrlSliderLgBarHeightRaw}, var(${ctrlProgressLgHeightFilledRaw}))`;
export const ctrlSliderLgThumbSizeHover = `var(${ctrlSliderLgThumbSizeHoverRaw}, var(${sizeCtrlLgIconRaw}))`;
export const ctrlSliderLgThumbSizePressed = `var(${ctrlSliderLgThumbSizePressedRaw}, var(${sizeCtrlLgIconRaw}))`;
