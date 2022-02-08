import { createContext } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import { OptionGroupContextValue } from './OptionGroupContext';
import { OptionValue } from '../utils/OrderedGroup.types';

/**
 * Context shared with all Listbox Options
 */
export type ListboxContextValue = OptionGroupContextValue & {
  /* data of active option */
  activeOption: OptionValue | undefined;

  /* selection handler */
  selectedKeys: string[];

  /* option click callback */
  onOptionClick: (optionKey: string) => void;
};

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
