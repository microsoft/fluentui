import * as React from 'react';
import type { ActiveDescendantImperativeRef } from '@fluentui/react-aria';
import type { ComboboxBaseContextValues, ComboboxBaseState } from '../utils/ComboboxBase.types';

export function useComboboxContextValues(
  state: ComboboxBaseState & { activeDescendantController: ActiveDescendantImperativeRef },
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
    // eslint-disable-next-line @typescript-eslint/naming-convention, deprecation/deprecation
    activeOption: UNSAFE_activeOption,
    // eslint-disable-next-line @typescript-eslint/naming-convention, deprecation/deprecation
    setActiveOption: UNSAFE_setActiveOption,
  } = state;

  const combobox = {
    activeOption: UNSAFE_activeOption,
    appearance,
    focusVisible: false,
    open,
    registerOption,
    selectedOptions,
    selectOption,
    setActiveOption: UNSAFE_setActiveOption,
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
