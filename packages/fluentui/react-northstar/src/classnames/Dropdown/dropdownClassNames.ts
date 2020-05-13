export interface DropdownSlotClassNames {
  clearIndicator: string;
  container: string;
  toggleIndicator: string;
  item: string;
  itemsList: string;
  searchInput: string;
  selectedItem: string;
  selectedItems: string;
  triggerButton: string;
}

export const dropdownClassName = 'ui-dropdown';
export const dropdownSlotClassNames: DropdownSlotClassNames = {
  clearIndicator: `${dropdownClassName}__clear-indicator`,
  container: `${dropdownClassName}__container`,
  toggleIndicator: `${dropdownClassName}__toggle-indicator`,
  item: `${dropdownClassName}__item`,
  itemsList: `${dropdownClassName}__items-list`,
  searchInput: `${dropdownClassName}__searchinput`,
  selectedItem: `${dropdownClassName}__selecteditem`,
  selectedItems: `${dropdownClassName}__selected-items`,
  triggerButton: `${dropdownClassName}__trigger-button`,
};
