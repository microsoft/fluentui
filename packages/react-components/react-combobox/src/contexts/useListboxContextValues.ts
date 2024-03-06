import * as React from 'react';
import { useHasParentContext } from '@fluentui/react-context-selector';
import { ListboxContextValues, ListboxState } from '../components/Listbox/Listbox.types';
import { ListboxContext, useListboxContext_unstable } from './ListboxContext';

export function useListboxContextValues(state: ListboxState): ListboxContextValues {
  const hasListboxContext = useHasParentContext(ListboxContext);
  const { multiselect, registerOption, selectedOptions, selectOption, activeDescendantController } = state;

  // get register/unregister functions from parent combobox context
  const parentRegisterOption = useListboxContext_unstable(ctx => ctx.registerOption);
  const onOptionClick = useListboxContext_unstable(ctx => ctx.onOptionClick);

  const registerOptionValue = hasListboxContext ? parentRegisterOption : registerOption;

  const listbox = {
    activeOption: undefined,
    focusVisible: false,
    multiselect,
    registerOption: registerOptionValue,
    selectedOptions,
    selectOption,
    setActiveOption: () => undefined,
    onOptionClick,
  };

  const activeDescendant = React.useMemo(
    () => ({
      controller: activeDescendantController,
    }),
    [activeDescendantController],
  );

  return { listbox, activeDescendant };
}
