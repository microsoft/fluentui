import type { SelectBaseState } from '@fluentui/react-select';

export type { SelectSlots, SelectBaseProps as SelectProps } from '@fluentui/react-select';

/**
 * State used in rendering Select
 */
export type SelectState = SelectBaseState & {
  root: {
    /**
     * Data attribute set when the select is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the select is invalid.
     */
    'data-invalid'?: string;
  };
};
