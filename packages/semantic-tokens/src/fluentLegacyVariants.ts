export type LegacyFluentVariantValue =
  | {
      originalToken: string;
      f2Token: string;
      rawValue?: never;
    }
  | {
      originalToken: string;
      f2Token?: never;
      rawValue: string;
    };

export type LegacyFluentVariants = Record<string, LegacyFluentVariantValue | null>;

export const legacyFluentVariantsValues: LegacyFluentVariants = {
  _ctrlAccordionBackgroundRest: {
    f2Token: 'colorTransparentBackground',
    originalToken: 'backgroundCtrlSubtleRest',
  },
  _ctrlAccordionFocusInnerStrokeWidth: {
    originalToken: 'ctrlFocusInnerStrokeWidth',
    rawValue: '0px',
  },
  _ctrlAccordionFocusOuterStroke: {
    f2Token: 'colorStrokeFocus2',
    originalToken: 'ctrlFocusOuterStroke',
  },
  _ctrlAccordionForegroundHover: {
    f2Token: 'colorNeutralForeground1',
    originalToken: 'foregroundCtrlOnTransparentHover',
  },
  _ctrlAccordionForegroundPressed: {
    f2Token: 'colorNeutralForeground1',
    originalToken: 'foregroundCtrlOnTransparentPressed',
  },
  _ctrlAccordionForegroundRest: {
    f2Token: 'colorNeutralForeground1',
    originalToken: 'foregroundCtrlOnTransparentRest',
  },
  _ctrlAccordionPaddingTextBottom: {
    originalToken: 'paddingCtrlTextBottom',
    rawValue: '0px',
  },
  _ctrlAccordionPaddingTextTop: {
    originalToken: 'paddingCtrlTextTop',
    rawValue: '0px',
  },
  _ctrlAvatarActiveRingStrokeWidthLg: {
    f2Token: 'strokeWidthThickest',
    originalToken: 'ctrlAvatarActiveRingStrokeWidth',
  },
  _ctrlAvatarActiveRingStrokeWidthMd: {
    f2Token: 'strokeWidthThicker',
    originalToken: 'ctrlAvatarActiveRingStrokeWidth',
  },
  _ctrlAvatarActiveRingStrokeWidthSm: {
    f2Token: 'strokeWidthThick',
    originalToken: 'ctrlAvatarActiveRingStrokeWidth',
  },
  _ctrlAvatarCornerGroupLg: {
    f2Token: 'borderRadiusLarge',
    originalToken: 'ctrlAvatarCornerGroup',
  },
  _ctrlAvatarCornerGroupMd: {
    f2Token: 'borderRadiusMedium',
    originalToken: 'ctrlAvatarCornerGroup',
  },
  _ctrlAvatarCornerGroupSm: {
    f2Token: 'borderRadiusSmall',
    originalToken: 'ctrlAvatarCornerGroup',
  },
  _ctrlAvatarCornerGroupXLg: {
    f2Token: 'borderRadiusXLarge',
    originalToken: 'ctrlAvatarCornerGroup',
  },
  _ctrlAvatarPresenceBadgeStrokeWidthLg: {
    f2Token: 'strokeWidthThick',
    originalToken: 'ctrlAvatarPresenceBadgeStrokeWidth',
  },
  _ctrlAvatarPresenceBadgeStrokeWidthSm: {
    f2Token: 'strokeWidthThin',
    originalToken: 'ctrlAvatarPresenceBadgeStrokeWidth',
  },
  _ctrlBadgeNullColor: {
    f2Token: 'colorTransparentStroke',
    originalToken: 'nullColor',
  },
  _ctrlBadgePaddingLeftSide: {
    f2Token: 'spacingHorizontalXXS',
    originalToken: 'paddingCtrlTextSide',
  },
  _ctrlBadgePaddingLeftSideXL: {
    f2Token: 'spacingHorizontalXS',
    originalToken: 'paddingCtrlTextSide',
  },
  _ctrlBadgePaddingRightSide: {
    f2Token: 'spacingHorizontalXXS',
    originalToken: 'paddingCtrlTextSide',
  },
  _ctrlBadgePaddingRightSideXL: {
    f2Token: 'spacingHorizontalXS',
    originalToken: 'paddingCtrlTextSide',
  },
  _ctrlBadgePaddingTextSide: {
    f2Token: 'spacingHorizontalXXS',
    originalToken: 'paddingCtrlTextSide',
  },
  _ctrlBadgeSmallTinyCorner: {
    f2Token: 'borderRadiusSmall',
    originalToken: 'ctrlBadgeCorner',
  },
  _ctrlBadgeStatusAvailableTintForeground: {
    f2Token: 'colorPaletteLightGreenForeground3',
    originalToken: 'statusSuccessTintForeground',
  },
  _ctrlBadgeStatusBrandTintForeground: {
    f2Token: 'colorBrandForeground2',
    originalToken: 'statusBrandTintForeground',
  },
  _ctrlBadgeStatusBusyTintForeground: {
    f2Token: 'colorPaletteRedBackground3',
    originalToken: 'statusDangerTintForeground',
  },
  _ctrlBadgeStatusDangerTintBackground: {
    f2Token: 'colorPaletteRedBackground1',
    originalToken: 'statusDangerTintBackground',
  },
  _ctrlBadgeStatusDangerTintForeground: {
    f2Token: 'colorPaletteRedForeground1',
    originalToken: 'statusDangerTintForeground',
  },
  _ctrlBadgeStatusDangerTintStroke: {
    f2Token: 'colorPaletteRedBorder1',
    originalToken: 'statusDangerTintStroke',
  },
  _ctrlBadgeStatusImportantTintBackground: {
    f2Token: 'colorNeutralForeground3',
    originalToken: 'statusImportantTintBackground',
  },
  _ctrlBadgeStatusImportantTintForeground: {
    f2Token: 'colorNeutralBackground1',
    originalToken: 'statusImportantTintForeground',
  },
  _ctrlBadgeStatusInformativeTintStroke: {
    f2Token: 'colorNeutralStroke2',
    originalToken: 'statusInformativeTintStroke',
  },
  _ctrlBadgeStatusSuccessTintBackground: {
    f2Token: 'colorPaletteGreenBackground1',
    originalToken: 'statusSuccessTintBackground',
  },
  _ctrlBadgeStatusSuccessTintForeground: {
    f2Token: 'colorPaletteGreenForeground1',
    originalToken: 'statusSuccessTintForeground',
  },
  _ctrlBadgeStatusSuccessTintForeground3: {
    f2Token: 'colorPaletteGreenForeground3',
    originalToken: 'statusSuccessTintForeground',
  },
  _ctrlBadgeStatusSuccessTintStroke: {
    f2Token: 'colorPaletteGreenBorder1',
    originalToken: 'statusSuccessTintStroke',
  },
  _ctrlBadgeStatusWarningBackground: {
    f2Token: 'colorPaletteYellowBackground3',
    originalToken: 'statusWarningBackground',
  },
  _ctrlBadgeStatusWarningTintBackground: {
    f2Token: 'colorPaletteYellowBackground1',
    originalToken: 'statusWarningTintBackground',
  },
  _ctrlBadgeStatusWarningTintForeground: {
    f2Token: 'colorPaletteYellowForeground1',
    originalToken: 'statusWarningTintForeground',
  },
  _ctrlBadgeStatusWarningTintForeground2: {
    f2Token: 'colorPaletteYellowForeground2',
    originalToken: 'statusWarningTintForeground',
  },
  _ctrlBadgeStatusWarningTintStroke: {
    f2Token: 'colorPaletteYellowBorder1',
    originalToken: 'statusWarningTintStroke',
  },
  _ctrlBadgeTextStyleSemiBoldWeight: {
    f2Token: 'fontWeightSemibold',
    originalToken: 'textStyleDefaultRegularWeight',
  },
  _ctrlBadgeXLPadding: {
    f2Token: 'spacingHorizontalSNudge',
    originalToken: 'ctrlBadgeLgPadding',
  },
  _ctrlBreadcrumbSizeDefault: {
    originalToken: 'sizeCtrlDefault',
    rawValue: '32px',
  },
  _ctrlBreadcrumbSizeLgDefault: {
    originalToken: 'sizeCtrlLgDefault',
    rawValue: '40px',
  },
  _ctrlBreadcrumbSizeSmIcon: {
    originalToken: 'sizeCtrlSmIcon',
    rawValue: '16px',
  },
  _ctrlButtonGapInsideDefault: {
    f2Token: 'spacingHorizontalSNudge',
    originalToken: 'gapInsideCtrlDefault',
  },
  _ctrlCheckboxBorderColorChecked: {
    f2Token: 'colorCompoundBrandBackground',
    originalToken: 'strokeCtrlOnActiveBrandHover',
  },
  _ctrlCheckboxBorderColorCheckedHover: {
    f2Token: 'colorCompoundBrandBackgroundHover',
    originalToken: 'strokeCtrlOnActiveBrandHover',
  },
  _ctrlCheckboxForegroundUnchecked: {
    f2Token: 'colorNeutralForeground3',
    originalToken: 'foregroundContentNeutralPrimary',
  },
  _ctrlCheckboxForegroundUncheckedHover: {
    f2Token: 'colorNeutralForeground2',
    originalToken: 'foregroundContentNeutralPrimary',
  },
  _ctrlCheckboxIndicatorBorderColorCheckedPressed: {
    f2Token: 'colorCompoundBrandBackgroundPressed',
    originalToken: 'strokeCtrlOnActiveBrandPressed',
  },
  _ctrlCheckboxIndicatorBorderColorMixed: {
    f2Token: 'colorCompoundBrandStroke',
    originalToken: 'backgroundCtrlActiveBrandRest',
  },
  _ctrlCheckboxIndicatorBorderColorMixedHover: {
    f2Token: 'colorCompoundBrandStrokeHover',
    originalToken: 'backgroundCtrlActiveBrandHover',
  },
  _ctrlCheckboxIndicatorBorderColorMixedPressed: {
    f2Token: 'colorCompoundBrandStrokePressed',
    originalToken: 'backgroundCtrlActiveBrandPressed',
  },
  _ctrlCheckboxIndicatorColorMixed: {
    f2Token: 'colorCompoundBrandForeground1',
    originalToken: 'backgroundCtrlActiveBrandRest',
  },
  _ctrlCheckboxIndicatorColorMixedHover: {
    f2Token: 'colorCompoundBrandForeground1Hover',
    originalToken: 'backgroundCtrlActiveBrandHover',
  },
  _ctrlCheckboxIndicatorColorMixedPressed: {
    f2Token: 'colorCompoundBrandForeground1Pressed',
    originalToken: 'backgroundCtrlActiveBrandPressed',
  },
  _ctrlDialogGapBetweenContentMedium: {
    originalToken: 'gapBetweenContentMedium',
    rawValue: '8px',
  },
  _ctrlDividerForegroundSubtle: {
    f2Token: 'colorNeutralForeground3',
    originalToken: 'foregroundCtrlHintDefault',
  },
  _ctrlFieldForegroundCtrlNeutralSecondaryRest: {
    f2Token: 'colorNeutralForeground3',
    originalToken: 'foregroundCtrlNeutralSecondaryRest',
  },
  _ctrlFieldGapBetweenContentXSmall: {
    f2Token: 'spacingVerticalXS',
    originalToken: 'gapBetweenContentXSmall',
  },
  _ctrlFieldPaddingCtrlLgTextBottom: {
    originalToken: 'paddingCtrlLgTextBottom',
    rawValue: '1px',
  },
  _ctrlFieldPaddingCtrlLgTextBottomHorizontal: {
    originalToken: 'paddingCtrlLgTextBottom',
    rawValue: '9px',
  },
  _ctrlFieldPaddingCtrlLgTextTop: {
    originalToken: 'paddingCtrlLgTextTop',
    rawValue: '1px',
  },
  _ctrlFieldPaddingCtrlLgTextTopHorizontal: {
    originalToken: 'paddingCtrlLgTextTop',
    rawValue: '9px',
  },
  _ctrlFieldPaddingCtrlSmTextBottom: {
    f2Token: 'spacingVerticalXS',
    originalToken: 'paddingCtrlSmTextBottom',
  },
  _ctrlFieldPaddingCtrlSmTextTop: {
    f2Token: 'spacingVerticalXS',
    originalToken: 'paddingCtrlSmTextTop',
  },
  _ctrlFieldPaddingCtrlTextBottom: {
    f2Token: 'spacingVerticalXXS',
    originalToken: 'paddingCtrlTextBottom',
  },
  _ctrlFieldPaddingCtrlTextBottomHorizontal: {
    f2Token: 'spacingVerticalSNudge',
    originalToken: 'paddingCtrlTextBottom',
  },
  _ctrlFieldPaddingCtrlTextSide: {
    f2Token: 'spacingHorizontalM',
    originalToken: 'paddingCtrlTextSide',
  },
  _ctrlFieldPaddingCtrlTextTop: {
    f2Token: 'spacingVerticalXXS',
    originalToken: 'paddingCtrlTextTop',
  },
  _ctrlFieldPaddingCtrlTextTopHorizontal: {
    f2Token: 'spacingVerticalSNudge',
    originalToken: 'paddingCtrlTextTop',
  },
  _ctrlFieldStatusDangerTintForeground: {
    f2Token: 'colorPaletteRedForeground1',
    originalToken: 'statusDangerTintForeground',
  },
  _ctrlFieldStatusSuccessTintForeground: {
    f2Token: 'colorPaletteGreenForeground1',
    originalToken: 'statusSuccessTintForeground',
  },
  _ctrlFieldStatusWarningTintForeground: {
    f2Token: 'colorPaletteDarkOrangeForeground1',
    originalToken: 'statusWarningTintForeground',
  },
  _ctrlFocusOuterStrokeInteractive: {
    f2Token: 'colorTransparentStrokeInteractive',
    originalToken: 'ctrlFocusOuterStroke',
  },
  _ctrlInputBackgroundRestDarker: {
    f2Token: 'colorNeutralBackground3',
    originalToken: 'ctrlInputBackgroundRest',
  },
  _ctrlInputBackgroundRestLighter: {
    f2Token: 'colorNeutralBackground1',
    originalToken: 'ctrlInputBackgroundRest',
  },
  _ctrlInputBottomLineStrokeBrandPressed: {
    f2Token: 'colorCompoundBrandStrokePressed',
    originalToken: 'ctrlInputBottomLineStrokePressed',
  },
  _ctrlInputNeutralForegroundPlaceholder: {
    f2Token: 'colorNeutralForeground4',
    originalToken: 'foregroundCtrlNeutralSecondaryRest',
  },
  _ctrlListBackgroundColorHover: {
    f2Token: 'colorTransparentBackground',
    originalToken: 'backgroundCtrlSubtleHover',
  },
  _ctrlListBackgroundColorPressed: {
    f2Token: 'colorTransparentBackground',
    originalToken: 'backgroundCtrlSubtlePressed',
  },
  _ctrlListBackgroundColorRest: {
    f2Token: 'colorTransparentBackground',
    originalToken: 'backgroundCtrlSubtleRest',
  },
  _ctrlListForegroundColorHover: {
    f2Token: 'colorNeutralForeground1',
    originalToken: 'foregroundCtrlOnSubtleHover',
  },
  _ctrlListForegroundColorPressed: {
    f2Token: 'colorNeutralForeground1',
    originalToken: 'foregroundCtrlOnSubtlePressed',
  },
  _ctrlListForegroundColorRest: {
    f2Token: 'colorNeutralForeground1',
    originalToken: 'foregroundCtrlOnSubtleRest',
  },
  _ctrlListItemStroke: {
    f2Token: 'colorStrokeFocus2',
    originalToken: 'strokeWidthCtrlOutlineRest',
  },
  _ctrlMenuGroupHeaderColor: {
    f2Token: 'colorNeutralForeground3',
    originalToken: 'foregroundCtrlNeutralSecondaryRest',
  },
  _ctrlMenuGroupHeaderFontWeight: {
    f2Token: 'fontWeightSemibold',
    originalToken: 'textStyleDefaultRegularWeight',
  },
  _ctrlMenuGroupHeaderHeight: {
    originalToken: 'sizeCtrlDefault',
    rawValue: '32px',
  },
  _ctrlMenuGroupHeaderPaddingHorizontal: {
    originalToken: 'paddingCtrlHorizontalDefault',
    rawValue: '8px',
  },
  _ctrlMenuItemContentPaddingX: {
    originalToken: 'paddingCtrlTextSide',
    rawValue: '2px',
  },
  _ctrlMenuItemGapInsideDefault: {
    originalToken: 'gapInsideCtrlDefault',
    rawValue: '4px',
  },
  _ctrlMenuItemPaddingBottom: {
    f2Token: 'spacingVerticalSNudge',
    originalToken: 'paddingCtrlTextBottom',
  },
  _ctrlMenuItemPaddingTop: {
    f2Token: 'spacingVerticalSNudge',
    originalToken: 'paddingCtrlTextTop',
  },
  _ctrlMenuItemPaddingX: {
    f2Token: 'spacingVerticalSNudge',
    originalToken: 'ctrlListIndentLevel1',
  },
  _ctrlMenuItemSecondaryContentFontSize: {
    f2Token: 'fontSizeBase200',
    originalToken: 'textRampItemBodyFontSize',
  },
  _ctrlMenuItemSecondaryContentForegroundHover: {
    f2Token: 'colorNeutralForeground3Hover',
    originalToken: 'foregroundCtrlNeutralSecondaryHover',
  },
  _ctrlMenuItemSecondaryContentForegroundRest: {
    f2Token: 'colorNeutralForeground3',
    originalToken: 'foregroundCtrlNeutralSecondaryRest',
  },
  _ctrlMenuItemSizeDefault: {
    originalToken: 'sizeCtrlDefault',
    rawValue: '32px',
  },
  _ctrlMenuItemSubTextForegroundHover: {
    f2Token: 'colorNeutralForeground3Hover',
    originalToken: 'foregroundCtrlNeutralSecondaryHover',
  },
  _ctrlMenuItemSubTextForegroundPressed: {
    f2Token: 'colorNeutralForeground3Pressed',
    originalToken: 'foregroundCtrlNeutralSecondaryPressed',
  },
  _ctrlMenuPopoverCornerFlyoutRest: {
    f2Token: 'borderRadiusMedium',
    originalToken: 'cornerFlyoutRest',
  },
  _ctrlMenuPopoverShadowFlyout: {
    f2Token: 'shadow16',
    originalToken: 'shadowFlyout',
  },
  _ctrlMenuPopoverStrokeFlyout: {
    f2Token: 'colorTransparentStroke',
    originalToken: 'strokeFlyout',
  },
  _ctrlMessageBarActionsMultilinePaddingRight: {
    f2Token: 'spacingVerticalM',
    originalToken: 'paddingContentAlignDefault',
  },
  _ctrlMessageBarErrorIconColor: {
    f2Token: 'colorStatusDangerForeground1',
    originalToken: 'statusDangerTintForeground',
  },
  _ctrlMessageBarGapBetweenCtrl: {
    f2Token: 'spacingHorizontalM',
    originalToken: 'gapBetweenCtrlDefault',
  },
  _ctrlMessageBarPaddingContentAlignDefault: {
    originalToken: 'paddingContentAlignDefault',
    rawValue: '12px',
  },
  _ctrlMessageBarPaddingVertical: {
    originalToken: 'paddingContentAlignOutdentIconOnSubtle',
    rawValue: '0px',
  },
  _ctrlMessageBarReflowSpacerMarginBottom: {
    f2Token: 'spacingVerticalS',
    originalToken: 'paddingContentAlignDefault',
  },
  _ctrlMessageBarSpacingTop: {
    f2Token: 'spacingVerticalMNudge',
    originalToken: 'paddingContentAlignDefault',
  },
  _ctrlMessageBarTitleLineHeight: {
    f2Token: 'lineHeightBase300',
    originalToken: 'textRampItemHeaderLineHeight',
  },
  _ctrlPersonaTreeIconOnSubtlePressed: {
    f2Token: 'colorNeutralForeground3Pressed',
    originalToken: 'foregroundCtrlOnSubtlePressed',
  },
  _ctrlRadioBackgroundActiveBrandHover: {
    f2Token: 'colorTransparentBackground',
    originalToken: 'backgroundCtrlActiveBrandHover',
  },
  _ctrlRadioBackgroundActiveBrandPressed: {
    f2Token: 'colorTransparentBackground',
    originalToken: 'backgroundCtrlActiveBrandPressed',
  },
  _ctrlRadioBackgroundActiveBrandRest: {
    f2Token: 'colorTransparentBackground',
    originalToken: 'backgroundCtrlActiveBrandRest',
  },
  _ctrlRadioBackgroundActiveDisabled: {
    f2Token: 'colorTransparentBackground',
    originalToken: 'backgroundCtrlActiveBrandDisabled',
  },
  _ctrlRadioBaseBackgroundDisabled: {
    f2Token: 'colorTransparentBackground',
    originalToken: 'ctrlChoiceBaseBackgroundDisabled',
  },
  _ctrlRadioBaseBackgroundHover: {
    f2Token: 'colorTransparentBackground',
    originalToken: 'ctrlChoiceBaseBackgroundHover',
  },
  _ctrlRadioBaseBackgroundPressed: {
    f2Token: 'colorTransparentBackground',
    originalToken: 'ctrlChoiceBaseBackgroundPressed',
  },
  _ctrlRadioChoiceBaseSize: {
    originalToken: 'ctrlChoiceBaseSize',
    rawValue: '16px',
  },
  _ctrlRadioForegroundContentDisabled: {
    f2Token: 'colorNeutralForegroundDisabled',
    originalToken: 'foregroundContentNeutralPrimary',
  },
  _ctrlRadioForegroundContentNeutralHover: {
    f2Token: 'colorNeutralForeground2',
    originalToken: 'foregroundContentNeutralPrimary',
  },
  _ctrlRadioForegroundContentNeutralRest: {
    f2Token: 'colorNeutralForeground3',
    originalToken: 'foregroundContentNeutralPrimary',
  },
  _ctrlRadioForegroundOnActiveBrandHover: {
    f2Token: 'colorCompoundBrandForeground1Hover',
    originalToken: 'foregroundCtrlOnActiveBrandHover',
  },
  _ctrlRadioForegroundOnActiveBrandPressed: {
    f2Token: 'colorCompoundBrandForeground1Pressed',
    originalToken: 'foregroundCtrlOnActiveBrandPressed',
  },
  _ctrlRadioForegroundOnActiveBrandRest: {
    f2Token: 'colorCompoundBrandForeground1',
    originalToken: 'foregroundCtrlOnActiveBrandRest',
  },
  _ctrlRadioForegroundOnActiveDisabled: {
    f2Token: 'colorNeutralForegroundDisabled',
    originalToken: 'foregroundCtrlOnActiveBrandDisabled',
  },
  _ctrlRadioPaddingTextTop: {
    f2Token: 'spacingVerticalXS',
    originalToken: 'paddingCtrlTextTop',
  },
  _ctrlRadioPaddingVertical: {
    f2Token: 'spacingVerticalS',
    originalToken: 'paddingCtrlTextTop',
  },
  _ctrlRadioStrokeOnActiveBrandHover: {
    f2Token: 'colorCompoundBrandStrokeHover',
    originalToken: 'strokeCtrlOnActiveBrandHover',
  },
  _ctrlRadioStrokeOnActiveBrandPressed: {
    f2Token: 'colorCompoundBrandStrokePressed',
    originalToken: 'strokeCtrlOnActiveBrandPressed',
  },
  _ctrlRadioStrokeOnActiveBrandRest: {
    f2Token: 'colorCompoundBrandStroke',
    originalToken: 'strokeCtrlOnActiveBrandRest',
  },
  _ctrlSliderBarSizeDefault: {
    originalToken: 'sizeCtrlDefault',
    rawValue: '32px',
  },
  _ctrlSliderPaddingDefault: {
    originalToken: 'paddingCtrlHorizontalDefault',
    rawValue: '10px',
  },
  _ctrlSliderSmBarSizeDefault: {
    originalToken: 'sizeCtrlDefault',
    rawValue: '24px',
  },
  _ctrlSliderSmPaddingDefault: {
    originalToken: 'paddingCtrlHorizontalDefault',
    rawValue: '8px',
  },
  _ctrlSpinButtonBackgroundDisabled: {
    f2Token: 'colorTransparentBackground',
    originalToken: 'ctrlInputBackgroundDisabled',
  },
  _ctrlSpinButtonForegroundOnSubtleHover: {
    f2Token: 'colorNeutralForeground3Hover',
    originalToken: 'foregroundCtrlOnSubtleHover',
  },
  _ctrlSpinButtonForegroundOnSubtlePressed: {
    f2Token: 'colorNeutralForeground3Pressed',
    originalToken: 'foregroundCtrlOnSubtlePressed',
  },
  _ctrlSpinButtonNeutralSecondaryRest: {
    f2Token: 'colorNeutralForeground4',
    originalToken: 'foregroundCtrlNeutralSecondaryRest',
  },
  _ctrlSpinButtonOnSubtleRest: {
    f2Token: 'colorNeutralForeground3',
    originalToken: 'foregroundCtrlOnSubtleRest',
  },
  _ctrlSpinButtonPaddingHorizontal: {
    f2Token: 'spacingHorizontalMNudge',
    originalToken: 'paddingCtrlHorizontalDefault',
  },
  _ctrlSpinButtonPaddingSmHorizontal: {
    originalToken: 'paddingCtrlSmHorizontalDefault',
    rawValue: '5px',
  },
  _ctrlSpinButtonSizeDefault: {
    originalToken: 'sizeCtrlDefault',
    rawValue: '32px',
  },
  _ctrlSpinButtonSizeIconSecondary: {
    originalToken: 'sizeCtrlIconSecondary',
    rawValue: '16px',
  },
  _ctrlSpinButtonSizeSmDefault: {
    originalToken: 'sizeCtrlSmDefault',
    rawValue: '24px',
  },
  _ctrlSpinnerBackgroundEmpty: {
    f2Token: 'colorBrandStroke2Contrast',
    originalToken: 'ctrlProgressBackgroundEmpty',
  },
  _ctrlSpinnerBackgroundFilled: {
    f2Token: 'colorBrandStroke1',
    originalToken: 'ctrlProgressBackgroundFilled',
  },
  _ctrlSpinnerItemBodyFontSize: {
    f2Token: 'fontSizeBase400',
    originalToken: 'textRampItemBodyFontSize',
  },
  _ctrlSpinnerItemBodyLineHeight: {
    f2Token: 'lineHeightBase400',
    originalToken: 'textRampItemBodyLineHeight',
  },
  _ctrlSpinnerStrokeLgWidth: {
    f2Token: 'strokeWidthThickest',
    originalToken: 'ctrlSpinnerStrokeWidth',
  },
  _ctrlSpinnerStrokeSmWidth: {
    f2Token: 'strokeWidthThick',
    originalToken: 'ctrlSpinnerStrokeWidth',
  },
  _ctrlSpinnerTextStyleRegularWeight: {
    f2Token: 'fontWeightSemibold',
    originalToken: 'textStyleDefaultRegularWeight',
  },
  _ctrlSwitchPaddingTextBottom: {
    f2Token: 'spacingVerticalXS',
    originalToken: 'paddingCtrlTextBottom',
  },
  _ctrlSwitchPaddingTextTop: {
    f2Token: 'spacingVerticalXS',
    originalToken: 'paddingCtrlTextTop',
  },
  _ctrlSwitchStrokeOnActiveBrandHover: {
    f2Token: 'colorTransparentStrokeInteractive',
    originalToken: 'strokeCtrlOnActiveBrandHover',
  },
  _ctrlSwitchStrokeOnActiveBrandRest: {
    f2Token: 'colorTransparentStroke',
    originalToken: 'strokeCtrlOnActiveBrandRest',
  },
  _ctrlTabBackgroundActiveBrandDisabled: {
    f2Token: 'colorNeutralForegroundDisabled',
    originalToken: 'backgroundCtrlActiveBrandDisabled',
  },
  _ctrlTabForegroundActiveBrandHover: {
    f2Token: 'colorNeutralForeground1Hover',
    originalToken: 'foregroundCtrlActiveBrandHover',
  },
  _ctrlTabForegroundActiveBrandPressed: {
    f2Token: 'colorNeutralForeground1Pressed',
    originalToken: 'foregroundCtrlActiveBrandPressed',
  },
  _ctrlTabForegroundActiveBrandRest: {
    f2Token: 'colorNeutralForeground1',
    originalToken: 'foregroundCtrlActiveBrandRest',
  },
  _ctrlTabForegroundOnSubtleHover: {
    f2Token: 'colorNeutralForeground2Hover',
    originalToken: 'foregroundCtrlIconOnSubtleHover',
  },
  _ctrlTabForegroundOnSubtlePressed: {
    f2Token: 'colorNeutralForeground2Pressed',
    originalToken: 'foregroundCtrlIconOnSubtlePressed',
  },
  _ctrlTabForegroundOnTransparentHover: {
    f2Token: 'colorNeutralForeground2Hover',
    originalToken: 'foregroundCtrlOnTransparentHover',
  },
  _ctrlTabForegroundOnTransparentPressed: {
    f2Token: 'colorNeutralForeground2Pressed',
    originalToken: 'foregroundCtrlOnTransparentPressed',
  },
  _ctrlTabGapInsideDefault: {
    f2Token: 'spacingHorizontalSNudge',
    originalToken: 'gapInsideCtrlDefault',
  },
  _ctrlTabPaddingHorizontalDefault: {
    f2Token: 'spacingHorizontalMNudge',
    originalToken: 'paddingCtrlHorizontalDefault',
  },
  _ctrlTabPaddingTextSide: {
    f2Token: 'spacingHorizontalXXS',
    originalToken: 'paddingCtrlTextSide',
  },
  _ctrlTabSizeDefault: {
    originalToken: 'sizeCtrlDefault',
    rawValue: '32px',
  },
  _ctrlTabSmGapInsideDefault: {
    f2Token: 'spacingHorizontalXXS',
    originalToken: 'gapInsideCtrlDefault',
  },
  _ctrlTabSmPaddingHorizontalDefault: {
    f2Token: 'spacingHorizontalSNudge',
    originalToken: 'paddingCtrlHorizontalDefault',
  },
  _ctrlTooltipPaddingBottom: {
    originalToken: 'paddingCtrlTextBottom',
    rawValue: '6px',
  },
  _ctrlTooltipPaddingLeft: {
    originalToken: 'paddingCtrlHorizontalDefault',
    rawValue: '11px ',
  },
  _ctrlTooltipPaddingRight: {
    originalToken: 'paddingCtrlHorizontalDefault',
    rawValue: '11px',
  },
  _ctrlTooltipPaddingTop: {
    originalToken: 'paddingCtrlTextTop',
    rawValue: '4px',
  },
  _ctrlTooltipShadow: {
    rawValue:
      'drop-shadow(0 0 2px var(--colorNeutralShadowAmbient)) drop-shadow(0 4px 8px var(--colorNeutralShadowKey))',
    originalToken: 'ctrlTooltipShadow',
  },
  _ctrlTreeGapInsideDefault: {
    f2Token: 'spacingVerticalXXS',
    originalToken: 'gapInsideCtrlDefault',
  },
  _ctrlTreeIconOnSubtle: {
    f2Token: 'colorNeutralForeground3',
    originalToken: 'foregroundCtrlOnSubtleRest',
  },
  _ctrlTreeIconOnSubtleHover: {
    f2Token: 'colorNeutralForeground3Hover',
    originalToken: 'foregroundCtrlOnSubtleHover',
  },
  _ctrlTreeIconOnSubtlePressed: {
    f2Token: 'colorNeutralForeground3',
    originalToken: 'foregroundCtrlOnSubtlePressed',
  },
  _ctrlTreeOnTransparentHover: {
    f2Token: 'colorNeutralForeground2Hover',
    originalToken: 'foregroundCtrlOnTransparentHover',
  },
  _ctrlTreeOnTransparentPressed: {
    f2Token: 'colorNeutralForeground2Pressed',
    originalToken: 'foregroundCtrlOnTransparentPressed',
  },
  _ctrlTreePaddingTextBottom: {
    originalToken: 'paddingCtrlTextBottom',
    rawValue: '0px',
  },
  _ctrlTreePaddingTextLeft: {
    f2Token: 'spacingHorizontalXXS',
    originalToken: 'paddingCtrlTextSide',
  },
  _ctrlTreePaddingTextRight: {
    f2Token: 'spacingHorizontalXXS',
    originalToken: 'paddingCtrlHorizontalDefault',
  },
  _ctrlTreePaddingTextTop: {
    originalToken: 'paddingCtrlTextTop',
    rawValue: '0px',
  },
  _nullBackgroundColorHover: {
    f2Token: 'colorTransparentBackgroundHover',
    originalToken: 'nullColor',
  },
  _nullBackgroundColorPressed: {
    f2Token: 'colorTransparentBackgroundPressed',
    originalToken: 'nullColor',
  },
};
