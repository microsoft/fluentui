import {
  backgroundCtrlBrandRestRaw,
  backgroundLayerPrimarySolidRaw,
  cornerCircularRaw,
  cornerCtrlRestRaw,
  sizeCtrlDefaultRaw,
  sizeCtrlIconRaw,
  strokewidthDefaultRaw,
  textGlobalBody3FontsizeRaw,
  textGlobalBody3LineheightRaw,
} from '../../control/variables';
import {
  ctrlAvatarActiveringSizeRaw,
  ctrlAvatarActiveringStrokeRaw,
  ctrlAvatarActiveringStrokewidthRaw,
  ctrlAvatarBackgroundRaw,
  ctrlAvatarCornerGroupRaw,
  ctrlAvatarCornerItemRaw,
  ctrlAvatarForegroundRaw,
  ctrlAvatarIconSizeRaw,
  ctrlAvatarPresencebadgeBackgroundBehindbadgeRaw,
  ctrlAvatarPresencebadgePaddingBottomrightoffsetRaw,
  ctrlAvatarPresencebadgeSizeRaw,
  ctrlAvatarPresencebadgeStrokewidthRaw,
  ctrlAvatarShowcutoutRaw,
  ctrlAvatarSizeRaw,
  ctrlAvatarTextFontsizeRaw,
  ctrlAvatarTextLineheightRaw,
  ctrlAvatarTextPaddingTopoffsetRaw,
} from './variables';
export const ctrlAvatarSize = `var(${ctrlAvatarSizeRaw}, var(${sizeCtrlDefaultRaw}))`;
export const ctrlAvatarCornerItem = `var(${ctrlAvatarCornerItemRaw}, var(${cornerCircularRaw}))`;
export const ctrlAvatarBackground = `var(${ctrlAvatarBackgroundRaw})`;
export const ctrlAvatarForeground = `var(${ctrlAvatarForegroundRaw})`;
export const ctrlAvatarIconSize = `var(${ctrlAvatarIconSizeRaw}, var(${sizeCtrlIconRaw}))`;
export const ctrlAvatarPresencebadgeSize = `var(${ctrlAvatarPresencebadgeSizeRaw})`;
export const ctrlAvatarActiveringSize = `var(${ctrlAvatarActiveringSizeRaw})`;
export const ctrlAvatarPresencebadgePaddingBottomrightoffset = `var(${ctrlAvatarPresencebadgePaddingBottomrightoffsetRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlAvatarCornerGroup = `var(${ctrlAvatarCornerGroupRaw}, var(${cornerCtrlRestRaw}))`;
export const ctrlAvatarActiveringStrokewidth = `var(${ctrlAvatarActiveringStrokewidthRaw})`;
export const ctrlAvatarPresencebadgeStrokewidth = `var(${ctrlAvatarPresencebadgeStrokewidthRaw}, var(${strokewidthDefaultRaw}))`;
export const ctrlAvatarTextFontsize = `var(${ctrlAvatarTextFontsizeRaw}, var(${textGlobalBody3FontsizeRaw}))`;
export const ctrlAvatarTextLineheight = `var(${ctrlAvatarTextLineheightRaw}, var(${textGlobalBody3LineheightRaw}))`;
export const ctrlAvatarTextPaddingTopoffset = `var(${ctrlAvatarTextPaddingTopoffsetRaw}, unset)`;
export const ctrlAvatarActiveringStroke = `var(${ctrlAvatarActiveringStrokeRaw}, var(${backgroundCtrlBrandRestRaw}))`;
export const ctrlAvatarShowcutout = `var(${ctrlAvatarShowcutoutRaw})`;
export const ctrlAvatarPresencebadgeBackgroundBehindbadge = `var(${ctrlAvatarPresencebadgeBackgroundBehindbadgeRaw}, var(${backgroundLayerPrimarySolidRaw}))`;
