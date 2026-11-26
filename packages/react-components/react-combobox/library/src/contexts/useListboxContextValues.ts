'use client';

import * as React from 'react';
import { useHasParentContext } from '@fluentui/react-context-selector';
import type { ListboxContextValues, ListboxState } from '../components/Listbox/Listbox.types';
import { ListboxContext, useListboxContext_unstable } from './ListboxContext';

export function useListboxContextValues(state: ListboxState): ListboxContextValues {
  const hasListboxContext = useHasParentContext(ListboxContext);
  const {
    getOptionById,
    getOptionsMatchingValue,
    multiselect,
    registerOption,
    selectedOptions,
    selectOption,
    activeDescendantController,
  } = state;

  // get register/unregister functions from parent combobox context
  const parentRegisterOption = useListboxContext_unstable(ctx => ctx.registerOption);
  const disabled = useListboxContext_unstable(ctx => ctx.disabled);
  const onOptionClick = useListboxContext_unstable(ctx => ctx.onOptionClick);
  const onActiveDescendantChange = useListboxContext_unstable(ctx => ctx.onActiveDescendantChange);

  const registerOptionValue = hasListboxContext ? parentRegisterOption : registerOption;

  const listbox = {
    disabled,
    activeOption: undefined,
    focusVisible: false,
    getOptionById,
    getOptionsMatchingValue,
    multiselect,
    registerOption: registerOptionValue,
    selectedOptions,
    selectOption,
    setActiveOption: () => undefined,
    onOptionClick,
    onActiveDescendantChange,
  };

  const activeDescendant = React.useMemo(
    () => ({
      controller: activeDescendantController,
    }),
    [activeDescendantController],
  );

  return { listbox, activeDescendant };
}
