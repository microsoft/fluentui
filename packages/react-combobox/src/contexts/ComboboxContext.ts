import { createContext } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import { ComboboxState } from '../components/Combobox/Combobox.types';

/**
 * Context shared with Combobox, Listbox, & Options
 */
export type ComboboxContextValue = Pick<
  ComboboxState,
  'activeOption' | 'idBase' | 'onOptionClick' | 'open' | 'registerOption' | 'selectedOptions' | 'unRegisterOption'
>;

export type ComboboxContextValues = {
  combobox: ComboboxContextValue;
};

export const ComboboxContext: Context<ComboboxContextValue> = createContext<ComboboxContextValue>({
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
  unRegisterOption() {
    // noop
  },
});
