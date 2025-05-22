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
    originalToken: 'foregroundCtrlOnTransparentHover',
    f2Token: 'colorNeutralForeground2',
  },
  _ctrlAccordionForegroundPressed: {
    originalToken: 'foregroundCtrlOnTransparentPressed',
    f2Token: 'colorNeutralForeground2',
  },
  _ctrlAccordionForegroundRest: {
    originalToken: 'foregroundCtrlOnTransparentRest',
    f2Token: 'colorNeutralForeground2',
  },
  _ctrlButtonGapInsideDefault: { originalToken: 'gapInsideCtrlDefault', f2Token: 'spacingHorizontalSNudge' },
};
