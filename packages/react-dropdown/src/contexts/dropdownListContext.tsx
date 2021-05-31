import * as React from 'react';
import { createDescendantContext, useDescendant } from '@fluentui/react-utilities';
import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import { DropdownListProps, DropdownDescendant } from '../components/index';

const DropdownListContext = createContext<DropdownListContextValue>({
  activeIndex: 0,
  setActiveIndex: () => null,
  'aria-activedescendant': '',
});

/**
 * Context shared between DropdownList and its children components
 */
export interface DropdownListContextValue extends Pick<DropdownListProps, 'checkedValues' | 'onCheckedValueChange'> {
  activeIndex: number;
  setActiveIndex: (update: React.SetStateAction<number>) => void;
  'aria-activedescendant': string;
}

export const dropdownDescendantContext = createDescendantContext<DropdownDescendant>('DropdownDescendantContext');

/**
 * Registers an descendant in the listbox descendants context
 */
export function useDropdownDescendant(dropdownDescendant: Omit<DropdownDescendant, 'index'>) {
  return useDescendant<DropdownDescendant>(dropdownDescendant, dropdownDescendantContext);
}

export const DropdownListProvider = DropdownListContext.Provider;

export const useDropdownListContext = <T,>(selector: ContextSelector<DropdownListContextValue, T>) =>
  useContextSelector(DropdownListContext, selector);
