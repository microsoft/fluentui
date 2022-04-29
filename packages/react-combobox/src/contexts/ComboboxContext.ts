import * as React from 'react';
import { createContext } from '@fluentui/react-context-selector';
import { ComboboxState } from '../components/Combobox/Combobox.types';

/**
 * Context shared with Combobox, Listbox, & Options
 */
export type ComboboxContextValue = Pick<
  ComboboxState,
  | 'activeOption'
  | 'idBase'
  | 'onListboxClick'
  | 'onListboxMouseDown'
  | 'onOptionClick'
  | 'onTriggerBlur'
  | 'onTriggerClick'
  | 'onTriggerKeyDown'
  | 'open'
  | 'popperContainerRef'
  | 'registerOption'
  | 'selectedOptions'
  | 'triggerRef'
  | 'value'
>;

export const ComboboxContext = createContext<ComboboxContextValue>({
  activeOption: undefined,
  idBase: '',
  onListboxClick() {
    // noop
  },
  onListboxMouseDown() {
    // noop
  },
  onOptionClick() {
    // noop
  },
  onTriggerBlur() {
    // noop
  },
  onTriggerClick() {
    // noop
  },
  onTriggerKeyDown() {
    // noop
  },
  open: false,
  popperContainerRef: ({ current: null } as unknown) as React.MutableRefObject<HTMLDivElement>,
  selectedOptions: [],
  registerOption() {
    // noop
  },
  triggerRef: ({ current: null } as unknown) as React.RefObject<HTMLButtonElement>,
  value: undefined,
});
