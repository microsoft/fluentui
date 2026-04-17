import type {
  CheckboxSlots as CheckboxBaseSlots,
  CheckboxBaseState,
  CheckboxBaseProps,
} from '@fluentui/react-checkbox';

export type CheckboxSlots = CheckboxBaseSlots;

/**
 * Checkbox Props
 */
export type CheckboxProps = CheckboxBaseProps;

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
  };
};
