import { DropdownVariables } from '../../../teams/components/Dropdown/dropdownVariables';
import { pxToRem } from '../../../../utils';

export interface DropdownVariablesHC extends DropdownVariables {
  borderColorHover: string;
}

export default (siteVars): Partial<DropdownVariablesHC> => ({
  borderColor: siteVars.colorScheme.default.border,
  borderColorFocus: siteVars.colorScheme.default.borderFocus,
  borderColorHover: siteVars.colorScheme.default.borderHover,
  borderWidth: pxToRem(1),
  listBorderColor: siteVars.colors.white,
  listBoxShadow: undefined,
  listBorderWidth: pxToRem(1),
  listItemSelectedColor: siteVars.accessibleCyan,
  selectedItemBorder: `${pxToRem(1)} solid ${siteVars.colors.white}`
});
