import * as React from 'react';
import { ComboboxState } from '../Combobox';
import type { ComboboxBaseContextValues, ComboboxBaseState } from '../utils/ComboboxBase.types';

export function useComboboxContextValues(
  state: Omit<ComboboxBaseState, 'freeform'> & Pick<ComboboxState, 'activeDescendantController'>,
): ComboboxBaseContextValues {
  const {
    appearance,
    open,
    getOptionById,
    getOptionsMatchingValue,
    registerOption,
    selectedOptions,
    selectOption,
    setOpen,
    size,
    activeDescendantController,
    onOptionClick,
    onActiveDescendantChange,
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
    getOptionById,
    getOptionsMatchingValue,
    registerOption,
    selectedOptions,
    selectOption,
    setActiveOption: () => null,
    onOptionClick,
    onActiveDescendantChange,
  };

  const activeDescendant = React.useMemo(
    () => ({
      controller: activeDescendantController,
    }),
    [activeDescendantController],
  );

  return { combobox, activeDescendant, listbox };
}
