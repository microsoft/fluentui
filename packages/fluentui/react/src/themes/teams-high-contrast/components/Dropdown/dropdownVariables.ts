import { DropdownVariables } from '../../../teams/components/Dropdown/dropdownVariables';
import { pxToRem } from '../../../../utils';

export interface DropdownVariablesHC extends DropdownVariables {
  borderColorHover: string;
}
export default (siteVars): Partial<DropdownVariablesHC> => ({
  backgroundColor: siteVars.colors.black,
  borderColor: siteVars.colors.white,
  borderWidth: `1px`,
  backgroundColorHover: siteVars.colors.black,
  borderColorHover: siteVars.accessibleYellow,
  borderColorFocus: siteVars.accessibleCyan,
  color: siteVars.colors.white,
  selectedItemColor: siteVars.colors.white,
  listBackgroundColor: siteVars.colors.black,
  listBorderColor: siteVars.colors.white,
  listBoxShadow: undefined,
  listBorderWidth: '1px',
  listItemFocusBorderWidth: pxToRem(2),
  listItemHeaderColor: siteVars.colors.white,
  listItemContentColor: siteVars.colors.white,
  listItemBackgroundColor: siteVars.colors.black,
  listItemColorHover: siteVars.colors.black,
  listItemBackgroundColorHover: siteVars.accessibleYellow,
  listItemBackgroundColorActive: siteVars.accessibleYellow,
  listItemColorActive: siteVars.colors.black,
  listItemSelectedColor: siteVars.accessibleCyan,
  selectedItemBackgroundColor: siteVars.colors.black,
  selectedItemColorFocus: siteVars.colors.black,
  selectedItemBackgroundColorFocus: siteVars.accessibleYellow,
  triggerButtonColorHover: siteVars.colors.white
});
