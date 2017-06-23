import { IPersonaProps } from '../../../../Persona';
import { IPickerItemProps } from '../../PickerItem.Props';
import { IContextualMenuItem } from '../../../../ContextualMenu';
import { validationState } from '../../BasePicker.Props';
export interface IPeoplePickerItemProps extends IPickerItemProps<IPersonaProps & { validationState: validationState }> {
}

export interface IPeoplePickerItemWithMenuProps extends IPickerItemProps<IPersonaWithMenu> {
  item: IPersonaWithMenu;
}

export interface IPersonaWithMenu extends IPersonaProps {
  menuItems?: IContextualMenuItem[];
}