import { CardVariables } from '../../../teams/components/Card/cardVariables';

export const cardVariables = (siteVars: any): Partial<CardVariables> => {
  return {
    backgroundColorHover: 'trasnparent',
    borderColor: siteVars.colors.white,
    borderColorHover: siteVars.accessibleCyan,
  };
};
