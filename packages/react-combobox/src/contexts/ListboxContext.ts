import { createContext } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import { OptionGroupContextValue } from './OptionGroupContext';

/**
 * Context shared with all Listbox Options
 */
export type ListboxContextValue = OptionGroupContextValue & {
  /* id of active option */
  activeId: string | undefined;
};

/* This will go somewhere else */
export type ListboxContextValues = {
  listbox: ListboxContextValue;
};

export const ListboxContext: Context<ListboxContextValue> = createContext<ListboxContextValue>({
  activeId: undefined,
  registerOption() {
    // noop
  },
  unRegisterOption() {
    // noop
  },
});
