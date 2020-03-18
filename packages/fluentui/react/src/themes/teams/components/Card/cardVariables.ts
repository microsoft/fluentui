import { pxToRem } from '../../../../utils';

export interface TeamsCardVariables {
  cardPadding: string;
  cardChildMarginBottom: string;
  topControlsTop: string;
  topControlsRight: string;
}

export default (siteVariables): Partial<TeamsCardVariables> => {
  return {
    cardPadding: pxToRem(10),
    cardChildMarginBottom: pxToRem(10),
    topControlsTop: pxToRem(10),
    topControlsRight: pxToRem(0)
  };
};
