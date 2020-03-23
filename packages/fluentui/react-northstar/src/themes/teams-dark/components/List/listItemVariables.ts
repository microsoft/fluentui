import { ListItemVariables } from '../../../teams/components/List/listItemVariables';

export default (siteVars: any): Partial<ListItemVariables> => ({
  selectableFocusHoverBackgroundColor: siteVars.colors.grey[500],
  selectedBackgroundColor: siteVars.colors.grey[500],
});
