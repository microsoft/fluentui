import * as React from 'react';
import { ActiveDescendantImperativeRef } from '@fluentui/react-aria';
import { ComboboxBaseContextValues, ComboboxBaseState } from '../utils/ComboboxBase.types';

export function useComboboxContextValues(
  state: ComboboxBaseState & { activeDescendantController: ActiveDescendantImperativeRef },
): ComboboxBaseContextValues {
  const { appearance, open, registerOption, selectedOptions, selectOption, setOpen, size, activeDescendantController } =
    state;

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

  const activeDescendant = React.useMemo(
    () => ({
      controller: activeDescendantController,
    }),
    [activeDescendantController],
  );

  return { combobox, activeDescendant };
}
