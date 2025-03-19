export type FluentOverrideValue =
  | {
      f2Token: string;
      rawValue?: never;
    }
  | {
      f2Token?: never;
      rawValue: string;
    };

export interface FluentOverrides {
  [key: string]: FluentOverrideValue;
}

export const fluentOverrides: FluentOverrides = {
  ctrlFocusOuterStroke: {
    f2Token: 'tokens.colorStrokeFocus2',
  },
  ctrlLinkForegroundBrandRest: { f2Token: 'tokens.colorBrandForegroundLink' },
  textStyleDefaultRegularFontfamily: { f2Token: 'tokens.fontFamilyBase' },
  textGlobalBody3Fontsize: { f2Token: 'tokens.fontSizeBase300' },
  textStyleDefaultRegularWeight: { f2Token: 'tokens.fontWeightRegular' },
  strokewidthDefault: { f2Token: 'tokens.strokeWidthThin' },
  ctrlLinkForegroundBrandHover: { f2Token: 'tokens.colorBrandForegroundLinkHover' },
  ctrlLinkForegroundBrandPressed: { f2Token: 'tokens.colorBrandForegroundLinkPressed' },
  ctrlLinkForegroundNeutralRest: { f2Token: 'tokens.colorNeutralForeground2' },
  ctrlLinkForegroundNeutralPressed: { f2Token: 'tokens.colorNeutralForeground2Pressed' },
  ctrlLinkForegroundNeutralHover: { f2Token: 'tokens.colorNeutralForeground2Hover' },
  foregroundCtrlNeutralPrimaryDisabled: { f2Token: 'tokens.colorNeutralForegroundDisabled' },
};
