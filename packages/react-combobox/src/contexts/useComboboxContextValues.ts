import { ComboboxContextValues, ComboboxState } from '../components/Combobox/Combobox.types';

export function useComboboxContextValues(state: ComboboxState): ComboboxContextValues {
  const { activeOption, idBase, onOptionClick, open, registerOption, selectedOptions } = state;

  const combobox = {
    activeOption,
    idBase,
    open,
    onOptionClick,
    registerOption,
    selectedOptions,
  };

  return { combobox };
}
