import {
  backgroundCtrlBrandDisabledRaw,
  backgroundCtrlBrandHoverRaw,
  backgroundCtrlBrandPressedRaw,
  backgroundCtrlBrandRestRaw,
  cornerCircularRaw,
  foregroundCtrlNeutralSecondaryDisabledRaw,
  foregroundCtrlNeutralSecondaryRestRaw,
  foregroundCtrlOnbrandDisabledRaw,
  foregroundCtrlOnbrandRestRaw,
  nullColorRaw,
  nullNumberRaw,
  sizeCtrlIconRaw,
  sizeCtrlIconsecondaryRaw,
  sizeCtrlLgIconRaw,
  sizeCtrlSmIconRaw,
} from '../../control/variables';
import {
  backgroundCtrlOutlineDisabledRaw,
  backgroundCtrlOutlineHoverRaw,
  backgroundCtrlOutlinePressedRaw,
  backgroundCtrlOutlineRestRaw,
} from '../../nullable/variables';
import { foregroundCtrlOnbrandHoverRaw, foregroundCtrlOnbrandPressedRaw } from '../../optional/variables';
import {
  ctrlChoiceBaseBackgroundDisabledRaw,
  ctrlChoiceBaseBackgroundHoverRaw,
  ctrlChoiceBaseBackgroundIndeterminateDisabledRaw,
  ctrlChoiceBaseBackgroundIndeterminateHoverRaw,
  ctrlChoiceBaseBackgroundIndeterminatePressedRaw,
  ctrlChoiceBaseBackgroundIndeterminateRestRaw,
  ctrlChoiceBaseBackgroundPressedRaw,
  ctrlChoiceBaseBackgroundRestRaw,
  ctrlChoiceBaseSizeRaw,
  ctrlChoiceBaseStrokeDisabledRaw,
  ctrlChoiceBaseStrokeHoverRaw,
  ctrlChoiceBaseStrokeIndeterminateDisabledRaw,
  ctrlChoiceBaseStrokeIndeterminateHoverRaw,
  ctrlChoiceBaseStrokeIndeterminatePressedRaw,
  ctrlChoiceBaseStrokeIndeterminateRestRaw,
  ctrlChoiceBaseStrokePressedRaw,
  ctrlChoiceBaseStrokeRestRaw,
  ctrlChoiceCheckboxCornerRaw,
  ctrlChoiceCheckboxIconSizeRaw,
  ctrlChoiceForegroundIndeterminateDisabledRaw,
  ctrlChoiceForegroundIndeterminateHoverRaw,
  ctrlChoiceForegroundIndeterminatePressedRaw,
  ctrlChoiceForegroundIndeterminateRestRaw,
  ctrlChoiceIconThemeRaw,
  ctrlChoiceLgBaseSizeRaw,
  ctrlChoiceLgCheckboxCornerRaw,
  ctrlChoiceLgCheckboxIconSizeFigmaOnlyRaw,
  ctrlChoiceLgCheckboxIconSizeRaw,
  ctrlChoiceLgRadioDotSizeHoverRaw,
  ctrlChoiceLgRadioDotSizePressedRaw,
  ctrlChoiceLgRadioDotSizeRestRaw,
  ctrlChoiceLgSwitchHeightRaw,
  ctrlChoiceLgSwitchThumbWidthHoverRaw,
  ctrlChoiceLgSwitchThumbWidthPressedRaw,
  ctrlChoiceLgSwitchThumbWidthRestRaw,
  ctrlChoiceLgSwitchWidthRaw,
  ctrlChoicePaddingHorizontalRaw,
  ctrlChoicePaddingVerticalRaw,
  ctrlChoiceRadioCornerRaw,
  ctrlChoiceRadioDotSizeHoverRaw,
  ctrlChoiceRadioDotSizePressedRaw,
  ctrlChoiceRadioDotSizeRestRaw,
  ctrlChoiceSmBaseSizeRaw,
  ctrlChoiceSmCheckboxCornerRaw,
  ctrlChoiceSmCheckboxIconSizeFigmaOnlyRaw,
  ctrlChoiceSmCheckboxIconSizeRaw,
  ctrlChoiceSmRadioDotSizeRaw,
  ctrlChoiceSmSwitchHeightRaw,
  ctrlChoiceSmSwitchThumbWidthHoverRaw,
  ctrlChoiceSmSwitchThumbWidthPressedRaw,
  ctrlChoiceSmSwitchThumbWidthRestRaw,
  ctrlChoiceSmSwitchWidthRaw,
  ctrlChoiceSwitchCornerRaw,
  ctrlChoiceSwitchHeightRaw,
  ctrlChoiceSwitchPaddingHoverRaw,
  ctrlChoiceSwitchPaddingPressedRaw,
  ctrlChoiceSwitchPaddingRestRaw,
  ctrlChoiceSwitchThumbShadowAmbientBlurRaw,
  ctrlChoiceSwitchThumbShadowAmbientColorRaw,
  ctrlChoiceSwitchThumbShadowAmbientXRaw,
  ctrlChoiceSwitchThumbShadowAmbientYRaw,
  ctrlChoiceSwitchThumbShadowKeyBlurRaw,
  ctrlChoiceSwitchThumbShadowKeyColorRaw,
  ctrlChoiceSwitchThumbShadowKeyXRaw,
  ctrlChoiceSwitchThumbShadowKeyYRaw,
  ctrlChoiceSwitchThumbWidthHoverRaw,
  ctrlChoiceSwitchThumbWidthPressedRaw,
  ctrlChoiceSwitchThumbWidthRestRaw,
  ctrlChoiceSwitchWidthRaw,
} from './variables';

