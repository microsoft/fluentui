import type { CheckboxBaseState } from '@fluentui/react-core-preview';

export type { CheckboxSlots, CheckboxProps } from '@fluentui/react-core-preview';

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
