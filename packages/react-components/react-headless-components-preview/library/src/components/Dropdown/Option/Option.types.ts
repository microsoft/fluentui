import type { OptionState as OptionBaseState } from '@fluentui/react-combobox';

export type { OptionSlots, OptionProps } from '@fluentui/react-combobox';

/**
 * State used in rendering Option
 */
export type OptionState = OptionBaseState & {
  root: {
    /**
     * Present when the option is disabled; omitted otherwise.
     */
    'data-disabled'?: string;
    /**
     * Present when the option is selected; omitted otherwise.
     */
    'data-selected'?: string;
    /**
     * Whether the option belongs to a multiselect listbox.
     */
    'data-multiselect'?: string;
  };
};
