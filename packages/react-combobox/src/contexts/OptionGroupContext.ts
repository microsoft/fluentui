import { createContext } from '@fluentui/react-context-selector';
import type { Context } from '@fluentui/react-context-selector';
import { OptionValue } from '../utils/OrderedGroup.types';

/**
 * Context shared between Listbox, OptionGroup and its children components
 */
export type OptionGroupContextValue = {
  /* function that child options call to register their values */
  registerOption: (option: OptionValue) => void;

  /* function that child options call to unregister their values */
  unRegisterOption: (id: string) => void;
};

/* This will go somewhere else */
export type OptionGroupContextValues = {
  optionGroup: OptionGroupContextValue;
};

export const OptionGroupContext: Context<OptionGroupContextValue> = createContext<OptionGroupContextValue>({
  registerOption() {
    // noop
  },
  unRegisterOption() {
    // noop
  },
});