export const ctrlChoicePaddingHorizontal = `var(${ctrlChoicePaddingHorizontalRaw})`;
export const ctrlChoicePaddingVertical = `var(${ctrlChoicePaddingVerticalRaw})`;
export const ctrlChoiceBaseSize = `var(${ctrlChoiceBaseSizeRaw}, ${sizeCtrlIconRaw})`;
export const ctrlChoiceIconTheme = `var(${ctrlChoiceIconThemeRaw})`;
export const ctrlChoiceBaseBackgroundRest = `var(${ctrlChoiceBaseBackgroundRestRaw}, var(${backgroundCtrlOutlineRestRaw}, ${nullColorRaw}))`;
export const ctrlChoiceBaseBackgroundHover = `var(${ctrlChoiceBaseBackgroundHoverRaw}, var(${backgroundCtrlOutlineHoverRaw}, ${nullColorRaw}))`;
export const ctrlChoiceBaseBackgroundPressed = `var(${ctrlChoiceBaseBackgroundPressedRaw}, var(${backgroundCtrlOutlinePressedRaw}, ${nullColorRaw}))`;
export const ctrlChoiceBaseBackgroundDisabled = `var(${ctrlChoiceBaseBackgroundDisabledRaw}, var(${backgroundCtrlOutlineDisabledRaw}, ${nullColorRaw}))`;
export const ctrlChoiceBaseBackgroundIndeterminateRest = `var(${ctrlChoiceBaseBackgroundIndeterminateRestRaw}, ${backgroundCtrlBrandRestRaw})`;
export const ctrlChoiceBaseBackgroundIndeterminateHover = `var(${ctrlChoiceBaseBackgroundIndeterminateHoverRaw}, ${backgroundCtrlBrandHoverRaw})`;
export const ctrlChoiceBaseBackgroundIndeterminatePressed = `var(${ctrlChoiceBaseBackgroundIndeterminatePressedRaw}, ${backgroundCtrlBrandPressedRaw})`;
export const ctrlChoiceBaseBackgroundIndeterminateDisabled = `var(${ctrlChoiceBaseBackgroundIndeterminateDisabledRaw}, ${backgroundCtrlBrandDisabledRaw})`;
export const ctrlChoiceBaseStrokeRest = `var(${ctrlChoiceBaseStrokeRestRaw}, ${foregroundCtrlNeutralSecondaryRestRaw})`;
export const ctrlChoiceBaseStrokeHover = `var(${ctrlChoiceBaseStrokeHoverRaw}, ${foregroundCtrlNeutralSecondaryRestRaw})`;
export const ctrlChoiceBaseStrokePressed = `var(${ctrlChoiceBaseStrokePressedRaw}, ${foregroundCtrlNeutralSecondaryRestRaw})`;
export const ctrlChoiceBaseStrokeDisabled = `var(${ctrlChoiceBaseStrokeDisabledRaw}, ${foregroundCtrlNeutralSecondaryDisabledRaw})`;
export const ctrlChoiceBaseStrokeIndeterminateRest = `var(${ctrlChoiceBaseStrokeIndeterminateRestRaw}, ${backgroundCtrlBrandRestRaw})`;
export const ctrlChoiceBaseStrokeIndeterminateHover = `var(${ctrlChoiceBaseStrokeIndeterminateHoverRaw}, ${backgroundCtrlBrandHoverRaw})`;
export const ctrlChoiceBaseStrokeIndeterminatePressed = `var(${ctrlChoiceBaseStrokeIndeterminatePressedRaw}, ${backgroundCtrlBrandPressedRaw})`;
export const ctrlChoiceBaseStrokeIndeterminateDisabled = `var(${ctrlChoiceBaseStrokeIndeterminateDisabledRaw}, ${backgroundCtrlBrandDisabledRaw})`;
export const ctrlChoiceForegroundIndeterminateRest = `var(${ctrlChoiceForegroundIndeterminateRestRaw}, ${foregroundCtrlOnbrandRestRaw})`;
export const ctrlChoiceForegroundIndeterminateHover = `var(${ctrlChoiceForegroundIndeterminateHoverRaw}, var(${foregroundCtrlOnbrandHoverRaw}, ${foregroundCtrlOnbrandRestRaw}))`;
export const ctrlChoiceForegroundIndeterminatePressed = `var(${ctrlChoiceForegroundIndeterminatePressedRaw}, var(${foregroundCtrlOnbrandPressedRaw}, ${foregroundCtrlOnbrandRestRaw}))`;
export const ctrlChoiceForegroundIndeterminateDisabled = `var(${ctrlChoiceForegroundIndeterminateDisabledRaw}, ${foregroundCtrlOnbrandDisabledRaw})`;
export const ctrlChoiceCheckboxIconSize = `var(${ctrlChoiceCheckboxIconSizeRaw}, ${sizeCtrlIconsecondaryRaw})`;
export const ctrlChoiceCheckboxCorner = `var(${ctrlChoiceCheckboxCornerRaw})`;
export const ctrlChoiceRadioCorner = `var(${ctrlChoiceRadioCornerRaw}, ${cornerCircularRaw})`;
export const ctrlChoiceSwitchCorner = `var(${ctrlChoiceSwitchCornerRaw}, ${cornerCircularRaw})`;
export const ctrlChoiceRadioDotSizeRest = `var(${ctrlChoiceRadioDotSizeRestRaw})`;
export const ctrlChoiceRadioDotSizeHover = `var(${ctrlChoiceRadioDotSizeHoverRaw}, ${ctrlChoiceRadioDotSizeRestRaw})`;
export const ctrlChoiceRadioDotSizePressed = `var(${ctrlChoiceRadioDotSizePressedRaw}, ${ctrlChoiceRadioDotSizeRestRaw})`;
export const ctrlChoiceSwitchPaddingRest = `var(${ctrlChoiceSwitchPaddingRestRaw})`;
export const ctrlChoiceSwitchPaddingHover = `var(${ctrlChoiceSwitchPaddingHoverRaw}, ${ctrlChoiceSwitchPaddingRestRaw})`;
export const ctrlChoiceSwitchPaddingPressed = `var(${ctrlChoiceSwitchPaddingPressedRaw}, ${ctrlChoiceSwitchPaddingRestRaw})`;
export const ctrlChoiceSwitchHeight = `var(${ctrlChoiceSwitchHeightRaw}, ${sizeCtrlIconRaw})`;
export const ctrlChoiceSwitchWidth = `var(${ctrlChoiceSwitchWidthRaw})`;
export const ctrlChoiceSwitchThumbWidthRest = `var(${ctrlChoiceSwitchThumbWidthRestRaw})`;
export const ctrlChoiceSwitchThumbWidthHover = `var(${ctrlChoiceSwitchThumbWidthHoverRaw}, ${ctrlChoiceSwitchThumbWidthRestRaw})`;
export const ctrlChoiceSwitchThumbWidthPressed = `var(${ctrlChoiceSwitchThumbWidthPressedRaw}, ${ctrlChoiceSwitchThumbWidthRestRaw})`;
export const ctrlChoiceSwitchThumbShadowKeyX = `var(${ctrlChoiceSwitchThumbShadowKeyXRaw}, ${nullNumberRaw})`;
export const ctrlChoiceSwitchThumbShadowKeyY = `var(${ctrlChoiceSwitchThumbShadowKeyYRaw}, ${nullNumberRaw})`;
export const ctrlChoiceSwitchThumbShadowKeyBlur = `var(${ctrlChoiceSwitchThumbShadowKeyBlurRaw}, ${nullNumberRaw})`;
export const ctrlChoiceSwitchThumbShadowKeyColor = `var(${ctrlChoiceSwitchThumbShadowKeyColorRaw}, ${nullColorRaw})`;
export const ctrlChoiceSwitchThumbShadowAmbientX = `var(${ctrlChoiceSwitchThumbShadowAmbientXRaw}, ${nullNumberRaw})`;
export const ctrlChoiceSwitchThumbShadowAmbientY = `var(${ctrlChoiceSwitchThumbShadowAmbientYRaw}, ${nullNumberRaw})`;
export const ctrlChoiceSwitchThumbShadowAmbientBlur = `var(${ctrlChoiceSwitchThumbShadowAmbientBlurRaw}, ${nullNumberRaw})`;
export const ctrlChoiceSwitchThumbShadowAmbientColor = `var(${ctrlChoiceSwitchThumbShadowAmbientColorRaw}, ${nullColorRaw})`;
export const ctrlChoiceSmBaseSize = `var(${ctrlChoiceSmBaseSizeRaw}, ${sizeCtrlSmIconRaw})`;
export const ctrlChoiceSmCheckboxIconSize = `var(${ctrlChoiceSmCheckboxIconSizeRaw}, ${sizeCtrlIconsecondaryRaw})`;
export const ctrlChoiceSmCheckboxCorner = `var(${ctrlChoiceSmCheckboxCornerRaw})`;
export const ctrlChoiceSmCheckboxIconSizeFigmaOnly = `var(${ctrlChoiceSmCheckboxIconSizeFigmaOnlyRaw})`;
export const ctrlChoiceSmRadioDotSize = `var(${ctrlChoiceSmRadioDotSizeRaw})`;
export const ctrlChoiceSmSwitchWidth = `var(${ctrlChoiceSmSwitchWidthRaw})`;
export const ctrlChoiceSmSwitchHeight = `var(${ctrlChoiceSmSwitchHeightRaw}, ${sizeCtrlSmIconRaw})`;
export const ctrlChoiceSmSwitchThumbWidthRest = `var(${ctrlChoiceSmSwitchThumbWidthRestRaw})`;
export const ctrlChoiceSmSwitchThumbWidthHover = `var(${ctrlChoiceSmSwitchThumbWidthHoverRaw}, ${ctrlChoiceSmSwitchThumbWidthRestRaw})`;
export const ctrlChoiceSmSwitchThumbWidthPressed = `var(${ctrlChoiceSmSwitchThumbWidthPressedRaw}, ${ctrlChoiceSmSwitchThumbWidthRestRaw})`;
export const ctrlChoiceLgBaseSize = `var(${ctrlChoiceLgBaseSizeRaw}, ${sizeCtrlLgIconRaw})`;
export const ctrlChoiceLgCheckboxCorner = `var(${ctrlChoiceLgCheckboxCornerRaw})`;
export const ctrlChoiceLgCheckboxIconSize = `var(${ctrlChoiceLgCheckboxIconSizeRaw}, ${sizeCtrlIconsecondaryRaw})`;
export const ctrlChoiceLgCheckboxIconSizeFigmaOnly = `var(${ctrlChoiceLgCheckboxIconSizeFigmaOnlyRaw})`;
export const ctrlChoiceLgRadioDotSizeRest = `var(${ctrlChoiceLgRadioDotSizeRestRaw})`;
export const ctrlChoiceLgRadioDotSizeHover = `var(${ctrlChoiceLgRadioDotSizeHoverRaw}, ${ctrlChoiceLgRadioDotSizeRestRaw})`;
export const ctrlChoiceLgRadioDotSizePressed = `var(${ctrlChoiceLgRadioDotSizePressedRaw}, ${ctrlChoiceLgRadioDotSizeRestRaw})`;
export const ctrlChoiceLgSwitchWidth = `var(${ctrlChoiceLgSwitchWidthRaw})`;
export const ctrlChoiceLgSwitchHeight = `var(${ctrlChoiceLgSwitchHeightRaw}, ${sizeCtrlLgIconRaw})`;
export const ctrlChoiceLgSwitchThumbWidthRest = `var(${ctrlChoiceLgSwitchThumbWidthRestRaw})`;
export const ctrlChoiceLgSwitchThumbWidthHover = `var(${ctrlChoiceLgSwitchThumbWidthHoverRaw}, ${ctrlChoiceLgSwitchThumbWidthRestRaw})`;
export const ctrlChoiceLgSwitchThumbWidthPressed = `var(${ctrlChoiceLgSwitchThumbWidthPressedRaw}, ${ctrlChoiceLgSwitchThumbWidthRestRaw})`;
