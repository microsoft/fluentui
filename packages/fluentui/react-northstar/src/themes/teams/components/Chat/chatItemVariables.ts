import { pxToRem } from '../../../../utils';

export interface ChatItemVariables {
  margin: string;
  gutterMargin: string;
  gutterMarginCompact: string;
  messageMargin: string;
  messageMarginCompact: string;
  messageMarginEndCompact: string;
}

export const chatItemVariables = (): ChatItemVariables => ({
  margin: pxToRem(8),
  gutterMargin: pxToRem(10),
  gutterMarginCompact: pxToRem(2),
  messageMargin: pxToRem(40),
  messageMarginCompact: pxToRem(56),
  messageMarginEndCompact: pxToRem(16),
});
