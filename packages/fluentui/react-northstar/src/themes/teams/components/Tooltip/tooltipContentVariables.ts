import { pxToRem } from '../../../../utils';

export interface TooltipContentVariables {
  boxShadow: string;

  borderRadius: string;
  borderColor: string;
  borderSize: string;
  borderStyle: string;
  padding: string;

  maxWidth: string;

  svgPointer: boolean;
  pointerMargin: string;
  pointerGap: string;
  pointerWidth: string;
  pointerHeight: string;

  color: string;
  backgroundColor: string;

  zIndex: number;

  subtleBackgroundColor: string;
  subtleForegroundColor: string;
  subtleBorderColor: string;
}

export const tooltipContentVariables = (siteVars: any): TooltipContentVariables => ({
  boxShadow: siteVars.shadow8,

  borderRadius: siteVars.borderRadiusMedium,
  borderColor: 'transparent',
  borderSize: '0px',
  borderStyle: 'none',
  padding: `${pxToRem(5)} ${pxToRem(12)} ${pxToRem(7)} ${pxToRem(12)}`,

  maxWidth: pxToRem(240),

  svgPointer: true,
  pointerMargin: pxToRem(6),
  pointerGap: pxToRem(5),
  pointerWidth: pxToRem(16),
  pointerHeight: pxToRem(6),
  color: siteVars.colorScheme.default.foreground3,
  backgroundColor: siteVars.colors.grey[500],
  subtleBackgroundColor: siteVars.colorScheme.default.background,
  subtleForegroundColor: siteVars.colorScheme.default.foreground,
  subtleBorderColor: siteVars.colorScheme.onyx.border1,
  zIndex: siteVars.zIndexes.overlayPriority,
});
