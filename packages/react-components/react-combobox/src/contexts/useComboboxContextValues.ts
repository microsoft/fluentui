import * as React from 'react';
import { ComboboxState } from '../Combobox';
import type { ComboboxBaseContextValues, ComboboxBaseState } from '../utils/ComboboxBase.types';

export function useComboboxContextValues(
  state: ComboboxBaseState & Pick<ComboboxState, 'activeDescendantController'>,
): ComboboxBaseContextValues {
  const {
    appearance,
    open,
    registerOption,
    selectedOptions,
    selectOption,
    setOpen,
    size,
    activeDescendantController,
    onOptionClick,
  } = state;

  const combobox = {
    activeOption: undefined,
    appearance,
    focusVisible: false,
    open,
    registerOption,
    selectedOptions,
    selectOption,
    setActiveOption: () => null,
    setOpen,
    size,
  };

  const listbox = {
    activeOption: undefined,
    focusVisible: false,
    registerOption,
    selectedOptions,
    selectOption,
    setActiveOption: () => null,
    onOptionClick,
  };

  const activeDescendant = React.useMemo(
    () => ({
      controller: activeDescendantController,
    }),
    [activeDescendantController],
  );

  return { combobox, activeDescendant, listbox };
}
