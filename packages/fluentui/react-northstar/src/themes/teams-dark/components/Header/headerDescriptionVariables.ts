import { HeaderDescriptionVariables } from '../../../teams/components/Header/headerDescriptionVariables';

export const headerDescriptionVariables = (siteVariables: any): Partial<HeaderDescriptionVariables> => ({
  color: siteVariables.colors.grey[250],
});
