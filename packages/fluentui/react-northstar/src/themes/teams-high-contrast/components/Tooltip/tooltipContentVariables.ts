import { TooltipContentVariables } from '../../../teams/components/Tooltip/tooltipContentVariables';

export const tooltipContentVariables = (siteVars): Partial<TooltipContentVariables> => ({
  boxShadow: undefined,
  color: siteVars.colors.white,
  backgroundColor: siteVars.colors.black,
  subtleBackgroundColor: siteVars.colors.black,
  subtleForegroundColor: siteVars.colors.white,
});
