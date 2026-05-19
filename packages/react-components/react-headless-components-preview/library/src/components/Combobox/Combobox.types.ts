import type { BaseComboboxState, BaseComboboxProps } from '@fluentui/react-combobox';

export type {
  ComboboxSlots,
  ComboboxContextValues,
  ComboboxOpenChangeData,
  ComboboxOpenEvents,
} from '@fluentui/react-combobox';

export type ComboboxProps = Omit<BaseComboboxProps, 'inlinePopup' | 'mountNode'>;

export type ComboboxState = BaseComboboxState & {
  input: {
    /**
     * Whether the combobox is currently open.
     */
    'data-state'?: 'open' | 'closed';
    /**
     * Whether the input element is currently disabled.
     */
    'data-disabled'?: string;
    /**
     * Whether the input element is currently displaying a placeholder.
     */
    'data-placeholder'?: string;
  };
};
