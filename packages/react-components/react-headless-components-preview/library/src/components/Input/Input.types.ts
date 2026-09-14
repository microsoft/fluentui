import type { InputBaseState } from '@fluentui/react-input';

export type { InputSlots, InputBaseProps as InputProps } from '@fluentui/react-input';

/**
 * Input component state
 */
export type InputState = InputBaseState & {
  root: {
    /**
     * Data attribute set when the input is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the input is invalid.
     */
    'data-invalid'?: string;
  };
};
