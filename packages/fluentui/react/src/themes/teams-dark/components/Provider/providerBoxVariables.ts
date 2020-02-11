import { ProviderBoxVariables } from '../../../teams/components/Provider/providerBoxVariables'

export default (siteVariables): Partial<ProviderBoxVariables> => ({
  scrollbarThumbBackgroundColor: siteVariables.colors.grey[450],
  scrollbarThumbHoverBackgroundColor: siteVariables.colors.grey[400],
})
