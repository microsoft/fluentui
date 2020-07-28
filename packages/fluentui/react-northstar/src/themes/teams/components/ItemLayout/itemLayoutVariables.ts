import { pxToRem } from '../../../../utils';

export interface ItemLayoutVariables {
  paddingLeft: string;
  paddingRight: string;
  columnGap: string;

  height: string;
}

export const itemLayoutVariables = (): ItemLayoutVariables => ({
  paddingLeft: pxToRem(20),
  paddingRight: pxToRem(18),
  columnGap: pxToRem(8),
  height: pxToRem(48),
});
