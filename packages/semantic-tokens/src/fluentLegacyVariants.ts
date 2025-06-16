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
  _ctrlAccordionForegroundHover: {
    f2Token: 'colorNeutralForeground2',
    originalToken: 'foregroundCtrlOnTransparentHover',
  },
  _ctrlAccordionForegroundPressed: {
    f2Token: 'colorNeutralForeground2',
    originalToken: 'foregroundCtrlOnTransparentPressed',
  },
  _ctrlAccordionForegroundRest: {
    f2Token: 'colorNeutralForeground2',
    originalToken: 'foregroundCtrlOnTransparentRest',
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
};
