import { ComboboxContextValues, ComboboxState } from '../components/Combobox/Combobox.types';

export function useComboboxContextValues(state: ComboboxState): ComboboxContextValues {
  const {
    activeOption,
    idBase,
    onListboxClick,
    onListboxMouseDown,
    onOptionClick,
    onTriggerBlur,
    onTriggerClick,
    onTriggerKeyDown,
    open,
    popperContainerRef,
    registerOption,
    selectedOptions,
    triggerRef,
    value,
  } = state;

  const combobox = {
    activeOption,
    idBase,
    open,
    onListboxClick,
    onListboxMouseDown,
    onOptionClick,
    onTriggerBlur,
    onTriggerClick,
    onTriggerKeyDown,
    popperContainerRef,
    registerOption,
    selectedOptions,
    triggerRef,
    value,
  };

  return { combobox };
}
