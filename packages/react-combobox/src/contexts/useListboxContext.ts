import { useContextSelector, useHasParentContext } from '@fluentui/react-context-selector';
import { ListboxContextValues } from './ListboxContext';
import { ListboxState } from '../components/Listbox/Listbox.types';
import { ComboboxContext } from './ComboboxContext';

export function useListboxContextValues(state: ListboxState): ListboxContextValues {
  const hasComboboxContext = useHasParentContext(ComboboxContext);
  const { activeOption, onOptionClick, registerOption, selectedKeys, unRegisterOption } = state;
  const comboboxContextValues = useContextSelector(ComboboxContext, ctx => ({
    registerOption: ctx.registerOption,
    unRegisterOption: ctx.unRegisterOption,
  }));
  const standaloneContextValues = {
    registerOption,
    unRegisterOption,
  };

  const listbox = {
    activeOption,
    onOptionClick,
    selectedKeys,
    ...(hasComboboxContext ? comboboxContextValues : standaloneContextValues),
  };

  return { listbox };
}
