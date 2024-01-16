import * as React from 'react';
import { createContext } from '@fluentui/react-context-selector';
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

// eslint-disable-next-line @fluentui/no-context-default-value
export const ListboxContext = createContext<ListboxContextValue>({
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
});

export const ListboxProvider = ListboxContext.Provider;
