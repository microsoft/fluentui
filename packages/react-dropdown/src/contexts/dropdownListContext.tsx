import * as React from 'react';
import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import { DropdownListProps } from '../components/index';

const DropdownListContext = createContext<DropdownListContextValue>({
  activeIndex: 0,
  setActiveIndex: () => null,
  onSelectionChange: () => null,
});

/**
 * Context shared between DropdownList and its children components
 */
export interface DropdownListContextValue extends Pick<DropdownListProps, 'selectedValues' | 'onSelectionChange'> {
  activeIndex: number;
  setActiveIndex: (update: React.SetStateAction<number>) => void;
}

export const DropdownListProvider = DropdownListContext.Provider;

export const useDropdownListContext = <T,>(selector: ContextSelector<DropdownListContextValue, T>) =>
  useContextSelector(DropdownListContext, selector);
