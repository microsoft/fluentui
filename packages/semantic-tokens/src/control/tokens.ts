import { tokens } from '@fluentui/tokens';
import {
  aiBrandStop1Raw,
  aiBrandStop2Raw,
  aiBrandStop3Raw,
  aiBrandStop4Raw,
  aiShimmerStop1Raw,
  aiShimmerStop2Raw,
  aiShimmerStop3Raw,
  aiShimmerStop4Raw,
  backgroundCardOnflyoutDefaultDisabledRaw,
  backgroundCardOnflyoutDefaultHoverRaw,
  backgroundCardOnflyoutDefaultPressedRaw,
  backgroundCardOnflyoutDefaultRestRaw,
  backgroundCardOnprimaryAltDisabledRaw,
  backgroundCardOnprimaryAltHoverRaw,
  backgroundCardOnprimaryAltPressedRaw,
  backgroundCardOnprimaryAltRestRaw,
  backgroundCardOnprimaryDefaultDisabledRaw,
  backgroundCardOnprimaryDefaultHoverRaw,
  backgroundCardOnprimaryDefaultPressedRaw,
  backgroundCardOnprimaryDefaultRestRaw,
  backgroundCardOnsecondaryAltDisabledRaw,
  backgroundCardOnsecondaryAltHoverRaw,
  backgroundCardOnsecondaryAltPressedRaw,
  backgroundCardOnsecondaryAltRestRaw,
  backgroundCardOnsecondaryDefaultDisabledRaw,
  backgroundCardOnsecondaryDefaultHoverRaw,
  backgroundCardOnsecondaryDefaultPressedRaw,
  backgroundCardOnsecondaryDefaultRestRaw,
  backgroundCtrlBrandDisabledRaw,
  backgroundCtrlBrandHoverRaw,
  backgroundCtrlBrandPressedRaw,
  backgroundCtrlBrandRestRaw,
  backgroundCtrlNeutralDisabledRaw,
  backgroundCtrlNeutralHoverRaw,
  backgroundCtrlNeutralPressedRaw,
  backgroundCtrlNeutralRestRaw,
  backgroundCtrlSubtleHoverRaw,
  backgroundCtrlSubtlePressedRaw,
  backgroundFlyoutColorblendRaw,
  backgroundFlyoutLumblendRaw,
  backgroundFlyoutSolidRaw,
  backgroundLayerPrimarySolidRaw,
  backgroundWebpagePrimaryRaw,
  backgroundWebpageSecondaryRaw,
  backgroundWindowPrimaryColorblendRaw,
  backgroundWindowPrimaryLumblendRaw,
  backgroundWindowPrimarySolidRaw,
  backgroundWindowSecondaryColorblendRaw,
  backgroundWindowSecondaryLumblendRaw,
  backgroundWindowSecondarySolidRaw,
  backgroundWindowTabbandColorblendRaw,
  backgroundWindowTabbandLumblendRaw,
  backgroundWindowTabbandSolidRaw,
  cornerBezelRaw,
  cornerCardRestRaw,
  cornerCircularRaw,
  cornerCtrlLgRestRaw,
  cornerCtrlRestRaw,
  cornerCtrlSmRestRaw,
  cornerFlyoutRestRaw,
  cornerImageIncardRaw,
  cornerLayerDefaultRaw,
  cornerWindowDefaultRaw,
  cornerZeroRaw,
  ctrlCardStateDisabledRaw,
  ctrlCardStateHoverRaw,
  ctrlCardStatePressedRaw,
  ctrlCardStateRestRaw,
  ctrlListShadowSelectedAmbientBlurRaw,
  ctrlListShadowSelectedAmbientColorRaw,
  ctrlListShadowSelectedAmbientXRaw,
  ctrlListShadowSelectedAmbientYRaw,
  ctrlListShadowSelectedKeyBlurRaw,
  ctrlListShadowSelectedKeyColorRaw,
  ctrlListShadowSelectedKeyXRaw,
  ctrlListShadowSelectedKeyYRaw,
  foregroundCtrlBrandDisabledRaw,
  foregroundCtrlBrandHoverRaw,
  foregroundCtrlBrandPressedRaw,
  foregroundCtrlBrandRestRaw,
  foregroundCtrlNeutralPrimaryDisabledRaw,
  foregroundCtrlNeutralPrimaryRestRaw,
  foregroundCtrlNeutralSecondaryDisabledRaw,
  foregroundCtrlNeutralSecondaryRestRaw,
  foregroundCtrlOnbrandDisabledRaw,
  foregroundCtrlOnbrandRestRaw,
  gapBetweenContentLargeRaw,
  gapBetweenContentMediumRaw,
  gapBetweenContentNoneRaw,
  gapBetweenContentSmallRaw,
  gapBetweenContentXlargeRaw,
  gapBetweenContentXsmallRaw,
  gapBetweenContentXxlargeRaw,
  gapBetweenContentXxsmallRaw,
  gapBetweenCtrlDefaultRaw,
  gapBetweenCtrlLgDefaultRaw,
  gapBetweenCtrlSmDefaultRaw,
  gapInsideCtrlDefaultRaw,
  gapInsideCtrlLgDefaultRaw,
  gapInsideCtrlLgTosecondaryiconRaw,
  gapInsideCtrlSmDefaultRaw,
  gapInsideCtrlSmTosecondaryiconRaw,
  gapInsideCtrlTolabelRaw,
  gapInsideCtrlTosecondaryiconRaw,
  iconthemeCtrlDefaultRestRaw,
  iconthemeCtrlDefaultSelectedRaw,
  materialAcrylicBlurRaw,
  materialMicaBlurRaw,
  nullColorRaw,
  nullNumberRaw,
  nullStringRaw,
  paddingContentAlignDefaultRaw,
  paddingContentAlignOutdentIcononsubtleRaw,
  paddingContentAlignOutdentTextonsubtleRaw,
  paddingContentLargeRaw,
  paddingContentMediumRaw,
  paddingContentNoneRaw,
  paddingContentSmallRaw,
  paddingContentXlargeRaw,
  paddingContentXsmallRaw,
  paddingContentXxlargeRaw,
  paddingContentXxsmallRaw,
  paddingContentXxxlargeRaw,
  paddingCtrlHorizontalDefaultRaw,
  paddingCtrlHorizontalIcononlyRaw,
  paddingCtrlLgHorizontalDefaultRaw,
  paddingCtrlLgHorizontalIcononlyRaw,
  paddingCtrlLgTexttopRaw,
  paddingCtrlLgTonestedcontrolRaw,
  paddingCtrlSmHorizontalDefaultRaw,
  paddingCtrlSmHorizontalIcononlyRaw,
  paddingCtrlSmTexttopRaw,
  paddingCtrlSmTonestedcontrolRaw,
  paddingCtrlTextsideRaw,
  paddingCtrlTexttopRaw,
  paddingCtrlTonestedcontrolRaw,
  shadowFlyoutAmbientBlurRaw,
  shadowFlyoutAmbientColorRaw,
  shadowFlyoutAmbientXRaw,
  shadowFlyoutAmbientYRaw,
  shadowFlyoutKeyBlurRaw,
  shadowFlyoutKeyColorRaw,
  shadowFlyoutKeyXRaw,
  shadowFlyoutKeyYRaw,
  shadowToolbarAmbientBlurRaw,
  shadowToolbarAmbientColorRaw,
  shadowToolbarAmbientXRaw,
  shadowToolbarAmbientYRaw,
  shadowToolbarKeyBlurRaw,
  shadowToolbarKeyColorRaw,
  shadowToolbarKeyXRaw,
  shadowToolbarKeyYRaw,
  shadowWindowActiveAmbientBlurRaw,
  shadowWindowActiveAmbientColorRaw,
  shadowWindowActiveAmbientXRaw,
  shadowWindowActiveAmbientYRaw,
  shadowWindowActiveKeyBlurRaw,
  shadowWindowActiveKeyColorRaw,
  shadowWindowActiveKeyXRaw,
  shadowWindowActiveKeyYRaw,
  shadowWindowInactiveAmbientBlurRaw,
  shadowWindowInactiveAmbientColorRaw,
  shadowWindowInactiveAmbientXRaw,
  shadowWindowInactiveAmbientYRaw,
  sizeCtrlDefaultRaw,
  sizeCtrlIconFigmaOnlyRaw,
  sizeCtrlIconRaw,
  sizeCtrlIconsecondaryRaw,
  sizeCtrlLgDefaultRaw,
  sizeCtrlLgIconFigmaOnlyRaw,
  sizeCtrlLgIconRaw,
  sizeCtrlSmDefaultRaw,
  sizeCtrlSmIconFigmaOnlyRaw,
  sizeCtrlSmIconRaw,
  statusAwayForegroundRaw,
  statusBrandTintBackgroundRaw,
  statusBrandTintStrokeRaw,
  statusDangerBackgroundRaw,
  statusDangerTintBackgroundRaw,
  statusDangerTintForegroundRaw,
  statusDangerTintStrokeRaw,
  statusImportantBackgroundRaw,
  statusImportantTintBackgroundRaw,
  statusImportantTintForegroundRaw,
  statusImportantTintStrokeRaw,
  statusInformativeBackgroundRaw,
  statusInformativeTintBackgroundRaw,
  statusInformativeTintForegroundRaw,
  statusInformativeTintStrokeRaw,
  statusNeutralBackgroundRaw,
  statusNeutralTintBackgroundRaw,
  statusNeutralTintStrokeRaw,
  statusOofForegroundRaw,
  statusSuccessBackgroundRaw,
  statusSuccessTintBackgroundRaw,
  statusSuccessTintForegroundRaw,
  statusSuccessTintStrokeRaw,
  statusWarningBackgroundRaw,
  statusWarningTintBackgroundRaw,
  statusWarningTintForegroundRaw,
  statusWarningTintStrokeRaw,
  strokeCtrlDividerOnbrandRaw,
  strokeCtrlDividerOnneutralRaw,
  strokeCtrlDividerOnoutlineRaw,
  strokeCtrlOnoutlineDisabledRaw,
  strokeCtrlOnoutlineHoverRaw,
  strokeCtrlOnoutlinePressedRaw,
  strokeCtrlOnoutlineRestRaw,
  strokeDividerDefaultRaw,
  strokewidthDefaultRaw,
  strokeWindowActiveRaw,
  textCtrlWeightSelectedRaw,
  textGlobalBody1FontsizeRaw,
  textGlobalBody1LineheightRaw,
  textGlobalBody2FontsizeRaw,
  textGlobalBody2LineheightRaw,
  textGlobalBody3FontsizeRaw,
  textGlobalBody3LineheightRaw,
  textGlobalCaption1FontsizeRaw,
  textGlobalCaption1LineheightRaw,
  textGlobalCaption2FontsizeRaw,
  textGlobalCaption2LineheightRaw,
  textGlobalDisplay1FontsizeRaw,
  textGlobalDisplay1LineheightRaw,
  textGlobalDisplay2FontsizeRaw,
  textGlobalDisplay2LineheightRaw,
  textGlobalSubtitle1FontsizeRaw,
  textGlobalSubtitle1LineheightRaw,
  textGlobalSubtitle2FontsizeRaw,
  textGlobalSubtitle2LineheightRaw,
  textGlobalTitle1FontsizeRaw,
  textGlobalTitle1LineheightRaw,
  textGlobalTitle2FontsizeRaw,
  textGlobalTitle2LineheightRaw,
  textStyleDefaultHeaderWeightRaw,
  textStyleDefaultRegularFontfamilyRaw,
  textStyleDefaultRegularLetterspacingRaw,
  textStyleDefaultRegularWeightRaw,
} from './variables';
export const textGlobalDisplay1Fontsize = `var(${textGlobalDisplay1FontsizeRaw})`;
export const textGlobalDisplay1Lineheight = `var(${textGlobalDisplay1LineheightRaw})`;
export const textGlobalDisplay2Fontsize = `var(${textGlobalDisplay2FontsizeRaw})`;
export const textGlobalDisplay2Lineheight = `var(${textGlobalDisplay2LineheightRaw})`;
export const textGlobalTitle1Fontsize = `var(${textGlobalTitle1FontsizeRaw})`;
export const textGlobalTitle1Lineheight = `var(${textGlobalTitle1LineheightRaw})`;
export const textGlobalTitle2Fontsize = `var(${textGlobalTitle2FontsizeRaw})`;
export const textGlobalTitle2Lineheight = `var(${textGlobalTitle2LineheightRaw})`;
export const textGlobalSubtitle1Fontsize = `var(${textGlobalSubtitle1FontsizeRaw})`;
export const textGlobalSubtitle1Lineheight = `var(${textGlobalSubtitle1LineheightRaw})`;
export const textGlobalSubtitle2Fontsize = `var(${textGlobalSubtitle2FontsizeRaw})`;
export const textGlobalSubtitle2Lineheight = `var(${textGlobalSubtitle2LineheightRaw})`;
export const textGlobalBody1Fontsize = `var(${textGlobalBody1FontsizeRaw})`;
export const textGlobalBody1Lineheight = `var(${textGlobalBody1LineheightRaw})`;
export const textGlobalBody2Fontsize = `var(${textGlobalBody2FontsizeRaw})`;
export const textGlobalBody2Lineheight = `var(${textGlobalBody2LineheightRaw})`;
export const textGlobalBody3Fontsize = `var(${textGlobalBody3FontsizeRaw}, ${tokens.fontSizeBase300})`;
export const textGlobalBody3Lineheight = `var(${textGlobalBody3LineheightRaw})`;
export const textGlobalCaption1Fontsize = `var(${textGlobalCaption1FontsizeRaw})`;
export const textGlobalCaption1Lineheight = `var(${textGlobalCaption1LineheightRaw})`;
export const textGlobalCaption2Fontsize = `var(${textGlobalCaption2FontsizeRaw})`;
export const textGlobalCaption2Lineheight = `var(${textGlobalCaption2LineheightRaw})`;
export const textStyleDefaultRegularFontfamily = `var(${textStyleDefaultRegularFontfamilyRaw}, ${tokens.fontFamilyBase})`;
export const textStyleDefaultRegularWeight = `var(${textStyleDefaultRegularWeightRaw}, ${tokens.fontWeightRegular})`;
export const textStyleDefaultRegularLetterspacing = `var(${textStyleDefaultRegularLetterspacingRaw})`;
export const textStyleDefaultHeaderWeight = `var(${textStyleDefaultHeaderWeightRaw})`;
export const sizeCtrlDefault = `var(${sizeCtrlDefaultRaw})`;
export const sizeCtrlIcon = `var(${sizeCtrlIconRaw})`;
export const sizeCtrlIconFigmaOnly = `var(${sizeCtrlIconFigmaOnlyRaw})`;
export const sizeCtrlIconsecondary = `var(${sizeCtrlIconsecondaryRaw})`;
export const textCtrlWeightSelected = `var(${textCtrlWeightSelectedRaw})`;
export const sizeCtrlSmDefault = `var(${sizeCtrlSmDefaultRaw})`;
export const sizeCtrlSmIcon = `var(${sizeCtrlSmIconRaw})`;
export const sizeCtrlLgDefault = `var(${sizeCtrlLgDefaultRaw})`;
export const sizeCtrlLgIcon = `var(${sizeCtrlLgIconRaw})`;
export const sizeCtrlSmIconFigmaOnly = `var(${sizeCtrlSmIconFigmaOnlyRaw})`;
export const sizeCtrlLgIconFigmaOnly = `var(${sizeCtrlLgIconFigmaOnlyRaw})`;
export const paddingContentAlignDefault = `var(${paddingContentAlignDefaultRaw})`;
export const paddingContentAlignOutdentIcononsubtle = `var(${paddingContentAlignOutdentIcononsubtleRaw})`;
export const paddingContentNone = `var(${paddingContentNoneRaw})`;
export const paddingContentAlignOutdentTextonsubtle = `var(${paddingContentAlignOutdentTextonsubtleRaw})`;
export const paddingContentXxsmall = `var(${paddingContentXxsmallRaw})`;
export const paddingContentXsmall = `var(${paddingContentXsmallRaw})`;
export const paddingContentSmall = `var(${paddingContentSmallRaw})`;
export const paddingContentMedium = `var(${paddingContentMediumRaw})`;
export const paddingContentLarge = `var(${paddingContentLargeRaw})`;
export const paddingContentXlarge = `var(${paddingContentXlargeRaw})`;
export const paddingContentXxlarge = `var(${paddingContentXxlargeRaw})`;
export const paddingContentXxxlarge = `var(${paddingContentXxxlargeRaw})`;
export const paddingCtrlHorizontalDefault = `var(${paddingCtrlHorizontalDefaultRaw})`;
export const paddingCtrlHorizontalIcononly = `var(${paddingCtrlHorizontalIcononlyRaw})`;
export const paddingCtrlTexttop = `var(${paddingCtrlTexttopRaw})`;
export const paddingCtrlTextside = `var(${paddingCtrlTextsideRaw})`;
export const paddingCtrlTonestedcontrol = `var(${paddingCtrlTonestedcontrolRaw})`;
export const paddingCtrlSmHorizontalDefault = `var(${paddingCtrlSmHorizontalDefaultRaw})`;
export const paddingCtrlSmHorizontalIcononly = `var(${paddingCtrlSmHorizontalIcononlyRaw})`;
export const paddingCtrlSmTexttop = `var(${paddingCtrlSmTexttopRaw})`;
export const paddingCtrlSmTonestedcontrol = `var(${paddingCtrlSmTonestedcontrolRaw})`;
export const paddingCtrlLgHorizontalDefault = `var(${paddingCtrlLgHorizontalDefaultRaw})`;
export const paddingCtrlLgHorizontalIcononly = `var(${paddingCtrlLgHorizontalIcononlyRaw})`;
export const paddingCtrlLgTexttop = `var(${paddingCtrlLgTexttopRaw})`;
export const paddingCtrlLgTonestedcontrol = `var(${paddingCtrlLgTonestedcontrolRaw})`;
export const gapBetweenContentNone = `var(${gapBetweenContentNoneRaw})`;
export const gapBetweenContentXxsmall = `var(${gapBetweenContentXxsmallRaw})`;
export const gapBetweenContentXsmall = `var(${gapBetweenContentXsmallRaw})`;
export const gapBetweenContentSmall = `var(${gapBetweenContentSmallRaw})`;
export const gapBetweenContentMedium = `var(${gapBetweenContentMediumRaw})`;
export const gapBetweenCtrlDefault = `var(${gapBetweenCtrlDefaultRaw})`;
export const gapBetweenContentLarge = `var(${gapBetweenContentLargeRaw})`;
export const gapBetweenContentXlarge = `var(${gapBetweenContentXlargeRaw})`;
export const gapBetweenContentXxlarge = `var(${gapBetweenContentXxlargeRaw})`;
export const gapBetweenCtrlLgDefault = `var(${gapBetweenCtrlLgDefaultRaw})`;
export const gapBetweenCtrlSmDefault = `var(${gapBetweenCtrlSmDefaultRaw})`;
export const gapInsideCtrlDefault = `var(${gapInsideCtrlDefaultRaw})`;
export const gapInsideCtrlSmDefault = `var(${gapInsideCtrlSmDefaultRaw})`;
export const gapInsideCtrlSmTosecondaryicon = `var(${gapInsideCtrlSmTosecondaryiconRaw})`;
export const gapInsideCtrlLgDefault = `var(${gapInsideCtrlLgDefaultRaw})`;
export const gapInsideCtrlLgTosecondaryicon = `var(${gapInsideCtrlLgTosecondaryiconRaw})`;
export const gapInsideCtrlTosecondaryicon = `var(${gapInsideCtrlTosecondaryiconRaw})`;
export const gapInsideCtrlTolabel = `var(${gapInsideCtrlTolabelRaw})`;
export const cornerCircular = `var(${cornerCircularRaw})`;
export const strokewidthDefault = `var(${strokewidthDefaultRaw}, ${tokens.strokeWidthThin})`;
export const strokeCtrlOnoutlineRest = `var(${strokeCtrlOnoutlineRestRaw})`;
export const strokeCtrlOnoutlineHover = `var(${strokeCtrlOnoutlineHoverRaw})`;
export const strokeCtrlOnoutlinePressed = `var(${strokeCtrlOnoutlinePressedRaw})`;
export const strokeCtrlOnoutlineDisabled = `var(${strokeCtrlOnoutlineDisabledRaw})`;
export const strokeCtrlDividerOnbrand = `var(${strokeCtrlDividerOnbrandRaw})`;
export const strokeCtrlDividerOnneutral = `var(${strokeCtrlDividerOnneutralRaw})`;
export const strokeCtrlDividerOnoutline = `var(${strokeCtrlDividerOnoutlineRaw})`;
export const strokeDividerDefault = `var(${strokeDividerDefaultRaw})`;
export const strokeWindowActive = `var(${strokeWindowActiveRaw})`;
export const backgroundWindowPrimarySolid = `var(${backgroundWindowPrimarySolidRaw})`;
export const backgroundWindowPrimaryColorblend = `var(${backgroundWindowPrimaryColorblendRaw})`;
export const backgroundWindowPrimaryLumblend = `var(${backgroundWindowPrimaryLumblendRaw})`;
export const backgroundWindowSecondarySolid = `var(${backgroundWindowSecondarySolidRaw})`;
export const backgroundWindowSecondaryColorblend = `var(${backgroundWindowSecondaryColorblendRaw})`;
export const backgroundWindowSecondaryLumblend = `var(${backgroundWindowSecondaryLumblendRaw})`;
export const backgroundWindowTabbandColorblend = `var(${backgroundWindowTabbandColorblendRaw})`;
export const backgroundWindowTabbandLumblend = `var(${backgroundWindowTabbandLumblendRaw})`;
export const backgroundWindowTabbandSolid = `var(${backgroundWindowTabbandSolidRaw})`;
export const backgroundWebpagePrimary = `var(${backgroundWebpagePrimaryRaw})`;
export const backgroundWebpageSecondary = `var(${backgroundWebpageSecondaryRaw})`;
export const backgroundLayerPrimarySolid = `var(${backgroundLayerPrimarySolidRaw})`;
export const backgroundCardOnprimaryDefaultRest = `var(${backgroundCardOnprimaryDefaultRestRaw})`;
export const backgroundCardOnprimaryAltRest = `var(${backgroundCardOnprimaryAltRestRaw})`;
export const backgroundCardOnprimaryAltHover = `var(${backgroundCardOnprimaryAltHoverRaw})`;
export const backgroundCardOnprimaryAltPressed = `var(${backgroundCardOnprimaryAltPressedRaw})`;
export const backgroundCardOnprimaryAltDisabled = `var(${backgroundCardOnprimaryAltDisabledRaw})`;
export const backgroundCardOnprimaryDefaultHover = `var(${backgroundCardOnprimaryDefaultHoverRaw})`;
export const backgroundCardOnprimaryDefaultPressed = `var(${backgroundCardOnprimaryDefaultPressedRaw})`;
export const backgroundCardOnprimaryDefaultDisabled = `var(${backgroundCardOnprimaryDefaultDisabledRaw})`;
export const backgroundFlyoutSolid = `var(${backgroundFlyoutSolidRaw})`;
export const backgroundCtrlBrandRest = `var(${backgroundCtrlBrandRestRaw})`;
export const backgroundCtrlBrandHover = `var(${backgroundCtrlBrandHoverRaw})`;
export const backgroundCtrlBrandPressed = `var(${backgroundCtrlBrandPressedRaw})`;
export const backgroundCtrlBrandDisabled = `var(${backgroundCtrlBrandDisabledRaw})`;
export const backgroundCtrlNeutralRest = `var(${backgroundCtrlNeutralRestRaw})`;
export const backgroundCtrlNeutralHover = `var(${backgroundCtrlNeutralHoverRaw})`;
export const backgroundCtrlNeutralPressed = `var(${backgroundCtrlNeutralPressedRaw})`;
export const backgroundCtrlNeutralDisabled = `var(${backgroundCtrlNeutralDisabledRaw})`;
export const backgroundCtrlSubtleHover = `var(${backgroundCtrlSubtleHoverRaw})`;
export const backgroundCtrlSubtlePressed = `var(${backgroundCtrlSubtlePressedRaw})`;
export const backgroundFlyoutLumblend = `var(${backgroundFlyoutLumblendRaw})`;
export const backgroundFlyoutColorblend = `var(${backgroundFlyoutColorblendRaw})`;
export const cornerZero = `var(${cornerZeroRaw})`;
export const cornerBezel = `var(${cornerBezelRaw})`;
export const cornerWindowDefault = `var(${cornerWindowDefaultRaw})`;
export const cornerFlyoutRest = `var(${cornerFlyoutRestRaw})`;
export const cornerLayerDefault = `var(${cornerLayerDefaultRaw})`;
export const cornerCardRest = `var(${cornerCardRestRaw})`;
export const cornerCtrlRest = `var(${cornerCtrlRestRaw})`;
export const cornerCtrlSmRest = `var(${cornerCtrlSmRestRaw})`;
export const cornerCtrlLgRest = `var(${cornerCtrlLgRestRaw})`;
export const cornerImageIncard = `var(${cornerImageIncardRaw})`;
export const foregroundCtrlNeutralPrimaryRest = `var(${foregroundCtrlNeutralPrimaryRestRaw})`;
export const foregroundCtrlNeutralPrimaryDisabled = `var(${foregroundCtrlNeutralPrimaryDisabledRaw}, ${tokens.colorNeutralForegroundDisabled})`;
export const foregroundCtrlNeutralSecondaryRest = `var(${foregroundCtrlNeutralSecondaryRestRaw})`;
export const foregroundCtrlNeutralSecondaryDisabled = `var(${foregroundCtrlNeutralSecondaryDisabledRaw})`;
export const foregroundCtrlBrandRest = `var(${foregroundCtrlBrandRestRaw})`;
export const foregroundCtrlBrandHover = `var(${foregroundCtrlBrandHoverRaw})`;
export const foregroundCtrlBrandPressed = `var(${foregroundCtrlBrandPressedRaw})`;
export const foregroundCtrlBrandDisabled = `var(${foregroundCtrlBrandDisabledRaw})`;
export const foregroundCtrlOnbrandRest = `var(${foregroundCtrlOnbrandRestRaw})`;
export const foregroundCtrlOnbrandDisabled = `var(${foregroundCtrlOnbrandDisabledRaw})`;
export const shadowFlyoutKeyX = `var(${shadowFlyoutKeyXRaw})`;
export const shadowFlyoutKeyY = `var(${shadowFlyoutKeyYRaw})`;
export const shadowFlyoutKeyBlur = `var(${shadowFlyoutKeyBlurRaw})`;
export const shadowFlyoutKeyColor = `var(${shadowFlyoutKeyColorRaw})`;
export const shadowFlyoutAmbientX = `var(${shadowFlyoutAmbientXRaw})`;
export const shadowFlyoutAmbientY = `var(${shadowFlyoutAmbientYRaw})`;
export const shadowFlyoutAmbientBlur = `var(${shadowFlyoutAmbientBlurRaw})`;
export const shadowFlyoutAmbientColor = `var(${shadowFlyoutAmbientColorRaw})`;
export const shadowToolbarKeyX = `var(${shadowToolbarKeyXRaw})`;
export const shadowToolbarKeyY = `var(${shadowToolbarKeyYRaw})`;
export const shadowToolbarKeyBlur = `var(${shadowToolbarKeyBlurRaw})`;
export const shadowToolbarKeyColor = `var(${shadowToolbarKeyColorRaw})`;
export const shadowToolbarAmbientX = `var(${shadowToolbarAmbientXRaw})`;
export const shadowToolbarAmbientY = `var(${shadowToolbarAmbientYRaw})`;
export const shadowToolbarAmbientBlur = `var(${shadowToolbarAmbientBlurRaw})`;
export const shadowToolbarAmbientColor = `var(${shadowToolbarAmbientColorRaw})`;
export const materialAcrylicBlur = `var(${materialAcrylicBlurRaw})`;
export const materialMicaBlur = `var(${materialMicaBlurRaw})`;
export const iconthemeCtrlDefaultRest = `var(${iconthemeCtrlDefaultRestRaw})`;
export const iconthemeCtrlDefaultSelected = `var(${iconthemeCtrlDefaultSelectedRaw})`;
export const statusBrandTintBackground = `var(${statusBrandTintBackgroundRaw})`;
export const statusBrandTintStroke = `var(${statusBrandTintStrokeRaw})`;
export const statusDangerBackground = `var(${statusDangerBackgroundRaw})`;
export const statusDangerTintBackground = `var(${statusDangerTintBackgroundRaw})`;
export const statusDangerTintStroke = `var(${statusDangerTintStrokeRaw})`;
export const statusDangerTintForeground = `var(${statusDangerTintForegroundRaw})`;
export const statusWarningBackground = `var(${statusWarningBackgroundRaw})`;
export const statusWarningTintBackground = `var(${statusWarningTintBackgroundRaw})`;
export const statusWarningTintStroke = `var(${statusWarningTintStrokeRaw})`;
export const statusWarningTintForeground = `var(${statusWarningTintForegroundRaw})`;
export const statusSuccessBackground = `var(${statusSuccessBackgroundRaw})`;
export const statusSuccessTintBackground = `var(${statusSuccessTintBackgroundRaw})`;
export const statusSuccessTintStroke = `var(${statusSuccessTintStrokeRaw})`;
export const statusSuccessTintForeground = `var(${statusSuccessTintForegroundRaw})`;
export const statusImportantBackground = `var(${statusImportantBackgroundRaw})`;
export const statusImportantTintBackground = `var(${statusImportantTintBackgroundRaw})`;
export const statusImportantTintStroke = `var(${statusImportantTintStrokeRaw})`;
export const statusImportantTintForeground = `var(${statusImportantTintForegroundRaw})`;
export const statusInformativeBackground = `var(${statusInformativeBackgroundRaw})`;
export const statusInformativeTintForeground = `var(${statusInformativeTintForegroundRaw})`;
export const statusInformativeTintStroke = `var(${statusInformativeTintStrokeRaw})`;
export const statusInformativeTintBackground = `var(${statusInformativeTintBackgroundRaw})`;
export const statusAwayForeground = `var(${statusAwayForegroundRaw})`;
export const statusOofForeground = `var(${statusOofForegroundRaw})`;
export const aiBrandStop1 = `var(${aiBrandStop1Raw})`;
export const aiBrandStop2 = `var(${aiBrandStop2Raw})`;
export const aiBrandStop3 = `var(${aiBrandStop3Raw})`;
export const aiBrandStop4 = `var(${aiBrandStop4Raw})`;
export const aiShimmerStop1 = `var(${aiShimmerStop1Raw})`;
export const aiShimmerStop2 = `var(${aiShimmerStop2Raw})`;
export const aiShimmerStop3 = `var(${aiShimmerStop3Raw})`;
export const aiShimmerStop4 = `var(${aiShimmerStop4Raw})`;
export const shadowWindowActiveKeyX = `var(${shadowWindowActiveKeyXRaw})`;
export const shadowWindowActiveKeyY = `var(${shadowWindowActiveKeyYRaw})`;
export const shadowWindowActiveKeyBlur = `var(${shadowWindowActiveKeyBlurRaw})`;
export const shadowWindowActiveKeyColor = `var(${shadowWindowActiveKeyColorRaw})`;
export const shadowWindowActiveAmbientX = `var(${shadowWindowActiveAmbientXRaw})`;
export const shadowWindowActiveAmbientY = `var(${shadowWindowActiveAmbientYRaw})`;
export const shadowWindowActiveAmbientBlur = `var(${shadowWindowActiveAmbientBlurRaw})`;
export const shadowWindowActiveAmbientColor = `var(${shadowWindowActiveAmbientColorRaw})`;
export const shadowWindowInactiveAmbientX = `var(${shadowWindowInactiveAmbientXRaw})`;
export const shadowWindowInactiveAmbientY = `var(${shadowWindowInactiveAmbientYRaw})`;
export const shadowWindowInactiveAmbientBlur = `var(${shadowWindowInactiveAmbientBlurRaw})`;
export const shadowWindowInactiveAmbientColor = `var(${shadowWindowInactiveAmbientColorRaw})`;
export const nullColor = `var(${nullColorRaw})`;
export const ctrlCardStateRest = `var(${ctrlCardStateRestRaw})`;
export const ctrlCardStateHover = `var(${ctrlCardStateHoverRaw})`;
export const ctrlCardStatePressed = `var(${ctrlCardStatePressedRaw})`;
export const ctrlCardStateDisabled = `var(${ctrlCardStateDisabledRaw})`;
export const ctrlListShadowSelectedKeyX = `var(${ctrlListShadowSelectedKeyXRaw})`;
export const ctrlListShadowSelectedKeyY = `var(${ctrlListShadowSelectedKeyYRaw})`;
export const ctrlListShadowSelectedKeyBlur = `var(${ctrlListShadowSelectedKeyBlurRaw})`;
export const ctrlListShadowSelectedKeyColor = `var(${ctrlListShadowSelectedKeyColorRaw})`;
export const ctrlListShadowSelectedAmbientX = `var(${ctrlListShadowSelectedAmbientXRaw})`;
export const ctrlListShadowSelectedAmbientY = `var(${ctrlListShadowSelectedAmbientYRaw})`;
export const ctrlListShadowSelectedAmbientBlur = `var(${ctrlListShadowSelectedAmbientBlurRaw})`;
export const ctrlListShadowSelectedAmbientColor = `var(${ctrlListShadowSelectedAmbientColorRaw})`;
export const statusNeutralBackground = `var(${statusNeutralBackgroundRaw})`;
export const statusNeutralTintBackground = `var(${statusNeutralTintBackgroundRaw})`;
export const statusNeutralTintStroke = `var(${statusNeutralTintStrokeRaw})`;
export const nullNumber = `var(${nullNumberRaw})`;
export const nullString = `var(${nullStringRaw})`;
export const backgroundCardOnsecondaryDefaultRest = `var(${backgroundCardOnsecondaryDefaultRestRaw})`;
export const backgroundCardOnsecondaryAltRest = `var(${backgroundCardOnsecondaryAltRestRaw})`;
export const backgroundCardOnsecondaryAltHover = `var(${backgroundCardOnsecondaryAltHoverRaw})`;
export const backgroundCardOnsecondaryAltPressed = `var(${backgroundCardOnsecondaryAltPressedRaw})`;
export const backgroundCardOnsecondaryAltDisabled = `var(${backgroundCardOnsecondaryAltDisabledRaw})`;
export const backgroundCardOnsecondaryDefaultHover = `var(${backgroundCardOnsecondaryDefaultHoverRaw})`;
export const backgroundCardOnsecondaryDefaultPressed = `var(${backgroundCardOnsecondaryDefaultPressedRaw})`;
export const backgroundCardOnsecondaryDefaultDisabled = `var(${backgroundCardOnsecondaryDefaultDisabledRaw})`;
export const backgroundCardOnflyoutDefaultRest = `var(${backgroundCardOnflyoutDefaultRestRaw})`;
export const backgroundCardOnflyoutDefaultHover = `var(${backgroundCardOnflyoutDefaultHoverRaw})`;
export const backgroundCardOnflyoutDefaultPressed = `var(${backgroundCardOnflyoutDefaultPressedRaw})`;
export const backgroundCardOnflyoutDefaultDisabled = `var(${backgroundCardOnflyoutDefaultDisabledRaw})`;
