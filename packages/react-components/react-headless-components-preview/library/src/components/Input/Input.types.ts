import type { InputSlots as InputBaseSlots, InputBaseProps, InputBaseState } from '@fluentui/react-input';

/**
 * Input component slots
 */
export type InputSlots = InputBaseSlots;

/**
 * Input component props
 */
export type InputProps = InputBaseProps;

/**
 * Input component state
 */
export type InputState = InputBaseState & {
  root: {
    /**
     * Data attribute set when the input is disabled.
     */
    'data-disabled'?: string;
  };
};
