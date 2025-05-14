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
  cornerZero: { f2Token: 'borderRadiusNone' },
  ctrlFocusOuterStroke: { f2Token: 'colorStrokeFocus2' },
  ctrlLinkForegroundBrandHover: { f2Token: 'colorBrandForegroundLinkHover' },
  ctrlLinkForegroundBrandPressed: { f2Token: 'colorBrandForegroundLinkPressed' },
  ctrlLinkForegroundBrandRest: { f2Token: 'colorBrandForegroundLink' },
  ctrlLinkForegroundNeutralHover: { f2Token: 'colorNeutralForeground2Hover' },
  ctrlLinkForegroundNeutralPressed: { f2Token: 'colorNeutralForeground2Pressed' },
  ctrlLinkForegroundNeutralRest: { f2Token: 'colorNeutralForeground2' },
  ctrlProgressBackgroundEmpty: { f2Token: 'colorNeutralBackground6' },
  ctrlProgressBackgroundFilled: { f2Token: 'colorCompoundBrandBackground' },
  ctrlProgressCorner: { f2Token: 'borderRadiusMedium' },
  ctrlProgressHeightEmpty: { rawValue: '2px' },
  ctrlProgressHeightFilled: { rawValue: '100%' },
  ctrlProgressLgHeightEmpty: { rawValue: '4px' },
  ctrlProgressLgHeightFilled: { rawValue: '100%' },
  foregroundCtrlNeutralPrimaryDisabled: { f2Token: 'colorNeutralForegroundDisabled' },
  statusDangerBackground: { f2Token: 'colorPaletteRedBackground3' },
  statusSuccessBackground: { f2Token: 'colorPaletteGreenBackground3' },
  statusWarningBackground: { f2Token: 'colorPaletteDarkOrangeBackground3' },
  strokeWidthDefault: { f2Token: 'strokeWidthThin' },
  textGlobalBody3FontSize: { f2Token: 'fontSizeBase300' },
  textStyleDefaultRegularFontFamily: { f2Token: 'fontFamilyBase' },
  textStyleDefaultRegularWeight: { f2Token: 'fontWeightRegular' },
};
