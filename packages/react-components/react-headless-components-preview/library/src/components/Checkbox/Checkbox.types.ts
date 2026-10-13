import type { CheckboxBaseState } from '@fluentui/react-checkbox';

export type { CheckboxSlots, CheckboxBaseProps as CheckboxProps } from '@fluentui/react-checkbox';

/**
 * State used in rendering Checkbox
 */
export type CheckboxState = CheckboxBaseState & {
  root: {
    /**
     * Data attribute set when the checkbox is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the checkbox is checked. Value is 'mixed' when in the indeterminate state.
     */
    'data-checked'?: string;

    /**
     * Data attribute reflecting the label position.
     */
    'data-label-position'?: CheckboxBaseState['labelPosition'];
  };
};
