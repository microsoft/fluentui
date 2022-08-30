import { pxToRem } from '../../../../utils';

export interface ChatItemVariables {
  gutterMargin: string;
  gutterMarginCompact: string;
  gutterMarginComfyRefresh: string;
  margin: string;
  messageMargin: string;
  messageMarginCompact: string;
  messageMarginEndCompact: string;
}

export const chatItemVariables = (): ChatItemVariables => ({
  gutterMargin: pxToRem(10),
  gutterMarginCompact: pxToRem(2),
  gutterMarginComfyRefresh: pxToRem(22),
  margin: pxToRem(8),
  messageMargin: pxToRem(40),
  messageMarginCompact: pxToRem(56),
  messageMarginEndCompact: pxToRem(16),
});
