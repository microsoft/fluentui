import * as React from 'react';
import { ContextSelector, createContext, useContextSelector } from '@fluentui/react-context-selector';
import { ListboxState } from '../components/Listbox/Listbox.types';
import { OptionValue } from '../utils/OptionCollection.types';
import { ActiveDescendantChangeEvent } from '@fluentui/react-aria';

export type ActiveDescendantChangeData = {
  previousOption: OptionValue | null | undefined;
  nextOption: OptionValue | null | undefined;
};

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
  onActiveDescendantChange (e:  ActiveDescendantChangeEvent, data: ActiveDescendantChangeData) => void;
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
  onActiveDescendantChange() {
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
