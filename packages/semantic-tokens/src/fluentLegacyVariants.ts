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
};
