import * as React from 'react';
import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import { DropdownListProps } from '../components/index';
import { DropdownState } from '../components/Dropdown/index';

const DropdownContext = createContext<DropdownContextValue>({
  open: false,
  setOpen: () => false,
  checkedValues: {},
  onCheckedValueChange: () => null,
  defaultCheckedValues: {},
  hasDropdownContext: false,
  triggerRef: ({ current: null } as unknown) as React.MutableRefObject<HTMLElement>,
  dropdownPopupRef: ({ current: null } as unknown) as React.MutableRefObject<HTMLElement>,
  triggerId: '',
});

/**
 * Context shared between Dropdown and its children components
 *
 * Extends and drills down DropdownList props to simplify API
 */
export interface DropdownContextValue
  extends DropdownListProps,
    Pick<DropdownState, 'triggerRef' | 'dropdownPopupRef' | 'setOpen' | 'triggerId'> {
  open: boolean;
  hasDropdownContext: boolean;
  triggerId: string;
}

export const DropdownProvider = DropdownContext.Provider;

export const useDropdownContext = <T>(selector: ContextSelector<DropdownContextValue, T>) =>
  useContextSelector(DropdownContext, selector);
