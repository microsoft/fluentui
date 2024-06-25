import * as React from 'react';
import { PromptInputState } from '../PromptInput';
import { ComboboxBaseContextValues, ComboboxBaseState } from '../utils/ComboboxBase.types';

export function usePromptInputContextValues(
  state: Omit<ComboboxBaseState, 'appearance' | 'size' | 'setActiveOption'> &
    Pick<PromptInputState, 'activeDescendantController'>,
): ComboboxBaseContextValues {
  const {
    getOptionById,
    getOptionsMatchingValue,
    registerOption,
    selectedOptions,
    selectOption,
    activeDescendantController,
    onOptionClick,
    onActiveDescendantChange,
  } = state;
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

  return {
    combobox: {
      appearance: 'outline',
      open: false,
      setOpen: noop,
      size: 'medium',
      focusVisible: false,
      registerOption: nestedNoop,
      setActiveOption: noop,
      selectedOptions: [],
      selectOption: noop,
    },
    activeDescendant,
    listbox,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
const noop = (..._args: any): void => {};

const nestedNoop = () => noop;
