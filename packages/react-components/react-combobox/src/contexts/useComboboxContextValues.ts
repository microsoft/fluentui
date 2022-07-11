import { ComboboxBaseContextValues, ComboboxBaseState } from '../utils/ComboboxBase.types';

export function useComboboxContextValues(state: ComboboxBaseState): ComboboxBaseContextValues {
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
