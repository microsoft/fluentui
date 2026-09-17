import type { CheckboxBaseState } from '@fluentui/react-checkbox';

export type { CheckboxSlots, CheckboxBaseProps as CheckboxProps } from '@fluentui/react-checkbox';

/**
 * State used in rendering Checkbox
 */
export type CheckboxState = CheckboxBaseState & {
  root: {
    /**
     * Present when disabled; omitted otherwise.
     */
    'data-disabled'?: string;

    /**
     * Present when checked; omitted when unchecked. The value is "mixed" when indeterminate.
     */
    'data-checked'?: string;

    /**
     * Data attribute reflecting the label position.
     */
    'data-label-position'?: CheckboxBaseState['labelPosition'];
  };
};
