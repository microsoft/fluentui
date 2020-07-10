import { ProviderVariables } from '../../../teams/components/Provider/providerVariables';

export const providerVariables = (siteVariables): Partial<ProviderVariables> => ({
  scrollbarThumbBackgroundColor: siteVariables.colors.grey[450],
  scrollbarThumbHoverBackgroundColor: siteVariables.colors.grey[400],
});
