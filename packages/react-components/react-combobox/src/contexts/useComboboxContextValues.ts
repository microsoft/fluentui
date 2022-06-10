import { ComboboxContextValues, ComboboxState } from '../components/Combobox/Combobox.types';

export function useComboboxContextValues(state: ComboboxState): ComboboxContextValues {
  const { activeOption, appearance, onOptionClick, open, registerOption, selectedOptions, size } = state;

  const combobox = {
    activeOption,
    appearance,
    open,
    onOptionClick,
    registerOption,
    selectedOptions,
    size,
  };

  return { combobox };
}
