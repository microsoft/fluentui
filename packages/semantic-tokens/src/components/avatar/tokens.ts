import {
  backgroundCtrlBrandRestRaw,
  backgroundLayerPrimarySolidRaw,
  cornerCircularRaw,
  cornerCtrlRestRaw,
  nullNumberRaw,
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

export const ctrlAvatarSize = `var(${ctrlAvatarSizeRaw}, ${sizeCtrlDefaultRaw})`;
export const ctrlAvatarCornerItem = `var(${ctrlAvatarCornerItemRaw}, ${cornerCircularRaw})`;
export const ctrlAvatarBackground = `var(${ctrlAvatarBackgroundRaw})`;
export const ctrlAvatarForeground = `var(${ctrlAvatarForegroundRaw})`;
export const ctrlAvatarIconSize = `var(${ctrlAvatarIconSizeRaw}, ${sizeCtrlIconRaw})`;
export const ctrlAvatarPresencebadgeSize = `var(${ctrlAvatarPresencebadgeSizeRaw})`;
export const ctrlAvatarActiveringSize = `var(${ctrlAvatarActiveringSizeRaw})`;
export const ctrlAvatarPresencebadgePaddingBottomrightoffset = `var(${ctrlAvatarPresencebadgePaddingBottomrightoffsetRaw}, ${strokewidthDefaultRaw})`;
export const ctrlAvatarCornerGroup = `var(${ctrlAvatarCornerGroupRaw}, ${cornerCtrlRestRaw})`;
export const ctrlAvatarActiveringStrokewidth = `var(${ctrlAvatarActiveringStrokewidthRaw})`;
export const ctrlAvatarPresencebadgeStrokewidth = `var(${ctrlAvatarPresencebadgeStrokewidthRaw}, ${strokewidthDefaultRaw})`;
export const ctrlAvatarTextFontsize = `var(${ctrlAvatarTextFontsizeRaw}, ${textGlobalBody3FontsizeRaw})`;
export const ctrlAvatarTextLineheight = `var(${ctrlAvatarTextLineheightRaw}, ${textGlobalBody3LineheightRaw})`;
export const ctrlAvatarTextPaddingTopoffset = `var(${ctrlAvatarTextPaddingTopoffsetRaw}, ${nullNumberRaw})`;
export const ctrlAvatarActiveringStroke = `var(${ctrlAvatarActiveringStrokeRaw}, ${backgroundCtrlBrandRestRaw})`;
export const ctrlAvatarShowcutout = `var(${ctrlAvatarShowcutoutRaw})`;
export const ctrlAvatarPresencebadgeBackgroundBehindbadge = `var(${ctrlAvatarPresencebadgeBackgroundBehindbadgeRaw}, ${backgroundLayerPrimarySolidRaw})`;
