import { pxToRem } from '../../../../utils';

export interface CardVariables {
  backgroundColor: string;
  backgroundColorDisabled: string;
  backgroundColorFocus: string;
  backgroundColorHover: string;
  backgroundColorPressed: string;
  borderStyle: string;
  borderColor: string;
  borderColorDisabled: string;
  borderColorHover: string;
  borderColorPressed: string;
  borderWidth: string;
  borderRadius: string;
  boxShadow: string;
  boxShadowHover: string;
  boxShadowFocus: string;
  boxShadowPressed: string;
  boxShadowDisabled: string;
  padding: string;
  colorDisabled: string;
  compactPadding: string;
  previewMargin: string;
  headerMargin: string;
  bodyMargin: string;
  footerMargin: string;
  fittedPreviewMargin: string;
  fittedHeaderMargin: string;
  fittedBodyMargin: string;
  fittedFooterMargin: string;
  previewMarginHorizontal: string;
  topControlsTop: string;
  topControlsRight: string;
  width: string;
  height: string;
  sizeSmallWidth: string;
  sizeSmallHeight: string;
  sizeSmallPadding: string;
  sizeLargeWidth: string;
  sizeLargeHeight: string;
  sizeLargePadding: string;
  fluidHeight: string;
  fluidWidth: string;
}

export default (siteVars): CardVariables => {
  return {
    backgroundColor: siteVars.colorScheme.default.background,
    backgroundColorDisabled: siteVars.colorScheme.default.backgroundDisabled,
    backgroundColorFocus: siteVars.colorScheme.default.backgroundFocus,
    backgroundColorHover: siteVars.colorScheme.default.backgroundHover,
    backgroundColorPressed: siteVars.colorScheme.default.backgroundPressed,
    borderStyle: 'solid',
    borderColor: siteVars.colorScheme.default.border,
    borderColorDisabled: siteVars.colorScheme.default.borderDisabled,
    borderColorHover: siteVars.colorScheme.default.borderHover,
    borderColorPressed: siteVars.colorScheme.default.borderPressed,
    borderWidth: siteVars.borderWidth,
    borderRadius: pxToRem(4),
    boxShadow: 'none',
    boxShadowDisabled: 'none',
    boxShadowHover: siteVars.shadowLevel3,
    boxShadowFocus: siteVars.shadowLevel2,
    boxShadowPressed: siteVars.shadowLevel1,
    padding: pxToRem(10),
    colorDisabled: siteVars.colorScheme.default.foregroundDisabled,
    compactPadding: pxToRem(0),
    previewMargin: `0 0 ${pxToRem(10)} 0`,
    headerMargin: `0 0 ${pxToRem(10)} 0`,
    bodyMargin: `0 0 ${pxToRem(10)} 0`,
    footerMargin: `0 0 ${pxToRem(10)} 0`,
    fittedPreviewMargin: pxToRem(0),
    fittedHeaderMargin: pxToRem(0),
    fittedBodyMargin: pxToRem(0),
    fittedFooterMargin: pxToRem(0),
    previewMarginHorizontal: `0 ${pxToRem(10)} 0 0`,
    topControlsTop: pxToRem(10),
    topControlsRight: pxToRem(0),
    // TODO: update with latest values from design
    width: pxToRem(300),
    height: '100%',
    sizeSmallWidth: pxToRem(200),
    sizeSmallHeight: '100%',
    sizeSmallPadding: pxToRem(5),
    sizeLargeWidth: pxToRem(500),
    sizeLargeHeight: '100%',
    sizeLargePadding: pxToRem(20),
    fluidWidth: '100%',
    fluidHeight: '100%',
  };
};
