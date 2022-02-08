import { createContext } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import { OptionGroupContextValue } from './OptionGroupContext';
import { OptionValue } from '../utils/OptionCollection.types';

/**
 * Context shared with Combobox, Listbox, & Options
 */
export type ComboboxContextValue = OptionGroupContextValue & {
  /* data of active option */
  activeOption: OptionValue | undefined;

  /* open/close state of the listbox */
  open: boolean;

  /* option click callback */
  onOptionClick: (optionKey: string) => void;

  /* selection handler */
  selectedKeys: string[];
};

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
