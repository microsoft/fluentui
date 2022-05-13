import { createContext } from '@fluentui/react-context-selector';
import { ListboxState } from '../components/Listbox/Listbox.types';

/**
 * Context shared with all Listbox Options
 */
export type ListboxContextValue = Pick<
  ListboxState,
  'activeOption' | 'multiselect' | 'onOptionClick' | 'registerOption' | 'selectedOptions'
>;

export const ListboxContext = createContext<ListboxContextValue>({
  activeOption: undefined,
  multiselect: false,
  onOptionClick() {
    // noop
  },
  registerOption() {
    return () => undefined;
  },
  selectedOptions: [],
});
