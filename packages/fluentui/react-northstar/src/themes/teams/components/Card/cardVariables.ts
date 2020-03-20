import { pxToRem } from '../../../../utils';

export interface CardVariables {
  cardPadding: string;
  previewMargin: string;
  headerMargin: string;
  bodyMargin: string;
  footerMargin: string;
  previewMarginHorizontal: string;
  topControlsTop: string;
  topControlsRight: string;
}

export default (): CardVariables => {
  return {
    cardPadding: pxToRem(10),
    previewMargin: `0 0 ${pxToRem(10)} 0`,
    headerMargin: `0 0 ${pxToRem(10)} 0`,
    bodyMargin: `0 0 ${pxToRem(10)} 0`,
    footerMargin: `0 0 ${pxToRem(10)} 0`,
    previewMarginHorizontal: `0 ${pxToRem(10)} 0 0`,
    topControlsTop: pxToRem(10),
    topControlsRight: pxToRem(0),
  };
};
