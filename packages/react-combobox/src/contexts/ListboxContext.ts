import { createContext } from '@fluentui/react-context-selector';
import { ListboxState } from '../components/Listbox/Listbox.types';

/**
 * Context shared with all Listbox Options
 */
export type ListboxContextValue = Pick<
  ListboxState,
  'activeOption' | 'idBase' | 'selectedOptions' | 'onOptionClick' | 'registerOption'
>;

export const ListboxContext = createContext<ListboxContextValue>({
  activeOption: undefined,
  idBase: '',
  onOptionClick() {
    // noop
  },
  registerOption() {
    // noop
  },
  selectedOptions: [],
});
