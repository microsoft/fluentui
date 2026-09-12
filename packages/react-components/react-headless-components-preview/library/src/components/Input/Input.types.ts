import type { InputBaseState } from '@fluentui/react-input';

export type { InputSlots, InputBaseProps as InputProps } from '@fluentui/react-input';

/**
 * Input component state
 */
export type InputState = InputBaseState & {
  root: {
    /**
     * Present when disabled; omitted otherwise.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the input is invalid.
     */
    'data-invalid'?: string;
  };
};
