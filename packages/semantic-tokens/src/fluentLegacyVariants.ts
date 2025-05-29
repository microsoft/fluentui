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
  _ctrlButtonGapInsideDefault: { f2Token: 'spacingHorizontalSNudge', originalToken: 'gapInsideCtrlDefault' },
  _ctrlAvatarActiveRingStrokeWidthSm: { originalToken: 'ctrlAvatarActiveRingStrokeWidth', f2Token: 'strokeWidthThick' },
  _ctrlAvatarActiveRingStrokeWidthMd: {
    originalToken: 'ctrlAvatarActiveRingStrokeWidth',
    f2Token: 'strokeWidthThicker',
  },
  _ctrlAvatarActiveRingStrokeWidthLg: {
    originalToken: 'ctrlAvatarActiveRingStrokeWidth',
    f2Token: 'strokeWidthThickest',
  },
  _ctrlAvatarCornerGroupSm: { originalToken: 'ctrlAvatarCornerGroup', f2Token: 'borderRadiusSmall' },
  _ctrlAvatarCornerGroupMd: { originalToken: 'ctrlAvatarCornerGroup', f2Token: 'borderRadiusMedium' },
  _ctrlAvatarCornerGroupLg: { originalToken: 'ctrlAvatarCornerGroup', f2Token: 'borderRadiusLarge' },
  _ctrlAvatarCornerGroupXLg: { originalToken: 'ctrlAvatarCornerGroup', f2Token: 'borderRadiusXLarge' },
  _ctrlAvatarPresenceBadgeStrokeWidthSm: {
    originalToken: 'ctrlAvatarPresenceBadgeStrokeWidth',
    f2Token: 'strokeWidthThin',
  },
  _ctrlAvatarPresenceBadgeStrokeWidthLg: {
    originalToken: 'ctrlAvatarPresenceBadgeStrokeWidth',
    f2Token: 'strokeWidthThick',
  },
};
