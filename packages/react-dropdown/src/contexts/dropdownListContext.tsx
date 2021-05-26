import * as React from 'react';
import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import { DropdownListProps } from '../components/index';

const DropdownListContext = createContext<DropdownListContextValue>({
  checkedValues: {},
  onCheckedValueChange: () => null,
  setFocusByFirstCharacter: () => null,
});

/**
 * Context shared between DropdownList and its children components
 */
export interface DropdownListContextValue extends Pick<DropdownListProps, 'checkedValues' | 'onCheckedValueChange'> {
  setFocusByFirstCharacter?: (e: React.KeyboardEvent<HTMLElement>, itemEl: HTMLElement) => void;
}

export const DropdownListProvider = DropdownListContext.Provider;

export const useDropdownListContext = <T,>(selector: ContextSelector<DropdownListContextValue, T>) =>
  useContextSelector(DropdownListContext, selector);
