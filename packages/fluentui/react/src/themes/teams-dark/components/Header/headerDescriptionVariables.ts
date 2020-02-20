import { HeaderDescriptionVariables } from '../../../teams/components/Header/headerDescriptionVariables';

export default (siteVariables: any): Partial<HeaderDescriptionVariables> => ({
  color: siteVariables.colors.grey[250],
});
