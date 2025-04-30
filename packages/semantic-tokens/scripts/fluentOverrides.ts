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
  foregroundContentNeutralPrimary: { f2Token: 'colorNeutralForeground1' },
  statusDangerTintForeground: { f2Token: 'colorPaletteRedForeground3' },
  textGlobalCaption1Lineheight: { f2Token: 'lineHeightBase200' },
  textGlobalCaption1Fontsize: { f2Token: 'fontSizeBase200' },
  textGlobalBody3Lineheight: { f2Token: 'lineHeightBase300' },
  textGlobalBody2Fontsize: { f2Token: 'fontSizeBase400' },
  textGlobalBody2Lineheight: { f2Token: 'lineHeightBase400' },
  textGlobalCaption2Lineheight: { f2Token: 'lineHeightBase100' },
  textGlobalCaption2Fontsize: { f2Token: 'fontSizeBase100' },
  textGlobalBody1Fontsize: { f2Token: 'fontSizeBase500' },
  textGlobalBody1Lineheight: { f2Token: 'lineHeightBase500' },
  textGlobalSubtitle2Fontsize: { f2Token: 'fontSizeBase600' },
  textGlobalSubtitle2Lineheight: { f2Token: 'lineHeightBase600' },
  textGlobalSubtitle1Fontsize: { f2Token: 'fontSizeHero700' },
  textGlobalSubtitle1Lineheight: { f2Token: 'lineHeightHero700' },
  textGlobalTitle2Fontsize: { f2Token: 'fontSizeHero800' },
  textGlobalTitle2Lineheight: { f2Token: 'lineHeightHero800' },
  textGlobalTitle1Fontsize: { f2Token: 'fontSizeHero900' },
  textGlobalTitle1Lineheight: { f2Token: 'lineHeightHero900' },
  textGlobalDisplay2Fontsize: { f2Token: 'fontSizeHero1000' },
  textGlobalDisplay2Lineheight: { f2Token: 'lineHeightHero1000' },
};
