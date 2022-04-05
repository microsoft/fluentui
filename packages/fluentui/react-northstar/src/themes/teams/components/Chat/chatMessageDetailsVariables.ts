import { pxToRem } from '../../../../utils';

export interface ChatMessageDetailsVariables {
  detailsColor: string;
  detailsFontSize: string;
  detailsMargin: string;
}

export const chatMessageDetailsVariables = (siteVars): ChatMessageDetailsVariables => ({
  detailsColor: siteVars.colorScheme.default.foreground1,
  detailsFontSize: siteVars.fontSizes.small,
  detailsMargin: pxToRem(12),
});
