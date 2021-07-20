import * as React from 'react';
import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import { DropdownListProps } from '../components/index';
import { DropdownState } from '../components/Dropdown/index';

const DropdownContext = createContext<DropdownContextValue>({
  open: false,
  setOpen: () => false,
  activeIndex: 0,
  setActiveIndex: () => null,
  dropdownPopupRef: ({ current: null } as unknown) as React.MutableRefObject<HTMLElement>,
  hasDropdownContext: false,
  idBase: '',
  options: [],
  triggerId: '',
  triggerRef: ({ current: null } as unknown) as React.MutableRefObject<HTMLElement>,
});

/**
 * Context shared between Dropdown and its children components
 * Should override DropdownList's context when provided
 */
export interface DropdownContextValue
  extends DropdownListProps,
    Pick<DropdownState, 'triggerRef' | 'dropdownPopupRef' | 'setOpen' | 'triggerId'> {
  open: boolean;
  activeIndex: number;
  setActiveIndex: () => null;
  hasDropdownContext: boolean;
  idBase: string;
  triggerId: string;
}

export const DropdownProvider = DropdownContext.Provider;

export const useDropdownContext = <T>(selector: ContextSelector<DropdownContextValue, T>) =>
  useContextSelector(DropdownContext, selector);
