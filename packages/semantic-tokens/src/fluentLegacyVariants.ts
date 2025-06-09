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
};
