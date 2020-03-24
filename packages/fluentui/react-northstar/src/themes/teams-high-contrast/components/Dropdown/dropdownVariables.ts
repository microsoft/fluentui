import { DropdownVariables } from '../../../teams/components/Dropdown/dropdownVariables';
import { pxToRem } from '../../../../utils';

export default (siteVars): Partial<DropdownVariables> => ({
  borderColor: siteVars.colorScheme.default.border,
  borderColorFocus: siteVars.colors.white,
  borderColorHover: siteVars.colorScheme.default.borderHover,
  borderWidth: pxToRem(1),
  listBorderColor: siteVars.colors.white,
  listBoxShadow: undefined,
  listBorderWidth: pxToRem(1),
  listItemSelectedColor: siteVars.accessibleCyan,
  selectedItemBorder: `${pxToRem(1)} solid ${siteVars.colors.white}`,
  // disabled state
  disabledBorderColorHover: siteVars.colors.white,
  disabledTriggerColorHover: siteVars.colors.white,
  disabledBackgroundColorHover: siteVars.colors.black,
});
