export type FluentOverrideValue =
  | {
      f2Token: string;
      rawValue?: never;
    }
  | {
      f2Token?: never;
      rawValue: string;
    };

export type FluentOverrides = Record<string, FluentOverrideValue | null>;

export const fluentOverrides: FluentOverrides = {
  ctrlFocusOuterStroke: {
    f2Token: 'colorStrokeFocus2',
  },
  ctrlLinkForegroundBrandRest: { f2Token: 'colorBrandForegroundLink' },
  textStyleDefaultRegularFontfamily: { f2Token: 'fontFamilyBase' },
  textGlobalBody3Fontsize: { f2Token: 'fontSizeBase300' },
  textStyleDefaultRegularWeight: { f2Token: 'fontWeightRegular' },
  strokewidthDefault: { f2Token: 'strokeWidthThin' },
  ctrlLinkForegroundBrandHover: { f2Token: 'colorBrandForegroundLinkHover' },
  ctrlLinkForegroundBrandPressed: { f2Token: 'colorBrandForegroundLinkPressed' },
  ctrlLinkForegroundNeutralRest: { f2Token: 'colorNeutralForeground2' },
  ctrlLinkForegroundNeutralPressed: { f2Token: 'colorNeutralForeground2Pressed' },
  ctrlLinkForegroundNeutralHover: { f2Token: 'colorNeutralForeground2Hover' },
  foregroundCtrlNeutralPrimaryDisabled: { f2Token: 'colorNeutralForegroundDisabled' },
};
