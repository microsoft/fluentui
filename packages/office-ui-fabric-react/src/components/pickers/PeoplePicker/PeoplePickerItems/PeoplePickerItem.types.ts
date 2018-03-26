import { IPersonaProps } from '../../../../Persona';
import { IPickerItemProps } from '../../PickerItem.types';
import { IContextualMenuItem } from '../../../../ContextualMenu';
import { ValidationState } from '../../BasePicker.types';
export interface IPeoplePickerItemProps extends IPickerItemProps<IPersonaProps & { ValidationState: ValidationState }> {
}

export interface IPeoplePickerItemWithMenuProps extends IPickerItemProps<IPersonaWithMenu> {
  item: IPersonaWithMenu;
}

export interface IPersonaWithMenu extends IPersonaProps {
  menuItems?: IContextualMenuItem[];
}