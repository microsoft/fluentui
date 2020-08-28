import { DividerVariables } from '../../../teams/components/Divider/dividerVariables';

export const dividerVariables = (siteVars: any): Partial<DividerVariables> => ({
  dividerColor: siteVars.colors.white,
  textColor: siteVars.colors.white,
});
