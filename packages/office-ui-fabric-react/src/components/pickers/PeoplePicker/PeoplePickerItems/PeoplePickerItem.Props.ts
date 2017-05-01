import { IPersonaProps } from '../../../../Persona';
import { IPickerItemProps } from '../../PickerItem.Props';
import { IContextualMenuItem } from '../../../../ContextualMenu';
export interface IPeoplePickerItemProps extends IPickerItemProps <IPersonaProps> {
}

export interface IPeoplePickerItemWithMenuProps extends IPickerItemProps<IPersonaWithMenu> {
  item: IPersonaWithMenu;
}

export interface IPersonaWithMenu extends IPersonaProps {
  menuItems?: IContextualMenuItem[];
}