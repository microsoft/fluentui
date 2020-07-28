import { pxToRem } from '../../../../utils';

export interface ChatItemVariables {
  margin: string;
  gutterMargin: string;
  messageMargin: string;
}

export const chatItemVariables = (): ChatItemVariables => ({
  margin: pxToRem(8),
  gutterMargin: pxToRem(10),
  messageMargin: pxToRem(40),
});
