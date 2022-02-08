import { createContext } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import { ComboboxState } from '../components/Combobox';

/**
 * Context shared with Combobox, Listbox, & Options
 */
export type ComboboxContextValue = Pick<
  ComboboxState,
  'activeOption' | 'onOptionClick' | 'open' | 'registerOption' | 'selectedKeys' | 'unRegisterOption'
>;

export type ComboboxContextValues = {
  combobox: ComboboxContextValue;
};

export const ComboboxContext: Context<ComboboxContextValue> = createContext<ComboboxContextValue>({
  activeOption: undefined,
  onOptionClick() {
    // noop
  },
  open: false,
  selectedKeys: [],
  registerOption() {
    // noop
  },
  unRegisterOption() {
    // noop
  },
});
