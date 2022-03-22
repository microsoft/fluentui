import { ComboboxContextValues } from './ComboboxContext';
import { ComboboxState } from '../components/Combobox/Combobox.types';

export function useComboboxContextValues(state: ComboboxState): ComboboxContextValues {
  const { activeOption, idBase, onOptionClick, open, registerOption, selectedOptions, unRegisterOption } = state;

  const combobox = {
    activeOption,
    idBase,
    open,
    onOptionClick,
    registerOption,
    selectedOptions,
    unRegisterOption,
  };

  return { combobox };
}
