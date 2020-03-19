import { pxToRem } from '../../../../utils';

export interface CardVariables {
  cardPadding: string;
  cardChildMarginBottom: string;
  topControlsTop: string;
  topControlsRight: string;
}

export default (): Partial<CardVariables> => {
  return {
    cardPadding: pxToRem(10),
    cardChildMarginBottom: pxToRem(10),
    topControlsTop: pxToRem(10),
    topControlsRight: pxToRem(0)
  };
};
