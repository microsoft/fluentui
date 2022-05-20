import { pxToRem } from '../../../../utils';
import { TooltipContentVariables } from '../../../teams/components/Tooltip/tooltipContentVariables';

export const tooltipContentVariables = (siteVars): Partial<TooltipContentVariables> => ({
  boxShadow: undefined,
  color: siteVars.colors.white,
  backgroundColor: siteVars.colors.black,
  borderColor: siteVars.colors.white,
  borderStyle: 'solid',
  subtleBackgroundColor: siteVars.colors.black,
  subtleForegroundColor: siteVars.colors.white,
  svgPointer: false,
  pointerMargin: pxToRem(10),
  pointerHeight: pxToRem(7),
  pointerWidth: pxToRem(14),
});
