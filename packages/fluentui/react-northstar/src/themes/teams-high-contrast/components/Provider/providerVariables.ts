import { ProviderVariables } from '../../../teams/components/Provider/providerVariables';

export default (siteVariables): Partial<ProviderVariables> => ({
  scrollbarThumbBackgroundColor: siteVariables.colors.white,
  scrollbarThumbHoverBackgroundColor: siteVariables.colors.white,
});
