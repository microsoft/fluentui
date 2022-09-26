import { useContextSelector, useHasParentContext } from '@fluentui/react-context-selector';
import { ListboxContextValues, ListboxState } from '../components/Listbox/Listbox.types';
import { ComboboxContext } from './ComboboxContext';

export function useListboxContextValues(state: ListboxState): ListboxContextValues {
  const hasComboboxContext = useHasParentContext(ComboboxContext);
  const {
    activeOption,
    focusVisible,
    multiselect,
    registerOption,
    selectedOptions,
    selectOption,
    setActiveOption,
  } = state;

  // get register/unregister functions from parent combobox context
  const comboboxRegisterOption = useContextSelector(ComboboxContext, ctx => ctx.registerOption);

  const registerOptionValue = hasComboboxContext ? comboboxRegisterOption : registerOption;

  const listbox = {
    activeOption,
    focusVisible,
    multiselect,
    registerOption: registerOptionValue,
    selectedOptions,
    selectOption,
    setActiveOption,
  };

  return { listbox };
}
