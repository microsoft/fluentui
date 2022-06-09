import { createContext } from '@fluentui/react-context-selector';
import { ComboboxBaseState } from '../ComboboxBase/ComboboxBase.types';

/**
 * Context shared with Combobox, Listbox, & Options
 */
export type ComboboxContextValue = Pick<
  ComboboxBaseState,
  'activeOption' | 'appearance' | 'onOptionClick' | 'open' | 'registerOption' | 'selectedOptions' | 'size'
>;

export const ComboboxContext = createContext<ComboboxContextValue>({
  activeOption: undefined,
  appearance: 'outline',
  onOptionClick() {
    // noop
  },
  open: false,
  selectedOptions: [],
  registerOption() {
    return () => undefined;
  },
  size: 'medium',
});
