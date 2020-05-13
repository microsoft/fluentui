export interface DropdownSelectedItemSlotClassNames {
  header: string;
  icon: string;
  image: string;
}

export const dropdownSelectedItemClassName = 'ui-dropdown__selecteditem';
export const dropdownSelectedItemSlotClassNames: DropdownSelectedItemSlotClassNames = {
  header: `${dropdownSelectedItemClassName}__header`,
  icon: `${dropdownSelectedItemClassName}__icon`,
  image: `${dropdownSelectedItemClassName}__image`,
};
