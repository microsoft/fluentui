import { ComboboxContextValues } from './ComboboxContext';
import { ComboboxState } from '../components/Combobox/Combobox.types';
import { useOptionGroupContextValues } from './useOptionGroupContext';

export function useComboboxContextValues(state: ComboboxState): ComboboxContextValues {
  const { optionGroup } = useOptionGroupContextValues(state);
  const { activeOption, onOptionClick, open, selectedKeys } = state;

  const combobox = {
    activeOption,
    ...optionGroup,
    open,
    onOptionClick,
    selectedKeys,
  };

  return { combobox };
}
