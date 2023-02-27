import { pxToRem } from '../../../../utils';

export interface ChatMessageReadStatusVariables {
  bottomPosition?: string;
  bottomPositionCompact: string;
  color?: string;
  rightPosition?: string;
}

export const chatMessageReadStatusVariables = (siteVars): ChatMessageReadStatusVariables => ({
  bottomPosition: '0',
  bottomPositionCompact: pxToRem(-1), // Offset border around compact message
  color: siteVars.colorScheme.brand.foreground1,
  rightPosition: pxToRem(-17),
});
