import * as React from 'react';
import { ComboboxBaseContextValues, ComboboxBaseState } from '../utils/ComboboxBase.types';

export function useComboboxContextValues(state: ComboboxBaseState): ComboboxBaseContextValues {
  const {
    activeOption,
    appearance,
    focusVisible,
    open,
    registerOption,
    selectedOptions,
    selectOption,
    setActiveOption,
    setOpen,
    size,
    activeDescendantImperativeRef,
  } = state;

  const combobox = {
    activeOption,
    appearance,
    focusVisible,
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
      imperativeRef: activeDescendantImperativeRef,
    }),
    [activeDescendantImperativeRef],
  );

  return { combobox, activeDescendant };
}
