import { createContext } from '@fluentui/react-context-selector';
import { ComboboxState } from '../components/Combobox/Combobox.types';

/**
 * Context shared with Combobox, Listbox, & Options
 */
export type ComboboxContextValue = Pick<
  ComboboxState,
  'activeOption' | 'idBase' | 'onOptionClick' | 'open' | 'registerOption' | 'selectedOptions'
>;

export const ComboboxContext = createContext<ComboboxContextValue>({
  activeOption: undefined,
  idBase: '',
  onOptionClick() {
    // noop
  },
  open: false,
  selectedOptions: [],
  registerOption() {
    // noop
  },
});
