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
  foregroundContentNeutralPrimary: { f2Token: 'colorNeutralForeground1' },
  foregroundCtrlNeutralPrimaryDisabled: { f2Token: 'colorNeutralForegroundDisabled' },
  statusDangerBackground: { f2Token: 'colorPaletteRedBackground3' },
  statusDangerTintForeground: { f2Token: 'colorPaletteRedForeground3' },
  statusSuccessBackground: { f2Token: 'colorPaletteGreenBackground3' },
  statusWarningBackground: { f2Token: 'colorPaletteDarkOrangeBackground3' },
  strokeWidthDefault: { f2Token: 'strokeWidthThin' },
  textGlobalBody1FontSize: { f2Token: 'fontSizeBase500' },
  textGlobalBody1LineHeight: { f2Token: 'lineHeightBase500' },
  textGlobalBody2FontSize: { f2Token: 'fontSizeBase400' },
  textGlobalBody2LineHeight: { f2Token: 'lineHeightBase400' },
  textGlobalBody3FontSize: { f2Token: 'fontSizeBase300' },
  textGlobalBody3LineHeight: { f2Token: 'lineHeightBase300' },
  textGlobalCaption1FontSize: { f2Token: 'fontSizeBase200' },
  textGlobalCaption1LineHeight: { f2Token: 'lineHeightBase200' },
  textGlobalCaption2FontSize: { f2Token: 'fontSizeBase100' },
  textGlobalCaption2LineHeight: { f2Token: 'lineHeightBase100' },
  textGlobalDisplay2FontSize: { f2Token: 'fontSizeHero1000' },
  textGlobalDisplay2LineHeight: { f2Token: 'lineHeightHero1000' },
  textGlobalSubtitle1FontSize: { f2Token: 'fontSizeHero700' },
  textGlobalSubtitle1LineHeight: { f2Token: 'lineHeightHero700' },
  textGlobalSubtitle2FontSize: { f2Token: 'fontSizeBase600' },
  textGlobalSubtitle2LineHeight: { f2Token: 'lineHeightBase600' },
  textGlobalTitle1FontSize: { f2Token: 'fontSizeHero900' },
  textGlobalTitle1LineHeight: { f2Token: 'lineHeightHero900' },
  textGlobalTitle2FontSize: { f2Token: 'fontSizeHero800' },
  textGlobalTitle2LineHeight: { f2Token: 'lineHeightHero800' },
  textStyleDefaultRegularFontFamily: { f2Token: 'fontFamilyBase' },
  textStyleDefaultRegularWeight: { f2Token: 'fontWeightRegular' },
};
