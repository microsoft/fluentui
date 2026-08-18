import type { BaseComboboxState, BaseComboboxProps } from '@fluentui/react-combobox';

export type {
  ComboboxSlots,
  ComboboxContextValues,
  ComboboxOpenChangeData,
  ComboboxOpenEvents,
} from '@fluentui/react-combobox';

export type ComboboxProps = Omit<BaseComboboxProps, 'inlinePopup' | 'mountNode'>;

export type ComboboxState = BaseComboboxState & {
  root: {
    /**
     * Whether the dropdown is currently open.
     */
    'data-open'?: string;
    /**
     * Whether the trigger element is currently disabled.
     */
    'data-disabled'?: string;
    /**
     * Whether the trigger element is currently displaying a placeholder.
     */
    'data-placeholder'?: string;
    /**
     * Whether the trigger element is currently invalid.
     */
    'data-invalid'?: string;
    /**
     * Wether the clear icon is visible.
     */
    'data-clearable'?: string;
  };
};
