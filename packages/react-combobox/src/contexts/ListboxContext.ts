import { createContext } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import { ListboxState } from '../components/Listbox';

/**
 * Context shared with all Listbox Options
 */
export type ListboxContextValue = Pick<
  ListboxState,
  'activeOption' | 'selectedKeys' | 'onOptionClick' | 'registerOption' | 'unRegisterOption'
>;

export type ListboxContextValues = {
  listbox: ListboxContextValue;
};

export const ListboxContext: Context<ListboxContextValue> = createContext<ListboxContextValue>({
  activeOption: undefined,
  onOptionClick() {
    // noop
  },
  registerOption() {
    // noop
  },
  unRegisterOption() {
    // noop
  },
  selectedKeys: [],
});
