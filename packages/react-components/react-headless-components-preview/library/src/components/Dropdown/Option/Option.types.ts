import type { OptionState as OptionBaseState } from '@fluentui/react-combobox';

export type { OptionSlots, OptionProps } from '@fluentui/react-combobox';

/**
 * State used in rendering Option
 */
export type OptionState = OptionBaseState & {
  root: {
    /**
     * Whether the option is currently disabled.
     */
    'data-disabled'?: string;
    /**
     * Whether the option is currently selected.
     */
    'data-selected'?: string;
    /**
     * Whether the option belongs to a multiselect listbox.
     */
    'data-multiselect'?: string;
  };
};
