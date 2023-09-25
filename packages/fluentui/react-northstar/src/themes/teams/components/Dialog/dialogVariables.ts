import { pxToRem } from '../../../../utils';

export interface DialogVariables {
  border: string;
  rootBackground: string;
  rootBorderRadius: string;
  rootPadding: string;
  rootPaddingZoom: string;
  rootWidth: string;

  contentMargin: string;

  headerMargin: string;

  overlayBackground: string;
  overlayZIndex: number;

  boxShadow: string;
  foregroundColor: string;

  headerFontSize: string;
  headerFontWeight: number;

  headerActionMargin: string;
  footerActionsBreakpoint: string;
}

export const dialogVariables = (siteVariables): Partial<DialogVariables> => ({
  border: 'none',

  rootBackground: siteVariables.colors.white,
  rootBorderRadius: siteVariables.borderRadiusXLarge,
  rootWidth: '600px',
  rootPadding: `${pxToRem(27)} ${pxToRem(32)} ${pxToRem(32)} ${pxToRem(32)}`,
  rootPaddingZoom: `${pxToRem(12)}`,

  contentMargin: `0 0 ${pxToRem(20)} 0`,

  boxShadow: siteVariables.shadowLevel4,
  foregroundColor: siteVariables.colors.grey[900],

  headerFontSize: siteVariables.fontSizes.large,
  headerFontWeight: siteVariables.fontWeightBold,
  headerMargin: `0 0 ${pxToRem(8)} 0`,

  overlayBackground: 'rgba(37, 36, 36, .75)', // todo: update to a palette value when daisy has mapped one
  overlayZIndex: siteVariables.zIndexes.overlay,

  headerActionMargin: `${pxToRem(-3)} ${pxToRem(-8)} 0 0`,
  // in case of customized footer this var allows to align styles
  footerActionsBreakpoint: '400px',
});
