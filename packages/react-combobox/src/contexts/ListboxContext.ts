import { createContext } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import { ListboxState } from '../components/Listbox/Listbox.types';

/**
 * Context shared with all Listbox Options
 */
export type ListboxContextValue = Pick<
  ListboxState,
  'activeOption' | 'idBase' | 'selectedOptions' | 'onOptionClick' | 'registerOption' | 'unRegisterOption'
>;

export type ListboxContextValues = {
  listbox: ListboxContextValue;
};

export const ListboxContext: Context<ListboxContextValue> = createContext<ListboxContextValue>({
  activeOption: undefined,
  idBase: '',
  onOptionClick() {
    // noop
  },
  registerOption() {
    // noop
  },
  unRegisterOption() {
    // noop
  },
  selectedOptions: [],
});
