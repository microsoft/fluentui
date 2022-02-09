import { ComboboxContextValues } from './ComboboxContext';
import { ComboboxState } from '../components/Combobox/Combobox.types';

export function useComboboxContextValues(state: ComboboxState): ComboboxContextValues {
  const { activeOption, idBase, onOptionClick, open, registerOption, selectedKeys, unRegisterOption } = state;

  const combobox = {
    activeOption,
    idBase,
    open,
    onOptionClick,
    registerOption,
    selectedKeys,
    unRegisterOption,
  };

  return { combobox };
}
