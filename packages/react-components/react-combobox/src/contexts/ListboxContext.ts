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
>;

// eslint-disable-next-line @fluentui/no-context-default-value
export const ListboxContext = createContext<ListboxContextValue>({
  activeOption: undefined,
  focusVisible: false,
  multiselect: false,
  registerOption() {
    return () => undefined;
  },
  selectedOptions: [],
  selectOption() {
    // noop
  },
  setActiveOption() {
    // noop
  },
});

export const ListboxProvider = ListboxContext.Provider;
