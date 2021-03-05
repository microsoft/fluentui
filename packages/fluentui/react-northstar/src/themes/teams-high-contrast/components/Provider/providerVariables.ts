import { ProviderVariables } from '../../../teams/components/Provider/providerVariables';

export const providerVariables = (siteVariables): Partial<ProviderVariables> => ({
  scrollbarThumbBackgroundColor: siteVariables.colors.white,
  scrollbarThumbHoverBackgroundColor: siteVariables.colors.white,
});
