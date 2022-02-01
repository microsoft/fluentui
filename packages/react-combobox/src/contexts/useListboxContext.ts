import { useContextSelector, useHasParentContext } from '@fluentui/react-context-selector';
import { ListboxContextValues } from './ListboxContext';
import { ListboxState } from '../components/Listbox/Listbox.types';
import { ComboboxContext } from './ComboboxContext';
import { useOptionGroupContextValues } from './useOptionGroupContext';

export function useListboxContextValues(state: ListboxState): ListboxContextValues {
  const hasComboboxContext = useHasParentContext(ComboboxContext);
  const { optionGroup } = useOptionGroupContextValues(state);
  const { activeId, onOptionClick, selectedKeys } = state;
  const comboboxContextValues = useContextSelector(ComboboxContext, ctx => ({
    registerOption: ctx.registerOption,
    unRegisterOption: ctx.unRegisterOption,
  }));

  const listbox = {
    activeId,
    ...optionGroup,
    onOptionClick,
    selectedKeys,
    ...(hasComboboxContext ? comboboxContextValues : {}),
  };

  return { listbox };
}
