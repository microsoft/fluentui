import { DividerVariables } from '../../../teams/components/Divider/dividerVariables';

export default (siteVars: any): Partial<DividerVariables> => ({
  dividerColor: siteVars.colors.white,
  textColor: siteVars.colors.white,
});
