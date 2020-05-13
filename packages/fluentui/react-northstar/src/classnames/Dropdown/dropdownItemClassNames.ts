export interface DropdownItemSlotClassNames {
  content: string;
  header: string;
  image: string;
  checkableIndicator: string;
  main: string;
}

export const dropdownItemClassName = 'ui-dropdown__item';
export const dropdownItemSlotClassNames: DropdownItemSlotClassNames = {
  main: `${dropdownItemClassName}__main`,
  content: `${dropdownItemClassName}__content`,
  header: `${dropdownItemClassName}__header`,
  image: `${dropdownItemClassName}__image`,
  checkableIndicator: `${dropdownItemClassName}__checkable-indicator`,
};
