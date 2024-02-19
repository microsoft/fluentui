import * as React from 'react';
import { useContextSelector, useHasParentContext } from '@fluentui/react-context-selector';
import { ListboxContextValues, ListboxState } from '../components/Listbox/Listbox.types';
import { ComboboxContext } from './ComboboxContext';

export function useListboxContextValues(state: ListboxState): ListboxContextValues {
  const hasComboboxContext = useHasParentContext(ComboboxContext);
  const { multiselect, registerOption, selectedOptions, selectOption, activeDescendantController } = state;

  // get register/unregister functions from parent combobox context
  const comboboxRegisterOption = useContextSelector(ComboboxContext, ctx => ctx.registerOption);

  const registerOptionValue = hasComboboxContext ? comboboxRegisterOption : registerOption;

  const listbox = {
    activeOption: undefined,
    focusVisible: false,
    multiselect,
    registerOption: registerOptionValue,
    selectedOptions,
    selectOption,
    setActiveOption: () => undefined,
  };

  const activeDescendant = React.useMemo(
    () => ({
      controller: activeDescendantController,
    }),
    [activeDescendantController],
  );

  return { listbox, activeDescendant };
}
