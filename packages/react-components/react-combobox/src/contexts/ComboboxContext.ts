import { createContext } from '@fluentui/react-context-selector';
import { ComboboxState } from '../components/Combobox/Combobox.types';

/**
 * Context shared with Combobox, Listbox, & Options
 */
export type ComboboxContextValue = Pick<
  ComboboxState,
  'activeOption' | 'appearance' | 'focusVisible' | 'open' | 'registerOption' | 'setActiveOption' | 'setOpen' | 'size'
> & {
  /**
   * @deprecated - no longer used
   */
  selectedOptions: ComboboxState['selectedOptions'];

  /**
   * @deprecated - no longer used
   */
  selectOption: ComboboxState['selectOption'];
};

/**
 * @deprecated - use ListboxContext instead
 * @see ListboxContext
 */
// eslint-disable-next-line @fluentui/no-context-default-value
export const ComboboxContext = createContext<ComboboxContextValue>({
  activeOption: undefined,
  appearance: 'outline',
  focusVisible: false,
  open: false,
  registerOption() {
    return () => undefined;
  },
  selectedOptions: [],
  selectOption() {
    // noop
  },
  setActiveOption() {
    // noop
  },
  setOpen() {
    // noop
  },
  size: 'medium',
});

/**
 * @deprecated - render ListboxProvider instead
 * @see ListboxProvider
 * @see useListboxContext_unstable
 */
// eslint-disable-next-line deprecation/deprecation
export const ComboboxProvider = ComboboxContext.Provider;
