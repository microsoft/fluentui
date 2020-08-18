import { pxToRem } from '../../../../utils';

export interface ChatMessageReadStatusIndicatorVariables {
  readStatusIndicatorRightPoistion?: string;
  readStatusIndicatorBottomPoistion?: string;
}

export const chatMessageReadStatusIndicatorVariables = (siteVars): ChatMessageReadStatusIndicatorVariables => ({
  readStatusIndicatorRightPoistion: pxToRem(-24),
  readStatusIndicatorBottomPoistion: pxToRem(0),
});
