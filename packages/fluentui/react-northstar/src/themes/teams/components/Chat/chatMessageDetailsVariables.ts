import { pxToRem } from '../../../../utils';

export interface ChatMessageDetailsVariables {
  detailsColor: string;
  detailsHoverColor: string;
  detailsColorMine: string;
  detailsHoverColorMine: string;
  detailsFontSize: string;
  detailsMargin: string;
}

export const chatMessageDetailsVariables = (siteVars): ChatMessageDetailsVariables => ({
  detailsColor: siteVars.colors.grey[350],
  detailsHoverColor: siteVars.colors.grey[500],
  detailsColorMine: siteVars.colors.grey[500],
  detailsHoverColorMine: siteVars.colors.grey[500],
  detailsFontSize: siteVars.fontSizes.small,
  detailsMargin: pxToRem(12),
});
