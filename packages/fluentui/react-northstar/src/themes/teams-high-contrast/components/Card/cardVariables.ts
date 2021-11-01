import { CardVariables } from '../../../teams/components/Card/cardVariables';

export const cardVariables = (siteVars: any): Partial<CardVariables> => {
  return {
    backgroundColorHover: 'trasnparent',
    borderColorHover: siteVars.accessibleCyan,
  };
};
