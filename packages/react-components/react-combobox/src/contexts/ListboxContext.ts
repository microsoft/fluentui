import * as React from 'react';
import { ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import { ListboxState } from '../components/Listbox/Listbox.types';

/**
 * Context shared with all Listbox Options
 */
export type ListboxContextValue = Pick<
  ListboxState,
  | 'activeOption'
  | 'focusVisible'
  | 'multiselect'
  | 'registerOption'
  | 'selectedOptions'
  | 'selectOption'
  | 'setActiveOption'
> & {
  onOptionClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const listboxContextDefaultValue = {
  activeOption: undefined,
  focusVisible: false,
  multiselect: false,
  registerOption() {
    return () => undefined;
  },
  selectedOptions: [],
  onOptionClick() {
    // noop
  },
  selectOption() {
    // noop
  },
  setActiveOption() {
    // noop
  },
};

export const ListboxContext = createContext<ListboxContextValue | undefined>(undefined);

export const useListboxContext_unstable = <T>(selector: ContextSelector<ListboxContextValue, T>) =>
  useContextSelector(ListboxContext, (ctx = listboxContextDefaultValue) => selector(ctx));

export const ListboxProvider = ListboxContext.Provider;
