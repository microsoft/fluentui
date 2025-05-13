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
  ctrlFocusOuterStroke: { f2Token: 'colorStrokeFocus2' },
  ctrlLinkForegroundBrandHover: { f2Token: 'colorBrandForegroundLinkHover' },
  ctrlLinkForegroundBrandPressed: { f2Token: 'colorBrandForegroundLinkPressed' },
  ctrlLinkForegroundBrandRest: { f2Token: 'colorBrandForegroundLink' },
  ctrlLinkForegroundNeutralHover: { f2Token: 'colorNeutralForeground2Hover' },
  ctrlLinkForegroundNeutralPressed: { f2Token: 'colorNeutralForeground2Pressed' },
  ctrlLinkForegroundNeutralRest: { f2Token: 'colorNeutralForeground2' },
  foregroundCtrlNeutralPrimaryDisabled: { f2Token: 'colorNeutralForegroundDisabled' },
  strokewidthDefault: { f2Token: 'strokeWidthThin' },
  textGlobalBody3Fontsize: { f2Token: 'fontSizeBase300' },
  textStyleDefaultRegularFontfamily: { f2Token: 'fontFamilyBase' },
  // textStyleDefaultRegularWeight: { f2Token: 'fontWeightRegular' },
  textStyleDefaultRegularWeight: null,
};
