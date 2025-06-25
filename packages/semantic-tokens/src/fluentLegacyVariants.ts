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
  _ctrlMenuGroupHeaderColor: {
    f2Token: 'colorNeutralForeground3',
    // should be colorNeutralForeground4 per design
    originalToken: 'foregroundCtrlNeutralSecondaryRest',
  },
  _ctrlMenuGroupHeaderFontWeight: {
    f2Token: 'fontWeightSemibold',
    // should be fontWeightRegular per design
    originalToken: 'textStyleDefaultRegularWeight',
  },
  _ctrlMenuGroupHeaderHeight: {
    originalToken: 'sizeCtrlDefault',
    rawValue: '32px',
  },
  _ctrlMenuGroupHeaderPaddingRight: {
    originalToken: 'paddingCtrlHorizontalDefault',
    rawValue: '8px', // should be 10px per design
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
    // should be 10px per design
    originalToken: 'ctrlListIndentLevel1',
  },
  _ctrlMenuItemSecondaryContentFontSize: {
    f2Token: 'fontSizeBase200',
    // should be fontSizeBase300 per design
    originalToken: 'textRampItemBodyFontSize',
  },
  _ctrlMenuItemSecondaryContentForegroundHover: {
    f2Token: 'colorNeutralForeground3Hover',
    // should be colorNeutralForeground4 per design
    originalToken: 'foregroundCtrlNeutralSecondaryHover',
  },
  _ctrlMenuItemSecondaryContentForegroundRest: {
    f2Token: 'colorNeutralForeground3',
    // should be colorNeutralForeground4 per design
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
};
