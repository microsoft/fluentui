import * as React from 'react';
import { ComboboxState } from '../Combobox';
import { ComboboxBaseContextValues, ComboboxBaseState } from '../utils/ComboboxBase.types';

export function useComboboxContextValues(
  state: ComboboxBaseState & Pick<ComboboxState, 'activeDescendantController'>,
): ComboboxBaseContextValues {
  const {
    activeOption,
    appearance,
    open,
    registerOption,
    selectedOptions,
    selectOption,
    setActiveOption,
    setOpen,
    size,
    activeDescendantController,
  } = state;

  const combobox = {
    activeOption,
    appearance,
    focusVisible: false,
    open,
    registerOption,
    selectedOptions,
    selectOption,
    setActiveOption,
    setOpen,
    size,
  };

  const activeDescendant = React.useMemo(
    () => ({
      controller: activeDescendantController,
    }),
    [activeDescendantController],
  );

  return { combobox, activeDescendant };
}
