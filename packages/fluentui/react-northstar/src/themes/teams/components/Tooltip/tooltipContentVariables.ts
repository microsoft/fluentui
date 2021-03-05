import { pxToRem } from '../../../../utils';

export interface TooltipContentVariables {
  boxShadow: string;

  borderRadius: string;
  borderSize: string;
  padding: string;

  maxWidth: string;

  pointerMargin: string;
  pointerGap: string;
  pointerWidth: string;
  pointerHeight: string;

  color: string;
  backgroundColor: string;

  zIndex: number;
}

export const tooltipContentVariables = (siteVars: any): TooltipContentVariables => ({
  boxShadow: siteVars.shadowLevel2,

  borderRadius: pxToRem(3),
  borderSize: '1px',
  padding: `${pxToRem(5)} ${pxToRem(12)} ${pxToRem(7)} ${pxToRem(12)}`,

  maxWidth: pxToRem(246),

  pointerMargin: pxToRem(6),
  pointerGap: pxToRem(5),
  pointerWidth: pxToRem(16),
  pointerHeight: pxToRem(6),
  color: siteVars.colorScheme.default.foreground3,
  backgroundColor: siteVars.colors.grey[500],

  zIndex: siteVars.zIndexes.overlayPriority,
});
