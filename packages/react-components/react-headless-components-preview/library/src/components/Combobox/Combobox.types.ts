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
     * Present when the input is disabled; omitted otherwise.
     */
    'data-disabled'?: string;
    /**
     * Present when a placeholder is displayed; omitted when a value is present.
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
