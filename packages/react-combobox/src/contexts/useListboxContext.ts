import { ListboxContextValues } from './ListboxContext';
import { ListboxState } from '../components/Listbox/Listbox.types';
import { useOptionGroupContextValues } from './useOptionGroupContext';

export function useListboxContextValues(state: ListboxState): ListboxContextValues {
  const { optionGroup } = useOptionGroupContextValues(state);
  const { activeId, onOptionClick, selectedKeys } = state;

  const listbox = {
    activeId,
    ...optionGroup,
    onOptionClick,
    selectedKeys,
  };

  return { listbox };
}
