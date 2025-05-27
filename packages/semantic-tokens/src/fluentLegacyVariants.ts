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
  _ctrlButtonGapInsideDefault: { originalToken: 'gapInsideCtrlDefault', f2Token: 'spacingHorizontalSNudge' },
  _ctrlSwitchStrokeOnActiveBrandHover: {
    originalToken: 'strokeCtrlOnActiveBrandHover',
    f2Token: 'colorTransparentStrokeInteractive',
  },
  _ctrlSwitchStrokeOnActiveBrandRest: {
    originalToken: 'strokeCtrlOnActiveBrandRest',
    f2Token: 'colorTransparentStroke',
  },
};
