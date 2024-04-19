// eslint-disable-next-line deprecation/deprecation
export { ComboboxProvider } from './contexts/ComboboxContext';
export type { ComboboxContextValue } from './contexts/ComboboxContext';
export { ListboxProvider, useListboxContext_unstable } from './contexts/ListboxContext';
export type { ListboxContextValue } from './contexts/ListboxContext';
export { useComboboxContextValues } from './contexts/useComboboxContextValues';
export { useListboxContextValues } from './contexts/useListboxContextValues';
export {
  Listbox,
  listboxClassNames,
  renderListbox_unstable,
  useListboxStyles_unstable,
  useListbox_unstable,
} from './Listbox';
export type { ListboxContextValues, ListboxProps, ListboxSlots, ListboxState } from './Listbox';
export {
  Option,
  optionClassNames,
  renderOption_unstable,
  useOptionStyles_unstable,
  useOption_unstable,
} from './Option';
export type { OptionProps, OptionSlots, OptionState } from './Option';
export {
  Combobox,
  comboboxClassNames,
  renderCombobox_unstable,
  useComboboxStyles_unstable,
  useCombobox_unstable,
} from './Combobox';
export type {
  ComboboxContextValues,
  ComboboxOpenChangeData,
  ComboboxOpenEvents,
  ComboboxProps,
  ComboboxSlots,
  ComboboxState,
} from './Combobox';
export {
  Dropdown,
  dropdownClassNames,
  renderDropdown_unstable,
  useDropdownStyles_unstable,
  useDropdown_unstable,
} from './Dropdown';
export type {
  DropdownContextValues,
  DropdownOpenChangeData,
  DropdownOpenEvents,
  DropdownProps,
  DropdownSlots,
  DropdownState,
} from './Dropdown';
export {
  OptionGroup,
  optionGroupClassNames,
  renderOptionGroup_unstable,
  useOptionGroupStyles_unstable,
  useOptionGroup_unstable,
} from './OptionGroup';
export type { OptionGroupProps, OptionGroupSlots, OptionGroupState } from './OptionGroup';
export type { OptionOnSelectData, SelectionEvents } from './Selection';

export { useComboboxFilter } from './hooks/useComboboxFilter';

// internals splitting the combobox logic into state hook and slot hooks
export { useComboboxBaseState } from './utils/useComboboxBaseState';
export { useButtonTriggerSlot } from './components/Dropdown/useButtonTriggerSlot';
export { useInputTriggerSlot } from './components/Combobox/useInputTriggerSlot';
export { useListboxSlot } from './utils/useListboxSlot';
export type { ComboboxBaseState, ComboboxBaseProps } from './utils/ComboboxBase.types';
