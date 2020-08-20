import { pxToRem } from '../../../../utils';

export interface ChatMessageReadStatusVariables {
  readStatusIndicatorRightPoistion?: string;
  readStatusIndicatorBottomPoistion?: string;
}

export const chatMessageReadStatusVariables = (siteVars): ChatMessageReadStatusVariables => ({
  readStatusIndicatorRightPoistion: pxToRem(-24),
  readStatusIndicatorBottomPoistion: pxToRem(0),
});
