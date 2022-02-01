import { ComboboxContextValues } from './ComboboxContext';
import { ComboboxState } from '../components/Combobox/Combobox.types';
import { useOptionGroupContextValues } from './useOptionGroupContext';

export function useComboboxContextValues(state: ComboboxState): ComboboxContextValues {
  const { optionGroup } = useOptionGroupContextValues(state);
  const { activeId, onOptionClick, open, selectedKeys } = state;

  const combobox = {
    activeId,
    ...optionGroup,
    open,
    onOptionClick,
    selectedKeys,
  };

  return { combobox };
}
