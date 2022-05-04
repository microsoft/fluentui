import { ComboboxContextValues, ComboboxState } from '../components/Combobox/Combobox.types';

export function useComboboxContextValues(state: ComboboxState): ComboboxContextValues {
  const { activeOption, appearance, idBase, onOptionClick, open, registerOption, selectedOptions, size } = state;

  const combobox = {
    activeOption,
    appearance,
    idBase,
    open,
    onOptionClick,
    registerOption,
    selectedOptions,
    size,
  };

  return { combobox };
}
