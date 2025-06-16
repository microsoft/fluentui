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
  _ctrlButtonGapInsideDefault: {
    f2Token: 'spacingHorizontalSNudge',
    originalToken: 'gapInsideCtrlDefault',
  },
  _ctrlDividerForegroundSubtle: {
    f2Token: 'colorNeutralForeground3',
    originalToken: 'foregroundCtrlHintDefault',
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
  _ctrlInputNeutralForegroundPlaceholder: {
    f2Token: 'colorNeutralForeground4',
    originalToken: 'foregroundCtrlNeutralSecondaryRest',
  },
  _ctrlMessageBarActionsColumnGap: {
    f2Token: 'spacingHorizontalM',
    // should be 8px per design
    originalToken: 'gapBetweenCtrlDefault',
  },
  _ctrlMessageBarActionsMultilineMarginBottom: {
    f2Token: 'spacingVerticalS',
    // should be 20px per design
    originalToken: 'paddingContentAlignDefault',
  },
  _ctrlMessageBarActionsMultilineMarginTop: {
    f2Token: 'spacingVerticalMNudge',
    // should be 20px per design
    originalToken: 'paddingContentAlignDefault',
  },
  _ctrlMessageBarActionsMultilinePaddingRight: {
    f2Token: 'spacingVerticalM',
    // should be 20px per design
    originalToken: 'paddingContentAlignDefault',
  },
  _ctrlMessageBarErrorIconColor: {
    f2Token: 'colorStatusDangerForeground1',
    originalToken: 'statusDangerTintForeground',
  },
  _ctrlMessageBarInfoBackgroundColor: {
    f2Token: 'colorNeutralBackground3',
    // should be colorNeutralBackground5 per design
    originalToken: 'statusImportantTintBackground',
  },
  _ctrlMessageBarInfoBorderColor: {
    f2Token: 'colorNeutralStroke1',
    // should be colorNeutralStroke2 per design
    originalToken: 'statusInformativeTintStroke',
  },
  _ctrlMessageBarInfoIconColor: {
    f2Token: 'colorNeutralForeground3',
    // should be colorNeutralForeground2 per design
    originalToken: 'foregroundCtrlIconOnNeutralRest',
  },
  _ctrlMessageBarMultilinePaddingTop: {
    f2Token: 'spacingVerticalMNudge',
    // should be 20px per design
    originalToken: 'paddingContentAlignDefault',
  },
  _ctrlMessageBarPaddingContentAlignDefault: {
    originalToken: 'paddingContentAlignDefault',
    rawValue: '12px', // should be 20px per design
  },
  _ctrlMessageBarPaddingRight: {
    f2Token: 'spacingHorizontalM',
    // should be 8px per design
    originalToken: 'gapBetweenCtrlDefault',
  },
  _ctrlMessageBarPaddingY: {
    originalToken: 'paddingContentAlignOutdentIconOnSubtle',
    rawValue: '0px', // setting this to maintain current Fluent implementation
  },
  _ctrlMessageBarReflowSpacerMarginBottom: {
    f2Token: 'spacingVerticalS',
    // should be 20px per design
    originalToken: 'paddingContentAlignDefault',
  },
  _ctrlMessageBarTitleFontSize: {
    f2Token: 'fontSizeBase300',
    // should be fontSizeBase400 per design
    originalToken: 'textRampItemHeaderFontSize',
  },
  _ctrlMessageBarTitleLineHeight: {
    f2Token: 'lineHeightBase300',
    // should be lineHeightBase400 per design
    originalToken: 'textRampItemHeaderLineHeight',
  },
  _ctrlPersonaTreeIconOnSubtlePressed: {
    f2Token: 'colorNeutralForeground3Pressed',
    originalToken: 'foregroundCtrlOnSubtlePressed',
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
};
