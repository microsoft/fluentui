import { ProviderVariables } from '../../../teams/components/Provider/providerVariables';

export const providerVariables = (siteVariables): Partial<ProviderVariables> => ({
  scrollbarThumbBackgroundColor: siteVariables.colors.silver[500],
  scrollbarThumbHoverBackgroundColor: siteVariables.colors.silver[500],
});
