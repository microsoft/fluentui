import { DropdownVariables } from '../../../teams/components/Dropdown/dropdownVariables';

export default (siteVars): Partial<DropdownVariables> => ({
  backgroundColor: siteVars.colors.grey[650],
  backgroundColorHover: siteVars.colors.grey[550],
  borderColor: 'transparent',
  borderColorFocus: siteVars.colors.brand[400],
  color: siteVars.colors.grey[250],
  selectedItemColor: siteVars.colors.grey[250],
  listBackgroundColor: siteVars.colors.grey[650],
  listItemBackgroundColor: siteVars.colors.grey[650],
  listItemColorHover: siteVars.colors.white,
  listItemContentColor: siteVars.colors.grey[300],
  listItemHeaderColor: siteVars.colors.white,
  listItemBackgroundColorHover: siteVars.colors.grey[550],
  listItemBackgroundColorActive: siteVars.colors.grey[550],
  listItemColorActive: siteVars.colors.white,
  selectedItemBackgroundColor: siteVars.colors.grey[650],
  selectedItemColorFocus: siteVars.colors.grey[700], // check this value
  listItemSelectedColor: siteVars.colors.white,
  selectedItemBackgroundColorFocus: siteVars.colors.brand[200],
  // disabled state
  disabledBorderColorHover: 'transparent',
  disabledTriggerColorHover: siteVars.colors.grey[250],
  disabledBackgroundColorHover: siteVars.colors.grey[650],
});
