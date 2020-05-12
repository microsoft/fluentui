import { DropdownVariables } from '../../../teams/components/Dropdown/dropdownVariables';

export default (siteVars: any): Partial<DropdownVariables> => ({
  loadingMessageBackgroundColor: siteVars.colors.dark,
  noResultsMessageBackgroundColor: siteVars.colors.dark,
});
