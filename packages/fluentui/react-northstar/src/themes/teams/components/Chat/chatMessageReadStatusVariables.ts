import { pxToRem } from '../../../../utils';

export interface ChatMessageReadStatusVariables {
  rightPoistion?: string;
  bottomPoistion?: string;
}

export const chatMessageReadStatusVariables = (siteVars): ChatMessageReadStatusVariables => ({
  rightPoistion: pxToRem(-24),
  bottomPoistion: pxToRem(0),
});
