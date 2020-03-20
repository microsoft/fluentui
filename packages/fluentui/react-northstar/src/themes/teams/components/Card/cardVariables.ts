import { pxToRem } from '../../../../utils';

export interface CardVariables {
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  padding: string;
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
}

export default (siteVars): CardVariables => {
  return {
    borderStyle: 'solid',
    borderColor: siteVars.colors.black,
    borderWidth: siteVars.borderWidth,
    padding: pxToRem(10),
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
  };
};
