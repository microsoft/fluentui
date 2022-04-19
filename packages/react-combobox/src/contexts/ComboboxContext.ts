import { createContext } from '@fluentui/react-context-selector';
import { ComboboxState } from '../components/Combobox/Combobox.types';

/**
 * Context shared with Combobox, Listbox, & Options
 */
export type ComboboxContextValue = Pick<
  ComboboxState,
  'activeOption' | 'appearance' | 'idBase' | 'onOptionClick' | 'open' | 'registerOption' | 'selectedOptions' | 'size'
>;

export const ComboboxContext = createContext<ComboboxContextValue>({
  activeOption: undefined,
  appearance: 'outline',
  idBase: '',
  onOptionClick() {
    // noop
  },
  open: false,
  selectedOptions: [],
  registerOption() {
    // noop
  },
  size: 'medium',
});
