import { ComboboxContextValues, ComboboxBaseState } from '../ComboboxBase/ComboboxBase.types';

export function useComboboxContextValues(state: ComboboxBaseState): ComboboxContextValues {
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
