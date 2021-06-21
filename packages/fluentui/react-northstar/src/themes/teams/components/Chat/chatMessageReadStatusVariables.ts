import { pxToRem } from '../../../../utils';

export interface ChatMessageReadStatusVariables {
  rightPoistion?: string;
  rightPositionCompact: string;
  bottomPoistion?: string;
  bottomPositionCompact: string;
}

export const chatMessageReadStatusVariables = (siteVars): ChatMessageReadStatusVariables => ({
  rightPoistion: pxToRem(-24),
  rightPositionCompact: pxToRem(-16),
  bottomPoistion: pxToRem(0),
  bottomPositionCompact: pxToRem(2),
});
