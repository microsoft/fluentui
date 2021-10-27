import { pxToRem } from '../../../../utils';

export interface ChatMessageReadStatusVariables {
  bottomPosition?: string;
  bottomPositionCompact: string;
  rightPosition?: string;
  rightPositionCompact: string;
}

export const chatMessageReadStatusVariables = (siteVars): ChatMessageReadStatusVariables => ({
  bottomPosition: pxToRem(0),
  bottomPositionCompact: pxToRem(2),
  rightPosition: pxToRem(-24),
  rightPositionCompact: pxToRem(-16),
});
