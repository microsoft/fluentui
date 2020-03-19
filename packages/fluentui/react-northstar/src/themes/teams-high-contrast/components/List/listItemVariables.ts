import { ListItemVariables } from '../../../teams/components/List/listItemVariables';

export default (siteVars: any): Partial<ListItemVariables> => ({
  selectedColor: siteVars.colors.black,
  selectedBackgroundColor: siteVars.accessibleCyan,

  selectableFocusHoverBackgroundColor: siteVars.accessibleCyan,
  selectableFocusHoverColor: siteVars.colors.black,
});
